class ApiAllvitModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    // async get() {
    //     return $fetch(`params/params.json`, {
    //             ...this.$opts,
    //             method: 'GET',
    //         })
    // }
}

export default ApiAllvitModule;