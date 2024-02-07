import {defineStore} from "pinia";

export const useAppStore = defineStore('app', {
    state: () => ({
        isMobile: false,
        isShowDiscountNotice: false,
        isLoginAttempt: false,
        requestCounter: 0,
        params: <any>{},
    }),
    actions: {
        async PARAMS_GET() {
            const {data: params} = await useFetch('http://localhost:3000/appParams.json')
            this.params = params
        },
        async MOBILE_UPD(val: boolean) {
            this.isMobile = val
        },
        async DISCOUNT_NOTICE_UPD(val: boolean) {
            this.isShowDiscountNotice = val
            localStorage.setItem("isShowDiscountNotice", JSON.stringify(val))
        },
        async LOGIN_ATTEMPT_UPD(val: boolean) {
            this.isLoginAttempt = val
        },
    },
    getters: {
        getIsLoading: function (state) {
            return state.requestCounter > 0
        }
    }
})
