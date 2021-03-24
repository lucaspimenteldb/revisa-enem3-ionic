<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button class="tabs" tab="home" href="/home">
          <ion-icon icon="/assets/icon/tabs/home.svg" />
          <ion-label>
            Home
          </ion-label>
        </ion-tab-button>

<!--        <ion-tab-button tab="atividades" href="/atividades">-->
<!--          <ion-icon :icon="ellipse" />-->
<!--          <ion-label>-->
<!--            Atividades-->
<!--          </ion-label>-->
<!--        </ion-tab-button>-->

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
<style scoped>
  .tabs {
    background: #000952;
    --color: #fff;
    --color-selected: #fff;
  }

  .tabs.tab-selected {
    opacity: 0.6;
  }

</style>
