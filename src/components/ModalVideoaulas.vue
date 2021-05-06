<template>
  <ion-content class="ion-padding relative bg-white modal-videoaulas-questoes">
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
      <p class="text-sm text-black" v-html="resolucao">

      </p>
    </ion-item>

    <div class="mt-32">
      <ion-label class="ion-text-wrap" color="light">
        <ion-text class="font-bold" color="light">
          {{ title }}
        </ion-text>

        <p v-html="conteudo" class="text-black">

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
        :class="[alternativaMarcada === alternativa.alternativa ? 'alternativa__marcada' : '', acertou[alternativa.alternativa] === true ? 'alternativa__certa' : acertou[alternativa.alternativa] === false ? 'alternativa__errada' : '']"
        @click="marcarAlternativa(alternativa.alternativa)"
    >
      <article
          class="ml-8 mr-8 flex ion-align-items-center ion-justify-content-center h-30 w-30 text-black border-2 rounded-full"
          :class="alternativaMarcada === alternativa.alternativa ? 'border-white text-white' : 'border-primary text-black'"
      >
        {{ alternativa.alternativa }}
      </article>

      <ion-text color="light">
        <p v-html="alternativa.texto" :class="alternativaMarcada === alternativa.alternativa ? 'text-white' : 'text-black'">

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
            v-if="temNull"
            @click="enviarAtividade"
        expand="block"
        class="ion-margin-vertical text-none shadow-btn"
    >
      Finalizar
    </ion-button>

    <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
    <Loading :isOpen="loading"></Loading>
  </ion-content>
</template>

<script>
import { IonContent, IonText, IonButton,IonItem, IonLabel, IonIcon, actionSheetController } from '@ionic/vue';
import { closeCircleOutline, imageOutline, refreshCircleOutline, sendOutline, chevronBackCircleOutline, chevronForwardCircleOutline } from 'ionicons/icons'
import AlertGeneric from "./auxiliares/AlertGeneric";
import api from '../api/basicUrl';
import Loading from "./auxiliares/Loading";

export default {
  name: 'ModalVideoaulas',
  props: [ 'title', 'conteudo', 'fechar', 'alternativas', 'gabarito', 'id', 'user'],
  components: { Loading, AlertGeneric, IonContent, IonText, IonButton, IonItem, IonLabel, IonIcon },
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

  created() {
   if (this.gabarito.marcada) {
     this.acertou[this.gabarito.marcada] = this.gabarito.acertou;
     this.acertou[this.gabarito.gabarito] = true;
     this.resolucao = this.gabarito.comentario;
     this.temNull = false;
   }
  },

  data () {
    return {
      loading: false,
      temNull: true,
      mensagemEnvio: null,
      verResolucao: false,
      alternativaMarcada: null,
      acertou: {'A': null, 'B': null, 'C': null, 'D': null, 'E': null},
      dialog: false,
      resolucao: 'Você ainda não respondeu a questão',
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
        this.loading = true;
        let objeto = {id_questao: this.id, resposta: this.alternativaMarcada, id_user: this.user};
        let dados = await api.post('/enviar-resposta-video', objeto);
        let gabarito = {id_questao: this.id, alternativa: this.alternativaMarcada, gabarito: dados.data.gabarito, comentario: dados.data.comentario, acertou: dados.data.acertou};
        this.acertou[this.alternativaMarcada] = dados.data.acertou;
        this.acertou[dados.data.gabarito] = true;
        this.alternativaMarcada = '';
        this.resolucao = dados.data.comentario;
        this.temNull = false;
        this.emitter.emit('pontos', dados.data.pontos);
        this.emitter.emit('preencherGabarito', gabarito)
        this.setAlert(dados.data.message, '',  [{text: 'Ok', handler: () => this.dialog = false}]);
      }catch (e) {
        let msg = 'Ops! Algo Deu Errado. Tente novamente.';
        if (e.response) {
          msg = e.response.data.message;
        }
        this.setAlert(msg, '',  [{text: 'Ok', handler: () => this.dialog = false}]);
      }

      this.loading = false;

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
  },

};
</script>

<style scoped>
ion-item {
  --background: white;
}

ion-content {
  --background: white;
}

ion-item.alternativa__errada {
  --background: var(--ion-color-danger);
  --ion-text-color: var(--ion-color-light);
  --ion-border-color:var(--ion-color-light);

}

ion-item.alternativa__certa {
  --background: var(--ion-color-success);
  --ion-text-color: var(--ion-color-light);
  --ion-border-color:var(--ion-color-light);
}

ion-item.alternativa__marcada {
  --background: var(--ion-color-primary);
}

</style>
