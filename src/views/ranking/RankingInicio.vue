<template>
  <ion-page>

    <ion-content>
      <!-- selecionar videoaula -->
      <h4 class="ml-16 text-white">
        Ranking
      </h4>

      <p class="ion-no-margin ion-margin-top ml-16 text-white">
        Qual ranking você quer ver?
      </p>

      <div class="ion-margin">
        <ion-button
            :color="rankingSelecionado === 'Escolar' ? 'light' : ''"
            class="ion-no-margin mr-8 text-none"
            @click="rankingSelecionado = 'Escolar'"
        >
          Escolar
        </ion-button>
        <ion-button
            :color="rankingSelecionado === 'Estadual' ? 'light' : ''"
            class="ion-no-margin text-none"
            @click="rankingSelecionado = 'Estadual'"
        >
          Estadual
        </ion-button>
      </div>

      <div class="fundo ion-padding rounded-top">
        <ion-label class="font-bold text-lg">
          Minha colocação geral:
        </ion-label>

        <!-- minhas posicoes -->
        <section class="flex">
          <div class="ion-margin-end">
            <p class=" mb-4">
              Ranking Escolar
            </p>

            <div class="ion-padding bg-primary rounded">
              <p class="ion-no-margin ion-margin-bottom text-white">
                <ion-icon
                    :icon="statsChart"
                    class="mb-4 vertical-middle"
                />
                2º lugar
              </p>

              <p class="ion-no-margin text-white">
                <ion-icon
                    :icon="star"
                    class="mb-4 vertical-middle"
                />
                8994 xp
              </p>
            </div>
          </div>

          <div>
            <p class=" mb-4">
              Ranking Estadual
            </p>

            <div class="ion-padding bg-primary rounded">
              <p class="ion-no-margin ion-margin-bottom text-white">
                <ion-icon
                    :icon="statsChart"
                    class="mb-4 vertical-middle"
                />
                2º lugar
              </p>

              <p class="ion-no-margin text-white">
                <ion-icon
                    :icon="star"
                    class="mb-4 vertical-middle"
                />
                8994 xp
              </p>
            </div>
          </div>
        </section>

        <!-- ranking separado pos mes-->
        <section class="ion-margin-vertical">
          <br>

          <ion-label class="font-bold text-lg">
            Qual ranking você quer ver?
          </ion-label>

          <div class="ion-margin-vertical">
            <ion-button
                :color="mesRanking === 'Mês atual' ? 'primary' : 'light'"
                class="ion-no-margin mr-8 text-none text-xs"
                @click="mesRanking = 'Mês atual'"
            >
              Mês atual
            </ion-button>
            <ion-button
                class="ion-no-margin mr-8 text-none text-xs"
                :color="mesRanking === 'Mês passado' ? 'primary' : 'light'"
                @click="mesRanking = 'Mês passado'"
            >
              Mês passado
            </ion-button>
            <ion-button
                class="ion-no-margin text-none text-xs"
                :color="mesRanking === 'Mês retrasado' ? 'primary' : 'light'"
                @click="mesRanking = 'Mês retrasado'"
            >
              Mês retrasado
            </ion-button>
          </div>

          <!-- destaques do mes selecionado -->
          <ion-list class="ion-margin-vertical ion-padding-vertical">
            <ion-label class="ion-margin-vertical font-bold text-lg">
              Destaques do mês atual
            </ion-label>

            <ion-item
                v-for="destaque in destaques"
                :key="destaque.nome+destaque.posicao"
                class="ion-margin-bottom bg-white rounded shadow"
                :class="{'mt-8':destaque.posicao === 1}"
            >
              <ion-avatar
                  slot="start"
                  class="border-3 border__linguagens"
                  :class="{'border__humanas':destaque.posicao === 1}"
              >
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
              </ion-avatar>

              <ion-label class="ion-margin-vertical">
                {{ destaque.nome }}

                <ion-text color="">
                  <p class="font-bold">
                    {{ destaque.posicao }}º lugar
                  </p>
                </ion-text>

                <ion-text color="" class="text-xxs">
                  <p class="text-xxs">
                    {{ destaque.escola }}
                  </p>
                </ion-text>
              </ion-label>

              <ion-text color="primary">
                <p class="font-bold">
                  {{ destaque.xp }}xp
                </p>
              </ion-text>
              <ion-icon
                  :icon="star"
                  class="absolute top-28 right-8 z--1"
                  :class="destaque.posicao === 1 ? 'opacity-40' : 'opacity-30'"
                  style="font-size: 36px;"
                  :color="destaque.posicao === 1 ? 'humanas' : 'primary'"
              />
            </ion-item>
          </ion-list>
        </section>

        <!-- ranking geralzao -->
        <ion-list class="ion-margin-vertical ion-padding-vertical">
          <ion-label class="ion-margin-vertical font-bold text-lg">
            Ranking Geral
          </ion-label>

          <ion-item class="mt-8 ion-margin-bottom bg-white rounded bg-primary">
            <ion-avatar
                slot="start"
            >
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
            </ion-avatar>

            <ion-label class="ion-margin-vertical text-white">
              Meu nomezão

              <ion-text color="">
                <p class="font-bold">
                  12º lugar
                </p>
              </ion-text>
            </ion-label>

            <ion-text color="light">
              <p class="font-bold">
                4398xp
              </p>
            </ion-text>
          </ion-item>

          <ion-item
              v-for="ranking in rankingGeral"
              :key="ranking.nome+ranking.posicao"
              class="mt-8 bg-white rounded"
          >
            <ion-avatar
                slot="start"
            >
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
            </ion-avatar>

            <ion-label class="ion-margin-vertical">
              {{ ranking.nome }} - {{ ranking.posicao }}º lugar

              <ion-text color="" class="text-xxs">
                <p class="text-xxs">
                  {{ ranking.escola }}
                </p>
              </ion-text>
            </ion-label>

            <ion-text color="primary" class="text-sm">
              <p class="font-bold text-sm">
                {{ ranking.xp }}xp
              </p>
            </ion-text>
          </ion-item>
        </ion-list>
        <ion-button expand="block" class="text-none">
          Ver mais...
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon, IonText, IonAvatar} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, statsChart, star} from 'ionicons/icons';
import { useRouter } from 'vue-router'

