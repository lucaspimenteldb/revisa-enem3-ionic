<template>
  <ion-page>

    <ion-content >
      <ion-list>
        <ion-label class="ion-padding font-bold text-lg">
          Correção da Redação - {{redacao.titulo}}

          <p class="ml-16">
            {{redacao.titulo}}
          </p>
        </ion-label>

        <div class="ion-padding bg-white">
          <ion-text>
            <p class="font-bold">
              Avaliação do corretor
            </p>

            <p style="white-space: pre-line; text-align: left">
              {{redacao.avaliacao}}
            </p>

            <h4>
              Nota: {{redacao.resultado}}/1000
            </h4>
          </ion-text>
        </div>

        <ion-item
            class="ion-margin-top flex ion-align-items-center ion-justify-content-between lista__professores"
            v-for="(opcao, index) in opcoes"
            :key="index"
            lines="none"
        >
          <div class="ion-margin-vertical mr-8 flex ion-align-items-center ion-justify-content-center bg-primary rounded-full h-40 w-40">
            <ion-text class="text-white text-sm font-bold">
              {{ opcao.resultado}}
            </ion-text>
          </div>

          <ion-text class="ion-margin-vertical mr-8 text-xs">
            {{ opcao.descricao }}
          </ion-text>

          <div class="ml-auto">
            <ion-text class="">
              {{ 'C'+(index + 1) }}
            </ion-text>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue';

export default {
  name: 'VerCorrecaoRedacao',
  components: {IonPage, IonContent, IonItem, IonLabel, IonList, IonText},

  setup () {
    const redacao = ref({});
    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),
      route: useRoute(),
      redacao,

      opcoes: [
        // {
        //   ttl: 'Compreender o tema e não fugir do que é proposto',
        //   competencia: 'C1',
        //   nota: 120,
        // },
        // {
        //   ttl: 'Selecionar, relacionar, contextualizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista',
        //   competencia: 'C2',
        //   nota: 200,
        // },
        // {
        //   ttl: 'Conhecimento dos mecanismos linguísticos necessários para construção da argumentação',
        //   competencia: 'C3',
        //   nota: 200,
        // },
        // {
        //   ttl: 'Respeito aos direitos humanos',
        //   competencia: 'C4',
        //   nota: 160,
        // },
        // {
        //   ttl: 'Domínio da escrita da língua portuguesa',
        //   competencia: 'C5',
        //   nota: 200,
        // },
      ]
    }
  },

  ionViewWillEnter () {
    this.redacao = JSON.parse(this.route.query.redacao);
    this.opcoes = this.redacao.competencias;
    console.log(this.redacao);
  }
}
</script>

<style scoped>
ion-content {
  --background: url('../../../public/assets/images/bg-principal.png')  center/100%;
  background: url('../../../public/assets/images/bg-principal.png') center/100%;
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
