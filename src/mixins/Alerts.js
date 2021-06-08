import network from '../plugins/network';

const objeto = {
    data() {
        return {
            text: {
                header: 'Ops!',
                subHeader: '',
                message: 'Selecione uma das alternativas :)'
            },

            buttons: [],
            dialog: false,

        }
    },

    methods: {
        async alertErro(e, message = '') {
            this.buttons = [{text: 'Ok', handler: () => this.dialog = false}]
            if (e.response) {
                let status = e.response.status ? ' '+e.response.status  : '';
                if (e.response.status == 0) {
                    this.text.message = 'Sem conexão com a internet. Por favor tente novamente' + status;
                }
                else if (e.response.status == 401) {
                    this.text.message = message ? message : 'Sua sessão expirou, por favor faça o login novamente' + status;
                }
                else if (e.response.status == 500) {
                    this.text.message = 'Erro no servidor. Por favor tente novamente mais tarde' + status;
                }
                else if (e.response.status == 403) {
                    this.text.message = message ? message : 'Procedimento não autorizado' + status;
                }
                else if(e.response.status == 405) {
                    this.text.message = message ? message : 'Inconsistência ao requisitar processo. Por favor tente novamente mais tarde' + status;
                }
                else if(e.response.status == 400) {
                    this.text.message = message ? message : 'Requisição mal processada. Por favor tente novamente mais tarde' + status;
                }
                else {
                    this.text.message = message ? message : 'Status desconhecido' + status;
                }
            }
            else{
                let status = await network.getStatus();
                this.text.message = !status.connected ? 'Sem conexão com a internet.' : 'Erro desconhecido';
            }
            this.dialog = true;
            this.loading = false;
        }
    }
}

export default objeto;
