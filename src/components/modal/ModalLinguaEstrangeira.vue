<template>
    <!-- modal para finalizar o simulado -->
    <ion-modal
            :is-open="finalizarOpen"
            css-class="modalFinalizar"
            @onDidDismiss="setFinalizarOpen(false)"
    >
        <ion-content id="finalizar-simulado-modal" class="ion-padding">
            <ion-fab vertical="top" horizontal="end">
                <ion-fab-button color="light" @click="fechar">
                    <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
                </ion-fab-button>
            </ion-fab>

            <ion-grid v-if="!lingua">
            <h3 class="mt-64 text-black">
                Termos de compromisso
            </h3>

            <p v-html="termo" class="text-black">

            </p>

<!--            <section class="ion-padding-horizontal">-->
<!--                <p class="text-white">Você deixou algumas questões em branco</p>-->
<!--                <ion-button-->
<!--                        v-for="(branco, index) in brancos"-->
<!--                        :key="`questao-${branco.id}`"-->
<!--                        @click="questoes(questoesId.indexOf(branco.id) + 1, false, true)"-->
<!--                        class="mr-8 mb-8 btn-questao-gabarito rounded-sm"-->
<!--                        :class="branco.resultado === 'Certo' ? 'border-2' : 'border-2 border-ruim'"-->
<!--                >-->
<!--                    <div class="flex flex-column ion-align-items-center ion-justify-content-center">-->
<!--                        <p class="mt-12 mb-0 text-black">-->
<!--                            {{ (Number(index) + 1) }}-->
<!--                        </p>-->

<!--                        <p class="mt-8 text-black block font-bold">-->
<!--                            <span v-if="branco.resposta">{{branco.resposta}}</span>-->
<!--                            <span v-if="!questao.resposta">_</span>-->
<!--                        </p>-->
<!--                    </div>-->

<!--                    <ion-icon-->
<!--                            :icon="bookmarksOutline"-->
<!--                            v-if="branco.salvar"-->
<!--                            color="warning"-->
<!--                            class="mt-1 absolute top-0 right&#45;&#45;16 font-bold"-->
<!--                            style="font-size: 16px;"-->
<!--                    />-->
<!--                </ion-button>-->
<!--            </section>-->

            <ion-button
                    @click="mudarLingua(true)"
                    expand="full"
                    class="text-primary text-none font-bold bg-white rounded"
            >
                Aceitar
            </ion-button>
            </ion-grid>

            <ion-grid v-if="lingua">
                <h3 class="mt-64 text-black">
                   Agora selecione a língua estrangeira
                </h3>
            <ion-item>
                <ion-label>Selecione o idioma</ion-label>
                <ion-select v-model="id_idioma">
                    <ion-select-option value="11">Espanhol</ion-select-option>
                    <ion-select-option value="10">Inglês</ion-select-option>
                </ion-select>
            </ion-item>
                <ion-button
                        @click="selecionandoLingua"
                        expand="full"
                        class="text-primary text-none font-bold bg-white rounded mt-16"
                >
                    Selecionar
                </ion-button>
            </ion-grid>
            <Loading :isOpen="loading"></Loading>
        </ion-content>
    </ion-modal>
</template>

<script>
    import {ref} from "vue";
    import Loading from "../../components/auxiliares/Loading";
    import {closeCircleOutline} from 'ionicons/icons';
    import {IonModal,IonContent, IonSelect,  IonButton, IonFab} from '@ionic/vue';
    import api from '../../api/basicUrl';
    import {useRouter} from 'vue-router';

    export default {
        name: "ModalLinguaEstrangeira",
        components: {Loading, IonModal, IonSelect, IonContent, IonButton, IonFab },
        setup () {
            const finalizarOpen = ref(false);
            const loading = ref(false);
            const termo = ref('');
            const setFinalizarOpen = (state) => {
                finalizarOpen.value = state;
            };
            const user = ref({});
            const simulado = ref({});
            const fechar = () => finalizarOpen.value = false;
            return {
                finalizarOpen,
                setFinalizarOpen,
                fechar,
                termo,
                closeCircleOutline,
                loading,
                simulado,
                user,
                router: useRouter()
            }
        },

        created() {
            this.emitter.on('opcoes', (objeto) => {
                this.setFinalizarOpen(objeto.state);
                this.termo = objeto.termo;
                this.user = objeto.user,
                this.simulado = objeto.simulado;
                this.id_idioma = null;
                this.lingua = false;
            });
        },

        data () {
            return {
                lingua: false,
                id_idioma: null,
            }
        },

        methods: {
          mudarLingua (state) {
              if (this.simulado.isIdioma !== false) {
                  this.lingua = state;
              }else{
                  this.selecionandoLingua();
              }

          },

            async selecionandoLingua () {
              try{
                  if (!this.id_idioma) {
                      alert('selecione o idioma');
                      return;
                  }
                  this.loading = true;
                  let objeto = {
                      id_user: this.user.id,
                      id_simulado: this.simulado.id,
                      id_idioma: this.id_idioma,
                  }
                  await api.post('/selecionar-idioma', objeto);
                  this.loading = false;
                  this.setFinalizarOpen(false);
                  this.router.push('/responder-simulado/'+this.simulado.id);
              }catch (e) {
                  this.loading = false;
                console.log(e);
              }
            }
        },
    }
</script>

<style scoped>

</style>
