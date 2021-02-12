<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="triangle" />
          <ion-label>
            Home
          </ion-label>
        </ion-tab-button>

        <ion-tab-button tab="atividades" href="/tabs/atividades">
          <ion-icon :icon="ellipse" />
          <ion-label>
            Atividades
          </ion-label>
        </ion-tab-button>

        <ion-tab-button tab="videoaulas" href="/tabs/videoaulas">
          <ion-icon :icon="square" />
          <ion-label>
            Videoaulas
          </ion-label>
        </ion-tab-button>

        <ion-tab-button tab="redacoes" href="/tabs/redacoes">
          <ion-icon :icon="square" />
          <ion-label>
            Redações
          </ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse,
      square,
      triangle,
    }
  }
}
</script>
