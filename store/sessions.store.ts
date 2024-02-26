import {defineStore} from "pinia";

export const useSessionsStore = defineStore('sessions', {
    state: () => ({
        token: <any>undefined
    }),
    actions: {
        async SESSIONS_NEW(props?: any) {
            return new Promise((resolve: any, reject: any) => {
                useNuxtApp().$api.sessions.new(props).then((res: any) => {
                    //TODO  d.a.CSRFToken = res.token
                    localStorage.setItem("token", res.token)
                    this.COMMIT_SESSIONS_UPD(res)
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },
        async SESSIONS_UPD(props?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.sessions.upd().then((res: any) => {
                    // TODO d.a.CSRFToken = res.token
                    localStorage.setItem("token", res.token)
                    this.COMMIT_SESSIONS_UPD(res)
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },
        async SESSIONS_DEL(props?: any) {
            return useNuxtApp().$api.sessions.del().then(() => {
                //TODO d.a.CSRFToken = undefined
                localStorage.removeItem("token")
                this.COMMIT_SESSIONS_DEL()
            }).catch((error: any) => {
                if ("Вы не авторизованы" === error) {
                    this.COMMIT_SESSIONS_DEL()
                    //TODO d.a.CSRFToken = undefined
                    localStorage.removeItem("token")
                }
                console.log(error)
            })
        },
        async COMMIT_SESSIONS_UPD(props?: any) {
            this.token = props.token
        },
        async COMMIT_SESSIONS_DEL() {
            this.token = undefined
        },
    },
    getters: {
        isAuthorized: function (state) {
            return state.token !== undefined
        }
    }
})
