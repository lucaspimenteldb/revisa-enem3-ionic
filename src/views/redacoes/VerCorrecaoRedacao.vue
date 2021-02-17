<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Correção da redação
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-label class="ion-padding font-bold text-lg">
          Correção da Redação - Tema 0

          <p class="ml-16">
            Tema da redação aqui
          </p>
        </ion-label>

        <div class="ion-padding bg-white">
          <ion-text>
            <p class="font-bold">
              Avaliação do corretor
            </p>

            <p>
              Olá! Lorem ipsum dolor sit amet, consectetur adipisicing elit. At ipsa iure maiores perferendis vel! Aperiam consequatur deserunt eligendi eum excepturi laborum nisi nostrum quidem. Asperiores aspernatur facilis molestiae nobis tenetur.
            </p>

            <h4>
              Nota: 1000/1000
            </h4>
          </ion-text>
        </div>

        <ion-item
            class="ion-margin-top flex ion-align-items-center ion-justify-content-between lista__professores"
            v-for="opcao in opcoes"
            :key="opcao.ttl+ 'competencia'"
            lines="none"
        >
          <div class="ion-margin-vertical mr-8 flex ion-align-items-center ion-justify-content-center bg-primary rounded-full h-40 w-40">
            <ion-text class="text-white text-sm font-bold">
              {{ opcao.nota}}
            </ion-text>
          </div>

          <ion-text class="ion-margin-vertical mr-8 text-xs">
            {{ opcao.ttl }}
          </ion-text>

          <div class="ml-auto">
            <ion-text class="">
              {{ opcao.competencia }}
            </ion-text>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'
export default {
  name: 'VerCorrecaoRedacao',
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonText},

  setup () {
    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),

      opcoes: [
        {
          ttl: 'Compreender o tema e não fugir do que é proposto',
          competencia: 'C1',
          nota: 120,
        },
        {
          ttl: 'Selecionar, relacionar, contextualizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista',
          competencia: 'C2',
          nota: 200,
        },
        {
          ttl: 'Conhecimento dos mecanismos linguísticos necessários para construção da argumentação',
          competencia: 'C3',
          nota: 200,
        },
        {
          ttl: 'Respeito aos direitos humanos',
          competencia: 'C4',
          nota: 160,
        },
        {
          ttl: 'Domínio da escrita da língua portuguesa',
          competencia: 'C5',
          nota: 200,
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
.text-white {
  color: white;
}

ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
}
.ml-16 {
  margin-left: 16px;
}
</style>
