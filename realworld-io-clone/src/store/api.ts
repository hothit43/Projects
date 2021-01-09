import axios from 'axios'
//import JwtService from './modules/jwt.service'
import { User, UserResponse, Profile, ProfileResponse, UserSubmit, ArticlesResponse, UserForUpdate} from './models'


//export let errors = {}

export const conduitAPI = axios.create({
    baseURL: 'https://conduit.productionready.io/api'
})

export function setJWT(token: string | null){
    conduitAPI.defaults.headers.common["Authorization"] = `Token ${token}`
}

export function clearJWT(){
    delete conduitAPI.defaults.headers.common['Authorization']
}

export async function loginUser(credentials: UserSubmit): Promise<User | undefined> {

            const response = await conduitAPI.post('/users/login', {user: credentials})
            return (response.data as UserResponse).user
     
}

//GET /api/profiles/:username
//api response for profile
export async function fetchProfile(username: string): Promise<Profile> {
    const response = await conduitAPI.get(`/profiles/${username}`)
    return (response.data as ProfileResponse).profile;
}

//Fetch the current user for refresh
export async function fetchUser(): Promise<User | undefined>{
   
        const response = await conduitAPI.get('/user')
        return (response.data as UserResponse).user

    
}

//GET /api/articles
//api response with list of articles
export async function getGlobalFeed(feedType: string, username?: string): Promise<ArticlesResponse> {
    const filterFeed = feedType === 'user' ? '?author='+username : feedType === 'favorite' ? '?favorited='+username : feedType === 'feed' ? '/feed?limit=20' : ''
    const response = await conduitAPI.get(`/articles${filterFeed}`)
    return response.data
}

//POST /api/profiles/:username/follow
//Should get a profile - Use Profile | undefined or create new type
export async function fetchProfileToFollow(username: string): Promise<Profile>{
    const response = await conduitAPI.post(`/profiles/${username}/follow`)
    return response.data.profile
}

//DELETE /api/profiles/:username/follow
//Shoul get a profile - Use Profile | undefined or create new type
export async function deleteProfileFromFollow(username: string): Promise<Profile>{
    const response = await conduitAPI.delete(`/profiles/${username}/follow`)
    return response.data.profile
}


//PUT /api/user
//Accepted params email, username, password, image, bio
export async function updateUser(user: UserForUpdate): Promise<User>{
    const response = await conduitAPI.put('/user', user)
    return (response.data as UserResponse).user
}
