<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
          Desempenho Simulados Estaduais
        </h4>
        <p class="text-white">
          Simula XYZ
        </p>
      </div>

      <ion-list class="ion-padding rounded-top">
        <!--  card do meu desempenho -->
        <div class="mt-16 mb-16 relative">
          <ion-item class="rounded shadow" lines="none">
            <div class="flex flex-column text-black w-100">
              <ion-text color="azul">
                <h3 class="font-bold text-lg">
                  Desempenho Geral
                </h3>
              </ion-text>

              <!--notas, acertos e grafico-->
              <section class="flex w-100 ion-justify-content-between">
                <div>
                  <article class="mt-8">
                    <ion-text color="azul">
                      <ion-icon
                          :icon="calendarOutline"
                          color="primary"
                          class="relative top-2"
                      />
                      Minha nota: <span class="font-bold">200,8</span>
                    </ion-text>
                  </article>
                  <article class="mt-8 mb-8">
                    <ion-text>
                      <ion-icon
                          :icon="gridOutline"
                          color="success"
                          class="relative top-2"
                      />
                      Acertos totais: <span class="font-bold">100</span>
                    </ion-text>
                  </article>
                </div>

                <p class="mb-0 text-xl font-bold">
                  50%
                </p>
              </section>
            </div>
          </ion-item>
        </div>

        <!-- media para comparar com a turma -->
        <div class="mt-16 mb-16 inline-block w-1/2 relative">
          <ion-item class="mr-8 rounded shadow" lines="none">
            <div class="flex flex-column text-black w-100">
              <ion-text color="azul">
                <h3 class="font-bold text-lg">
                  Média da turma
                </h3>
              </ion-text>

              <p class="text-lg font-bold">
                50%
              </p>
            </div>
          </ion-item>
        </div>
        <div class="mt-16 mb-16 inline-block w-1/2 relative">
          <ion-item class="ml-8 rounded shadow" lines="none">
            <div class="flex flex-column text-black w-100">
              <ion-text color="azul">
                <h3 class="font-bold text-lg">
                  Média da Escola
                </h3>
              </ion-text>

              <p class="text-lg font-bold">
                50%
              </p>
            </div>
          </ion-item>
        </div>

        <div class="mt-32"></div>
        <ion-label class="mt-16">
          <p class="text-lg font-bold text-black">
            Desempenho detalhado por área
          </p>
        </ion-label>
        <p class="mt-0 font-regular">
          Clique na área desejada para ter acesso ao seu desempenho detalhado da área
        </p>

        <div
            class="mt-16 mb-16 inline-block w-1/2 relative"
            v-for="(area, i) in areas"
            :key="area.area"
        >
          <ion-item
              class="rounded shadow"
              :class="i % 2 ? 'ml-8' : 'mr-8'"
              lines="none"
              :color="area.cor"
          >
            <div class="flex flex-column w-100">
              <ion-text>
                <h3 class="font-bold text-lg">
                  {{ area.area }}
                </h3>
              </ion-text>

              <p class="mt-0 flex w-100 ion-align-items-center ion-justify-content-between text-xl font-bold">
                {{ area.nota }}

                <ion-icon
                    :icon="arrowForwardCircleOutline"
                    style="font-size: 2rem"
                />
              </p>
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
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonButton,  IonText, IonIcon, IonSpinner} from '@ionic/vue';
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
      areas: [
        {
          area: 'Linguagens',
          cor: 'linguagens',
          nota: 199.8,
          rota: 'ver-desempenho-area'
        },
        {
          area: 'Humanas',
          cor: 'humanas',
          nota: 199.8,
          rota: 'ver-desempenho-area'
        },
        {
          area: 'Matemática',
          cor: 'matematica',
          nota: 199.8,
          rota: 'ver-desempenho-area'
        },
        {
          area: 'Natureza',
          cor: 'natureza',
          nota: 199.8,
          rota: 'ver-desempenho-area'
        },
        {
          area: 'Redação',
          cor: 'tertiary',
          nota: 800,
          rota: 'ver-desempenho-redacao'
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
