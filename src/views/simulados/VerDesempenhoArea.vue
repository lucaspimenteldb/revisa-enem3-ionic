<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
          Desempenho Simulados Estaduais
        </h4>
        <p class="text-white">Simula XYZzA</p>
      </div>

      <ion-list class="ion-padding rounded-top">
        <ion-text color="primary">
          <h3 class="font-bold text-lg">Revisão do Gabarito - Linguagens</h3>
        </ion-text>
        <p class="mt-0 font-regular text-black">
          Clique na questão desejada para vê-la com a sua resolução
        </p>

        <ion-button fill="solid" color="primary" class="text-none font-bold">
          Todas
        </ion-button>

        <section class="flex">
          <ion-button
            fill="outline"
            color="primary"
            class="text-none font-bold"
          >
            Corretas
          </ion-button>
          <ion-button
            fill="outline"
            color="primary"
            class="text-none font-bold"
          >
            Erradas
          </ion-button>
          <ion-button
            fill="outline"
            color="primary"
            class="text-none font-bold"
          >
            Em branco
          </ion-button>
        </section>

        <!-- questoes do gabarito -->
        <section class="mt-16 d-flex">
          <ion-button
            fill="solid"
            color="light"
            class="
              ion-no-padding
              text-none
              font-bold
              border-muito-ruim border-2
              rounded-sm
              btn-gabarito
            "
          >
            1
            <ion-icon
              :icon="closeCircleOutline"
              style="font-size: 22px"
              color="danger"
            />
          </ion-button>
          <ion-button
            fill="solid"
            color="light"
            class="
              ion-no-padding
              text-none
              font-bold
              border-excelente border-2
              rounded-sm
              btn-gabarito
            "
          >
            2
            <ion-icon
              :icon="checkmarkCircleOutline"
              style="font-size: 22px"
              color="success"
            />
          </ion-button>
          <ion-button
            fill="solid"
            color="light"
            class="
              ion-no-padding
              text-none
              font-bold
              border-2
              rounded-sm
              btn-gabarito
            "
          >
            3
            <ion-icon
              :icon="ellipseOutline"
              style="font-size: 22px"
              color="dark"
            />
          </ion-button>
        </section>
      </ion-list>

      <!-- questaozona -->
      <section class="ion-padding bg-white">
        <ion-text color="primary">
          <h3 class="font-bold text-lg">Questão 1 - Linguagens</h3>
        </ion-text>

        <h4 class="font-bold text-lg">Inglês - Interpretação de texto</h4>
        <p class="mt-0 font-regular">
          A banda The killers é conhecida mundialmente por ter suas músicas
          sempre nas paradas de sucesso. Sobre a música Mr. Brightside, é
          ressaltado:
        </p>
      </section>
      <section class="ion-padding bg-white">
        <ion-button
          v-for="alternativa in questao.alternativas"
          :key="alternativa.alternativa"
          class="
            mb-8
            ion-text-wrap 
						ion-text-left
            border-1
            shadow
            rounded
            cursor-pointer
            alternativas
            text-none
          "
          :class="
            { 'bg-verde': (questao.selecionada === alternativa.alternativa && questao.selecionada === questao.gabarito) || (alternativa.alternativa === questao.gabarito), 'bg-white': questao.selecionada != alternativa.alternativa, 'bg-vermelho': questao.selecionada === alternativa.alternativa && questao.selecionada != questao.gabarito}
          "
          expand="block"
        >
          <div
            class="
              ion-margin-vertical
              mr-8
              pt-10
              text-black
              border-2 
              bg-white
              rounded-full
              alternativa
              ion-text-center
              pointer-events-none
            "
						:class="(questao.selecionada === alternativa.alternativa && questao.selecionada === questao.gabarito) || (alternativa.alternativa === questao.gabarito) ? 'border-excelente' : 'border-primary'"
          >
            {{ alternativa.alternativa }}
          </div>

          <p
            class="mr-auto text-xs pointer-events-none text-alternativa"
						:class="{'text-white': (questao.selecionada === alternativa.alternativa && questao.selecionada === questao.gabarito) || (questao.selecionada === alternativa.alternativa && questao.selecionada != questao.gabarito) || (alternativa.alternativa === questao.gabarito), 'text-black': questao.selecionada != alternativa.alternativa}"
            v-html="alternativa.texto"
          ></p>
        </ion-button>
      </section>

			<!-- aqui a gente passa, volta a questao e revisa numa videoaula relacionada -->
			<section class="ion-padding-horizontal flex bg-white ion-wrap">
          <ion-button
            fill="outline"
            color="primary"
            class="text-none font-bold"
          >
            Quest. anterior
          </ion-button>
          <ion-button
            fill="outline"
            color="primary"
            class="text-none font-bold"
          >
            Próxima quest.
          </ion-button>
          <ion-button
            fill="solid"
            color="primary"
            class="text-none font-bold"
          >
            Revisar questão
          </ion-button>
        </section>

				<section class="ion-padding-top ion-padding-horizontal bg-white">
					<ion-text color="primary">
						<h3 class="font-bold text-lg">
							Resolução das questões
						</h3>
					</ion-text>
					<ion-button
            fill="outline"
            color="primary"
            class="text-none font-bold"
          >
            Resoluçao vídeo
          </ion-button>
          <ion-button
            fill="solid"
            color="primary"
            class="text-none font-bold"
          >
            Resoluçao texto
          </ion-button>

					<ion-text color="primary">
						<h6 class="ion-padding-top font-bold">
							Resolução das questão em texto
						</h6>
					</ion-text>

					<p class="ion-padding-bottom">
						No texto, é salientado que a música Mr. Brightside quebrou um novo recorde ao passar 5 anos no top 100 de músicas do Reino Unido. Porém, é apontado que a música não obteve uma estreia significativa e não conseguiu tanto destaque no primeiro momento
					</p>

				</section>
      <Loading :isOpen="loading"></Loading>
      <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
    </ion-content>
  </ion-page>
