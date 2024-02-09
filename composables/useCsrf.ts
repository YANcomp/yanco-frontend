export function useCsrf() {
    if (process.server) {
        return { csrf: useNuxtApp().ssrContext?.event?.context?.csrfToken }
    }
    const metaTag = window.document.querySelector('meta[name="csrf-token"]')
    return { csrf: metaTag?.getAttribute('content') }
}