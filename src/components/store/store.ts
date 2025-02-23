import $api from ".";
import { makeAutoObservable } from "mobx";

interface tokensInterface {
    accessToken: string,
    refreshToken: string
}

interface dataInterface {
    nickname?: string,
    mail: string,
    password: string
}

interface userInterface {
    id: number,
    nickname: string,
    mail: string,
    password: string,
    avatar: string,
    created_at: string
}

interface IStore {
    user: userInterface;
    firstime: boolean;
    registration(data: dataInterface): any;
    login(data: dataInterface): any;
    logout(): any;
    refresh(): any;
}

class Store implements IStore {
    user: userInterface = null
    firstime = false

    constructor() {
        makeAutoObservable(this)
    }
    async registration(data: dataInterface) {
        const response = await $api.post<undefined>('/registration', data)
        const [user, tokens]: [userInterface, tokensInterface] = response.data
        localStorage.setItem('accessToken', tokens.accessToken)
        this.user = user
        console.log('РЕГИСТРАТИОН')
    }
    async login(data: dataInterface) {
        const response = await $api.post<undefined>('/login', data)
        const [user, tokens]: [userInterface, tokensInterface] = response.data
        localStorage.setItem('accessToken', tokens.accessToken)
        this.user = user
        console.log(this.user)
    }
    async logout() {
        await $api.get('/logout')
        localStorage.removeItem('accessToken')
        console.log('ЛОГАУТ')
        this.user = null
    }
    async refresh() {
        const accessToken = await localStorage.getItem('accessToken')
        const response = await $api.post<undefined>('/refresh', {"accessToken": accessToken})
        const [user, tokens]: [userInterface, tokensInterface] = response.data
        console.log(user, tokens)
        if (user && tokens) {
            this.user = user
            // $api.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`
            // console.log($api.defaults.headers.common.Authorization)
            await localStorage.setItem('accessToken', tokens.accessToken)
        }
    }
}
// ДОБАВИТЬ КНОПКУ С ПРОВЕРКОЙ НА ВАЛИДНОСТЬ ТОКЕН
export default Store