<template>
  <ion-page>
    <ion-content >
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
            @click="() => router.push(`videoaulas-inicio/${volume.rota}`)"
            lines="none"
        >
          <ion-label class="ion-padding ">
            <h2 class="text-white font-bold">
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
      <Loading :isOpen="loading"></Loading>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonIcon, IonImg } from '@ionic/vue';
import {playCircleOutline, lockClosed} from 'ionicons/icons';
import Loading from "../components/auxiliares/Loading";
import api from '../api/basicUrl';
import {ref} from 'vue';

import { useRouter } from 'vue-router'

export default  {
  name: 'Videoaulas',
  components: { Loading, IonContent, IonPage, IonList, IonItem, IonLabel, IonIcon, IonImg },

  setup () {
    const volumes = ref([]);
    const loading = ref(false);
    return {
      playCircleOutline,
      lockClosed,
      loading,
      router: useRouter(),
      volumes
    };
  },

  async ionViewWillEnter () {
    try {
      this.loading = true;
      let volumes = await api.get('/volumes');
      this.volumes = volumes.data.volumes;
    }catch (e) {
        console.log(e);
        alert("Não foi possível carregar as informações.Verifique a sua conexão e tente novamente");
    }

    this.loading = false;

  }


}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
.lista__professores {
  --background: url('../../public/assets/images/videoaula-secundario.png') var(--ion-color-primary) no-repeat center/100%;
}
p {
  color: white;
}
.text-lg {
  font-size: 1.15rem;
}
.font-bold {
  font-weight: 600;
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
