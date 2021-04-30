<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
         Simulado Estadual
        </h4>
      </div>

      <ion-list class="ion-padding rounded-top">
        <ion-label class="font-bold text-lg">
          Simulados disponíveis
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
                  class="ion-no-margin ion-margin-vertical text-none font-bold"
                  size="small"
                  :disabled="simulado.liberado !== 1"
                  @click="() => router.push( '/responder-simulado')"
              >
                Iniciar simulado
              </ion-button>
            </div>
          </ion-item>

          <div class="absolute fundo-tudo rounded" :class="simulado.liberado === 4 ? 'bg-verde': simulado.liberado === 2 ? 'bg-block' : simulado.liberado === 1 ? 'bg-primary' : 'bg-danger'">
            <p class="ion-margin-end ion-text-center text-white">
              {{simulado.liberado === 4 ? 'Simulado entregue' : simulado.liberado === 2 ? 'Simulado bloqueado' : simulado.liberado === 1 ? 'Simulado liberado' : 'Simulado Expirado'}}
            </p>
          </div>
        </div>
      </ion-list>
      <Loading :isOpen="loading"></Loading>
    </ion-content>
  </ion-page>
</template>

<script>
// import {IonPage,IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText} from '@ionic/vue';
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonButton,  IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
import api from '../../api/basicUrl';
import { ref } from 'vue';
import storage from '../../storage/StorageKey';

export default {
  name: 'Simulados',
  // components: {IonPage, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading},
  components: {IonPage, IonContent, IonItem, IonLabel, IonList, IonButton, IonText, Loading},

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
      let dados = await api.get('/simulado-estaduais/'+this.user.id);
      this.simulados = dados.data.simulados;
      console.log('simulado', dados.data);
      this.loading = false;
    }catch (e) {
      this.loading = false;
      console.log(e);
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
ion-button {
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
</style>
