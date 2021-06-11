<template>
  <ion-tabs>
    <ion-tab-bar v-if="$route.path != '/login'" slot="bottom">
      <ion-tab-button class="tabs" tab="home" href="/home">
        <ion-icon icon="/assets/icon/tabs/home.svg" />
        <ion-label>
          Home
        </ion-label>
      </ion-tab-button>

      <ion-tab-button class="tabs" tab="simulado" href="/simulado">
        <ion-icon :icon="appsOutline" />
        <ion-label>
          Simul. Estadual
        </ion-label>
      </ion-tab-button>

      <ion-tab-button class="tabs" tab="videoaulas" href="/videoaulas">
        <ion-icon icon="/assets/icon/tabs/videoaula.svg" />
        <ion-label>
          Videoaulas
        </ion-label>
      </ion-tab-button>

      <ion-tab-button class="tabs" tab="redacoes" href="/redacoes">
        <ion-icon icon="/assets/icon/tabs/redacao.svg" />
        <ion-label>
          Redações
        </ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script>
import { IonTabBar,  IonPage, IonTabButton, IonTabs, IonLabel, IonIcon } from '@ionic/vue';
import { ellipse, square, triangle, appsOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonPage, IonTabBar, IonTabButton, IonIcon },
  setup() {
    return {
      ellipse,
      square,
      triangle,
      appsOutline,
    }
  }
}
</script>
<style scoped>
  .tabs, ion-tab-bar {
    background: #000952;
    --color: #fff;
    --color-selected: #fff;
  }

  .tabs.tab-selected {
    opacity: 0.6;
  }

</style>
