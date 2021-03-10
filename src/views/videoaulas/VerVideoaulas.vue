<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{video.titulo}}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding-top">
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
            @click="curtir = thumbsUp; dislike = thumbsDownOutline"
            :color="curtir === thumbsUp ? 'success' : ''"
        />
        <ion-icon
            :icon="dislike"
            size="large"
            @click="dislike = thumbsDown; curtir = thumbsUpOutline"
            :color="dislike === thumbsDown ? 'danger' : ''"
        />
      </section>

      <ion-list class="ion-margin-top ion-padding rounded-top">
        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="(q, i) in questoes"
            :key="q.id"
            @click="abrirQuestao(q, `Questão `+ (i+1))"
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
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, modalController} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, thumbsUpOutline, thumbsDownOutline, thumbsUp, thumbsDown} from 'ionicons/icons';
import {useRoute, useRouter} from 'vue-router'
import api from '../../api/basicUrl'
import ModalVideoaulas from '@/components/ModalVideoaulas';
import {ref} from 'vue';

export default {
  name: 'VideoaulasAssuntos',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon},

  setup () {
    const questoes = ref([]);
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
      modal: null,
    };
  },

  data () {
    return {
      curtir: thumbsUpOutline,
      dislike: thumbsDownOutline,
      video: {},
    };
  },

  methods: {
    async abrirQuestao (quest, titulo) {
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
            marcada: null,
            gabarito: 'B'
          }
        },
      });

      this.modal = modal;
      return modal.present();
    },
  },

   async ionViewWillEnter () {
     let id_video = this.route.params.id;
      let dados = await api.get("/questao-videos/"+id_video);
      this.video = dados.data.video;
      this.questoes = dados.data.questoes;
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
