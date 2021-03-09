<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Volume 1 - Literatura
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- selecionar videoaula -->
      <ion-item class="ion-margin ion-margin-bottom white rounded select">
        <ion-label>
          Selecionar videoaula...
        </ion-label>

        <ion-select>
          <ion-select-option>pei</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-list class="ion-padding rounded-top">
        <ion-label class="font-bold text-lg">
          Volume 1 - Literatura
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="aula in aulas"
            :key="aula.titulo+ 'acessar'"
            @click="() => router.push('/tabs/ver-videoaula/'+aula.id, {aula})"
            lines="none"
        >
          <ion-label class="ion-padding-vertical text-white">
            <p class="text-white">
              Aula {{ aula.titulo }}
            </p>
            <p class="font-bold text-white text-xl">
              {{ aula.descricao }}
            </p>

            <article class="mt-8">
              <ion-text>
                <p class="text-sm">
                  50% concluído <span class="ion-float-right">2/3 questões</span>
                </p>
              </ion-text>

              <ion-progress-bar
                  value="0.5"
                  :color="'matematica'"
                  buffer="0.5"
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
  name: 'VideoaulasAssuntos',
  components: { Loading, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonProgressBar, IonText},

  setup () {
    const loading = ref(false);
    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),
      route: useRoute(),
      loading,

      aulas: [

      ]
    }
  },

  async ionViewWillEnter () {
    try {
      this.loading = true;
      let materia = this.route.params.id;
      let volume = this.route.params.volume;
       let dados = await api.get("/videos/"+materia+'/'+volume);
       this.aulas = (dados.data.videos);
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
