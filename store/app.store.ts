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
        isDimMobileFooter: false,
        emailConfirmationMessage: undefined
    }),
    //CHECK DONE
    actions: {
        async PARAMS_GET() {
            return new Promise(async (resolve, reject) => {
                await useNuxtApp().$api.params.get().then((p) => {
                    this.COMMIT_PARAMS_GET(p)
                    resolve(p)
                }).catch((t) => {
                    reject(t)
                })
            })
        },
        //COMMITS
        async COMMIT_LOADING_UPD(val: any) {
            let e = val ? Math.max(this.requestCounter + 1, 1) : Math.max(this.requestCounter - 1, 0);
            this.requestCounter = e
        },
        async COMMIT_MOBILE_UPD(val: any) {
            this.isMobile = val
        },
        async COMMIT_EMAIL_CONFIRMATION_MESSAGE_UPD(val: any) {
            this.emailConfirmationMessage = val
        },
        async COMMIT_PARAMS_GET(val: any) {
            this.params = val
        },
        async COMMIT_LOGIN_ATTEMPT_UPD(val: any) {
            this.isLoginAttempt = val
        },
        async COMMIT_BREADCRUMBS_UPD(val: any) {
            this.breadcrumbs = val
        },
        async COMMIT_OPEN_CLOSE_STORY_MODAL(val: any) {
            this.isOpenStoryModal = val
        },
        async COMMIT_LOADING_USER_DATA_UPD(val: any) {
            this.isLoadingUserData = val
        },
        async COMMIT_HIDE_MOBILE_FOOTER(val: any) {
            let e = Boolean(val ? Math.max(this.hideMobileFooterCounter + 1, 1) : Math.max(this.hideMobileFooterCounter - 1, 0));
            e || (document.body.style.overflow = "")
            this.isHideMobileFooter = e
        },
        async COMMIT_HIDE_CHAT_BOT(val: any) {
            this.isHideChatBot = val
        },
        async COMMIT_LOADING_BASKET(val: any) {
            this.isLoadingBasket = val
        },
        async COMMIT_DISCOUNT_NOTICE_UPD(val: any) {
            this.isShowDiscountNotice = val
            localStorage.setItem("isShowDiscountNotice", JSON.stringify(val))
        },
        async COMMIT_CARD_MODE_UPD(val: any) {
            this.isHorizontalCardsMode = val
            localStorage.setItem("isHorizontalCardsMode", "".concat(val))
        },
        async COMMIT_OPEN_MOBILE_SELECT_CITY(val: any) {
            this.isOpenMobileSelectCity = val
        },
        async COMMIT_DIM_MOBILE_FOOTER(val: any) {
            this.isDimMobileFooter = val
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