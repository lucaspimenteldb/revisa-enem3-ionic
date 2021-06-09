import api from "../api/basicUrl";

const objeto  = {
    methods: {
        async getVersionCode () {
            if (window.cordova) {
                try{
                    let version = await window.cordova.getAppVersion.getVersionNumber();
                    let idPackage =  await window.cordova.getAppVersion.getPackageName();
                    let dados = await api.get('/get-version');
                    console.log(idPackage);
                    let versionServer = dados.data.version;
                    this.loading = false;

                    if (version != versionServer) {
                        this.text.message = 'Possui uma atualização disponível na playstore';
                        this.buttons = [{text: 'Atualizar', handler: () =>window.cordova.plugins.market.open(idPackage)}];
                        this.dialog = true;
                    }

                }catch (e) {
                    console.log(e);
                    throw e;
                }

            }
        }
    }
}

export default objeto;
