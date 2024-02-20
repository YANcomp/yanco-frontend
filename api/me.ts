class ApiMeModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get() {
        //return return o.a.get("me")
        return await $fetch(`me/get.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

    async upd(props: any) {
        //return return o.a.patch("me", t)
        return await $fetch(`me/upd.json`, {
            ...this.$opts,
            method: 'PATCH',
        })
    }

    async updPhone(props: any) {
    }

    async updPassword(props: any) {
    }

    async updEmail(props: any) {
    }

    async updElectronicCheck(props: any) {
    }

    async updElectronicCheckAdShown(props: any) {
    }

    async updSubscription(props: any) {
    }

    async confirmEmail(props: any) {
    }

    async recovery(props: any) {
    }

    async applyPromoCode(props: any) {
    }

    async cancelPromoCode(props: any) {
    }

    async getBarcode(props: any) {
    }

    async getRecentPurchases(props: any) {
    }

    async getLoginType(props: any) {
    }

    async sendSMS(props: any) {
    }
}

export default ApiMeModule;