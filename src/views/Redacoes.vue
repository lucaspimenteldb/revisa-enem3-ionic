<template>
  <ion-page>
    <ion-content >
      <ion-list class="ion-padding h-full">
        <ion-label class="font-bold text-xl">
          Redações
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="opcao in opcoes"
            :key="opcao.ttl+ 'acessar'"
            @click="() => router.push(opcao.rota)"
            lines="none"
        >
          <ion-label class="ion-margin-vertical ion-padding-vertical text-white font-bold">
            {{ opcao.ttl }}

            <article v-if="opcao.notificacao" class="absolute top-8 right-24">
<!--              <div class="flex ion-align-items-center ion-justify-content-center h-16 w-16 absolute top&#45;&#45;6 right&#45;&#45;8 rounded-full notificacao z-1">-->
<!--                <p class="ion-no-margin text-xxs">1</p>-->
<!--              </div>-->
<!--              <ion-icon-->
<!--                  :icon="notifications"-->
<!--                  class="text-lg"-->
<!--                  color="white"-->
<!--              />-->
            </article>

          </ion-label>

          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
              color="light"
              size="large"
              class=""
          />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon,} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'
export default {
  name: 'RedacoesInicio',
  components: {IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon},

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
        // {
        //   ttl: 'Meu desempenho',
        //   notificacao: 0,
        //   rota: 'meu-desempenho-redacao',
        // },
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
