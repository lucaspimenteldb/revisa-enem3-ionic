<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Atividades Disponíveis
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-item lines="none">
        <ion-avatar
            slot="start"
            class="border-3"
            :class="`border__linguagens`"
        >
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
        </ion-avatar>

        <ion-label class="ion-padding">
          <h2 class="text-white">
            Prof. Andersoion Moura
          </h2>
          <p class="ion-no-margin text-white">
            Literatura
          </p>
        </ion-label>
      </ion-item>

      <!-- selecionar atividades -->
      <ion-item class="ion-margin-horizontal ion-margin-bottom white rounded">
        <ion-label>
          Selecionar ativiade...
        </ion-label>

        <ion-select>
          <ion-select-option>pei</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- lista de atividades-->
      <ion-list class="ion-padding h-full rounded-top">
        <ion-label class="font-bold text-lg">
          Atividades Disponíveis
        </ion-label>

        <ion-item
            class="ion-margin-top rounded"
            v-for="atividade in atividades"
            :key="atividade.ttl+ atividade.tipo"
            @click="() => router.push( 'ver-atividades')"
            lines="none"
        >
          <div class="ion-padding-vertical">
            <ion-label class="ion-margin-top text-white text-lg font-bold">
              {{ atividade.tipo }} - {{ atividade.ttl }}
            </ion-label>
            <p class="ion-no-margin ion-margin-bottom text-white" slot="start">
              Prazo de entrega: {{ atividade.prazo }}
            </p>
          </div>

          <ion-icon
              :icon="appsOutline"
              size="large"
              v-if="atividade.tipo === 'Simulado'"
              color="light"
              class="absolute left-0 bottom--2"
          />

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
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonAvatar, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, appsOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'

export default {
  name: 'AtividadesDisponiveis',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonAvatar, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption},

  setup () {
    return {
      router: useRouter(),
      notifications,
      arrowForwardCircleOutline,
      appsOutline,

      atividades: [
        {
          ttl: 'XYZ mais eu',
          tipo: 'Simulado',
          rota: 'atividades-disponiveis',
          prazo: '22/10/2021'
        },
        {
          ttl: 'Pei pei pei',
          tipo: 'Atividade',
          rota: 'atividades-entregues',
          prazo: '22/10/2021'
        },
        {
          ttl: 'Xablau brau',
          tipo: 'Simulado',
          rota: 'meu-desempenho',
          prazo: '22/10/2021'
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
ion-item.white {
  --background: white;
}
.text-white {
  color: white;
}
ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
}
</style>
