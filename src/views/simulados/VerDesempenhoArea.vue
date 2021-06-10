<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
          Desempenho Simulados Estaduais
        </h4>
        <p class="text-white">
          Simula XYZzA
        </p>
      </div>

      <ion-list class="ion-padding rounded-top">
        <ion-text color="azul">
          <h3 class="font-bold text-lg">
            Revisão do Gabarito - Linguagens
          </h3>
        </ion-text>
        <p class="mt-0 font-regular">
          Clique na questão desejada para vê-la com a sua resolução
        </p>

        <ion-button
            fill="solid"
            color="primary"
            class="text-none font-bold"
        >
          Todas
        </ion-button>

        <section class="flex">
          <ion-button
              fill="outline"
              color="primary"
              class="text-none font-bold"
          >
            Corretas
          </ion-button>
          <ion-button
              fill="outline"
              color="primary"
              class="text-none font-bold"
          >
            Erradas
          </ion-button>
          <ion-button
              fill="outline"
              color="primary"
              class="text-none font-bold"
          >
            Em branco
          </ion-button>
        </section>

        <!-- questoes do gabarito -->
        <section class="mt-16 d-flex">
          <ion-button
              fill="solid"
              color="light"
              class="ion-no-padding text-none font-bold border-muito-ruim border-2 rounded-sm btn-gabarito"
          >
            1
            <ion-icon
                :icon="closeCircleOutline"
                style="font-size: 22px"
                color="danger"
            />
          </ion-button>
          <ion-button
              fill="solid"
              color="light"
              class="ion-no-padding text-none font-bold border-excelente border-2 rounded-sm btn-gabarito"
          >
            2
            <ion-icon
                :icon="checkmarkCircleOutline"
                style="font-size: 22px"
                color="success"
            />
          </ion-button>
          <ion-button
              fill="solid"
              color="light"
              class="ion-no-padding text-none font-bold border-2 rounded-sm btn-gabarito"
          >
            3
            <ion-icon
                :icon="ellipseOutline"
                style="font-size: 22px"
                color="dark"
            />
          </ion-button>
        </section>
      </ion-list>

      <!-- questaozona -->
      <section>
        <ion-text color="azul">
          <h3 class="font-bold text-lg">
            Questão 1 - Linguagens
          </h3>
        </ion-text>

        <h4 class="font-bold text-lg">
          Inglês - Interpretação de texto
        </h4>
        <p class="mt-0 font-regular">
          A banda The killers é conhecida mundialmente por ter suas músicas sempre nas paradas de sucesso. Sobre a música Mr. Brightside, é ressaltado:
        </p>
      </section>
      <Loading :isOpen="loading"></Loading>
      <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
    </ion-content>
  </ion-page>
</template>

<script>
// import {IonPage,IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText} from '@ionic/vue';
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonButton,  IonText, IonIcon} from '@ionic/vue';
import {ellipseOutline, checkmarkCircleOutline, arrowForwardCircleOutline, closeCircleOutline, gridOutline} from 'ionicons/icons';
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
      checkmarkCircleOutline,
      closeCircleOutline,
      arrowForwardCircleOutline,
      ellipseOutline,
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
.btn-gabarito {
  width: 48px;
  --width: 48px;
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
