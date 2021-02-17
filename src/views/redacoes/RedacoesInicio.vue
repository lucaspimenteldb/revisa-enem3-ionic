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
              :icon="opcao.icon"
              :color="opcao.status === 'encerrada' ? 'danger' : 'light'"
              class="mr-8"
              style="font-size: 40px;"
          />
          <ion-text class="absolute right-8 bottom-20 text-sm" :class="opcao.status === 'encerrada' ? 'text-red' : 'text-white'">
            {{ opcao.status }}
          </ion-text>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, lockClosed, closeCircleOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'
export default {
  name: 'RedacoesInicio',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonText},

  setup () {
    return {
      notifications,
      arrowForwardCircleOutline,
      lockClosed,
      closeCircleOutline,
      router: useRouter(),

      opcoes: [
        {
          tema: 4,
          ttl: 'Redações',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-rascunho-enviar-redacao',
          status: 'disponível',
          icon: arrowForwardCircleOutline,
        },
        {
          tema: 3,
          ttl: 'Redações asd',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'disponível',
          icon: arrowForwardCircleOutline,
        },
        {
          tema: 2,
          ttl: 'Redações ggg',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'encerrada',
          icon: closeCircleOutline,
        },
        {
          tema: 1,
          ttl: 'Redaçõe ratts',
          inicio: '23/10/2021',
          fim: '28/10/2021',
          rota: 'ver-redacoes',
          status: 'bloqueada',
          icon: lockClosed,
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
  --background: url('../../../public/assets/images/redacao-secundario.png') var(--ion-color-primary) no-repeat center/100%;
}
.text-white {
  color: white;
}

ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
}
</style>
