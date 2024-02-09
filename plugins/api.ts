import ApiAppModule from "~/api/app";


export default defineNuxtPlugin((nuxtApp) => {
    const {csrf} = useCsrf()

    const opts: Parameters<typeof $fetch<unknown>> [1] = {
        baseURL: "http://localhost:3000",
    }

    opts.headers = (opts.headers || {}) as Record<string, string>
    opts.headers["X-Requested-With"] = "XMLHTTPRequest"
    opts.headers["csrf-token"] = csrf

    /** an object containing all repositories we need to expose */
    const factories = {
        appParams: new ApiAppModule(opts),
    };

    return {
        provide: {
            api: factories,
        },
    };
});