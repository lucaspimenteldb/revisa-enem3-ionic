<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Ver Simulados Entregues
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="bg__principal">
      <ion-item class="ttl" lines="none">
        <ion-label class="font-bold">
          <h2>
            Atividades Escolares
          </h2>

          <ion-text class="ion-no-margin">
            <p>
              Prof. Andersoinsd mournm - Literatura
            </p>
          </ion-text>
        </ion-label>
      </ion-item>

      <!-- descrição da atividade -->
      <ion-item class="ion-margin ion-margin-bottom white rounded shadow" lines="none">
        <ion-label class="ion-text-wrap">
          <ion-text color="primary" class="font-bold">
            Título do simulado
          </ion-text>

          <p>
            Assuntos:
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolor, eaque explicabo neque obcaecati optio reprehenderit? A, accusantium asperiores dolores ea harum magnam minus quia repudiandae vitae. Fugit, iusto, vel!
          </p>
        </ion-label>
      </ion-item>

      <!-- resposta do professor à atividade -->
      <ion-item class="ion-margin ion-margin-bottom white rounded shadow" lines="none">
        <ion-label class="ion-text-wrap">
          <ion-text color="primary" class="font-bold">
            Meu desempenho
          </ion-text>

          <h3 class="text-lg mb-8">
            Minha nota: 3,0
          </h3>

          <p>
            8 acertos
          </p>
          <p>
            3 erros
          </p>
        </ion-label>
      </ion-item>

      <IonButton
          color="primary"
          class="ion-margin-horizontal"
          @click="openModal()"
      >
        <ion-label class="text-none">
          Ver gabarito
        </ion-label>

        <ion-icon slot="end" :icon="downloadOutline"/>
      </IonButton>

      <!-- lista de atividades-->
      <!--<ion-list class="ion-margin-top ion-padding h-full rounded-top">
        <ion-label class="font-bold text-lg text-white">
          Comentários
        </ion-label>

        &lt;!&ndash; card dos comentarios &ndash;&gt;
        <ion-item
            class="ion-margin-top rounded"
            v-for="atividade in atividades"
            :key="atividade.ttl+ atividade.tipo"
            @click="() => router.push( 'atividades-disponiveis')"
            lines="none"
        >
          <ion-avatar slot="start">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
          </ion-avatar>

          <div>
            <ion-label class="ion-margin-top text-lg font-bold">
              {{ atividade.tipo }} - {{ atividade.ttl }}
            </ion-label>
            <p class="ion-no-margin ion-margin-bottom" slot="start">
              Prazo de entrega: {{ atividade.prazo }}
            </p>
          </div>

          <ion-icon
              :icon="appsOutline"
              size="large"
              v-if="atividade.tipo === 'Simulado'"
              color="light"
              class="absolute left-0 bottom&#45;&#45;2"
          />

          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
              color="light"
              size="large"
              class="mr-8"
          />
        </ion-item>
      </ion-list>-->
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonIcon, IonText, IonButton, modalController
} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, appsOutline, downloadOutline, sendOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import Modal from '@/components/ModalCorrecaoSimulados';

export default {
  name: 'CorrecaoAtividadesEntregues',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonIcon, IonText, IonButton},

  setup () {
    return {
      router: useRouter(),
      notifications,
      arrowForwardCircleOutline,
      appsOutline,
      downloadOutline,
      sendOutline,
      modal: '',
    }
  },

  methods: {
    async openModal () {
      const modal = await modalController.create({
        component: Modal,
        cssClass: '',
        componentProps: {
          fechar: () => this.modal.dismiss(),
          questoes: [
            {
              title: 'Questão 1',
              conteudo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias architecto atque autem culpa cumque deleniti inventore mollitia natus necessitatibus numquam officiis quaerat quas, qui repellat ullam vel velit voluptatibus?',
              alternativas: [
                {
                  alternativa: 'A',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
                {
                  alternativa: 'B',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
                {
                  alternativa: 'C',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
                {
                  alternativa: 'D',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
                {
                  alternativa: 'E',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
              ],
              alternativaMarcada: 'A',
              gabarito: 'A'
            },
            {
              title: 'Questão 2',
              conteudo: 'Tal tal tal pei pei pei',
              alternativas: [
                {
                  alternativa: 'A',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
                {
                  alternativa: 'B',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
                {
                  alternativa: 'C',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
                {
                  alternativa: 'D',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
                {
                  alternativa: 'E',
                  texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
                },
              ],
              alternativaMarcada: 'B',
              gabarito: 'A'
            },
          ],
        },
      });
      this.modal = modal;
      return modal.present();
    },
  }

}
</script>

<style scoped>
.mb-8 {
  margin-bottom: 8px;
}
.bg__principal {
  --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
}

ion-item.ttl {
  --background: transparent;
}
.text-white {
  color: white;
}
ion-list {
  background: var(--ion-color-primary);
}
</style>
