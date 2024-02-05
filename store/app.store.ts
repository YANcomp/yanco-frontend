import {defineStore} from "pinia";

export const useAppStore = defineStore('app', {
    state: () => ({
        isMobile: false,
        requestCounter: 0,
        params: {},
        isLoginAttempt: false,
        fastOrder: undefined,
        fastOrderPharmacyID: undefined,
        breadcrumbs: undefined,
        isOpenStoryModal: undefined,
        isLoadingUserData: false
    }),
    actions: {
        async PARAMS_GET() {
            const { data: params } = await useFetch('http://localhost:3000/appParams.json')
            this.params = params
        },
    },
    getters: {
        isLoading: function (state) {
            return state.requestCounter > 0
        }
    }
})
