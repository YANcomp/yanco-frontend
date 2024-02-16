class ApiStoriesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get(params?: any) {
        return $fetch(`stories/stories.json`, {
            ...this.$opts,
            method: 'GET',
        })

    }

}

export default ApiStoriesModule;