<template>
  <ion-content class="ion-padding relative">
    <!-- botao de fechar o modal -->
    <ion-icon
        :icon="closeCircleOutline"
        class="absolute top-4 right-4"
        size="large"
        color="danger"
        @click="fechar"
    />

    <!-- dicas da atividade -->
    <ion-button
        fill="outline"
        color="primary"
        class="ion-no-margin text-none"
        @click="verGabarito = !verGabarito"
    >
      <p v-if="!verGabarito">
        Ver meu gabarito
      </p>
      <p v-if="verGabarito">
        Fechar gabarito
      </p>
    </ion-button>

    <ion-item class=" ion-no-padding" v-if="verGabarito">
      <p
          class="mr-8 text-sm"
          v-for="gabarito in todasQuestoes"
          :key="gabarito.title+'gabarito'"
      >
        {{ gabarito.title }}:
        <span v-if="gabarito.alternativaMarcada">{{gabarito.alternativaMarcada}}; </span>
        <span v-else>em branco; </span>
      </p>
    </ion-item>

    <ion-slides :options="slideOpts" ref="slideQuestoes">
      <ion-slide
          v-for="(questao, i) in questoes"
          :key="questao.title"
          class="flex flex-column"
      >
        <div class="mt-32 ion-margin-bottom w-full">
          <ion-label class="ion-text-wrap flex flex-column ion-align-items-start">
            <ion-text class="font-bold">
              {{ questao.title }}
            </ion-text>

            <p class="ion-text-left">
              {{ questao.conteudo }}
            </p>
          </ion-label>
        </div>

        <!-- alternativas da questao -->
        <ion-item
            v-for="alternativa in questao.alternativas"
            :key="alternativa.alternativa+'alternativa'"
            class="ion-margin-bottom ion-no-padding border-primary rounded"
            :class="todasQuestoes[i].alternativaMarcada === alternativa.alternativa ? 'alternativa__marcada text-white border-none' : 'border-2'"
            @click="todasQuestoes[i].alternativaMarcada = alternativa.alternativa"
        >
          <article
              class="ml-8 mr-8 flex ion-align-items-center ion-justify-content-center h-30 w-30 border-2 rounded-full"
              :class="questao.alternativaMarcada === alternativa.alternativa ? 'border-white' : 'border-primary'"
          >
            {{ alternativa.alternativa }}
          </article>

          <ion-text>
            <p>
              {{ alternativa.texto }}
            </p>
          </ion-text>
        </ion-item>
      </ion-slide>
    </ion-slides>

    <!-- proximo, anterior e finalizar -->
    <ion-button
        class="ion-no-margin mr-8 text-none"
        fill="outline"
        @click="slideAnt()"
    >
      <ion-icon :icon="chevronBackCircleOutline" class="mr-8"/>
      Anterior
    </ion-button>
    <ion-button
        class="ion-no-margin mr-8  ion-margin-right text-none"
        fill="outline"
        @click="proxSlide()"
    >
      Próximas
      <ion-icon :icon="chevronForwardCircleOutline" class="ml-8"/>
    </ion-button>

    <ion-button
        expand="block"
        class="ion-margin-vertical text-none shadow-btn"
        @click="finalizarSimulado()"
    >
      Finalizar
    </ion-button>


  </ion-content>
</template>

<script>
import { IonContent, IonText, IonButton,IonItem, IonLabel, IonIcon, actionSheetController, IonSlides, IonSlide } from '@ionic/vue';
import { closeCircleOutline, imageOutline, refreshCircleOutline, sendOutline, chevronBackCircleOutline, chevronForwardCircleOutline } from 'ionicons/icons';
import { ref } from 'vue';

export default {
  name: 'ModalVideoaulas',
  props: [ 'questoes', 'title', 'conteudo', 'fechar', 'alternativas', 'gabarito' ],
  components: { IonContent, IonText, IonButton, IonItem, IonLabel, IonIcon, IonSlides, IonSlide },

  setup () {
    const slideQuestoes = ref(null);

    return {
      closeCircleOutline,
      imageOutline,
      refreshCircleOutline,
      sendOutline,
      chevronBackCircleOutline,
      chevronForwardCircleOutline,

      slideOpts: {initialSlide: 0, speed: 400},
      slideQuestoes,
    };
  },

  data () {
    return {
      loading: false,
      mensagemEnvio: null,
      verGabarito: false,
      todasQuestoes: this.questoes,
    };
  },

  methods: {
    async finalizarSimulado () {
      const actionSheet = await actionSheetController.create({
        header: 'Tem certeza que quer enviar o simulado?',
        cssClass: '',
        buttons: [
          {
            text: 'Sim! Quero enviar o simulado',
            icon: sendOutline,
            handler: () => this.arquivoEscolhido = '',
          },
          {
            text: 'Não. Cancelar o envio',
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
    },

    async pei () {
      await console.log(this.slideQuestoes.$el);
    },

    async proxSlide () {
      const s = await this.slideQuestoes.$el.getSwiper();
      console.log(s);
      await s.slideNext();
    },

    async slideAnt () {
      const s = await this.slideQuestoes.$el.getSwiper();
      console.log(s);
      await s.slidePrev();
    },
  }

};
</script>

<style scoped>
ion-item.alternativa__marcada {
  --background: var(--ion-color-primary);
}

</style>
