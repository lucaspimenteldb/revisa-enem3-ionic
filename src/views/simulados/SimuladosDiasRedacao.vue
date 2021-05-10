<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
         Simulado Estadual
        </h4>
      </div>

      <ion-list class="ion-padding rounded-top">
        <!--    card do simulado do 1 dia    -->
        <div
            class="mb-48 relative"
            v-for="simulado in simulados"
            :key="'simulado-dia-'+simulado.dia"
        >
          <ion-text color="primary">
            <h3 class="mb-4 font-bold text-lg">
             {{simulado.titulo}}
            </h3>
          </ion-text>

          <p class="mt-0 text-black">
            No card abaixo você poderá acessar o Simulado do <b>{{simulado.titulo}}</b>. Você terá {{simulado.horaEx}} para terminá-lo após o inicio do simulado.
          </p>

          <ion-item
              class="ion-margin-top rounded"
              lines="none"
          >
            <div class="flex flex-column text-black">
              <ion-text color="primary">
                <h3 class="mb-4 font-bold text-lg">
                 {{simulado.titulo}}
                </h3>
              </ion-text>

              <article class="mt-8">
                <ion-text>
                  <p class="ion-no-margin">
                    Disponível entre:
                    <ion-text color="verde" class="font-bold">{{ simulado.inicio }}</ion-text> e
                    <ion-text color="vermelho" class="font-bold">{{ simulado.fim }}</ion-text>
                  </p>

                  <p class="mb-0 mt-8" v-if="simulado.tempo">
                    Você ainda tem: <ion-text color="primary" class="font-bold">{{ simulado.tempo }} minutos restantes</ion-text>
                  </p>

                  <p class="mb-0 mt-8">
                    Áreas do simulado:
                    <ion-text color="primary">{{ simulado.areas }}</ion-text>
                  </p>
                </ion-text>
              </article>

              <ion-button
                  fill="outline"
                  color="primary"
                  v-if="!simulado.baixarGabarito"
                  class="ion-no-margin ion-margin-vertical text-none font-bold"
                  size="small"
                  :disabled="!simulado.botao"
                  @click="irResolver(simulado)"
              >
                Iniciar simulado
              </ion-button>

              <ion-button
                      fill="outline"
                      color="primary"
                      v-if="simulado.baixarGabarito"
                      class="ion-no-margin ion-margin-vertical text-none font-bold"
                      size="small"
                      @click="baixarGabarito(simulado)"
              >
                Baixar gabarito
              </ion-button>
            </div>
          </ion-item>
          <div class="absolute fundo-tudo rounded" :class="simulado.liberado">
            <p class="ion-margin-end ion-text-center text-white">
              {{simulado.message}}
            </p>
          </div>
        </div>

        <!--    card da redaçãozona    -->
        <div class="mb-48 relative" v-for="(redacao) in redacoes" :key="redacao.id">
          <ion-text color="primary">
            <h3 class="mb-4 font-bold text-lg">
              Redação
            </h3>
          </ion-text>

          <p class="mt-0 text-black">
            Você terá da data inicio até a data fim do simulado para fazer e enviar a sua redação tenha calma na hora de realizar que tudo vai da certo!
          </p>

          <ion-item
              class="ion-margin-top rounded"
              lines="none"
          >
            <div class="flex flex-column text-black">
              <ion-text color="primary">
                <h3 class="mb-4 font-bold text-lg">
                  {{redacao.titulo}}
                </h3>
              </ion-text>

              <article class="mt-8">
                <ion-text>
                  <p class="ion-no-margin">
                    Disponível entre:
                    <ion-text color="verde" class="font-bold">{{ redacao.inicio }}</ion-text> e
                    <ion-text color="vermelho" class="font-bold">{{ redacao.fim }}</ion-text>
                  </p>

                  <p class="mb-0 mt-8" v-if="redacao.tempo">
                    Você ainda tem: <ion-text color="primary" class="font-bold">{{ redacao.tempo }}</ion-text>
                  </p>

                  <p class="mb-0 mt-8">
                    Tema da redação:
                    <ion-text color="primary">{{ redacao.descricao}}</ion-text>
                  </p>
                </ion-text>
              </article>

              <ion-button
                  fill="outline"
                  color="primary"
                  class="ion-no-margin ion-margin-vertical text-none font-bold"
                  size="small"
                  :disabled="!redacao.botao"
                  @click="() => router.push({path: '/responder-redacao', query:{redacao: JSON.stringify(redacao)}})"
              >
                Iniciar redação
              </ion-button>
            </div>
          </ion-item>
          <div class="absolute fundo-tudo rounded" :class="redacao.liberado">
            <p class="ion-margin-end ion-text-center text-white">
              {{redacao.message}}
            </p>
          </div>
        </div>
      </ion-list>
      <Loading :isOpen="loading"></Loading>
      <ModalLinguaEstrangeira></ModalLinguaEstrangeira>
    </ion-content>
  </ion-page>
