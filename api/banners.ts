class ApiBannersModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get(params: any) {
        return useAsyncData(
            'banners',
            () => $fetch(`banners/banners.json`, {
                ...this.$opts,
                method: 'GET',
            })
        );
    }

    async getForCatalog(params: any) {
        return useAsyncData(
            'banners',
            () => $fetch(`banners/isCatalog.json`, {
                ...this.$opts,
                method: 'GET',
            })
        );
    }

    async getYouMayNeed(params: any) {
        return useAsyncData(
            'banners',
            () => $fetch(`banners/isYouMayNeed.json`, {
                ...this.$opts,
                method: 'GET',
            })
        );
    }
}

export default ApiBannersModule;