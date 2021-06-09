import api from "../api/basicUrl";
import browser from "../plugins/browser";

const objeto  = {
    methods: {
        async getVersionCode () {
            if (window.cordova) {
                try{
                    this.loading = true;
                    let version = await window.cordova.getAppVersion.getVersionNumber();
                    let dados = await api.get('/get-version');
                    let versionServer = dados.data.version;
                    this.loading = false;

                    if (version != versionServer) {
                        this.text.message = 'Possui uma atualização disponível na playstore';
                        this.buttons = [{text: 'Atualizar', handler: async () => await browser.open(dados.data.url)}];
                        this.dialog = true;
                    }

                }catch (e) {
                    this.loading = false;
                    console.log(e);
                    throw e;
                }

            }
        }
    }
}

export default objeto;
