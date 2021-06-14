<template>
  <ion-page>

    <ion-content class="ion-padding-top h-full">
      <ion-label class="ion-padding text-white">
       {{video.descricao}}
      </ion-label>

      <iframe
          width="100%"
          height="250"
          :src="video.url2"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="ion-margin-vertical"
      />

      <section class="ion-maring-bottom ion-padding rounded-right bg-white inline-block">
        <ion-icon
            :icon="curtir"
            size="large"
            class="ion-margin-end"
            @click="curtida(1)"
            :color="curtiu === 1 ? 'success' : 'primary'"
        />
        <ion-icon
            :icon="dislike"
            size="large"
            @click="curtida(0)"
            :color="curtiu === 0 ? 'danger' : 'primary'"
        />
      </section>

      <section class="secao-finalizar inline-block rounded-right ion-margin-end">
        <ion-button
            v-if="!finalizada"
            @click="finalizarAula"
            class="classes"
        >
          <ion-label
              size="small"
              class="text-none"
              v-text="'Finalizar'"
          />
        </ion-button>

        <ion-button
                v-else
                class="classes classes-finalizadas"
        >
          <ion-label
                  size="small"
                  class="ion-margin-end text-none"
                  color="success"
                  v-text="'Finalizada'"
          />

          <ion-icon
                  :icon="checkmarkCircleOutline"
                  color="success"
          />
        </ion-button>

      </section>

      <ion-list class="ion-margin-top ion-padding rounded">
        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="(q, i) in questoes"
            :key="q.id"
            @click="abrirQuestao(q, `Questão `+ (i+1), user)"
            lines="none"
        >
          <ion-label class="ion-padding-vertical  ion-align-items-center text-white">
            <p class="ion-margin-end text-white inline-block" style="margin-bottom: 4px">
              {{ `Questão `+ (i+1) }}
            </p>

            <ion-icon
                    v-if="q.acertou === 1"
                :icon="checkmarkCircleOutline"
                size="large"
                color="success"
            />

            <ion-icon
                    v-if="q.acertou === 0"
                    :icon="closeCircleOutline"
                    size="large"
                    color="danger"
            />

          </ion-label>

          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
              size="large"
              class="text-white"
          />
        </ion-item>
      </ion-list>
      <Loading :isOpen="loading"></Loading>
      <AlertGeneric :dialog="alertMod" :text="text" :buttons="[{text: 'Ok', handler: () => alertMod = false}]"></AlertGeneric>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon, modalController} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, closeCircleOutline, thumbsUpOutline, thumbsDownOutline, thumbsUp, thumbsDown, checkmarkCircleOutline} from 'ionicons/icons';
import {useRoute, useRouter} from 'vue-router'
import api from '../../api/basicUrl'
import ModalVideoaulas from '@/components/ModalVideoaulas';
import {ref} from 'vue';
import Loading from "../../components/auxiliares/Loading";
import storage from '../../storage/StorageKey';
import AlertGeneric from "../../components/auxiliares/AlertGeneric";
import sqlite from "../../storage/Sqlite";
import methodsGlobal from "../../mixins/methodsGlobal";
import network from "../../plugins/network";

