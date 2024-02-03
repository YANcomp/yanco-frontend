import type { RouterConfig } from '@nuxt/schema'
import { createMemoryHistory } from 'vue-router'

export default <RouterConfig> {
    // https://router.vuejs.org/api/interfaces/routeroptions.html
    history: base => process.client ? createMemoryHistory(base) : null /* default */,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                top: 0
            };
        }
    },
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: (_routes) => [
        {
            name: 'home',
            path: '/',
            component: () => import('~/components/vHome.vue').then(r => r.default || r)
        }
    ],
}