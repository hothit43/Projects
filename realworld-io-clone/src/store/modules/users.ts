import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators'
import store from '@/store'
import {User, Profile, UserSubmit, Errors, UserForUpdate} from '../models'
import JwtService from './jwt.service'
import { clearJWT, deleteProfileFromFollow, fetchProfile, fetchProfileToFollow, fetchUser, loginUser, setJWT, updateUser } from '../api'
import jwtService from './jwt.service'

@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true
})

export class UsersModule extends VuexModule {
    user: User | null = null
    profile?: Profile | null = null
    errors: object | null = null
    token = jwtService.getToken()
    //Getter
    get username(){
        //if user exists send user.username else send null
        return this.user && this.user.username || null
    }
    
    get isAuthenticated(){
        return !!this.token
    }

    @Action
        async login(userSubmit: UserSubmit){
            try{
                const user = await loginUser(userSubmit)
                this.context.commit('setUser', user)
            } catch(e){
                this.context.commit('setError', e)
            }   
        }
    
    @Action
    async loadUser(){
        if (this.token) {
            try{
                setJWT(this.token)
                const user = await fetchUser()
                this.context.commit('setUser', user)
            } catch(e){
                this.context.commit('setError', e)
            }
        } else {
            this.context.commit('purge')
        }
    }

    @Action({commit: 'setProfile'})
    async loadProfile(username: string){
        const profile = await fetchProfile(username)
        return profile
    }
    
    @Action({commit: 'setSelfProfile'})
    async updateSelfProfile(userUpdateFields: UserForUpdate){
        const user = await updateUser(userUpdateFields)
        return user
    }
    //Follow user
    @Action({commit: 'setProfile'})
    async followUser(username: string){
        const user = await fetchProfileToFollow(username)
        return user
    }

    //Unfollow user
    @Action({commit: 'setProfile'})
    async unfollowUser(username: string){
        const user = await deleteProfileFromFollow(username)
        return user
    }

    //mutate/set above user object
    @Mutation setUser(user: User){
            this.user = user
            JwtService.saveToken(user.token)
            setJWT(this.token)
            
    }
    @Mutation 
    setError(error: Errors ){
        this.errors = {...error.response.data.errors}
        clearJWT()
        JwtService.destroyToken()
    }
    @Mutation
    purge(){
        this.user = null
        this.errors = null
        jwtService.destroyToken()
        clearJWT()
    }
    @Mutation setProfile(profile: Profile){this.profile = profile}
    @Mutation setSelfProfile(user: User){this.user = user}
}


export default getModule(UsersModule);