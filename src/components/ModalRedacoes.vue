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

        <ion-img class="img-selected" :src="arquivoEscolhido">

        </ion-img>
      </ion-item>
      <ion-button
              :disabled="loading"
          class="ion-no-margin text-none"
          @click="previa()"
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
    <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
    <AlertGeneric :dialog="dialog2" :text="text2" :buttons="buttons2" />
  </ion-content>
</template>

<script>
import { IonContent, IonImg, IonTitle, IonText, IonButton,IonItem, IonLabel, IonIcon, actionSheetController, IonNote } from '@ionic/vue';
import { closeCircleOutline, imageOutline, refreshCircleOutline, sendOutline, cameraOutline } from 'ionicons/icons';
import camera from "../plugins/camera";
import api from '../api/basicUrl';
import {useRouter, useRoute} from 'vue-router';
import AlertGeneric from "./auxiliares/AlertGeneric";

export default {
  name: 'Modal',
  props: [ 'title', 'conteudo', 'fechar', 'imagem', 'user'],
  components: { IonImg, AlertGeneric, IonContent, IonTitle, IonText, IonButton, IonItem, IonLabel, IonIcon, IonNote },

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
      dialog: false,
      text: {
        header: 'Tem certeza que deseja enviar a redação?',
        subHeader: '',
        message: '',
      },
      buttons: [{text: 'Sim', handler: () => this.enviarAtividade()}, {text:'Não', handler: () => {  this.dialog = false  }}],

      text2: {
        header: 'Falha ao enviar!',
        subHeader: '',
        message: '',
      },
      buttons2: [{text:'Ok', handler: () => {  this.dialog2 = false  }}],
      dialog2: false,
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
            handler: () => {
                this.sourceCamera(0);
            },
          },
          {
            text: 'Galeria de fotos',
            icon: imageOutline,
            handler: () => {
              this.sourceCamera(1);
            },
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

    previa () {
      this.dialog = true;
    },

    async sourceCamera (source) {
      let image = await camera.takePicture({
        quality: 90,
        width: 1920,
        preserveAspectRatio: true,
        allowEditing: false,
        uri: true,
        source
      })

      this.arquivoEscolhido = image.dataUrl;
    },

   async enviarAtividade () {
      try {
        this.loading = true;
        this.dialog = false;
        this.mensagemEnvio = null;
        this.mensagemErro = null;
        let id_redacao = this.route.params.id;
        let id_user = this.user.id;
        let objeto = { arquivo: this.arquivoEscolhido, id_redacao, id_user }
        let dados = await api.post('/enviar-redacao', objeto);
       this.emitter.emit('pontos', dados.data.pontos);
       this.text2.header = dados.data.message;
       this.dialog2 = true;

      }catch (e) {
        console.log(e);
        if (e.response) {
          this.text2.header = e.response.data.message;
        }
        else {
          this.text2.header = 'Erro Interno';
        }

        this.dialog2 = true;
      }
      this.loading = false;
    }
  }

};
</script>

<style scoped>
  .img-selected::part(image) {
    max-height: 246px;
}
</style>
