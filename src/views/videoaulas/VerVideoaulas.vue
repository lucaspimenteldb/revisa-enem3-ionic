<template>
  <ion-page>

    <ion-content class="ion-padding-top">
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
            :color="curtiu === true ? 'success' : ''"
        />
        <ion-icon
            :icon="dislike"
            size="large"
            @click="curtida(0)"
            :color="curtiu === false ? 'danger' : ''"
        />
      </section>

      <ion-list class="ion-margin-top ion-padding rounded-top">
        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="(q, i) in questoes"
            :key="q.id"
            @click="abrirQuestao(q, `Questão `+ (i+1), user)"
            lines="none"
        >
          <ion-label class="ion-padding-vertical text-white">
            <p class="text-white">
              {{ `Questão `+ (i+1) }}
            </p>
          </ion-label>

          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
              color="light"
              size="large"
              class=""
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
import {notifications, arrowForwardCircleOutline, thumbsUpOutline, thumbsDownOutline, thumbsUp, thumbsDown} from 'ionicons/icons';
import {useRoute, useRouter} from 'vue-router'
import api from '../../api/basicUrl'
import ModalVideoaulas from '@/components/ModalVideoaulas';
import {ref} from 'vue';
import Loading from "../../components/auxiliares/Loading";
import storage from '../../storage/StorageKey';
import AlertGeneric from "../../components/auxiliares/AlertGeneric";

export default {
  name: 'VideoaulasAssuntos',
  components: {IonPage,AlertGeneric, Loading, IonContent, IonItem, IonLabel, IonList, IonIcon},

  setup () {
    const questoes = ref([]);
    const loading = ref(false);
    const user = ref({});
    return {
      notifications,
      arrowForwardCircleOutline,
      thumbsDownOutline,
      thumbsUpOutline,
      thumbsUp,
      thumbsDown,
      router: useRouter(),
      route: useRoute(),
      questoes,
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
          this.curtiu = false;
        }
        else {
          this.curtir = thumbsUp;
          this.dislike = thumbsDownOutline
          this.curtiu = true;
        }

        let id_video = this.route.params.id;

        let objeto = { id_user: this.user.id, id_video, reacao: curtida };

        await api.post('/reacao-video/', objeto);

      }catch (e) {
        this.alertMod = true;
        this.curtir = thumbsUpOutline;
        this.dislike = thumbsDownOutline;
        this.curtiu = null;
      }

    },

    async abrirQuestao (quest, titulo, user) {
      console.log('oi',quest.acertou);
      const modal = await modalController.create({
        component: ModalVideoaulas,
        cssClass: '',
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
  },

   async ionViewWillEnter () {
    try {
      let usuario = await storage.get('user');
      usuario = JSON.parse(usuario.value);
      this.user = usuario;
      this.loading = true;
      let id_video = this.route.params.id;
      let dados = await api.get("/questao-videos/"+id_video+'/'+this.user.id);
      this.video = dados.data.video;
      this.questoes = dados.data.questoes;
      this.curtiu = dados.data.curtiu;
     if (this.curtiu === false) {
        this.dislike = thumbsDown;
     }
     else if(this.curtiu === true) {
       this.curtir = thumbsUp;
     }
    }catch (e) {
      this.text.header = 'Não foi possível carregar o vídeo. Por favor verifique a conexão e tente novamente.';
      this.alertMod = true;
    }
    this.loading = false;
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
.text-white {
  color: white;
}

h2.font-bold {
  font-weight: 600;
}
</style>