export default {
  name: 'VideoaulasAssuntos',
  components: {IonPage,AlertGeneric, Loading, IonContent, IonItem, IonLabel, IonList, IonIcon},
  mixins: [methodsGlobal],

  setup () {
    const questoes = ref([]);
    const loading = ref(false);
    const user = ref({});
    const finalizada = ref(false);
    return {
      notifications,
      closeCircleOutline,
      arrowForwardCircleOutline,
      checkmarkCircleOutline,
      thumbsDownOutline,
      thumbsUpOutline,
      thumbsUp,
      thumbsDown,
      router: useRouter(),
      route: useRoute(),
      questoes,
      finalizada,
      loading,
      modal: null,
      user
    };
  },

  data () {
    return {
      curtir: thumbsUpOutline,
      dislike: thumbsDownOutline,
      curtiu: null,
      alertMod: false,
      video: {},
      text: {
        header:'Sua reação ao vídeo não foi enviada, por favor verifique a conexão e tente novamente.'
      }
    };
  },

  methods: {

   async curtida (curtida) {
      try{
        if (curtida === 0) {
          this.dislike = thumbsDown;
          this.curtir = thumbsUpOutline;
          this.curtiu = 0;
        }
        else {
          this.curtir = thumbsUp;
          this.dislike = thumbsDownOutline
          this.curtiu = 1;
        }

        let id_video = this.route.params.id;

        let objeto = { id_user: this.user.id, id_video, reacao: curtida };

        await api.post('/reacao-video', objeto);

      }catch (e) {
        this.text.header = 'Sua reação ao vídeo não foi enviada, por favor verifique a conexão e tente novamente.';
        this.alertMod = true;
        this.curtir = thumbsUpOutline;
        this.dislike = thumbsDownOutline;
        this.curtiu = null;
      }

    },

    async finalizarAula () {
     try{
       this.loading = true;
       let id_video = this.route.params.id;
       let id_user = this.user.id;
       let objeto = {id_video, id_user};
       let dados = await api.post('/finalizar-aula', objeto);

       this.text.header = dados.data.message;
       this.alertMod = true;
       this.finalizada = true;
      this.emitter.emit('pontos', dados.data.pontos);
     }catch (e) {
       this.text.header = e.response ? e.response.data.message : 'Aula NÃO finalizada! Por favor verifique a conexão e tente novamente';
       this.alertMod = true;
     }

     this.loading = false;
    },

    async abrirQuestao (quest, titulo, user) {
      const modal = await modalController.create({
        component: ModalVideoaulas,
        cssClass: 'bg-white',
        componentProps: {
          title: titulo,
          conteudo: quest.descricao,
          fechar: () => this.modal.dismiss(),
          alternativas: [
            {
              alternativa: 'A',
              texto: quest.ra
            },
            {
              alternativa: 'B',
              texto: quest.rb
            },
            {
              alternativa: 'C',
              texto: quest.rc
            },

            {
              alternativa: 'D',
              texto: quest.rd
            },

            {
              alternativa: 'E',
              texto: quest.re
            },
          ],
          gabarito: {
            marcada: quest.resposta || null,
            gabarito: quest.rgabarito || '',
            acertou: quest.acertou,
            comentario: quest.comentario || '',
          },
          id: quest.id,
          user: user.id,
        },
      });

      this.modal = modal;
      return modal.present();
    },

    async getChache() {
      let videos = await sqlite.consulta(this.sqlite, 'select * from aula where id_user = ? and id = ?', [this.user.id, this.route.params.id]);
      let questoes = await sqlite.consulta(this.sqlite, 'select * from questao_video where id_user = ? and id_video = ?', [this.user.id, this.route.params.id]);
      this.video = this.inserirElementos(videos)[0];
      this.questoes = this.inserirElementos(questoes);
      this.finalizada = this.video.finalizada;
      this.curtiu = this.video.curtiu;
      if (this.curtiu === 0) {
        this.dislike = thumbsDown;
      }
      else if(this.curtiu === 1) {
        this.curtir = thumbsUp;
      }
    }

  },

   async ionViewWillEnter () {
    try {
      let usuario = await storage.get('user');
      usuario = JSON.parse(usuario.value);
      this.user = usuario;
      let status = await network.getStatus();
      if (!status.connected){
        await this.getChache();
        return;
      }
      this.loading = true;
      let id_video = this.route.params.id;
      let dados = await api.get("/questao-videos/"+id_video+'/'+this.user.id);
      this.video = dados.data.video;
      this.questoes = dados.data.questoes;
      await sqlite.consulta(this.sqlite, 'update aula set finalizada = ?, curtiu = ? where id = ? and id_user = ?', [this.video.finalizada, dados.data.curtiu, this.video.id, this.user.id]);
      await sqlite.insertBatch(this.sqlite, this.questoes, 'questao_video', ['id_user', 'id_video']);
      this.curtiu = dados.data.curtiu;
      this.finalizada = this.video.finalizada;
     if (this.curtiu === 0) {
        this.dislike = thumbsDown;
     }
     else if(this.curtiu === 1) {
       this.curtir = thumbsUp;
     }
      this.loading = false;
    }catch (e) {
      this.loading = false;
      await this.getChache();
      this.text.header = 'Não foi possível carregar o vídeo. Por favor verifique a conexão e tente novamente.';
      this.alertMod = true;
    }

  },

  created() {
    this.emitter.on('preencherGabarito', (gabarito) => {
       for (let i = 0; i < this.questoes.length; i++) {
         if (this.questoes[i].id == gabarito.id_questao) {
            let quest = this.questoes[i];
             quest.rgabarito = gabarito.gabarito;
             quest.resposta = gabarito.alternativa;
             quest.acertou = gabarito.acertou;
             quest.comentario = gabarito.comentario;
             this.questoes.splice(i, 1, quest);
         }
       }
    })
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
ion-item {
  --background: url('../../../public/assets/images/videoaula-secundario.png') var(--ion-color-primary) no-repeat center/100%;
}
ion-item.select {
  --background: white;
}
ion-list {
  --background: white;
  background: white;
}
.text-white {
  color: white;
}
.classes {
  background: #000952;
  /* border-radius: 38px; */
  /* font-weight: bold; */
  /* background: none; */
  border-style: solid;
  border-radius: 5px;
  border-color: white;
  color: white;
  border-size: 1px;
  border-width: 3px;
  display: block;
}
.classes-finalizadas {
  border-color: #24c16c;
}

.secao-finalizar {
  float: right;
}

h2.font-bold {
  font-weight: 600;
}


#background-content {
  background: white;
  --background: white;
}
</style>
