import {defineStore} from "pinia";

export const useStoriesStore = defineStore('stories', {
    state: () => ({
        stories: <any>[],
        currentStoryID: <any>undefined,
        viewedStoriesIDs: <any>[],
    }),
    actions: {
        async GET() {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.stories.get().then((s) => {
                    this.COMMIT_STORIES_GET(null != s ? s : [])
                    resolve(null != s ? s : [])
                }).catch((function (t) {
                    reject(t)
                }))
            })
            // return await useNuxtApp().$api.stories.get().then(res => {
            //     this.stories = res ? res : []
            //     return Promise.resolve(res)
            // }).catch(error => {
            //     return Promise.reject(error)
            // })
        },
        async COMMIT_STORIES_GET(val: any) {
            this.stories = val
        },
        async COMMIT_CHANGE_CURRENT_STORY_ID(val: any) {
            this.currentStoryID = val
        },
        async COMMIT_CHANGE_VIEWED_STORIES(val: any) {
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
