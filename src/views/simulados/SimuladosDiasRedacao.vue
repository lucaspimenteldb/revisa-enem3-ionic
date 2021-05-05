<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
         Simulado Estadual
        </h4>
      </div>

      <ion-list class="ion-padding rounded-top">
        <!--    card do simulado do 1 dia    -->
        <div
            class="mb-48 relative"
            v-for="simulado in simulados"
            :key="'simulado-dia-'+simulado.dia"
        >
          <ion-text color="primary">
            <h3 class="mb-4 font-bold text-lg">
              {{simulado.dia}}º Dia de Simulado
            </h3>
          </ion-text>

          <p class="mt-0 text-black">
            No card abaixo você poderá acessar o Simulado do <b>{{ simulado.dia }}º dia</b>. Você terá 4 horas para terminá-lo após o inicio do simulado.
          </p>

          <ion-item
              class="ion-margin-top rounded"
              lines="none"
          >
            <div class="flex flex-column text-black">
              <ion-text color="primary">
                <h3 class="mb-4 font-bold text-lg">
                  Simulado estadual
                </h3>
              </ion-text>

              <article class="mt-8">
                <ion-text>
                  <p class="ion-no-margin">
                    Disponível entre:
                    <ion-text color="verde" class="font-bold">{{ simulado.inicio }}</ion-text> e
                    <ion-text color="vermelho" class="font-bold">{{ simulado.fim }}</ion-text>
                  </p>

                  <p class="mb-0 mt-8">
                    Você ainda tem: <ion-text color="primary" class="font-bold">{{ simulado.tempo }} minutos restantes</ion-text>
                  </p>

                  <p class="mb-0 mt-8">
                    Áreas do simulado:
                    <ion-text color="primary">{{ simulado.areas }}</ion-text>
                  </p>
                </ion-text>
              </article>

              <ion-button
                  fill="outline"
                  color="primary"
                  class="ion-no-margin ion-margin-vertical text-none font-bold"
                  size="small"
                  @click="() => router.push( '/responder-simulado')"
              >
                Iniciar simulado
              </ion-button>
            </div>
          </ion-item>
        </div>

        <!--    card da redaçãozona    -->
        <div class="mb-48 relative">
          <ion-text color="primary">
            <h3 class="mb-4 font-bold text-lg">
              Redação
            </h3>
          </ion-text>

          <p class="mt-0 text-black">
            Você terá da data inicio até a data fim do simulado para fazer e enviar a sua redação tenha calma na hora de realizar que tudo vai da certo!
          </p>

          <ion-item
              class="ion-margin-top rounded"
              lines="none"
          >
            <div class="flex flex-column text-black">
              <ion-text color="primary">
                <h3 class="mb-4 font-bold text-lg">
                  Redação estadual
                </h3>
              </ion-text>

              <article class="mt-8">
                <ion-text>
                  <p class="ion-no-margin">
                    Disponível entre:
                    <ion-text color="verde" class="font-bold">{{ simulados[0].inicio }}</ion-text> e
                    <ion-text color="vermelho" class="font-bold">{{ simulados[1].fim }}</ion-text>
                  </p>

                  <p class="mb-0 mt-8">
                    Você ainda tem: <ion-text color="primary" class="font-bold">{{ redacao.tempo }}</ion-text>
                  </p>

                  <p class="mb-0 mt-8">
                    Tema da redação:
                    <ion-text color="primary">{{ redacao.tema}}</ion-text>
                  </p>
                </ion-text>
              </article>

              <ion-button
                  fill="outline"
                  color="primary"
                  class="ion-no-margin ion-margin-vertical text-none font-bold"
                  size="small"
                  @click="() => router.push('/responder-redacao')"
              >
                Iniciar redação
              </ion-button>
            </div>
          </ion-item>
        </div>
      </ion-list>
      <Loading :isOpen="loading"></Loading>
    </ion-content>
  </ion-page>
</template>

<script>
// import {IonPage,IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText} from '@ionic/vue';
import {IonPage,IonContent, IonItem, IonList,  IonButton, IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
// import api from '../../api/basicUrl';
import { ref } from 'vue';
// import storage from '../../storage/StorageKey';

export default {
  name: 'Simulados',
  // components: {IonPage, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading},
  components: {IonPage, IonContent, IonItem, IonList, IonButton, IonText, Loading},

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
        {
          dia: 1,
          inicio: '22/05/2020',
          fim: '30/05/2020',
          tempo: 120,
          areas: 'Linguagens e Humanas',
          id: 235,
        },
        {
          dia: 2,
          inicio: '22/05/2020',
          fim: '30/05/2020',
          tempo: 120,
          areas: 'Exatas e Natureza',
          id: 235,
        },
      ],
      redacao: {
        tempo: '4 dias',
        tema: 'O desafio de reduzir as desigualdades entre as regiões do Brasil',
      }
    }
  },

  methods :{

  },
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
  background: url('../../../public/assets/images/simulado-estadual-fundo.png') var(--ion-color-primary) no-repeat right center/50%;
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
.text-sm {
  font-size: .8rem;
}
.text-lg {
  font-size: 1.15rem;
}
.font-bold {
  font-weight: 600;
}

</style>
