<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Ver rascunho e enviar redacao
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list class="h-full">
        <ion-label class="ion-padding font-bold text-lg">
          Tema da redação
        </ion-label>
        <br>

        <section class="ion-padding">
          <ion-button class="ion-no-margin mt-8 mr-8 text-none" fill="outline">
            Baixar rascunho
          </ion-button>
          <ion-button class="ion-no-margin mt-8 text-none" @click="enviarRedacao()">
            Enviar redação
          </ion-button>
        </section>

        <div class="ion-margin-vertical ion-padding-vertical">
          <ion-label class="ion-padding font-bold text-lg">
            Como enviar minha redação?
          </ion-label>

          <iframe
              width="100%"
              height="250"
              src="https://www.youtube.com/embed/mQ4zmFy4d7Y"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="ion-margin-vertical"
          />
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, modalController} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, lockClosed, closeCircleOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'
import Modal from '../../components/ModalRedacoes'

export default {
  name: 'VerRascunhoEnviarRedacao',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList},

  setup () {
    return {
      notifications,
      arrowForwardCircleOutline,
      lockClosed,
      closeCircleOutline,
      router: useRouter(),

      modal: '',

      opcoes: [
        {
          tema: 4,
          ttl: 'Redações',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'disponível',
          icon: arrowForwardCircleOutline,
        },
        {
          tema: 3,
          ttl: 'Redações asd',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'disponível',
          icon: arrowForwardCircleOutline,
        },
        {
          tema: 2,
          ttl: 'Redações ggg',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'encerrada',
          icon: closeCircleOutline,
        },
        {
          tema: 1,
          ttl: 'Redaçõe ratts',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'bloqueada',
          icon: lockClosed,
        },
      ]
    }
  },

  methods: {
    async enviarRedacao () {
      const modal = await modalController.create({
        component: Modal,
        componentProps: {
          title: 'Informações importantes',
          conteudo: 'Redações digitadas no celular ou computador não serão aceitas. A redação deve ser ser escrita à mão. A única cor de caneta permitida é a de cor preta. A nota estará disponível entre 6 a 9 dias úteis a partir da entrega.',
          fechar: () => this.modal.dismiss(),
        },
      });
      this.modal = modal;
      return modal.present();
    }
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
ion-item {
  --background: var(--ion-color-primary);
}
.text-white {
  color: white;
}

ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
}
</style>
