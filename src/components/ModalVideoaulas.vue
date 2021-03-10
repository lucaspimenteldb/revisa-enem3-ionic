<template>
  <ion-content class="ion-padding relative">
    <!-- dicas da atividade -->
    <ion-button
        fill="outline"
        color="primary"
        class="ion-no-margin text-none"
        @click="verResolucao = !verResolucao"
    >
      <p v-if="!verResolucao">
        Ver resolução
      </p>
      <p v-if="verResolucao">
        Fechar resolução
      </p>
    </ion-button>

    <ion-item class=" ion-no-padding" v-if="verResolucao">
      <p class="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem commodi cum distinctio ea exercitationem explicabo, harum labore neque odio officia pariatur quam similique tempore unde veniam. Eius repellendus reprehenderit vel?
      </p>
    </ion-item>

    <div class="mt-32">
      <ion-label class="ion-text-wrap">
        <ion-text class="font-bold">
          {{ title }}
        </ion-text>

        <p v-html="conteudo">

        </p>
      </ion-label>
    </div>

    <!-- botao de fechar o modal -->
    <ion-icon
        :icon="closeCircleOutline"
        class="absolute top-4 right-4"
        size="large"
        color="danger"
        @click="fechar"
    />

    <!-- alternativas da questao -->
    <ion-item
        v-for="alternativa in alternativas"
        :key="alternativa.alternativa+'alternativa'"
        class="ion-margin-vertical ion-no-padding border-2 border-primary rounded"
        :class="alternativaMarcada === alternativa.alternativa ? 'alternativa__marcada text-white' : ''"
        @click="marcarAlternativa(alternativa.alternativa)"
    >
      <article
          class="ml-8 mr-8 flex ion-align-items-center ion-justify-content-center h-30 w-30 border-2 rounded-full"
          :class="alternativaMarcada === alternativa.alternativa ? 'border-white' : 'border-primary'"
      >
        {{ alternativa.alternativa }}
      </article>

      <ion-text>
        <p v-html="alternativa.texto">

        </p>
      </ion-text>
    </ion-item>

    <!-- proximo, anterior e finalizar -->
<!--    <ion-button-->
<!--        class="ion-no-margin mr-8 text-none"-->
<!--        fill="outline"-->
<!--    >-->
<!--      <ion-icon :icon="chevronBackCircleOutline" class="mr-8"/>-->

<!--      Anterior-->
<!--    </ion-button>-->
<!--    <ion-button-->
<!--        class="ion-no-margin mr-8  ion-margin-right text-none"-->
<!--        fill="outline"-->
<!--    >-->
<!--      Próxima-->

<!--      <ion-icon :icon="chevronForwardCircleOutline" class="ml-8"/>-->
<!--    </ion-button>-->

    <ion-button
            @click="enviarAtividade"
        expand="block"
        class="ion-margin-vertical text-none shadow-btn"
    >
      Finalizar
    </ion-button>

    <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />

  </ion-content>
</template>

<script>
import { IonContent, IonText, IonButton,IonItem, IonLabel, IonIcon, actionSheetController } from '@ionic/vue';
import { closeCircleOutline, imageOutline, refreshCircleOutline, sendOutline, chevronBackCircleOutline, chevronForwardCircleOutline } from 'ionicons/icons'
import AlertGeneric from "./auxiliares/AlertGeneric";
import api from '../api/basicUrl';

export default {
  name: 'ModalVideoaulas',
  props: [ 'title', 'conteudo', 'fechar', 'alternativas', 'gabarito', 'id'],
  components: { AlertGeneric, IonContent, IonText, IonButton, IonItem, IonLabel, IonIcon },

  setup () {
    return {
      closeCircleOutline,
      imageOutline,
      refreshCircleOutline,
      sendOutline,
      chevronBackCircleOutline,
      chevronForwardCircleOutline
    };
  },

  data () {
    return {
      loading: false,
      mensagemEnvio: null,
      verResolucao: false,
      alternativaMarcada: null,
      dialog: false,
      text: {
        header: 'Ops!',
        subHeader: '',
        message: 'Selecione uma das alternativas :)',
      },

      buttons: [{text: 'Ok', handler: () => this.dialog = false}],

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
      this.reset();
     if (!this.alternativaMarcada) {
       this.dialog = true;
       return;
     }

     let btn = [{text: 'Sim', handler: () => this.confirmEnvio()}, {text:'Não', role:'cancel', handler: () => { this.dialog = false }}];
     this.setAlert('Tem certeza que deseja enviar a resposta ?', '',  btn);
      this.dialog = true;
    },

    async confirmEnvio () {
      try {
        let objeto = {id_questao: this.id, resposta: this.alternativaMarcada};
        await api.post('/enviar-resposta-video', objeto);
      }catch (e) {
        this.setAlert('Ops! Algo Deu Errado. Tente novamente.', '',  [{text: 'Ok', handler: () => this.dialog = false}]);
      }

    },

    setAlert (header, message, buttons) {
      this.text.header = header;
      this.text.message = message;
      this.buttons = buttons;
    },

    reset() {
      this.text.header = 'Ops!';
      this.text.message = 'Selecione uma das alternativas :)';
      this.buttons = [{text: 'Ok', handler: () => this.dialog = false}];
    },

    marcarAlternativa (marcada) {
      this.alternativaMarcada = marcada;
    }
  }

};
</script>

<style scoped>
ion-item.alternativa__marcada {
  --background: var(--ion-color-primary);
}

</style>
