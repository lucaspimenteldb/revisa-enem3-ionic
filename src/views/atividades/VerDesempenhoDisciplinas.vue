<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Ver Atividades
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="rounded-top">
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
            Desempenho de Literatura
          </h2>
        </ion-label>
      </ion-item>

      <!-- select-->
      <ion-item class="ion-margin-horizontal ion-margin-bottom white rounded">
        <ion-label>
          Selecionar o mês desejado...
        </ion-label>

        <ion-select>
          <ion-select-option>pei</ion-select-option>
        </ion-select>
      </ion-item>

      <div class="ion-padding rounded-top bg__principal">
        <ion-label class="font-bold text-lg">
          Média Geral:
        </ion-label>

        <!-- media de acertos -->
        <section class="ion-margin-vertical flex">
          <article class="p-8 mr-8 bg-primary rounded">
            <ion-text class="text-white">
              Média
            </ion-text>

            <div>
              <ion-text class="mr-4 font-bold text-white">
                8 acertos
              </ion-text>
              <ion-icon
                  :icon="barChart"
                  color="light"
                  class="vertical-middle"
              />
            </div>
          </article>

          <article class="p-8 mr-8 bg-white rounded">
            <ion-text>
              Acertos totais
            </ion-text>

            <div>
              <ion-text class="mr-4 font-bold">
                90 acertos
              </ion-text>
              <ion-icon
                  :icon="checkmarkCircle"
                  color="success"
                  class="vertical-middle"
              />
            </div>
          </article>

          <article class="p-8 bg-white rounded">
            <ion-text>
              Erros totais
            </ion-text>

            <div>
              <ion-text class="mr-4 font-bold">
                80 erros
              </ion-text>
              <ion-icon
                  :icon="closeCircle"
                  color="danger"
                  class="vertical-middle"
              />
            </div>
          </article>
        </section>

        <!-- grafico com a evolucao da media-->
        <div class="mt-32">
          <ion-label class="font-bold text-lg">
            Evolução da minha média de acertos
          </ion-label>

          <section class="ion-margin-top flex ion-justify-content-between h-130">
            <article
                class="mr-8 flex flex-column ion-align-items-center ion-justify-content-end"
                v-for="mes in meses"
                :key="mes.mes"
            >
              <p class="ion-no-margin text-xs">
                {{ mes.media }}%
              </p>
              <div :style="`height: ${mes.media}px; width: 10px;`" class="bg-primary rounded"></div>
              <ion-text class="text-xs font-bold">
                {{ mes.mes }}
              </ion-text>
            </article>
          </section>
        </div>

        <!-- meus dados gerais da disciplina -->
        <div class="mt-32">
          <ion-label class="font-bold text-lg">
            Meus dados gerais
          </ion-label>

          <ion-item lines="none" class="ion-margin-top rounded">
            <ion-avatar slot="start">
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
            </ion-avatar>

            <ion-label>
              <h2 class="text-white">
                Andersoion Moura
              </h2>
              <p class="ion-no-margin font-bold text-white">
                MInha pontuação
              </p>
            </ion-label>

            <div>
              <p class="text-white font-bold">
                940xp
              </p>
            </div>
          </ion-item>

          <!-- card dos dados-->
          <ion-item class="ion-margin-vertical white rounded shadow" lines="none">
            <ion-label class="ion-text-wrap">
              <p>
                400 videoaulas assistidas
              </p>
              <p>
                38 assuntos finalizados
              </p>
              <p>
                400 questões respondidades
              </p>
            </ion-label>
          </ion-item>
        </div>

        <!-- pontos fortes e pontos fracos -->
        <section class="mt-32">
          <ion-label class="font-bold text-lg">
            Meus pontos fortes e fracos
          </ion-label>

          <ion-item
              class="ion-margin-vertical white rounded shadow"
              lines="none"
              v-for="forte in pontosFortes"
              :key="forte"
          >
            <ion-label class="ion-text-wrap">
              <p class="flex ion-justify-content-between ion-align-items-center font-bold">
                {{ forte }}

                <ion-icon
                    :icon="happyOutline"
                    color="success"
                    size="large"
                />
              </p>
            </ion-label>
          </ion-item>

          <ion-item
              class="ion-margin-vertical white rounded shadow"
              lines="none"
              v-for="medio in pontosMedios"
              :key="medio"
          >
            <ion-label class="ion-text-wrap">
              <p class="flex ion-justify-content-between ion-align-items-center font-bold">
                {{ medio }}

                <ion-icon
                    :icon="happyOutline"
                    color="warning"
                    size="large"
                />
              </p>
            </ion-label>
          </ion-item>

          <ion-item
              class="ion-margin-vertical white rounded shadow"
              lines="none"
              v-for="fraco in pontosFracos"
              :key="fraco"
          >
            <ion-label class="ion-text-wrap">
              <p class="flex ion-justify-content-between ion-align-items-center font-bold">
                {{ fraco }}

                <ion-icon
                    :icon="sadOutline"
                    color="danger"
                    size="large"
                />
              </p>
            </ion-label>
          </ion-item>
        </section>

        <ion-button class="text-none">
          ver mais
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonToolbar, IonTitle, IonContent, IonText, IonButton, IonSelect, IonIcon } from '@ionic/vue';
import { barChart, checkmarkCircle, closeCircle, happyOutline, sadOutline } from 'ionicons/icons'

export default {
  name: 'VerDesemepnhoDisciplinas',
  components: {IonPage, IonToolbar, IonContent, IonText, IonSelect, IonTitle, IonButton, IonIcon},

  setup () {
    return {
      barChart,
      checkmarkCircle,
      closeCircle,
      happyOutline,
      sadOutline
    }
  },

  data () {
    return {
      meses: [
        {
          mes: 'Mar',
          media: 100,
        },
        {
          mes: 'Abr',
          media: 78,
        },
        {
          mes: 'Mai',
          media: 82,
        },
        {
          mes: 'Jun',
          media: 80,
        },
        {
          mes: 'Jul',
          media: 88,
        },
        {
          mes: 'Ago',
          media: 86,
        },
        {
          mes: 'Set',
          media: 86,
        },
        {
          mes: 'Out',
          media: 88,
        },
        {
          mes: 'Nov',
          media: 90,
        },
        {
          mes: 'Dez',
          media: 92,
        },
      ],
      pontosFortes: [
          'bla bal',
          'Romasml'
      ],
      pontosMedios: [
          'bla balasd ',
          'Romasmlas'
      ],
      pontosFracos: [
          'bla balasdf',
          'Romasml asdff'
      ],
    };
  },

}
</script>

<style scoped>
ion-content, ion-item {
  --background: var(--ion-color-primary);
}
ion-item.white {
  --background: white;
}
.bg__principal {
  --background: url('../../../public/assets/images/bg-principal.png') center/100%;
  background: url('../../../public/assets/images/bg-principal.png') center/100%;
}
.text-white {
  color: #fff;
}
</style>
