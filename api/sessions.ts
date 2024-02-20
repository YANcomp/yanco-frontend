class ApiSessionsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async new(props: any) {
        //return o.a.post("me/sessions", t)
        return await $fetch(`me/sessions.json`, {
            ...this.$opts,
            method: 'POST',
        })
    }

    async upd() {
        //return o.a.put("me/sessions")
        return await $fetch(`me/sessions.json`, {
            ...this.$opts,
            method: 'PUT',
        })
    }

    async del() {
        //return o.a.delete("me/sessions")
        return await $fetch(`me/sessions.json`, {
            ...this.$opts,
            method: 'DELETE',
        })
    }
}

export default ApiSessionsModule;