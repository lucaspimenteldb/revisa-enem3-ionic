<template>
  <!-- modal para enviar a redacao -->
  <ion-page>
  <ion-modal
      :is-open="isOpenRef"
      css-class="modalzao"
      @onDidDismiss="setOpen(false)"
  >
    <ion-content id="modal-redacao" class="ion-padding">
      <ion-list v-if="!termo">
      <ion-fab vertical="top" horizontal="end">
        <ion-fab-button color="light" @click="setOpen(false)">
          <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-text color="primary">
        <h3 class="mt-64">
          Enviar redação
        </h3>
      </ion-text>

      <ion-text color="danger">
        <p class="text-sm">
          Lembre-se: para que a sua redação seja avaliada, ela deve ser escrita com tinta preta, na folha própria e ter até 30 linhas.
        </p>
      </ion-text>

      <ion-item class="shadow rounded">
        <ion-label position="floating">
          Anexar redação
        </ion-label>
        <ion-input @click="importarArquivos"></ion-input>
        <ion-icon
            slot="end"
            :icon="documentTextOutline"
            class="mt-16"
        />
      </ion-item>

      <ion-item v-if="arquivoEscolhido"  class="ion-margin-vertical ion-no-padding ion-padding-top">

        <ion-img class="img-selected" :src="arquivoEscolhido">

        </ion-img>
      </ion-item>

      <ion-button
          fill="clear"
          color="danger"
          class="mt-16 text-none"
          @click="setOpen(false)"
      >
        Cancelar
      </ion-button>

      <ion-button @click="previa" class="mt-16 text-none">
        Enviar redação
      </ion-button>
      </ion-list>

      <ion-grid v-if="termo">
        <div v-html="termoDesc">

        </div>

        <ion-button
                @click="mudarTermo(false)"
                expand="full"
                class="text-primary text-none font-bold bg-white rounded"
        >
          Aceitar
        </ion-button>
      </ion-grid>

    </ion-content>
  </ion-modal>

    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
         Simulado Estadual - Redação
        </h4>
      </div>

      <div class="ion-padding rounded-top bg-papel">
        <!-- negocio da redacao -->
        <ion-text color="primary">
          <h3 class="mb-4 font-bold text-lg">
           {{ redacao.titulo}}
          </h3>
        </ion-text>

        <p class="mt-0 text-black">
          Redação estadual, faça com calma que tudo dará certo. Nós sabemos que você é capaz!
        </p>

        <ion-item
            class="ion-margin-top rounded"
            lines="none"
        >
          <ion-label>
            <b>
              Tema:
            </b>

            <p>
             {{ redacao.descricao}}
            </p>
          </ion-label>
        </ion-item>

        <ion-text color="primary">
          <h3 class="mt-32 mb-4 font-bold text-lg">
            Enviar redação
          </h3>
        </ion-text>

        <ion-button fill="outline" class="text-none" @click="baixarRas">
          Baixar redação
        </ion-button>
        <ion-button class="text-none" @click="setOpen(true)">
            Enviar redação
        </ion-button>

        <iframe
                v-if="redacao.arquivo"
            :src="redacao.arquivo"
            style="width:100%; height:500px;"
            frameborder="0"
            class="mt-8"
        />

        <!-- video para fazer a redacao -->
        <ion-text color="primary">
          <h3 class="mt-32 mb-4 font-bold text-lg">
            Como fazer a minha redação?
          </h3>
        </ion-text>
        <iframe
                v-if="video"
            width="100%"
            height="250"
            :src="video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="ion-margin-vertical"
        />
      </div>
      <Loading :isOpen="loading"></Loading>
      <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
      <AlertGeneric :dialog="dialog2" :text="text2" :buttons="buttons2" />
    </ion-content>
  </ion-page>
</template>

<script>
  import {
    IonPage,
    IonContent,
    IonItem,
    IonList,
    IonButton,
    IonLabel,
    IonText,
    IonFab,
    IonIcon,
    IonInput,
    IonFabButton,
    menuController,
    modalController,
    IonModal,
    actionSheetController,
  } from '@ionic/vue';
  import {
    notifications,
    arrowForwardCircleOutline,
    closeCircleOutline,
    documentTextOutline,
    cameraOutline, imageOutline
  } from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
import api from '../../api/basicUrl';
import { ref } from 'vue';
import browser from "../../plugins/browser";
  import camera from "../../plugins/camera";
  import AlertGeneric from "../../components/auxiliares/AlertGeneric";
  import storage from "../../storage/StorageKey";
// import storage from '../../storage/StorageKey';
  import imageCompression from 'browser-image-compression';

