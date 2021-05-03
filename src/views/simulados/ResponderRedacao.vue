<template>
  <!-- modal para enviar a redacao -->
  <ion-modal
      :is-open="isOpenRef"
      css-class="modalzao"
      @onDidDismiss="setOpen(false)"
  >
    <ion-content id="modal-redacao" class="ion-padding">
      <ion-fab vertical="top" horizontal="end">
        <ion-fab-button color="light" @click="setOpen(false)">
          <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-text color="primary">
        <h3 class="mt-64">
          Enviar redação
        </h3>
      </ion-text>

      <ion-text color="danger">
        <p class="text-sm">
          Lembre-se: para que a sua redação seja avaliada, ela deve ser escrita com tinta preta, na folha própria e ter até 30 linhas.
        </p>
      </ion-text>

      <ion-item class="shadow rounded">
        <ion-label position="floating">
          Anexar redação
        </ion-label>
        <ion-input></ion-input>
        <ion-icon
            slot="end"
            :icon="documentTextOutline"
            class="mt-16"
        />
      </ion-item>

      <ion-button
          fill="clear"
          color="danger"
          class="mt-16 text-none"
      >
        Cancelar
      </ion-button>

      <ion-button class="mt-16 text-none">
        Enviar redação
      </ion-button>
    </ion-content>
  </ion-modal>
  <ion-page>
    <ion-content>
      <div class="ion-padding fundo-cima">
        <h4 class="ion-margin-vertical text-white">
         Simulado Estadual - Redação
        </h4>
      </div>

      <div class="ion-padding rounded-top bg-papel">
        <!-- negocio da redacao -->
        <ion-text color="primary">
          <h3 class="mb-4 font-bold text-lg">
            Redação Estadual
          </h3>
        </ion-text>

        <p class="mt-0 text-black">
          Redação estadual, faça com calma que tudo dará certo. Nós sabemos que você é capaz!
        </p>

        <ion-item
            class="ion-margin-top rounded"
            lines="none"
        >
          <ion-label>
            <b>
              Tema:
            </b>

            <p>
              Os impactos de alguma coisa na sua vida
            </p>
          </ion-label>
        </ion-item>

        <ion-text color="primary">
          <h3 class="mt-32 mb-4 font-bold text-lg">
            Enviar redação
          </h3>
        </ion-text>

        <ion-button fill="outline" class="text-none">
          Baixar redação
        </ion-button>
        <ion-button class="text-none" @click="setOpen(true)">
            Enviar redação
        </ion-button>

        <iframe
            src="https://mundonativodigital.files.wordpress.com/2016/03/cibercultura-pierre-levy.pdf"
            style="width:100%; height:500px;"
            frameborder="0"
            class="mt-8"
        />

        <!-- video para fazer a redacao -->
        <ion-text color="primary">
          <h3 class="mt-32 mb-4 font-bold text-lg">
            Como fazer a minha redação?
          </h3>
        </ion-text>
        <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/awYnac3pBms"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="ion-margin-vertical"
        />
      </div>
      <Loading :isOpen="loading"></Loading>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage,IonContent, IonItem, IonList,  IonButton, IonLabel, IonText, IonFab, IonIcon, IonInput, IonFabButton, menuController, modalController, IonModal} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, closeCircleOutline, documentTextOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
// import api from '../../api/basicUrl';
import { ref } from 'vue';
// import storage from '../../storage/StorageKey';

export default {
  name: 'ResponderRedacao',
  // components: {IonPage, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading},
  components: {IonPage, IonContent, IonItem, IonList, IonButton, IonLabel, IonText, IonIcon, IonInput, IonFab, IonFabButton, menuController, modalController, IonModal, Loading},

  setup () {
    const loading = ref(false);
    const isOpenRef = ref(false);
    const setOpen = state => isOpenRef.value = state;

    return {
      notifications,
      arrowForwardCircleOutline,
      closeCircleOutline,
      documentTextOutline,
      router: useRouter(),
      route: useRoute(),
      isOpenRef,
      setOpen,
      loading,
    }
  },

  data () {
    return {
      simulados: [
        {
          dia: 1,
          inicio: '22/05/2020',
          fim: '30/05/2020',
          tempo: 120,
          areas: 'Linguagens e Humanas',
          id: 235,
        },
        {
          dia: 2,
          inicio: '22/05/2020',
          fim: '30/05/2020',
          tempo: 120,
          areas: 'Exatas e Natureza',
          id: 235,
        },
      ],
      redacao: {
        tempo: '4 dias',
        tema: 'O desafio de reduzir as desigualdades entre as regiões do Brasil',
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
#modal-redacao {
  --background: white;
}
ion-item {
  --background: white;
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
.bg-papel {
  --background: url('../../../public/assets/images/bg-principal.png') center;
  background: url('../../../public/assets/images/bg-principal.png') center;
}
ion-button {
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
h2.font-bold {
  font-weight: 600;
}
</style>
