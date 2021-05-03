<template>
    <ion-page>
        <ion-content>
            <ion-list class="h-full">
                <ion-label class="ion-padding font-bold text-lg">
                   {{redacao.titulo || ""}}
                </ion-label>

                <ion-label class="ion-padding text-xs" style="display: block">
                    {{redacao.descricao || ""}}
                </ion-label>

                <section class="ion-padding">
                    <ion-button class="ion-no-margin mt-8 mr-8 text-none" fill="outline" @click="baixarRas">
                        Baixar rascunho
                    </ion-button>
                    <ion-button class="ion-no-margin mt-8 text-none" @click="enviarRedacao()">
                        Enviar redação
                    </ion-button>
                </section>

                <div class="ion-margin-vertical ion-padding-vertical">
                    <ion-label class="ion-padding font-bold text-lg">
                        Como enviar minha redação?
                    </ion-label>

                    <iframe
                            v-if="video"
                            width="100%"
                            height="250"
                            :src="video"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            class="ion-margin-vertical"
                    />
                </div>
            </ion-list>
            <Loading :isOpen="loading"></Loading>
        </ion-content>
    </ion-page>
</template>

<script>
    import {IonPage, IonContent, IonLabel, IonList, modalController} from '@ionic/vue';
    import {notifications, arrowForwardCircleOutline, lockClosed, closeCircleOutline} from 'ionicons/icons';
    import {useRouter, useRoute} from 'vue-router'
    import Modal from '../../components/ModalRedacoes'
    import {ref} from 'vue';
    import Loading from "../../components/auxiliares/Loading";
    import api from '../../api/basicUrl';
    import storage from "../../storage/StorageKey";
    import browser from "../../plugins/browser";
    import sqlite from "../../storage/Sqlite";
    import methodsGlobal from "../../mixins/methodsGlobal";
    import network from "../../plugins/network";

    export default {
        name: 'VerRascunhoEnviarRedacao',
        components: {IonPage, IonContent, IonLabel, IonList, Loading},
        mixins: [methodsGlobal],

        setup() {
            const loading = ref(false);
            const video = ref('');
            const termo = ref('');
            const imagem = ref('');
            const conteudo = ref('');
            const title = ref('');
            const user = ref({});
            const redacao = ref({});
            return {
                notifications,
                arrowForwardCircleOutline,
                lockClosed,
                closeCircleOutline,
                router: useRouter(),
                route: useRoute(),
                loading,
                redacao,
                user,
                video,
                termo,
                imagem,
                title,
                conteudo,
                modal: '',

                opcoes: [
                    {
                        tema: 4,
                        ttl: 'Redações',
                        inicio: '23/10/2021',
                        fim: '28/10/2021',
                        rota: 'ver-redacoes',
                        status: 'disponível',
                        icon: arrowForwardCircleOutline,
                    },
                    {
                        tema: 3,
                        ttl: 'Redações asd',
                        inicio: '23/10/2021',
                        fim: '28/10/2021',
                        rota: 'ver-redacoes',
                        status: 'disponível',
                        icon: arrowForwardCircleOutline,
                    },
                    {
                        tema: 2,
                        ttl: 'Redações ggg',
                        inicio: '23/10/2021',
                        fim: '28/10/2021',
                        rota: 'ver-redacoes',
                        status: 'encerrada',
                        icon: closeCircleOutline,
                    },
                    {
                        tema: 1,
                        ttl: 'Redaçõe ratts',
                        inicio: '23/10/2021',
                        fim: '28/10/2021',
                        rota: 'ver-redacoes',
                        status: 'bloqueada',
                        icon: lockClosed,
                    },
                ]
            }
        },

        methods: {
            async enviarRedacao() {
                const modal = await modalController.create({
                    component: Modal,
                    componentProps: {
                        title: this.title,
                        imagem: this.imagem,
                        conteudo: this.conteudo,
                        user: this.user,
                        fechar: () => this.modal.dismiss(),
                    },
                });
                this.modal = modal;
                return modal.present();
            },

            async baixarRas () {
                try{
                    if(this.redacao.arquivo){
                        if(window.cordova){
                            let fileTransfer = new window.FileTransfer();
                            let path = window.cordova.file.dataDirectory+''+this.redacao.id+'.pdf';
                            let uri = encodeURI(this.redacao.arquivo);
                            this.loading = true;

                            let entry = await this.promiseInstrucoes(fileTransfer, uri, path);
                            this.loading = false;
                            await this.promiseOpener(entry.nativeURL, 'application/pdf');

                        }
                        else {
                            await browser.open(this.redacao.arquivo);
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                    this.loading = false;
                }


            },

            async promiseOpener (uri, mime) {
                return new Promise((resolve, reject) => {
                    window.cordova.plugins.fileOpener2.open(uri, mime, (result) => {
                        resolve(result)
                    }, (error) => reject(error))
                })
            },

            async promiseInstrucoes (fileTransfer, uri, path) {
                return new Promise((resolve, reject) => {
                    fileTransfer.download(uri, path, (entry) => {
                        resolve(entry)
                    }, (error) => reject(error))
                })
            },

            async getChache() {
                let redacoes = await sqlite.consulta(this.sqlite, 'select * from redacao where id_user = ? and id = ?', [this.user.id, this.route.params.id]);
                this.redacao = this.inserirElementos(redacoes)[0];
                let objeto = await storage.get('redacao');
                objeto = JSON.parse(objeto.value);
                if (objeto) {
                    this.conteudo = objeto.conteudo;
                    this.title = objeto.title;
                    this.video = objeto.video;
                    this.imagem = objeto.imagem;
                }

            }

        },

        async created() {
            try {
                let usuario = await storage.get('user');
                usuario = JSON.parse(usuario.value);
                this.user = usuario;
                let status = await network.getStatus();
                if (!status.connected) {
                    await this.getChache();
                    return;
                }
                this.loading = true;
                let dados = await api.get('/redacoes-informacoes/'+this.route.params.id);
                this.video = dados.data.video_tutorial;
                this.imagem = dados.data.termo;
                this.title = dados.data.title;
                this.conteudo = dados.data.conteudo;
                let objeto = {
                    video: this.video,
                    imagem: this.imagem,
                    title: this.title,
                    conteudo: this.conteudo,
                };

                await storage.set('redacao', JSON.stringify(objeto));
                this.redacao = dados.data.redacao;
            } catch (e) {
                console.log(e);
            }

            this.loading = false;
        }
    }
</script>

<style scoped>
    ion-content {
        --background: var(--ion-color-primary);
    }

    ion-item {
        --background: var(--ion-color-primary);
    }

    .text-white {
        color: white;
    }

    ion-list {
        --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
        background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
    }
</style>
