import api from "../api/basicUrl";

const objeto  = {
    methods: {
        async getVersionCode () {
            if (window.cordova) {
                try{
                    this.loading = false;

                }catch (e) {
                    console.log(e);
                    throw e;
                }

            }
        }
    }
}

export default objeto;
