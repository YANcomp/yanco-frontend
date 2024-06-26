class ApiAboutImagesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get() {
        return await $fetch(`/about/about.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }
}

export default ApiAboutImagesModule;