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

        <p>
          {{ conteudo }}
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
        @click="alternativaMarcada = alternativa.alternativa"
    >
      <article
          class="ml-8 mr-8 flex ion-align-items-center ion-justify-content-center h-30 w-30 border-2 rounded-full"
          :class="alternativaMarcada === alternativa.alternativa ? 'border-white' : 'border-primary'"
      >
        {{ alternativa.alternativa }}
      </article>

      <ion-text>
        <p>
          {{ alternativa.texto }}
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
        expand="block"
        class="ion-margin-vertical text-none shadow-btn"
    >
      Finalizar
    </ion-button>


  </ion-content>
</template>

<script>
import { IonContent, IonText, IonButton,IonItem, IonLabel, IonIcon, actionSheetController } from '@ionic/vue';
import { closeCircleOutline, imageOutline, refreshCircleOutline, sendOutline, chevronBackCircleOutline, chevronForwardCircleOutline } from 'ionicons/icons'

export default {
  name: 'ModalVideoaulas',
  props: [ 'title', 'conteudo', 'fechar', 'alternativas', 'gabarito' ],
  components: { IonContent, IonText, IonButton, IonItem, IonLabel, IonIcon },

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
ion-item.alternativa__marcada {
  --background: var(--ion-color-primary);
}

</style>
