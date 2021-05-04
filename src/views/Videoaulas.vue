<template>
  <ion-page>
    <ion-content >
      <!-- container dos volumes -->
      <ion-img src="assets/images/videoaulas-inicio-fundo.png" class="fundo absolute top-0 right-0 z--1"/>

      <div class="ion-margin-vertical ion-padding-top flex ion-justify-content-center">
        <div
            v-for="(playlist,i) in playlists"
            :key="playlist.nome"
            @click="() => router.push(playlist.rota)"
            class="p-8 inline-flex flex-column ion-justify-content-center ion-align-items-center w-80 bg-white rounded"
            :class="{'mx-8': i === 1, 'mr-8': i === 2}"
        >
          <ion-img
              :src="`/assets/icon/${playlist.icon}`"
              class="ion-no-margin"
              :class="{ 'w-26': i === 0 || i === 2, 'w-32': i === 1 || i === 3}"
          />

          <h5 class="ion-no-margin mt-8 text-primary text-sm font-bold" :class="{'relative top-2': i === 1}">
            {{ playlist.nome }}
          </h5>
        </div>
      </div>

      <ion-list class="ion-margin-top ion-padding h-full rounded-top">
        <ion-label class="font-bold text-lg" color="dark">
          Videoaulas
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            :disabled="!volume.liberado"
            v-for="volume in volumes"
            :key="volume.ttl+ 'acessar'"
            @click="() => router.push(`/videoaulas-inicio/${volume.rota}`)"
            lines="none"
        >
          <ion-label class="ion-padding-end ion-padding-vertical">
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
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonIcon, IonImg, } from '@ionic/vue';
import {playCircleOutline, lockClosed} from 'ionicons/icons';
import Loading from "../components/auxiliares/Loading";
import api from '../api/basicUrl';
import network from '../plugins/network';
import {ref} from 'vue';

import { useRouter } from 'vue-router'
import sqlite from "../storage/Sqlite";
import methodsGlobal from "../mixins/methodsGlobal";

export default  {
  name: 'Videoaulas',
  components: { Loading, IonContent, IonPage, IonList, IonItem, IonLabel, IonIcon, IonImg, },
  mixins: [methodsGlobal],

  setup () {
    const volumes = ref([]);
    const loading = ref(false);
    return {
      playCircleOutline,
      lockClosed,
      loading,
      router: useRouter(),
      volumes,
    };
  },

  data: () => ({
    playlists: [
      {
        nome: 'explore',
        icon: 'explore.png',
        route: '',
      },
      {
        nome: 'downloads',
        icon: 'downloads.png',
        route: '',
      },
      {
        nome: 'favoritas',
        icon: 'favorite.png',
        route: '',
      },
      {
        nome: 'lembretes',
        icon: 'assistir-depois.png',
        route: '',
      },
    ],
  }),

  async ionViewWillEnter () {
    try {
      let status = await network.getStatus();
      if (!status.connected){
        await this.getChache();
        return;
      }
      this.loading = true;
      let volumes = await api.get('/volumes');
      this.volumes = volumes.data.volumes;
      await sqlite.insertBatch(this.sqlite, this.volumes, 'volume');
    }catch (e) {
        console.log(e);
        await this.getChache();
    }

    this.loading = false;

  },

  methods: {
    async getChache() {
      let volumes = await sqlite.consulta(this.sqlite, 'select * from volume', []);
      this.volumes = this.inserirElementos(volumes);
    }
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
.text-sm {
  font-size: .8rem;
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

ion-img.fundo {
  margin-left: auto;
  display: block;
  width: 220px;
}
ion-img.ion-no-margin {
  margin: 0;
}

.w-30 {
  width: 30px;
}
</style>
