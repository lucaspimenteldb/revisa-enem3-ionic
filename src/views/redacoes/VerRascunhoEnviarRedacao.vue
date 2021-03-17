<template>
    <ion-page>
        <ion-content>
            <ion-list class="h-full">
                <ion-label class="ion-padding font-bold text-lg">
                    Tema da redação
                </ion-label>
                <br>

                <section class="ion-padding">
                    <ion-button class="ion-no-margin mt-8 mr-8 text-none" fill="outline">
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

    export default {
        name: 'VerRascunhoEnviarRedacao',
        components: {IonPage, IonContent, IonLabel, IonList, Loading},

        setup() {
            const loading = ref(false);
            const video = ref('');
            const termo = ref('');
            const imagem = ref('');
            const conteudo = ref('');
            const title = ref('');
            return {
                notifications,
                arrowForwardCircleOutline,
                lockClosed,
                closeCircleOutline,
                router: useRouter(),
                route: useRoute(),
                loading,
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
                        fechar: () => this.modal.dismiss(),
                    },
                });
                this.modal = modal;
                return modal.present();
            }
        },

        async created() {
            try {
                this.loading = true;
                let dados = await api.get('/redacoes-informacoes');
                this.video = dados.data.video_tutorial;
                this.imagem = dados.data.termo;
                this.title = dados.data.title;
                this.conteudo = dados.data.conteudo;
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
