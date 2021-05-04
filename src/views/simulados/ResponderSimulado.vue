<template>
  <ion-page>
    <!--  menuzao lateral para ver o gabarito e os detalhes  -->
    <ion-menu
        side="end"
        menu-id="gabarito"
        content-id="responder"
    >
      <ion-content id="menuzao">
        <ion-fab vertical="top" horizontal="end">
          <ion-fab-button color="light" @click="toggleMenu">
            <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <ion-list class="mt-64">
          <ion-item lines="none" @click="setOpen(true)">
            <ion-label class="text-white">
              Ver gabarito
            </ion-label>
          </ion-item>
          <ion-item lines="none" class="mt-8">
            <ion-label class="text-white">
              Detalhes do simulado
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- modal para finalizar o simulado -->
    <ion-modal
        :is-open="finalizarOpen"
        css-class="modalFinalizar"
        @onDidDismiss="setFinalizarOpen(false)"
        mode="md"
    >
      <ion-content id="finalizar-simulado-modal" class="ion-padding">
        <ion-fab vertical="top" horizontal="end">
          <ion-fab-button color="light" @click="setFinalizarOpen(false)">
            <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <h3 class="mt-64 text-white">
          1º dia de simulado
        </h3>

        <p class="text-white">
          Tem certeza que deseja finalizar e enviar o seu simulado?
        </p>

        <ion-button
            color="danger"
            class="text-none"
        >
          Cancelar
        </ion-button>
        <ion-button
            class="text-primary text-none font-bold bg-white rounded"
        >
          Finalizar simulado
        </ion-button>
      </ion-content>
    </ion-modal>

    <!--  modal com o gabarito das coisas ou os detalhes  -->
    <ion-modal
        :is-open="isOpenRef"
        css-class="modalzao"
        @onDidDismiss="setOpen(false)"
        mode="md"
    >
      <ion-content id="gabarito-modal">
        <ion-fab vertical="top" horizontal="end">
          <ion-fab-button color="light" @click="setOpen(false)">
            <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <!--    ver o gabairto da área    -->
        <div
            v-for="(gabarito, i) in meuGabaritoQuestoes"
            :key="gabarito.area"
            :class="i === 0 ? 'mt-80' : 'mt-8'"
            @click="gabarito.aberto = !gabarito.aberto"
        >
          <ion-item
              class="pv-8"
              lines="none"
          >
            <ion-icon
                slot="start"
                :icon="gridOutline"
                :color="gabarito.color"
            />
            <ion-label color="" class="ion-text-wrap">
              <p class="font-bold text-black">
                Gabarito
              </p>
              <p class="text-md font-bold text-black">
                {{ gabarito.area }}
              </p>
            </ion-label>
            <ion-icon
                slot="end"
                :icon="gabarito.aberto ? chevronUpOutline : chevronDownOutline"
                color="dark"
            />
          </ion-item>

          <!--     botao das questoes do gabarito     -->
          <section v-if="gabarito.aberto" class="ion-padding-horizontal">
            <ion-button
                v-for="questao in gabarito.questoes"
                :key="`questao-${questao}`"
                class="mr-8 mb-8 btn-questao-gabarito rounded-sm"
                :class="questao % 2 === 0 ? 'border-2' : 'border-2 border-ruim'"
            >
              <div class="flex flex-column ion-align-items-center ion-justify-content-center">
                <p class="mt-12 mb-0 text-black">
                  {{ questao }}
                </p>

                <p class="mt-8 text-black block font-bold">
                  <span v-if="questao % 2 === 0">A</span>
                  <span v-if="questao % 2 !== 0">_</span>
                </p>
              </div>

              <ion-icon
                  :icon="bookmarksOutline"
                  v-if="questao % 2 === 0"
                  color="warning"
                  class="mt-1 absolute top-0 right--16 font-bold"
                  style="font-size: 16px;"
              />
            </ion-button>
          </section>
        </div>
      </ion-content>
    </ion-modal>

    <!-- comeco do conteudo -->
    <ion-content id="responder">
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
         1º Dia de Simulado
        </h4>

        <ion-fab class="mt-8" vertical="top" horizontal="end">
          <ion-fab-button color="light" @click="toggleMenu">
            <ion-icon :icon="menuOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>

      <ion-list class="ion-padding-vertical rounded-top questao">
        <!-- cardzao da questao -->
        <ion-item lines="none" class="questao">
          <div class="flex flex-column text-black">
            <div class="ion-padding flex ion-align-items-center ion-justify-content-center font-bold bg-primary rounded">
              <ion-icon
                  :icon="timeOutline"
                  style="font-size: 30px;"
                  class="mr-4 text-white"
              />

              <p class="ion-no-margin font-bold text-white">
                restam 4:30
              </p>
            </div>

            <p class="ion-no-margin flex ion-align-items-center ion-justify-content-between">
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
                  class="mb-8 ion-text-wrap ion-text-left border-1 shadow rounded cursor-pointer alternativas text-none"
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
                  @click="setFinalizarOpen(true)"
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
// import {IonPage,IonTitle, IonHeader, IonToolbar, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText, IonMenu, IonFab, IonFabButton, menuController, modalController, IonModal} from '@ionic/vue';
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonMenu, IonFab, IonFabButton, menuController, IonModal} from '@ionic/vue';
import {bookmarks, bookmarksOutline, closeCircleOutline, menuOutline, gridOutline, chevronDownOutline, chevronUpOutline, timeOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
// import api from '../../api/basicUrl';
import { ref } from 'vue';
// import storage from '../../storage/StorageKey';

export default {
  name: 'Simulados',
  // components: {IonPage, IonTitle, IonHeader, IonToolbar, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading, IonMenu, IonFab, IonFabButton, IonModal},
  components: {IonPage, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, Loading, IonMenu, IonFab, IonFabButton, IonModal},

  setup () {
    const loading = ref(false);
    const isOpenRef = ref(false);
    const setOpen = state => isOpenRef.value = state;
    const finalizarOpen = ref(false);
    const setFinalizarOpen = state => finalizarOpen.value = state;

    return {
      bookmarks,
      bookmarksOutline,
      closeCircleOutline,
      menuOutline,
      gridOutline,
      chevronDownOutline,
      chevronUpOutline,
      timeOutline,
      isOpenRef,
      setOpen,
      finalizarOpen,
      setFinalizarOpen,
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
      },

      meuGabaritoQuestoes: [
        {
          area: 'Linguagens, Códigos e suas Tecnologias',
          icon: '/iconsinhos/linguagens-cor.png',
          questoes: 44,
          color: 'linguagens',
          aberto: ref(false),
        },
        {
          area: 'Ciências Humanas e suas Tecnologias',
          icon: '/iconsinhos/humanas-cor.png',
          questoes: 44,
          color: 'humanas',
          aberto: ref(false),
        }
      ],
    }
  },

  methods: {
    toggleMenu() {
      menuController.enable(true, 'gabarito');
      menuController.toggle('gabarito');
    },
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
ion-item.questao {
  --background: white;
}
ion-list.questao {
  background: white;
  --background: white;
}
#menuzao ion-item, #menuzao ion-list {
  background: var(--ion-color-primary);
  --background: var(--ion-color-primary);
}
#gabarito-modal {
  background: rgba(20, 20, 20, .7);
  --background: rgba(20, 20, 20, .7);
}
#gabarito ion-item, #gabarito ion-list {
  background: #fff;
  --background: #fff;
}
.btn-questao-gabarito {
  width: 54px;
  height: 54px;
  --background: white;
  background: white;
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
.text-primary {
  color: #000952;
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
ion-button {
  --box-shadow: none;
}
.bg-white {
  --background: white;
}
</style>
