class ApiFaqModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get(prop: any) {
        // return o.a.get('faq?categoryName="'.concat(t, '"'))
        return await $fetch("faq/" + prop + ".json", {
            ...this.$opts,
            method: 'GET',
        })
    }

}

export default ApiFaqModule;