</template>

<script>
// import {IonPage,IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText} from '@ionic/vue';
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonText,
  IonIcon,
} from "@ionic/vue";
import {
  ellipseOutline,
  checkmarkCircleOutline,
  arrowForwardCircleOutline,
  closeCircleOutline,
  gridOutline,
} from "ionicons/icons";
import { useRouter, useRoute } from "vue-router";
import Loading from "../../components/auxiliares/Loading";
import api from "../../api/basicUrl";
import { ref } from "vue";
import storage from "../../storage/StorageKey";
import alerts from "../../mixins/Alerts";
import AlertGeneric from "../../components/auxiliares/AlertGeneric";

export default {
  name: "Simulados",
  mixins: [alerts],
  // components: {IonPage, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading},
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonText,
    IonIcon,
    Loading,
    AlertGeneric,
  },

  setup() {
    const loading = ref(false);

    return {
      checkmarkCircleOutline,
      closeCircleOutline,
      arrowForwardCircleOutline,
      ellipseOutline,
      gridOutline,
      router: useRouter(),
      route: useRoute(),
      loading,
    };
  },

  data() {
    return {
      areas: [
        {
          area: "Linguagens",
          cor: "linguagens",
          nota: 199.8,
          rota: "ver-desempenho-area",
        },
        {
          area: "Humanas",
          cor: "humanas",
          nota: 199.8,
          rota: "ver-desempenho-area",
        },
        {
          area: "Matemática",
          cor: "matematica",
          nota: 199.8,
          rota: "ver-desempenho-area",
        },
        {
          area: "Natureza",
          cor: "natureza",
          nota: 199.8,
          rota: "ver-desempenho-area",
        },
        {
          area: "Redação",
          cor: "tertiary",
          nota: 800,
          rota: "ver-desempenho-redacao",
        },
      ],

      questao: {
				selecionada: "A",
				gabarito: "B",
        alternativas: [
          {
            alternativa: "A",
            texto: "O quanto a música foi um fracasso",
          },
          {
            alternativa: "B",
            texto: "Como a música sempre esteve em todas as paradas de sucesso, desde o seu lançamento",
          },
          {
            alternativa: "C",
            texto: "Não obteve uma estreia significativa, mas depois se manteve nas paradas",
          },
          {
            alternativa: "D",
            texto: "Só obteve sucesso nos Estados Unidos",
          },
          {
            alternativa: "E",
            texto: "Obteve um sucesso passageiro, estando no topo só durante a sua estreia",
          },
        ],
      },
      user: {},
    };
  },

  methods: {
  },

  async ionViewWillEnter() {
    try {
      this.loading = false;
      this.loading = true;
      let usuario = await storage.get("user");
      usuario = JSON.parse(usuario.value);
      this.user = usuario;
      let dados = await api.get("/simulado-estaduais-master");
      // this.simulados = dados.data.simulados;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.alertErro(e);
    }
  },
};
</script>

<style scoped>
.btn-gabarito {
  width: 48px;
  --width: 48px;
}
ion-content {
  --background: var(--ion-color-primary);
}
ion-item {
  --background: white;
}
.fundo-cima {
  background: url("../../../public/assets/images/simulado-estadual-fundo.png")
    var(--ion-color-primary) no-repeat center/100%;
}
.text-black {
  color: black;
}
.text-white {
  color: white;
}
ion-list {
  --background: url("../../../public/assets/images/bg-principal.png") center;
  background: url("../../../public/assets/images/bg-principal.png") center;
}
.iniciar-simulado {
  width: 160px;
  font-size: 1rem;
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
.bg-verde {
  background: #0c9041;
}

.bg-danger {
  background: #e04a2d;
}

.bg-block {
  background: #fcb812;
}

h2.font-bold {
  font-weight: 600;
}
.text-md {
  font-size: 1rem;
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
.text-alternativa {
  font-family: arial, sans, sans-serif;
  font-size: 13px;
  text-transform: initial;
}
</style>
