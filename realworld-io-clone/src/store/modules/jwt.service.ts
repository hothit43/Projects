//jwt - jason web token

const tokenKey = "id_token"

export const getToken =() => {
    return window.localStorage.getItem(tokenKey)
}

export const saveToken = (token: string) => {
    window.localStorage.setItem(tokenKey, token)
}

export const destroyToken = () => {
    window.localStorage.removeItem(tokenKey)
}

export default {getToken, saveToken, destroyToken}