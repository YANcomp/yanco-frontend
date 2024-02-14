import {defineStore} from "pinia";

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        items: [],
        newItems: [],
    }),
    actions: {
        async FAVORITES_GET(val: boolean) {
        },
        async FAVORITES_UPD(favorites: any) {
            //TODO
            this.items = favorites
            return Promise.resolve()
        },
        async FAVORITES_ADD(val: boolean) {
        },
    },
    //TODO
    getters: {
        favoritesCount: function (state) {
            return state.items.length
        },
        inFavorites: function (state) {
            return (state.items ? state.items : []).reduce((function (result: any, item: any) {
                result[item.ID] = true
                return result
            }), {})
        },
    }
})
