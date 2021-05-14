let objeto = {
    methods: {
        async recaptcha () {
            await this.$recaptchaLoaded();
            const token = await this.$recaptcha('login');

            return token;
        }
    }
};

export default objeto;
