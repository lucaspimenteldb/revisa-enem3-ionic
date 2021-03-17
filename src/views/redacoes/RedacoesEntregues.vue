<template>
  <ion-page>
    <ion-content class="ion-padding-top">
      <!-- selecionar atividades -->
      <ion-item class="ion-margin-horizontal ion-margin-bottom white rounded">
        <ion-label>
          Selecionar redação...
        </ion-label>

        <ion-select>
          <ion-select-option>pei</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- lista de atividades-->
      <ion-list class="ion-padding rounded-top">
        <ion-label class="font-bold text-xl" color="primary">
          Redações Entregues
        </ion-label>

        <ion-item
            class="ion-margin-top rounded"
            v-for="atividade in atividades"
            :key="atividade.id"
            @click="irAvaliacao(atividade)"
            lines="none"
        >
          <div class="ion-padding-vertical flex flex-1 ion-justify-content-between ion-align-items-center">
            <ion-label class="text-white text-lg font-bold">
              <p class="text-white font-regular">
              </p>

              {{ atividade.titulo }}
            </ion-label>

            <div
                class="flex ion-align-items-center ion-justify-content-center w-60 h-60 bg-white border-3 rounded-full"
                :class="`border-${atividade.desempenho}`"
                v-if="atividade.resultado !== null"
            >
              <ion-text class="font-bold text-lg" color="primary">
                {{atividade.resultado}}
              </ion-text>
            </div>
          </div>

          <ion-icon
              slot="end"
              :icon="alarmOutline"
              color="warning"
              size="large"
              class="mr-8"
              v-if="atividade.resultado === null"
          />

        </ion-item>
      </ion-list>
      <Loading :isOpen="loading"></Loading>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline, appsOutline, checkmarkDoneOutline, alarmOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
import {ref} from 'vue';
import storage from "../../storage/StorageKey";
import api from "../../api/basicUrl";

export default {
  name: 'RedaçõesEntregues',
  components: {Loading, IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonText},

  setup () {
    const loading = ref(false);
    const user = ref({});
    return {
      router: useRouter(),
      notifications,
      arrowForwardCircleOutline,
      appsOutline,
      checkmarkDoneOutline,
      alarmOutline,
      loading,
      user,
      atividades: [
        // {
        //   ttl: 'XYZ mais eu',
        //   tema: '0',
        //   rota: 'correcao-simulados-entregues',
        //   nota: 880,
        //   desempenho: 'excelente',
        //   corrigida: true
        // },
        // {
        //   ttl: 'Pei pei pei',
        //   tema: '1',
        //   rota: 'correcao-atividades-entregues',
        //   nota: 800,
        //   desempenho: 'excelente',
        //   corrigida: true
        // },
        // {
        //   ttl: 'Xablau brau',
        //   tema: '2',
        //   rota: 'correcao-simulados-entregues',
        //   nota: 920,
        //   desempenho: 'excelente',
        //   corrigida: false
        // },
        // {
        //   ttl: 'Xablau brausd',
        //   tema: '3',
        //   rota: 'correcao-simulados-entregues',
        //   nota: 100,
        //   desempenho: 'muito-ruim',
        //   corrigida: true
        // },
        // {
        //   ttl: 'Xablau brausasdd',
        //   tema: '34',
        //   rota: 'correcao-simulados-entregues',
        //   nota: 100,
        //   desempenho: 'muito-ruim',
        //   corrigida: true
        // },
      ]
    }
  },

  methods: {
    irAvaliacao (redacao) {
      if (redacao.resultado) {
        this.router.push({path:'ver-correcao-redacao' , query: {redacao: JSON.stringify(redacao)}});
      }
    }
  },

  async ionViewWillEnter() {
    try{
      this.loading = true;
      let usuario = await storage.get('user');
      usuario = JSON.parse(usuario.value);
      this.user = usuario;

      let dados = await api.get('/redacoes-entregues/'+this.user.id);
      this.atividades = dados.data.redacoes;

    }catch (e) {
      console.log(e);
    }

    this.loading = false;
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
ion-item {
  --background: url('../../../public/assets/images/redacao-secundario.png') var(--ion-color-primary) no-repeat center/100%;
}
ion-item.white {
  --background: white;
}
.text-white {
  color: white;
}
ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../../public/assets/images/bg-principal.png') no-repeat center/100%;
}
</style>
