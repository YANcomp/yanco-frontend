import type {RouterConfig} from '@nuxt/schema'

export default <RouterConfig>{
    mode: "history",
    base: "/",
    linkActiveClass: "nuxt-link-active",
    linkExactActiveClass: "nuxt-link-exact-active",
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: (_routes) => [
        {
            name: 'home',
            path: '/',
            component: () => import('~/components/vHome.vue').then(r => r.default || r)
        }
    ],
    fallback: false
}
