import axios from 'axios'
import { User, UserResponse, Profile, ProfileResponse, UserSubmit, ArticlesResponse, UserForUpdate} from './models'

export const conduitAPI = axios.create({
    baseURL: 'https://conduit.productionready.io/api'
})

//jwt - jason web token
export function setJWT(jwt: string){
    //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    conduitAPI.defaults.headers.common["Authorization"] = `Token ${jwt}`
}

export function clearJWT(){
    delete conduitAPI.defaults.headers.common['Authorization']
}

//API CALLS

//type UserSubmit from models.d.ts
//async returns a promise
//Return type is User Response from models.d.ts
//function may return undefined if try fails
export async function loginUser(user: UserSubmit): Promise<User | undefined> {
    try {
        const response = await conduitAPI.post('/users/login', {user})
        return (response.data as UserResponse).user
    } catch(e){
        console.error(e.message)
    }
}

//GET /api/profiles/:username
//api response for profile
export async function fetchProfile(username: string): Promise<Profile> {
    const response = await conduitAPI.get(`/profiles/${username}`)
    return (response.data as ProfileResponse).profile;
}

//Fetch the current user for refresh
export async function fetchUser(): Promise<User | undefined>{
    try{
        const response = await conduitAPI.get('/user')
        return (response.data as UserResponse).user
    } catch(e){
        console.error(e.message)
    }
    
}

//GET /api/articles
//api response with list of articles
export async function getGlobalFeed(feedType: string, username?: string): Promise<ArticlesResponse> {
    const filterFeed = feedType === 'user' ? '?author='+username : feedType === 'favorite' ? '?favorited='+username : ''
    const response = await conduitAPI.get(`/articles${filterFeed}`)
    return response.data
}


//PUT /api/user
//Accepted params email, username, password, image, bio
export async function updateUser(user: UserForUpdate): Promise<User>{
    const response = await conduitAPI.put('/user', user)
    return (response.data as UserResponse).user
}
