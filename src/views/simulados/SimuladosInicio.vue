<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
         Simulados Estaduais
        </h4>
      </div>

      <ion-list class="ion-padding rounded-top">
        <ion-label>
					<p class="font-bold text-lg text-black">
						Simulados disponíveis
					</p>
        </ion-label>

        <!--    card do simulado    -->
        <div
            class="mb-64 relative"
            v-for="simulado in simulados"
            :key="simulado.id"
        >
          <ion-item
              class="ion-margin-top rounded"
              lines="none"
          >
            <div class="flex flex-column text-black">
              <ion-text color="primary">
                <h3 class="font-bold text-lg">
                  {{simulado.titulo}}
                </h3>
              </ion-text>

              <article class="mt-8">
                <ion-text>
                  <p class="ion-no-margin">
                    Disponível entre:
                    <ion-text color="verde" class="font-bold">{{simulado.inicio}}</ion-text> e
                    <ion-text color="vermelho" class="font-bold">{{ simulado.fim }}</ion-text>
                  </p>

                  <p class="mb-0 mt-8" v-if="simulado.tempo">
                    Você ainda tem: <ion-text color="primary" class="font-bold">{{ simulado.tempo}} minutos restantes</ion-text>
                  </p>
                </ion-text>
              </article>

              <ion-button
                  fill="outline"
                  color="primary"
                  class="ion-no-margin ion-margin-vertical text-none font-bold iniciar-simulado"
                  size="small"
                  :disabled="!simulado.botao"
                  @click="() => router.push( '/ver-simulado/'+simulado.id)"

              >
                Iniciar simulado
              </ion-button>
            </div>
          </ion-item>

          <div class="absolute fundo-tudo rounded" :class="simulado.liberado">
            <p class="ion-margin-end ion-text-center text-white">
              {{simulado.message}}
            </p>
          </div>
        </div>

        <!-- <ion-label >
          <p class="ion-padding-top font-bold text-lg text-black">
            Ver meu desempenho nos simulados
          </p>
        </ion-label>
        <ion-button
            fill="solid"
            color="primary"
            class="ion-no-margin ion-margin-vertical text-none font-bold text-md"
            size="small"
            @click="() => router.push( '/desempenho-simulados-estaduais')"

        >
          Ver meu desempenho
        </ion-button> -->
      </ion-list>
      <Loading :isOpen="loading"></Loading>
      <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
    </ion-content>
  </ion-page>
</template>

<script>
// import {IonPage,IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText} from '@ionic/vue';
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonButton,  IonText, IonIcon} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
import api from '../../api/basicUrl';
import { ref } from 'vue';
import storage from '../../storage/StorageKey';
import alerts from '../../mixins/Alerts';
import AlertGeneric from "../../components/auxiliares/AlertGeneric";

export default {
  name: 'Simulados',
  mixins: [alerts],
  // components: {IonPage, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading},
  components: {IonPage, IonContent, IonItem, IonLabel, IonList, IonButton, IonText, IonIcon, Loading, AlertGeneric},

  setup () {
    const loading = ref(false);

    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),
      route: useRoute(),
      loading,
    }
  },

  data () {
    return {
      simulados: [
        // {
        //   inicio: '22/05/2020',
        //   fim: '30/05/2020',
        //   tempo: 120,
        //   status: 'liberado',
        //   classStatus: 'bg-verde',
        //   id: 233,
        // },
        // {
        //   inicio: '22/05/2020',
        //   fim: '30/05/2020',
        //   tempo: 120,
        //   status: 'aguardando',
        //   classStatus: 'bg-primary',
        //   id: 235,
        // },
        // {
        //   inicio: '22/05/2020',
        //   fim: '30/05/2020',
        //   tempo: 120,
        //   status: 'expirado',
        //   classStatus: 'bg-vermelho',
        //   id: 2312,
        // },
      ],
      user: {}
    }
  },

  methods :{

  },

  async ionViewWillEnter () {
    try {
      this.loading = false;
      this.loading = true;
      let usuario = await storage.get('user');
      usuario = JSON.parse(usuario.value);
      this.user = usuario;
      let dados = await api.get('/simulado-estaduais-master');
      this.simulados = dados.data.simulados;
      this.loading = false;
    }catch (e) {
      this.loading = false;
      this.alertErro(e);
    }
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
ion-item {
  --background: white;
}
.fundo-cima {
  background: url('../../../public/assets/images/simulado-estadual-fundo.png') var(--ion-color-primary) no-repeat center/100%;
}
.text-black {
  color: black;
}
.text-white {
  color: white;
}
ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') center;
  background: url('../../../public/assets/images/bg-principal.png') center;
}
.iniciar-simulado {
  width: 160px;
  font-size: 1rem;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.fundo-tudo {
  padding-top: 12px;
  height: 58px;
  width: 100%;
  bottom: -40px;
  left: 0;
}
.bg-verde{
  background: #0c9041;
}

.bg-danger {
  background: #E04A2D;
}

.bg-block {
  background: #FCB812;
}

h2.font-bold {
  font-weight: 600;
}
.text-md {
  font-size: 1rem;
}
</style>
