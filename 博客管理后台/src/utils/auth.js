import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    // return Cookies.remove(TokenKey)
    //删除用户信息 token
    localStorage.removeItem('adminToken')
}