<template>
    <ion-page>
        <ion-content :fullscreen="true" class="ion-padding-vertical">
            <ion-list class="ion-padding">
                <ion-label class="font-bold text-xl">
                    Redações
                </ion-label>

                <ion-item
                        class="ion-margin-top lista__professores rounded"
                        v-for="opcao in opcoes"
                        :key="opcao.ttl+ 'acessar'"
                        @click="irRedacao(opcao.bloqueada, opcao.encerrada, opcao.id)"
                        lines="none"
                        :disabled="opcao.bloqueada ? true : false"
                >
                    <ion-label class="text-white font-bold">
                        <ion-text class="text-white">
                            <p>
                                <!--                Tema {{ 'Tema 1' }}-->
                            </p>
                        </ion-text>

                        <ion-text class="text-lg font-bold text-white">
                            {{ opcao.titulo }}
                        </ion-text>

                        <div class="mt-8">
                            <ion-text class="ion-margin-top text-white text-sm font-regular">
                                <p class="ion-margin-top">
                                    Início: {{ opcao.data_inicio }}
                                </p>

                                <p>
                                    Prazo: <span class="text-red font-bold">{{ opcao.data_fim }}</span>
                                </p>
                            </ion-text>
                        </div>
                    </ion-label>

                    <ion-icon
                            slot="end"
                            :icon="opcao.icon"
                            :color="opcao.encerrada ? 'danger' : 'light'"
                            class="mr-8"
                            style="font-size: 40px;"
                    />
                    <ion-text class="absolute right-14 bottom-20 text-sm"
                              :class="opcao.encerrada ? 'text-red' : 'text-white'">
                        {{ opcao.status }}
                    </ion-text>
                </ion-item>
            </ion-list>
            <Loading :isOpen="loading"></Loading>
        </ion-content>
    </ion-page>
</template>

<script>
    import {IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon, IonText} from '@ionic/vue';
    import {notifications, arrowForwardCircleOutline, lockClosed, closeCircleOutline} from 'ionicons/icons';
    import Loading from "../../components/auxiliares/Loading";
    import {useRouter} from 'vue-router'
    import {ref} from "vue";
    import api from "../../api/basicUrl";
    import storage from "../../storage/StorageKey";
    import sqlite from "../../storage/Sqlite";
    import methodsGlobal from "../../mixins/methodsGlobal";
    import network from "../../plugins/network";

    export default {
        name: 'RedacoesInicio',
        components: {IonPage, Loading, IonContent, IonItem, IonLabel, IonList, IonIcon, IonText},
        mixins: [methodsGlobal],

        setup() {
            const loading = ref(false);
            const opcoes = ref([]);
            const user = ref({});
            return {
                notifications,
                arrowForwardCircleOutline,
                lockClosed,
                closeCircleOutline,
                router: useRouter(),
                loading,
                user,
                opcoes,
            }
        },

        methods: {
            irRedacao(bloqueada, encerrada, id) {
                console.log('e', encerrada);
                if (!encerrada && !bloqueada) {
                    this.router.push('/ver-rascunho-enviar-redacao/' + id);
                }
            },

            async getChache() {
                let redacoes = await sqlite.consulta(this.sqlite, 'select * from redacao where id_user = ?', [this.user.id]);
                this.opcoes = this.inserirElementos(redacoes);
            }
        },


        async ionViewWillEnter() {
            try {
                let usuario = await storage.get('user');
                usuario = JSON.parse(usuario.value);
                this.user = usuario;
                let status = await network.getStatus();
                if (!status.connected){
                    await this.getChache();
                    return;
                }
                this.loading = true;
                let dados = await api.get("/redacoes/"+this.user.id);
                this.opcoes = dados.data.redacoes;
                await sqlite.insertBatch(this.sqlite, this.opcoes, 'redacao', ['id_user', 'id']);
            } catch (e) {
                alert("Não foi possível carregar as redações. Por favor verifique a conexão e tente novamente.");
                await this.getChache();
            }
            this.loading = false;
        }

    }
</script>

<style scoped>
    ion-content {
        --background: url('../../../public/assets/images/bg-principal.png') center/100%;
        background: url('../../../public/assets/images/bg-principal.png') center/100%;
    }

    ion-item {
        --background: url('../../../public/assets/images/redacao-secundario.png') var(--ion-color-primary) no-repeat center/100%;
    }

    .text-white {
        color: white;
    }

    ion-list {
        --background: transparent;
        background: transparent;
    }
</style>
