<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Redações disponíveis
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list class="ion-padding h-full rounded-top">
        <ion-label class="font-bold text-lg">
          Redações
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="opcao in opcoes"
            :key="opcao.ttl+ 'acessar'"
            @click="() => router.push(opcao.rota)"
            lines="none"
            :disabled="opcao.status === 'bloqueada' ? true : false"
        >
          <ion-label class="text-white font-bold">
            <ion-text class="text-white">
              <p>
                Tema {{ opcao.tema }}
              </p>
            </ion-text>

            <ion-text class="text-lg font-bold text-white">
              {{ opcao.ttl }} temasinho
            </ion-text>

            <div class="mt-8">
              <ion-text class="ion-margin-top text-white text-sm font-regular">
                <p class="ion-margin-top">
                  {{ opcao.inicio }}
                </p>
                <p>
                  {{ opcao.fim }}
                </p>
              </ion-text>
            </div>
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
          tema: 4,
          ttl: 'Redações',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'disponível',
        },
        {
          tema: 3,
          ttl: 'Redações asd',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'disponível',
        },
        {
          tema: 2,
          ttl: 'Redações ggg',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'expirada',
        },
        {
          tema: 1,
          ttl: 'Redaçõe ratts',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'bloqueada',
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
.text-white {
  color: white;
}

ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
}
</style>
