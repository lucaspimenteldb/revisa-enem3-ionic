<template>
  <ion-content class="ion-padding relative">
    <!-- dicas da atividade -->
    <ion-item class="mt-48 ion-margin-bottom white rounded dicas" lines="none">
      <ion-label class="ion-text-wrap" color="light">
        <ion-text class="font-bold">
          Dicas para o envio
        </ion-text>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolor, eaque explicabo neque obcaecati optio reprehenderit? A, accusantium asperiores dolores ea harum magnam minus quia repudiandae vitae. Fugit, iusto, vel!
        </p>
      </ion-label>
    </ion-item>

    <ion-title class="ion-margin-vertical ion-no-padding ion-padding-top">
      {{ title }}
    </ion-title>

    <ion-text class="ion-padding-vertical">
      {{ conteudo }}
    </ion-text>

    <!-- botao de fechar o modal -->
    <ion-icon
        :icon="closeCircleOutline"
        class="absolute top-4 right-4"
        size="large"
        color="danger"
        @click="fechar"
    />

    <!-- escolher atividade -->
    <ion-button
        expand="block"
        class="ion-no-margin ion-margin-top text-none shadow-btn butonzin"
        @click="importarArquivos"
    >
      Escolher arquivo da atividade

      <ion-icon :icon="sendOutline" class="ml-8"/>
    </ion-button>

    <!-- enviar atividade -->
    <div v-if="arquivoEscolhido">
      <ion-item  class="ion-margin-vertical ion-no-padding ion-padding-top">
        <ion-label>
          Arquivo:
        </ion-label>

        <ion-text>
          {{ arquivoEscolhido }}
        </ion-text>
      </ion-item>
      <ion-button
          class="ion-no-margin text-none"
          @click="enviarAtividade()"
      >
        Enviar atividade

        <ion-icon
            v-if="loading"
            class="ml-8 loading"
            :icon="refreshCircleOutline"
        />
      </ion-button>

      <ion-note color="success">
        <p class="font-bold">
          {{ mensagemEnvio }}
        </p>
      </ion-note>
    </div>
  </ion-content>
</template>

<script>
import { IonContent, IonTitle, IonText, IonButton,IonItem, IonLabel, IonIcon, actionSheetController, IonNote } from '@ionic/vue';
import { closeCircleOutline, imageOutline, refreshCircleOutline, sendOutline } from 'ionicons/icons'

export default {
  name: 'Modal',
  props: [ 'title', 'conteudo', 'fechar' ],
  components: { IonContent, IonTitle, IonText, IonButton, IonItem, IonLabel, IonIcon, IonNote },

  setup () {
    return {
      closeCircleOutline,
      imageOutline,
      refreshCircleOutline,
      sendOutline
    };
  },

  data () {
    return {
      arquivoEscolhido: null,
      loading: false,
      mensagemEnvio: null
    }
  },

  methods: {
    async importarArquivos () {
      const actionSheet = await actionSheetController.create({
        header: 'Escolher arquivo da atividade',
        cssClass: '',
        buttons: [
          {
            text: 'Galeria de fotos',
            icon: imageOutline,
            handler: () => this.arquivoEscolhido = 'selecionei esse asd.jpg',
          },
          {
            text: 'cancelar',
            role: 'cancel',
            icon: closeCircleOutline,
            handler: () => console.log('fechar'),
          }
        ],
      });

      return actionSheet.present();
    },

    enviarAtividade () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.mensagemEnvio = 'Parabéns, sua atividade foi enviada!';
      }, 3000);
    }
  }

};
</script>

<style scoped>
ion-item.dicas {
  --background: var(--ion-color-primary);
}
</style>