export default {
  name: 'RankingInicio',
  components: {IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon, IonText, IonAvatar},

  setup () {
    return {
      notifications,
      arrowForwardCircleOutline,
      statsChart,
      star,
      router: useRouter(),
    };
  },

  data () {
    return {
      rankingSelecionado: 'Escolar',
      mesRanking: 'Mês atual',

      destaques: [
        {
          img: '',
          nome: 'Lucaspio Masaple',
          posicao: 1,
          xp: 8404,
          escola: 'EEEFM Carlos Drummond de Andrade'
        },
        {
          img: '',
          nome: 'Lucaspio Masaple',
          posicao: 2,
          xp: 8404,
          escola: 'EEEFM Carlos Drummond de Andrade'
        },
        {
          img: '',
          nome: 'Lucaspio Masaple',
          posicao: 3,
          xp: 8404,
          escola: 'EEEFM Carlos Drummond de Andrade'
        },
      ],

      rankingGeral: [
        {
          img: '',
          nome: 'Lucaspio Masaple',
          posicao: 1,
          xp: 4284,
          escola: 'EEEFM Carlos Drummond de Andrade'
        },
        {
          img: '',
          nome: 'Lucaspio Masaple',
          posicao: 2,
          xp: 4284,
          escola: 'EEEFM Carlos Drummond de Andrade'
        },
        {
          img: '',
          nome: 'Lucaspio Masaple',
          posicao: 3,
          xp: 4284,
          escola: 'EEEFM Carlos Drummond de Andrade'
        },
      ],
    };
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
ion-item.select {
  --background: white;
}
ion-list {
  --background: transparent;
  background: transparent;
}
.text-white {
  color: white;
}

div.fundo {
  --background: url('../../../public/assets/images/bg-principal.png') center;
  background: url('../../../public/assets/images/bg-principal.png') center;
}
h2.font-bold {
  font-weight: 600;
}
.ml-16 {
  margin-left: 16px;
}
.text-sm {
  font-size: .9rem;
}
.text-xs {
  font-size: .8rem;
}
.text-xxs {
  font-size: .7rem;
}
</style>
