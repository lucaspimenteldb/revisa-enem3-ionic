<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Ver videoaulas
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding-top">
      <ion-label class="ion-padding text-white">
        Assunto da videoaula
      </ion-label>

      <iframe
          width="100%"
          height="250"
          src="https://www.youtube.com/embed/mQ4zmFy4d7Y"
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
            v-for="aula in aulas"
            :key="aula.ttl+ 'acessar'"
            @click="abrirQuestao()"
            lines="none"
        >
          <ion-label class="ion-padding-vertical text-white">
            <p class="text-white">
              {{ aula.ttl }}
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
import ModalVideoaulas from '@/components/ModalVideoaulas';

export default {
  name: 'VideoaulasAssuntos',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon},

  setup () {
    return {
      notifications,
      arrowForwardCircleOutline,
      thumbsDownOutline,
      thumbsUpOutline,
      thumbsUp,
      thumbsDown,
      router: useRouter(),
      route: useRoute(),

      aulas: [
        {
          ttl: 'Questão 1',
          rota: 'ver-videoaula',
          feito: false,
          acertou: false,
        },
        {
          ttl: 'Questão 2',
          rota: 'ver-videoaula',
          feito: false,
          acertou: false,
        },
        {
          ttl: 'Questão 3',
          rota: 'ver-videoaula',
          feito: false,
          acertou: false,
        }
      ],

      modal: null,
    };
  },

  data () {
    return {
      curtir: thumbsUpOutline,
      dislike: thumbsDownOutline,
    };
  },

  methods: {
    async abrirQuestao () {
      const modal = await modalController.create({
        component: ModalVideoaulas,
        cssClass: '',
        componentProps: {
          title: 'Questão 1',
          conteudo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias architecto atque autem culpa cumque deleniti inventore mollitia natus necessitatibus numquam officiis quaerat quas, qui repellat ullam vel velit voluptatibus?',
          fechar: () => this.modal.dismiss(),
          alternativas: [
            {
              alternativa: 'A',
              texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
            },
            {
              alternativa: 'B',
              texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
            },
            {
              alternativa: 'C',
              texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
            },
            {
              alternativa: 'D',
              texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
            },
            {
              alternativa: 'E',
              texto: 'lorem ipsum cosecntoer elit ab alias repellat ulam molitia'
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

   ionViewWillEnter () {

      console.log(this.route.params);

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
