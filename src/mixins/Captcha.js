let objeto = {
    methods: {
        async recaptcha () {
            await this.$recaptchaLoaded();
            const token = await this.$recaptcha('login');

            return token;
        },

        irFora (e) {
            if(e.response) {
                if(e.response.status == 405) {
                    window.location.href = 'https://google.com.br';
                }
            }
        }
    }
};

export default objeto;
