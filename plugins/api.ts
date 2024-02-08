import ApiAppModule from "~/api/app";

export default defineNuxtPlugin((nuxtApp) => {
    /** an object containing all repositories we need to expose */
    const factories = {
        appParams: new ApiAppModule,
    };

    return {
        provide: {
            api: factories,
        },
    };
});