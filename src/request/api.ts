import service from '.';
interface LoginData {
    username: string,
    password: string
}
export function login(data: LoginData) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}