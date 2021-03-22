<template>
  <ion-content class="ion-padding relative">
    <!-- dicas da atividade -->
    <div v-if="!termosAceitos">
      <ion-item class="mt-48 ion-margin-bottom ion-no-padding " lines="none">
        <ion-label class="ion-text-wrap">
          <ion-text class="font-bold">
            Termos de compromisso
          </ion-text>

          <p>
            <ion-img :src="imagem"></ion-img>
          </p>
        </ion-label>
      </ion-item>

      <ion-button
          class="ion-no-margin text-none"
          expand="block"
          @click="termosAceitos = true"
      >
        Aceitar termos de compromisso
      </ion-button>
    </div>

    <div v-else>
      <ion-title class="ion-margin-vertical ion-no-padding ion-padding-top">
        {{ title }}
      </ion-title>

      <ion-text class="ion-padding-vertical">
        {{ conteudo }}
      </ion-text>
    </div>

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
        v-if="termosAceitos"
    >
      Escolher arquivo da redação

      <ion-icon :icon="sendOutline" class="ml-8"/>
    </ion-button>

    <!-- enviar atividade -->
    <div v-if="arquivoEscolhido">
      <ion-item  class="ion-margin-vertical ion-no-padding ion-padding-top">
        <ion-label>
          Arquivo:
        </ion-label>

        <ion-img :src="arquivoEscolhido">

        </ion-img>
      </ion-item>
      <ion-button
          class="ion-no-margin text-none"
          @click="enviarAtividade()"
      >
        Enviar redação

        <ion-icon
            v-if="loading"
            class="ml-8 loading"
            :icon="refreshCircleOutline"
        />
      </ion-button>

      <ion-note color="success" v-if="mensagemEnvio">
        <p class="font-bold">
          {{ mensagemEnvio }}
        </p>
      </ion-note>

      <ion-note color="danger" v-if="mensagemErro">
        <p class="font-bold">
          {{ mensagemErro }}
        </p>
      </ion-note>
    </div>
  </ion-content>
</template>

<script>
import { IonContent, IonImg, IonTitle, IonText, IonButton,IonItem, IonLabel, IonIcon, actionSheetController, IonNote } from '@ionic/vue';
import { closeCircleOutline, imageOutline, refreshCircleOutline, sendOutline, cameraOutline } from 'ionicons/icons';
import camera from "../plugins/camera";
import api from '../api/basicUrl';
import {useRouter, useRoute} from 'vue-router';

export default {
  name: 'Modal',
  props: [ 'title', 'conteudo', 'fechar', 'imagem', 'user'],
  components: { IonImg, IonContent, IonTitle, IonText, IonButton, IonItem, IonLabel, IonIcon, IonNote },

  setup () {
    return {
      closeCircleOutline,
      cameraOutline,
      imageOutline,
      refreshCircleOutline,
      sendOutline,
      route: useRoute(),
      router: useRouter(),
    };
  },

  data () {
    return {
      arquivoEscolhido: null,
      loading: false,
      mensagemEnvio: null,
      mensagemErro: null,
      termosAceitos: false,
    }
  },

  methods: {
    async importarArquivos () {
      const actionSheet = await actionSheetController.create({
        header: 'Escolher arquivo da redação',
        cssClass: '',
        buttons: [
          {
            text: 'Tirar foto',
            icon: cameraOutline,
            handler: async () => {
              let image = await camera.takePicture({
                quality: 90,
                width: 1920,
                preserveAspectRatio: true,
                allowEditing: false,
                uri: true
              })

              this.arquivoEscolhido = image.dataUrl;
            },
          },
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

   async enviarAtividade () {
      try {
        this.loading = true;
        this.mensagemEnvio = null;
        this.mensagemErro = null;
        let id_redacao = this.route.params.id;
        let id_user = this.user.id;
        let objeto = { arquivo: this.arquivoEscolhido, id_redacao, id_user }
        let dados = await api.post('/enviar-redacao', objeto);
       this.mensagemEnvio = dados.data.message;
       this.emitter.emit('pontos', dados.data.pontos);

      }catch (e) {
        console.log(e);
        if (e.response) {
          this.mensagemErro = e.response.data.message;
        }
        else {
          this.mensagemErro = 'Erro Interno';
        }
      }
      this.loading = false;
    }
  }

};
</script>

<style scoped>

</style>
