import {defineStore} from "pinia";

export const useStoriesStore = defineStore('stories', {
    state: () => ({
        stories: <any>[],
        currentStoryID: <any>undefined,
        viewedStoriesIDs: <any>[],
    }),
    //TODO
    actions: {
        async GET(props?: any) {
            return await useNuxtApp().$api.stories.get().then(res => {
                this.stories = res ? res : []
                return Promise.resolve(res)
            }).catch(error => {
                return Promise.reject(error)
            })
        },
        async CHANGE_CURRENT_STORY_ID(val: any) {
            this.currentStoryID = val
        },
        async CHANGE_VIEWED_STORIES(val: any) {
            this.viewedStoriesIDs = val
        },
    },
    getters: {
        currentStory: function (state) {
            return state.stories === undefined ? undefined : state.stories.find((t: any) => {
                return t.ID === state.currentStoryID
            })
        }
    }
})
