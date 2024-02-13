import {defineStore} from "pinia";

export const useAppStore = defineStore('app', {
    state: () => ({
        isMobile: false,
        isShowDiscountNotice: false,
        isLoginAttempt: false,
        requestCounter: 0,
        params: <any>{},
        isHideMobileFooter: false,
        isDimMobileFooter: false,
        hideMobileFooterCounter: 0,
    }),
    actions: {
        async PARAMS_GET() {
            const {data: params, error} = await useNuxtApp().$api.params.get()
            if (error.value) {
                return Promise.reject(error.value)
            } else {
                this.params = params.value
            }
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
        async HIDE_MOBILE_FOOTER(val: any) {
            var e = Boolean(val ? Math.max(this.hideMobileFooterCounter + 1, 1) : Math.max(this.hideMobileFooterCounter - 1, 0));
            e || (document.body.style.overflow = ""), this.isHideMobileFooter = e
        },
    },
    getters: {
        getIsLoading: function (state) {
            return state.requestCounter > 0
        }
    }
})
