<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="fundo">
      <div>
        <IonSlides :pager="true" class="ion-padding">
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
        >
          <IonLabel class="ion-padding-vertical">
            <h1 class="text-white font-bold">
              {{ menu.ttl }}
            </h1>
          </IonLabel>

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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonImg, IonSlides, IonSlide } from '@ionic/vue';
import { heart, airplaneOutline } from 'ionicons/icons'

export default  {
  name: 'Home',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonPage, IonImg, IonSlides, IonSlide },

  setup() {
    return {
      airplaneOutline,
      heart,

      menus: [
        {
          ttl: 'Atividades',
          rota: 'atividades',
          class: 'atividades__fundo'
        },
        {
          ttl: 'Videoaulas',
          rota: 'videoaulas',
          class: 'videoaulas__fundo'
        },
        {
          ttl: 'Redações',
          rota: 'redacoes',
          class: 'redacoes__fundo'
        },
        {
          ttl: 'Ranking',
          rota: 'ranking',
          class: 'ranking__fundo'
        },
        {
          ttl: 'Praticar',
          rota: 'praticar',
          class: 'praticar__fundo'
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
.swiper-pagination-bullet-active {
  background: white;
}

#app > ion-app > ion-router-outlet > div > ion-tabs > div > ion-router-outlet > div > ion-content > ion-list {
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
  --background: url('../../public/assets/images/atividades-fundo.png') var(--ion-color-primary) no-repeat center/100%;
}
.videoaulas__fundo {
  --background: url('../../public/assets/images/videoaulas-fundo.png') var(--ion-color-primary) no-repeat center/100%;
}
.redacoes__fundo {
  --background: url('../../public/assets/images/redacoes-fundo.png') var(--ion-color-primary) no-repeat center/100%;
}
.ranking__fundo {
  --background: url('../../public/assets/images/rankings-fundo.png') var(--ion-color-primary) no-repeat center/100%;
}
.praticar__fundo {
  --background: url('../../public/assets/images/praticar-fundo.png') var(--ion-color-primary) no-repeat center/100%;
}
</style>
