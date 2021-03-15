<template>
    <ion-page>

        <ion-content >
            <!-- selecionar videoaula -->
            <ion-item class="ion-margin ion-margin-bottom white rounded select">
                <ion-label>
                    Selecionar videoaula...
                </ion-label>

                <ion-select @IonChange="pesquisarAula">
                  <ion-select-option :value="'todas'">Todas</ion-select-option>
                  <ion-select-option :value="aula.id" v-for="aula in aulasAuxiliar" :key="aula.id">{{aula.descricao}}</ion-select-option>
                </ion-select>
            </ion-item>

            <ion-list class="ion-padding rounded-top">
                <ion-label class="font-bold text-lg">
                    {{nome}}
                </ion-label>

                <ion-item
                        class="ion-margin-top lista__professores rounded"
                        v-for="aula in aulas"
                        :key="aula.titulo+ 'acessar'"
                        @click="() => router.push({path: '/tabs/ver-videoaula/'+aula.id})"
                        lines="none"
                >
                    <ion-label class="ion-padding-vertical text-white">
                        <p class="text-white">
                            Aula {{ aula.titulo }}
                        </p>
                        <p class="font-bold text-white text-xl">
                            {{ aula.descricao }}
                        </p>

                        <article class="mt-8">
                            <ion-text>
                                <p class="text-sm">
                                    {{aula.msg}} <span class="ion-float-right">{{aula.msgQuest}}</span>
                                </p>
                            </ion-text>

                            <ion-progress-bar
                                    :value="aula.progresso"
                                    :color="'matematica'"
                                    :buffer="aula.progresso"
                            />
                        </article>
                    </ion-label>

                    <ion-icon
                            slot="end"
                            :icon="arrowForwardCircleOutline"
                            color="light"
                            size="large"
                            class=""
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
        IonProgressBar,
        IonText
    } from '@ionic/vue';
    import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
    import {useRouter, useRoute} from 'vue-router'
    import Loading from "../../components/auxiliares/Loading";
    import api from '../../api/basicUrl';
    import storage from '../../storage/StorageKey';

    import {ref} from 'vue';

    export default {
        name: 'VideoaulasAssuntos',
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
            IonProgressBar,
            IonText
        },

        setup() {
            const loading = ref(false);
            const nome = ref('');
            const aulas = ref([]);
            const aulasAuxiliar = ref([]);
            const user = ref({});
            return {
                notifications,
                arrowForwardCircleOutline,
                router: useRouter(),
                route: useRoute(),
                loading,
                nome,
                aulas,
                aulasAuxiliar,
                user,
            }
        },

      methods :{
        async pesquisarAula (event) {
          let aula = (event.currentTarget.value);
          if (aula == 'todas') {
            this.aulas = this.aulasAuxiliar;
          } else {
            this.aulas = this.aulasAuxiliar.filter((el) => el.id == aula);
          }
        }
        },

        async ionViewWillEnter() {
            try {
                let usuario = await storage.get('user');
                usuario = JSON.parse(usuario.value);
                this.user = usuario;
                this.loading = true;
                let materia = this.route.params.id;
                let volume = this.route.params.volume;
                this.nome = 'Volume ' + volume + ' - ' + this.route.query.disciplina;
                let dados = await api.get("/videos/" + materia + '/' + volume+ '/'+this.user.id);
                this.aulas = (dados.data.videos);
                this.aulasAuxiliar = (dados.data.videos);
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
        --background: url('../../../public/assets/images/videoaula-secundario.png') var(--ion-color-primary) no-repeat center/100%;
    }

    ion-item.select {
        --background: white;
    }

    .text-white {
        color: white;
    }

    ion-list {
        --background: url('../../../public/assets/images/bg-principal.png') center;
        background: url('../../../public/assets/images/bg-principal.png') center;
    }

    h2.font-bold {
        font-weight: 600;
    }
</style>
