import {defineStore} from "pinia";

export const useAppStore = defineStore('app', {
    state: () => ({
        isMobile: false,
        requestCounter: 0,
        hideMobileFooterCounter: 0,
        params: <any>{},
        isLoginAttempt: false,
        breadcrumbs: [],
        isOpenStoryModal: <any>undefined,
        isLoadingUserData: false,
        isHideMobileFooter: false,
        isHideChatBot: false,
        isLoadingBasket: false,
        isShowDiscountNotice: false,
        isHorizontalCardsMode: false,
        isOpenMobileSelectCity: false,
        isDimMobileFooter: false
        // isMobile: false,
        // isShowDiscountNotice: false,
        // isLoginAttempt: false,
        // requestCounter: 0,
        // params: <any>{},
        // isLoadingBasket: false,
        // isHideMobileFooter: false,
        // isDimMobileFooter: false,
        // hideMobileFooterCounter: 0,
    }),

    actions: {
        async PARAMS_GET() {
            return await useNuxtApp().$api.params.get().then(res => {
                this.params = res
                return Promise.resolve(res)
            }).catch(error => {
                return Promise.reject(error)
            })
        },
        async MOBILE_UPD(val: boolean) {
            this.isMobile = val
        },
        async BREADCRUMBS_UPD(val: any) {
            this.breadcrumbs = val
        },
        async DISCOUNT_NOTICE_UPD(val: boolean) {
            this.isShowDiscountNotice = val
            localStorage.setItem("isShowDiscountNotice", JSON.stringify(val))
        },
        async LOADING_UPD(val: any) {
            let e = val ? Math.max(this.requestCounter + 1, 1) : Math.max(this.requestCounter - 1, 0);
            this.requestCounter = e
        },
        async LOGIN_ATTEMPT_UPD(val: boolean) {
            this.isLoginAttempt = val
        },
        async OPEN_CLOSE_STORY_MODAL(val: boolean) {
            this.isOpenStoryModal = val
        },
        async LOADING_BASKET(val: boolean) {
            this.isLoadingBasket = val
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
    },
    hydrate(state, initialState) {
        // in this case we can completely ignore the initial state since we
        // want to read the value from the browser
        // state.breadcrumbs = useLocalStorage('pinia/auth/login', 'bob')
        initialState.breadcrumbs = state.breadcrumbs
    },
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}