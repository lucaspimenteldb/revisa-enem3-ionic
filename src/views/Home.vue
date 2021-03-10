<template>
  <ion-page>
    <ion-content class="fundo">
      <div>
        <IonSlides :pager="true" class="ion-padding slide__principal">
          <IonSlide class="ion-margin-end">
            <IonImg class="rounded overflow-hidden" src="assets/images/banner-home.png" />
          </IonSlide>

          <IonSlide class="ion-margin-end">
            <IonImg src="assets/images/banner-home.png" />
          </IonSlide>

          <IonSlide class="ion-margin-end">
            <IonImg src="assets/images/banner-home.png" />
          </IonSlide>
        </IonSlides>
      </div>

      <IonList class="ion-margin-top ion-padding rounded-top">
        <IonItem
            class="ion-margin-top rounded"
            :class="menu.class"
            v-for="menu in menus"
            :key="menu.ttl"
            @click="() => router.push(menu.rota)"
        >
          <IonLabel class="ion-padding-vertical ion-margin-vertical">
            <h2 class="text-white font-bold text-lg">
              {{ menu.ttl }}

              <ion-icon
                  :icon="notifications"
                  class="vertical-middle"
                  color="white"
                  v-if="menu.notificacao"
              />
            </h2>
          </IonLabel>

          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
              color="light"
              size="large"
              class=""
          />
          <!--<IonIcon :icon="airplaneOutline" slot="start"></IonIcon>
          <ion-icon :icon="heart"></ion-icon>-->

         <!-- <IonBadge
              color="primary"
              slot="end"
          >
            Pei
          </IonBadge>-->
        </IonItem>
      </IonList>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonImg, IonSlides, IonSlide } from '@ionic/vue';
import { heart, airplaneOutline, arrowForwardCircleOutline, notifications } from 'ionicons/icons'
import { useRouter } from 'vue-router';

export default  {
  name: 'Home',
  components: { IonContent, IonList, IonItem, IonLabel, IonPage, IonImg, IonSlides, IonSlide },

  setup() {
    return {
      airplaneOutline,
      heart,
      arrowForwardCircleOutline,
      notifications,
      router: useRouter(),

      menus: [
        {
          ttl: 'Atividades',
          rota: 'atividades',
          class: 'atividades__fundo',
          notificacao: true,
        },
        {
          ttl: 'Videoaulas',
          rota: 'videoaulas',
          class: 'videoaulas__fundo',
          notificacao: false,
        },
        {
          ttl: 'Redações',
          rota: 'redacoes',
          class: 'redacoes__fundo',
          notificacao: true,
        },
        {
          ttl: 'Ranking',
          rota: 'ranking',
          class: 'ranking__fundo',
          notificacao: false,
        },
        {
          ttl: 'Praticar',
          rota: 'praticar',
          class: 'praticar__fundo',
          notificacao: false,
        },
      ],
    };
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}


 ion-list {
  --background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
}

ion-item {
  --background: var(--ion-color-primary);
}

.rounded {
  border-radius: 10px;
}

.atividades__fundo {
  --background: url('../../public/assets/images/atividades-fundo.png') var(--ion-color-primary) no-repeat center/70%;
}
.videoaulas__fundo {
  --background: url('../../public/assets/images/videoaulas-fundo.png') var(--ion-color-primary) no-repeat center/70%;
}
.redacoes__fundo {
  --background: url('../../public/assets/images/redacoes-fundo.png') var(--ion-color-primary) no-repeat center/70%;
}
.ranking__fundo {
  --background: url('../../public/assets/images/rankings-fundo.png') var(--ion-color-primary) no-repeat center/70%;
}
.praticar__fundo {
  --background: url('../../public/assets/images/praticar-fundo.png') var(--ion-color-primary) no-repeat center/70%;
}
</style>