</template>

<script>
// import {IonPage,IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText} from '@ionic/vue';
import {IonPage,IonContent, IonItem, IonList,  IonButton, IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
import ModalLinguaEstrangeira from "../../components/modal/ModalLinguaEstrangeira";
// import api from '../../api/basicUrl';
import { ref } from 'vue';
// import storage from "../../storage/StorageKey";
import api from "../../api/basicUrl";
import storage from '../../storage/StorageKey';
import browser from "../../plugins/browser";
import env from '../../env';

export default {
  name: 'Simulados',
  // components: {IonPage, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading},
  components: {ModalLinguaEstrangeira, IonPage, IonContent, IonItem, IonList, IonButton, IonText, Loading},

  setup () {
    const loading = ref(false);
    const dialog = ref(true);

    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),
      route: useRoute(),
      loading,
      dialog,
    }
  },

  data () {
    return {
      simulados: [
        // {
        //   dia: 1,
        //   inicio: '22/05/2020',
        //   fim: '30/05/2020',
        //   tempo: 120,
        //   areas: 'Linguagens e Humanas',
        //   id: 235,
        // },
        // {
        //   dia: 2,
        //   inicio: '22/05/2020',
        //   fim: '30/05/2020',
        //   tempo: 120,
        //   areas: 'Exatas e Natureza',
        //   id: 235,
        // },
      ],
      redacoes:[
      //         {
      //   tempo: '4 dias',
      //   tema: 'O desafio de reduzir as desigualdades entre as regiões do Brasil',
      // }
      ]
    }
  },

  methods :{
    irResolver (simulado) {
      if (simulado.resposta) {
        this.router.push('/responder-simulado/'+simulado.id);
      }
      else{
        this.emitter.emit('opcoes', {state: true, termo: simulado.termo, user:this.user, simulado});
      }

    },

    async baixarGabarito (simulado) {
      try{
          if(window.cordova){
            let fileTransfer = new window.FileTransfer();
            let path = window.cordova.file.dataDirectory+'simulado'+simulado.id+'.pdf';
            let uri = encodeURI(env.api+'/baixar-gabarito/'+simulado.id+'/'+this.user.id);
            this.loading = true;

            let entry = await this.promiseGabarito(fileTransfer, uri, path);
            this.loading = false;
            await this.promiseOpener(entry.nativeURL, 'application/pdf');

          }
          else {
            await browser.open(env.api+'/baixar-gabarito/'+simulado.id+'/'+this.user.id);
          }
      }catch (e) {
        console.log(e);
      }
    },

    //promise de baixar gabarito para poder utilizar p await
    async promiseGabarito (fileTransfer, uri, path) {
      return new Promise((resolve, reject) => {
        fileTransfer.download(uri, path, (entry) => {
          resolve(entry)
        }, (error) => reject(error))
      })
    },

    //abrindo o opener para utilizar o seu adobe reader
    async promiseOpener (uri, mime) {
      return new Promise((resolve, reject) => {
        window.cordova.plugins.fileOpener2.open(uri, mime, (result) => {
          resolve(result)
        }, (error) => reject(error))
      })
    },
  },

  async ionViewWillEnter () {
    try {
      this.loading = false;
      this.loading = true;
      let usuario = await storage.get('user');
      usuario = JSON.parse(usuario.value);
      this.user = usuario;
      let id_simulado = this.route.params.id;
      let dados = await api.get('/simulado-estaduais/'+ this.user.id + '/'+id_simulado);
      this.simulados = dados.data.simulados;
      this.redacoes = dados.data.redacoes;
      console.log('simulado', dados.data);
      this.loading = false;
    }catch (e) {
      this.loading = false;
      console.log(e);
    }
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
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
ion-list {
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
h2.font-bold {
  font-weight: 600;
}

.bg-verde{
  background: #0c9041;
}

.bg-danger {
  background: #E04A2D;
}

.bg-block {
  background: #FCB812;
}
</style>
