<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Videoaulas - Volume 1
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- selecionar disciplina -->
      <ion-item class="ion-margin ion-margin-bottom white rounded select">
        <ion-label>
          Selecionar disciplina...
        </ion-label>

        <ion-select>
          <ion-select-option>pei</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-list class="ion-padding rounded-top">
        <ion-label class="font-bold text-lg">
          Volume 1
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="disciplina in disciplinas"
            :key="disciplina.ttl+ 'acessar'"
            @click="() => router.push('/tabs/videoaulas-assuntos/'+disciplina.id + '/volume/' + route.params.id)"
            lines="none"
        >
          <ion-label class="ion-padding-vertical text-white">
            <h2 class="font-bold text-white text-xl">
              {{ disciplina.ttl }}
            </h2>

            <article class="mt-8">
              <ion-text>
                <p>
                  50% concluído
                </p>
              </ion-text>

              <ion-progress-bar
                  value="0.5"
                  :color="'matematica'"
                  buffer="0.5"
                  class="w-3/5"
              />
            </article>
          </ion-label>

          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
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
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonProgressBar, IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
import api from '../../api/basicUrl';
import { ref } from 'vue';

export default {
  name: 'Videoaulas',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonProgressBar, IonText, Loading},

  setup () {
    const loading = ref(false);
    const disciplinas = ref([]);
    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),
      route: useRoute(),
      loading,
      disciplinas,
    }
  },

  async ionViewWillEnter () {
    try {
      this.loading = true;
      let volume = this.route.params.id;
      let dados = await api.get("/materias/"+volume);
     this.disciplinas = dados.data.materias;
     console.log(this.route.params.id);
    }catch (e) {
        console.log(e);
    }

    this.loading = false;

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

ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') center;
  background: url('../../../public/assets/images/bg-principal.png') center;
}
h2.font-bold {
  font-weight: 600;
}
</style>
