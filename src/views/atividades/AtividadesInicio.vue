<template>
  <ion-page>
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

      <ion-list class="ion-padding h-full rounded-top">
        <ion-label class="font-bold text-xl">
          Atividades Escolares
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
          </ion-label>

          <article v-if="opcao.notificacao" class="absolute top-8 right-24">
            <div class="flex ion-align-items-center ion-justify-content-center h-16 w-16 absolute top--6 right--8 rounded-full notificacao z-1">
              <p class="ion-no-margin text-xxs text-white">1</p>
            </div>
            <ion-icon
                :icon="notifications"
                class="text-lg text-white"
                color="light"
            />
          </article>

          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
              color="light"
              size="large"
              class=""
          />
        </ion-item>
      </ion-list>
  </ion-page>
</template>

<script>
import {IonPage, IonItem, IonAvatar, IonLabel, IonList, IonIcon} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'
export default {
  name: 'AtividadesInicio',
  components: {IonPage, IonItem, IonAvatar, IonLabel, IonList, IonIcon},

  setup () {
    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),

      opcoes: [
        {
          ttl: 'Atividades Disponíveis',
          notificacao: 1,
          rota: 'atividades-disponiveis',
        },
        {
          ttl: 'Atividades entregues',
          notificacao: 0,
          rota: 'atividades-entregues',
        },
        {
          ttl: 'Meu desempenho',
          notificacao: 0,
          rota: 'meu-desempenho',
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
  --background: url('../../../public/assets/images/atividade-secundario.png') var(--ion-color-primary) no-repeat center/100%;
}
.text-white {
  color: white;
}

ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
}
</style>
