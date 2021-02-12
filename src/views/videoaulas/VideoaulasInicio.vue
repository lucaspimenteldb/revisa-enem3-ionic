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
            @click="() => router.push(disciplina.rota)"
            lines="none"
        >
          <ion-label class="ion-padding-vertical text-white">
            <h2 class="font-bold">
              {{ disciplina.ttl }}
            </h2>

            <ion-text class="mt-8">
              <p>
                50% concluído
              </p>
            </ion-text>

            <ion-progress-bar
                value="0.5"
                :color="disciplina.area"
                buffer="0.5"
                class="w-3/5"
            ></ion-progress-bar>
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
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonProgressBar} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'

export default {
  name: 'Videoaulas',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonProgressBar},

  setup () {
    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),

      disciplinas: [
        {
          ttl: 'Matemática',
          rota: 'ver-videoaula',
          area: 'matematica'
        },
        {
          ttl: 'Física',
          rota: 'ver-videoaula',
          area: 'natureza'
        },
        {
          ttl: 'Biologia',
          rota: 'ver-videoaula',
          area: 'natureza'
        },
        {
          ttl: 'Química',
          rota: 'ver-videoaula',
          area: 'natureza'
        },
        {
          ttl: 'Geografia',
          rota: 'ver-videoaula',
          area: 'humanas'
        },
        {
          ttl: 'Filosofia',
          rota: 'ver-videoaula',
          area: 'humanas'
        },
        {
          ttl: 'História',
          rota: 'ver-videoaula',
          area: 'humanas'
        },
        {
          ttl: 'Português',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
        {
          ttl: 'Literatura',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
      ]
    }
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
ion-item {
  --background: var(--ion-color-primary);
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
