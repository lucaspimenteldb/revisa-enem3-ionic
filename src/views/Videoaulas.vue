<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Videoaulas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- container dos volumes -->
      <ion-img src="assets/images/videoaulas-inicio-fundo.png"/>

      <ion-list class="ion-margin-top ion-padding h-full rounded-top">
        <ion-label class="font-bold text-lg">
          Videoaulas
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            :disabled="!volume.liberado"
            v-for="volume in volumes"
            :key="volume.ttl+ 'acessar'"
            @click="() => router.push('videoaulas-inicio')"
            lines="none"
        >
          <ion-label class="ion-padding ">
            <h2 class="text-white">
              {{ volume.ttl }}
            </h2>
          </ion-label>

          <ion-icon
              v-if="volume.liberado"
              slot="end"
              :icon="playCircleOutline"
              color="light"
              size="large"
              class="mr-8"
          />
          <ion-icon
              v-if="!volume.liberado"
              slot="end"
              :icon="lockClosed"
              color="light"
              size="large"
              class="mr-8"
          />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import {playCircleOutline, lockClosed} from 'ionicons/icons';
import { useRouter } from 'vue-router'

export default  {
  name: 'Videoaulas',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem, IonLabel, IonIcon },

  setup () {
    return {
      playCircleOutline,
      lockClosed,
      router: useRouter(),

      volumes: [
        {
          ttl: 'Volume 1',
          liberado: true,
          rota: 'videoaulas-inicio'
        },
        {
          ttl: 'Volume 2',
          liberado: true,
          rota: 'videoaulas-inicio'
        },
        {
          ttl: 'Volume 3',
          liberado: false,
          rota: 'videoaulas-inicio'
        },
      ]
    };
  },


}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
.lista__professores {
  --background: var(--ion-color-primary);
}
p {
  color: white;
}
.text-lg {
  font-size: 1.15rem;
}

ion-list {
  --background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
}

ion-img {
  margin-left: auto;
  display: block;
  width: 220px;
}
</style>