export default {
  name: 'ResponderRedacao',
  // components: {IonPage, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading},
  components: {AlertGeneric, IonPage, actionSheetController, IonContent, IonItem, IonList, IonButton, IonLabel, IonText, IonIcon, IonInput, IonFab, IonFabButton, menuController, modalController, IonModal, Loading},

  setup () {
    const loading = ref(false);
    const isOpenRef = ref(false);
    const video = ref('');
    const arquivoEscolhido = ref('');
    const setOpen = state => isOpenRef.value = state;

    return {
      notifications,
      arrowForwardCircleOutline,
      closeCircleOutline,
      documentTextOutline,
      router: useRouter(),
      route: useRoute(),

      isOpenRef,
      setOpen,
      loading,
      video,
      arquivoEscolhido
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
      termo: true,
      termoDesc: '',
      dialog: false,
      redacao: {
        // tempo: '4 dias',
        // tema: 'O desafio de reduzir as desigualdades entre as regiões do Brasil',
      },

      imageBob: null,

      text2: {
        header: 'Falha ao enviar!',
        subHeader: '',
        message: '',
      },
      buttons2: [{text:'Ok', handler: () => {  this.dialog2 = false  }}],
      dialog2: false,

      text: {
        header: 'Tem certeza que deseja enviar a redação?',
        subHeader: '',
        message: '',
      },
      buttons: [{text: 'Sim', handler: () => this.enviarAtividade()}, {text:'Não', handler: () => {  this.dialog = false  }}],
    }
  },

  methods :{

    mudarTermo(bol) {
      this.termo = bol;
    },
    async baixarRas () {
      try{
        if(this.redacao.arquivo){
          if(window.cordova){
            let fileTransfer = new window.FileTransfer();
            let path = window.cordova.file.dataDirectory+''+this.redacao.id+'.pdf';
            let uri = encodeURI(this.redacao.arquivo);
            this.loading = true;

            let entry = await this.promiseInstrucoes(fileTransfer, uri, path);
            this.loading = false;
            await this.promiseOpener(entry.nativeURL, 'application/pdf');

          }
          else {
            await browser.open(this.redacao.arquivo);
          }
        }
      }
      catch (e) {
        console.log(e);
        this.loading = false;
      }


    },

    objetoInForm (objeto) {
      let form = new FormData ();
      for (let index in objeto) {
        form.append(index, objeto[index]);
      }

      return form;
    },

    async enviarAtividade () {
      try {
        this.loading = true;
        this.dialog = false;
        this.mensagemEnvio = null;
        this.mensagemErro = null;
        let id_redacao = this.redacao.id;
        let id_user = this.user.id;
        let imgCompress = await this.compactarImage();
        let objeto = { arquivo: imgCompress, id_redacao, id_user };
        let dados = await api.post('/enviar-redacao-estadual', objeto);
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
    },

    previa () {
      this.dialog = true;
    },

    async promiseOpener (uri, mime) {
      return new Promise((resolve, reject) => {
        window.cordova.plugins.fileOpener2.open(uri, mime, (result) => {
          resolve(result)
        }, (error) => reject(error))
      })
    },

    async promiseInstrucoes (fileTransfer, uri, path) {
      return new Promise((resolve, reject) => {
        fileTransfer.download(uri, path, (entry) => {
          resolve(entry)
        }, (error) => reject(error))
      })
    },

    async sourceCamera (source) {
      try{
        let image = await camera.takePicture({
          quality: 90,
          width: 1920,
          preserveAspectRatio: true,
          allowEditing: false,
          uri: true,
          source
        })

        this.arquivoEscolhido = image.dataUrl;
        this.imageBob = await imageCompression.getFilefromDataUrl(this.arquivoEscolhido, 'arquivo');
      }catch (e) {
        console.log(e);
    }

    },

    async compactarImage() {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false
      };

      let compressedFile = await imageCompression(this.imageBob, options);
      compressedFile =  await imageCompression.getDataUrlFromFile(compressedFile);
      return compressedFile;
    },

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

  },

  async ionViewWillEnter() {
    try{
      let usuario = await storage.get('user');
      usuario = JSON.parse(usuario.value);
      this.user = usuario;
      this.redacao = JSON.parse(this.route.query.redacao);
      this.loading = true;
      let dados = await api.get('/redacao-informacao/'+this.redacao.id)
      this.termoDesc = dados.data.termo;
      this.video = dados.data.video_tutorial;
      this.loading = false;
    }catch (e) {
      console.log(e)
      this.loading = false;
    }
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
#modal-redacao {
  --background: white;
}
ion-item {
  --background: white;
}
.fundo-cima {
  background: url('../../../public/assets/images/simulado-estadual-fundo.png') var(--ion-color-primary) no-repeat center/100%;
}
.text-black {
  color: black;
}
.text-white {
  color: white;
}
.bg-papel {
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

.img-selected::part(image) {
  max-height: 246px;
}
h2.font-bold {
  font-weight: 600;
}
</style>
