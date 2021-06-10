<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
          Desempenho Simulados Estaduais
        </h4>
      </div>

      <ion-list class="ion-padding rounded-top">
        <ion-label class="font-bold text-lg">
          Simulados corrigidos
        </ion-label>

        <!--    card do simulado    -->
        <div
            class="mt-16 mb-64 relative"
            v-for="simulado in simulados"
            :key="simulado.id"
        >
          <ion-item class="rounded shadow" lines="none">
            <div class="flex flex-column text-black">
              <ion-text color="primary">
                <h3 class="font-bold text-lg">
                  {{simulado.ttl}}
                </h3>
              </ion-text>
              <ion-text color="">
                <p class="ion-no-margin">
                  {{simulado.subTtl}}
                </p>
              </ion-text>

              <article class="mt-8">
                <ion-text>
                  <p class="ion-no-margin">
                    <ion-icon
                        :icon="calendarOutline"
                        color="primary"
                        class="relative top-2"
                    />
                    Realizado:
                    <ion-text color="primary" class="font-medium">{{simulado.inicio}}</ion-text> e
                    <ion-text color="vermelho" class="font-medium">{{ simulado.fim }}</ion-text>
                  </p>
                </ion-text>
              </article>
              <article class="ion-margin-top">
                <ion-text>
                  <p class="ion-no-margin">
                    <ion-icon
                        :icon="gridOutline"
                        color="success"
                        class="relative top-2"
                    />
                    1º dia:
                    <ion-text color="success" class="font-bold">Linguagens, Humanas e Redação</ion-text>
                  </p>
                </ion-text>
              </article>
              <article class="mt-8">
                <ion-text>
                  <p class="ion-no-margin">
                    <ion-icon
                        :icon="gridOutline"
                        color="tertiary"
                        class="relative top-2"
                    />
                    2º dia:
                    <ion-text color="tertiary" class="font-bold">Matemática e Natureza</ion-text>
                  </p>
                </ion-text>
              </article>

              <ion-button
                  fill="solid"
                  color="primary"
                  class="ion-no-margin ion-margin-vertical text-none font-bold iniciar-simulado"
                  size="small"
                  @click="() => router.push( '/ver-meu-desempenho-geral')"

              >
                Ver desempenho
              </ion-button>
            </div>
          </ion-item>
        </div>
      </ion-list>
      <Loading :isOpen="loading"></Loading>
      <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
    </ion-content>
  </ion-page>
</template>

<script>
// import {IonPage,IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText} from '@ionic/vue';
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonButton,  IonText, IonIcon} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, calendarOutline, gridOutline} from 'ionicons/icons';
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
      calendarOutline,
      gridOutline,
      router: useRouter(),
      route: useRoute(),
      loading,
    }
  },

  data () {
    return {
      simulados: [
        {
          ttl: '1º Simulado Digital Estadual',
          subTtl: 'Simulado Adaptativo disponibilizado pelo progama #Agoravai para os alunos do 3º ano!',
          inicio: '22/05/2020',
          fim: '30/05/2020',
          id: 233,
        },
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
      // this.simulados = dados.data.simulados;
      this.loading = false;
    }catch (e) {
      this.loading = false;
      this.alertErro(e);
    }
  }
}
</script>

<style scoped>
.icon-inner {
  margin-top: 4px;
}
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
