<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical">
         1º Dia de Simulado
        </h4>
      </div>

      <ion-list class="ion-padding-vertical rounded-top">
        <!-- cardzao da questao -->
        <ion-item lines="none">
          <div class="flex flex-column text-black">
            <p class="flex ion-align-items-center ion-justify-content-between">
              <b>Questão - {{ questao.numero }}</b>

              <ion-button
                  @click="questao.salvo = !questao.salvo"
                  size="small"
                  class="ion-no-padding w-40 h-40"
                  color="transparent"
              >
                <ion-icon
                    :color="questao.salvo ? 'warning' : 'primary'"
                    :icon="questao.salvo ? bookmarks : bookmarksOutline"
                    style="font-size: 34px;"
                />
              </ion-button>

            </p>

            <!--      questaozona      -->
            <section>
              <h5 class="text-sm font-bold">
                {{ questao.area }}
              </h5>

              <p>
                {{ questao.enunciado }}
              </p>


              <ion-button
                  v-for="alternativa in questao.alternativas"
                  :key="alternativa.alternativa"
                  class="mb-8 ion-text-wrap ion-text-left border-1 shadow rounded cursor-pointer alternativas"
                  :class="questao.selecionada === alternativa.alternativa ? 'text-white' : 'text-black'"
                  :color="questao.selecionada === alternativa.alternativa ? 'primary' : 'white'"
                  @click="questao.selecionada = alternativa.alternativa"
                  expand="block"
              >

                  <div class="ion-margin-vertical mr-8 pt-10 text-black border-2 border-primary bg-white rounded-full alternativa ion-text-center pointer-events-none">
                    {{ alternativa.alternativa }}
                  </div>

                  <p class="text-sm pointer-events-none">
                    {{ alternativa.texto }}
                  </p>
              </ion-button>
            </section>

            <!--      menu da questão      -->
            <section class="mt-8">
              <ion-button
                  fill="outline"
                  color="primary"
                  class="mr-2 text-none"
              >
                Anterior
              </ion-button>
              <ion-button
                  fill="outline"
                  color="primary"
                  class="text-none"
              >
                Próxima
              </ion-button>

              <ion-button
                  color="primary"
                  class="ion-float-right text-none font-bold"
              >
                Finalizar simulado
              </ion-button>
            </section>
          </div>
        </ion-item>
      </ion-list>
      <Loading :isOpen="loading"></Loading>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage,IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, bookmarks, bookmarksOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
import api from '../../api/basicUrl';
import { ref } from 'vue';
import storage from '../../storage/StorageKey';

export default {
  name: 'Simulados',
  components: {IonPage, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading},

  setup () {
    const loading = ref(false);

    return {
      bookmarks,
      bookmarksOutline,
      router: useRouter(),
      route: useRoute(),
      loading,
    }
  },

  data () {
    return {
      questao: {
        numero: '3/45',
        salvo: false,
        area: 'Linguagens, Códigos e suas Tecnologias',
        enunciado: 'Embora particularidades na produção mediada pela tecnologia aproximem a escrita da oralidade, isso não significa que as pessoas estejam escrevendo errado. Muitos buscam, tão somente, adaptar o uso da linguagem ao suporte utilizado: "O contexto é que define o registro de língua. Se existe um limite de espaço, naturalmente, o sujeito irá usar mais abreviaturas, como faria no papel", afirma um professor do Departamento de Linguagem e Tecnologia do Cefet-MG. Da mesma forma, é preciso considerar a capacidade do destinatário de interpretar corretamente a mensagem emitida. No entendimento do pesquisador, a escola, às vezes, insiste em ensinar um registro utilizado apenas em contextos específicos, o que acaba por desestimular o aluno, que não vê sentido em empregar tal modelo em outras situações. Embora particularidades na produção mediada pela tecnologia aproximem a escrita da oralidade, isso não significa que as pessoas estejam escrevendo errado. Muitos buscam, tão somente, adaptar o uso da linguagem ao suporte utilizado: "O contexto é que define o registro de língua. Se existe um limite de espaço, naturalmente, o sujeito irá usar mais abreviaturas, como faria no papel", afirma um professor do Departamento de Linguagem e Tecnologia do Cefet-MG. Da mesma forma, é preciso considerar a capacidade do destinatário de interpretar corretamente a mensagem emitida. No entendimento do pesquisador, a escola, às vezes, insiste em ensinar um registro utilizado apenas em contextos específicos, o que acaba por desestimular o aluno, que não vê sentido em empregar tal modelo em outras situações.',
        alternativas: [
          {
            alternativa: 'A',
            texto: 'interagir por meio da linguagem formal no contexto digital.'
          },
          {
            alternativa: 'B',
            texto: 'buscar alternativas para estabelecer melhores contatos on-line.'
          },
          {
            alternativa: 'C',
            texto: 'adotar o uso de uma mesma norma nos diferentes suportes tecnológicos.'
          },
          {
            alternativa: 'D',
            texto: 'desenvolver habilidades para compreender os textos postados na web.'
          },
          {
            alternativa: 'E',
            texto: 'perceber as especificidades das linguagens em diferentes ambientes digitais.'
          },
        ],
        selecionada: null,
      },
      simulado: {
        duracao: '180',
        inicio: '14/11 às 9:85',
        disponivel: '124/124/124 e 1924/2/42',
        areas: 'Linguagens e Ciências Humanas'
      }
    }
  },

  methods :{

  },
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
ion-item {
  --background: white;
}
ion-list {
  background: white;
  --background: white;
}
.alternativas {
  height: auto;
}
.alternativa {
  min-width: 40px;
  width: 40px;
  min-height: 40px;
  height: 40px;
}
.fundo-cima {
  background: url('../../../public/assets/images/simulado-estadual-fundo.png') var(--ion-color-primary) no-repeat center/100%;
}
.text-black {
  color: black;
}
.text-white {
  color: white;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.fundo-tudo {
  padding-top: 12px;
  height: 58px;
  width: 100%;
  bottom: -40px;
  left: 0;
}
h2.font-bold {
  font-weight: 600;
}
</style>
