<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Atividades
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list class="ion-padding h-full">
        <ion-label class="font-bold text-lg">
          Redações
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="opcao in opcoes"
            :key="opcao.ttl+ 'acessar'"
            @click="() => router.push(opcao.rota)"
            lines="none"
        >
          <ion-label class="ion-padding-vertical text-white font-bold">
            {{ opcao.ttl }}

            <ion-icon
                :icon="notifications"
                class="inline-block vertical-middle text-xl"
                v-if="opcao.notificacao"
            />
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
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'
export default {
  name: 'RedacoesInicio',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon},

  setup () {
    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),

      opcoes: [
        {
          ttl: 'Redações',
          notificacao: 1,
          rota: 'redacoes-inicio',
        },
        {
          ttl: 'Redações entregues',
          notificacao: 0,
          rota: 'redacoes-entregues',
        },
        {
          ttl: 'Meu desempenho',
          notificacao: 0,
          rota: 'meu-desempenho-redacao',
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
  --background: url('../../public/assets/images/redacao-secundario.png') var(--ion-color-primary) no-repeat center/100%;
}
.text-white {
  color: white;
}

ion-list {
  --background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
}
</style>
