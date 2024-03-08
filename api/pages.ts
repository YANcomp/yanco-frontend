class ApiPagesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get(prop: any) {
        // return o.a.get('pages?slug="'.concat(t, '"'))
        return await $fetch("pages/" + prop + ".json", {
            ...this.$opts,
            method: 'GET',
        })
    }

}

export default ApiPagesModule;