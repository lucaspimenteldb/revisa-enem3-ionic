<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title slot="start" class="ion-no-padding flex">
          <ion-buttons class="inline-block">
            <ion-back-button default-href="/tabs">voltar</ion-back-button>
          </ion-buttons>

          <section class="inline-flex ion-align-items-center vertical-text-bottom">
            <ion-img src="assets/icon/xp-estrela.png" class="mr-4 w-30 inline-block"/>

            <div>
              <ion-text color="primary">
                <p class="ion-no-margin text-xs font-bold">
                  Você tem
                </p>
                <p class="ion-no-margin text-sm">
                  3335xp
                </p>
              </ion-text>
            </div>
          </section>
        </ion-title>

        <ion-avatar class="ion-margin-end w-40 h-40 border-2 border-primary" slot="secondary">
          <img src="assets/images/banner-home.png" >
        </ion-avatar>
      </ion-toolbar>
    </ion-header>

    <ion-content >
      <ion-router-outlet />
    </ion-content>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonTitle, IonHeader, IonToolbar, IonImg, IonButtons, IonText, IonBackButton, IonAvatar, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp, IonRouterOutlet,IonTitle, IonHeader, IonToolbar, IonImg, IonButtons, IonText, IonBackButton, IonAvatar, IonContent
  }
});
</script>
