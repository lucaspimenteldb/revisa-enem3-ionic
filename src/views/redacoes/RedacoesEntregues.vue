<template>
    <ion-page>
        <ion-content class="ion-padding-top">
            <!-- selecionar atividades -->
            <ion-item class="ion-margin-horizontal ion-margin-bottom white rounded">
                <ion-label>
                    Selecionar redação...
                </ion-label>

                <ion-select @IonChange="pesquisarRedacao">
                    <ion-select-option :value="'todas'">Todas</ion-select-option>
                    <ion-select-option :value="atividade.id" v-for="atividade in atividadesAuxiliar"
                                       :key="atividade.id">{{atividade.titulo}}
                    </ion-select-option>
                </ion-select>
            </ion-item>

            <!-- lista de atividades-->
            <ion-list class="ion-padding rounded-top h-full">
                <ion-label class="font-bold text-xl" color="primary">
                    Redações Entregues
                </ion-label>

                <ion-item
                        class="ion-margin-top rounded"
                        v-for="atividade in atividades"
                        :key="atividade.id"
                        @click="irAvaliacao(atividade)"
                        lines="none"
                >
                    <div class="ion-padding-vertical flex flex-1 ion-justify-content-between ion-align-items-center">
                        <ion-label class="text-white text-lg font-bold">
                            <p class="text-white font-regular">
                            </p>

                            {{ atividade.titulo }}
                        </ion-label>

                        <div
                                class="flex ion-align-items-center ion-justify-content-center w-60 h-60 bg-white border-3 rounded-full"
                                :class="`border-${atividade.desempenho}`"
                                v-if="atividade.resultado !== null"
                        >
                            <ion-text class="font-bold text-lg" color="primary">
                                {{atividade.resultado}}
                            </ion-text>
                        </div>
                    </div>

                    <ion-icon
                            slot="end"
                            :icon="alarmOutline"
                            color="warning"
                            size="large"
                            class="mr-8"
                            v-if="atividade.resultado === null"
                    />

                </ion-item>
            </ion-list>
            <Loading :isOpen="loading"></Loading>
        </ion-content>
    </ion-page>
</template>

<script>
    import {
        IonPage,
        IonContent,
        IonItem,
        IonLabel,
        IonList,
        IonIcon,
        IonSelect,
        IonSelectOption,
        IonText
    } from '@ionic/vue';
    import {
        notifications,
        arrowForwardCircleOutline,
        appsOutline,
        checkmarkDoneOutline,
        alarmOutline
    } from 'ionicons/icons';
    import {useRouter} from 'vue-router'
    import Loading from "../../components/auxiliares/Loading";
    import {ref} from 'vue';
    import storage from "../../storage/StorageKey";
    import api from "../../api/basicUrl";
    import sqlite from "../../storage/Sqlite";
    import methodsGlobal from "../../mixins/methodsGlobal";
    import network from "../../plugins/network";

    export default {
        name: 'RedaçõesEntregues',
        components: {
            Loading,
            IonPage,
            IonContent,
            IonItem,
            IonLabel,
            IonList,
            IonIcon,
            IonSelect,
            IonSelectOption,
            IonText
        },
        mixins: [methodsGlobal],

        setup() {
            const loading = ref(false);
            const user = ref({});
            const atividades = ref([]);
            const atividadesAuxiliar = ref([]);
            return {
                router: useRouter(),
                notifications,
                arrowForwardCircleOutline,
                appsOutline,
                checkmarkDoneOutline,
                alarmOutline,
                loading,
                user,
                atividades,
                atividadesAuxiliar,

            }
        },

        methods: {
            irAvaliacao(redacao) {
                if (redacao.resultado) {
                    this.router.push({path: 'ver-correcao-redacao', query: {redacao: JSON.stringify(redacao)}});
                }
            },

            async pesquisarRedacao(event) {
                let redacao = (event.currentTarget.value);
                if (redacao == 'todas') {
                    this.atividades = this.atividadesAuxiliar;
                } else {
                    console.log(this.atividades);
                    this.atividades = this.atividadesAuxiliar.filter((el) => el.id == redacao);
                }
            },

            async getChache() {
                let redacoes = await sqlite.consulta(this.sqlite, 'select * from user_redacao where id_user = ?', [this.user.id]);
                this.atividades = this.inserirElementos(redacoes);
            },

            apenasCampo(objeto, campo) {
                let array = [];
                for (let i = 0; i < objeto.length; i++) {
                    for (let j of objeto[i][campo]) {
                        array.push(j);
                    }
                }

                return array;
            },

            copiaCampo(objeto) {
                let array = [];

                for (let i = 0; i < objeto.length; i++) {
                    array.push(objeto[i]);
                }
                return array;
            },

            removerCampo(objeto, campo) {
                let array = [];
                for (let i = 0; i < objeto.length; i++) {
                    objeto[i][campo] = undefined;
                }

                return array;
            },


        },

        async ionViewWillEnter() {
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

                let dados = await api.get('/redacoes-entregues/' + this.user.id);
                this.atividades = Array.from(dados.data.redacoes);
                this.atividadesAuxiliar = Array.from(dados.data.redacoes);
                let copia = Array.from(this.atividades);
                let competencias = this.apenasCampo(copia, 'competencias');
                copia = this.removerCampo(copia, 'competencias');
                await sqlite.insertBatch(this.sqlite, copia, 'user_redacao', ['id_user_redacao']);
                await sqlite.insertBatch(this.sqlite, competencias, 'competencia', ['id_user_redacao']);

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
        --background: url('../../../public/assets/images/redacao-secundario.png') var(--ion-color-primary) no-repeat center/100%;
    }

    ion-item.white {
        --background: white;
    }

    .text-white {
        color: white;
    }

    ion-list {
        --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
        background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
    }
</style>
