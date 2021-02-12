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
            :key="aula.ttl+ 'acessar'"
            @click="() => router.push(aula.rota)"
            lines="none"
        >
          <ion-label class="ion-padding-vertical text-white">
            <p class="text-white">
              Aula {{ aula.ttl }}
            </p>
            <p class="font-bold text-white text-xl">
              {{ aula.assunto }}
            </p>

            <article class="mt-8">
              <ion-text>
                <p class="text-sm">
                  50% concluído <span class="ion-float-right">2/3 questões</span>
                </p>
              </ion-text>

              <ion-progress-bar
                  value="0.5"
                  :color="aula.area"
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
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonProgressBar} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'

export default {
  name: 'VideoaulasAssuntos',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonProgressBar},

  setup () {
    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),

      aulas: [
        {
          ttl: '1',
          assunto: 'O texto literário e suas funções',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
        {
          ttl: '2',
          assunto: 'O texto literário e suas funções',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
        {
          ttl: '3',
          assunto: 'O texto literário e suas funções',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
        {
          ttl: '4',
          assunto: 'O texto literário e suas funções',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
        {
          ttl: '5',
          assunto: 'O texto literário e suas funções',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
        {
          ttl: '6',
          assunto: 'O texto literário e suas funções',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
        {
          ttl: '7',
          assunto: 'O texto literário e suas funções',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
        {
          ttl: '8',
          assunto: 'O texto literário e suas funções',
          rota: 'ver-videoaula',
          area: 'linguagens'
        },
        {
          ttl: '9',
          assunto: 'O texto literário e suas funções',
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
