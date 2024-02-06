import {defineStore} from "pinia";

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        notifications: <any>[],
        counter: 0,
    }),
    actions: {
        async NOTIFICATIONS_UPD(notification: object) {
            this.notifications.push(Object.assign({}, notification, {
                ID: this.counter += 1
            }))
        },
        async NOTIFICATIONS_DEL(notification_id: number) {
            this.notifications.splice(this.notifications.findIndex((item: any) => item.ID === notification_id), 1)
        }
    }
})
