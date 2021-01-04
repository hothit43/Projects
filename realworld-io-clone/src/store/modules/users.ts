import { UserForUpdate } from './../models.d';
import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators'
import store from '@/store'
import {User, Profile, UserSubmit} from '../models'
import { fetchProfile, fetchUser, loginUser, setJWT, updateUser } from '../api'

//Regular Method without vuex-module-decorator
// const moduleA = {
//     state: { ... },
//     mutations: { ... },
//     actions: { ... },
//     getters: { ... }
// }
  

//vuex-module-decorators allows to define modules like typescript classes
@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true
})

export class UsersModule extends VuexModule {
    user: User | null = null
    profile?: Profile | null = null
    
    //Getter
    get username(){
        //if user exists send user.username else send null
        return this.user && this.user.username || null
    }

    @Action({commit: 'setUser'})
    //UserSubmit Type from models.d.ts
    async login(userSubmit: UserSubmit){
        try {
            //loginUser() from api.ts
            const user = await loginUser(userSubmit)
            if(user) setJWT(user.token)
            //console.log(user)
            return user 
        } catch(e) {
            console.error(e)
            throw new Error('Invalid username or password')
        }
 
    }

    @Action({commit: 'setProfile'})
    async loadProfile(username: string){
        const profile = await fetchProfile(username)
        return profile
    }

    //load the current user to load from api to get updated data
    async loadUser(){
        const user = await fetchUser()
        return { user }
    }
    
    @Action({commit: 'setSelfProfile'})
    async updateSelfProfile(userUpdateFields: UserForUpdate){
        const user = await updateUser(userUpdateFields)
        return user
    }

    //mutate/set above user object
    @Mutation setUser(user: User){this.user = user}

    @Mutation setProfile(profile: Profile){
        this.profile = profile
    }

    @Mutation 
    setSelfProfile(user: User){
        this.user = user
    }
}


export default getModule(UsersModule);