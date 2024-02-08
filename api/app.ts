class ApiAppModule {
    private RESOURCE = 'http://localhost:3000/appParams.json';

    async get(): Promise<any> {
        return useFetch(this.RESOURCE);
    }
}

export default ApiAppModule;