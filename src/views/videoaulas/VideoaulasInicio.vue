<template>
  <ion-page>
    <ion-content>
      <ion-title>
        Videoaulas - {{`Volume ${route.params.id}`}}
      </ion-title>

      <!-- selecionar disciplina -->
      <ion-item class="ion-margin ion-margin-bottom white rounded select">
        <ion-label>
          Selecionar disciplina...
        </ion-label>

        <ion-select @IonChange="pesquisarMateria">
          <ion-select-option :value="'todas'">Todas</ion-select-option>
          <ion-select-option :value="disciplina.id" v-for="disciplina in disciplinasAuxiliar" :key="disciplina.id">{{disciplina.ttl}}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-list class="ion-padding rounded-top">
        <ion-label class="font-bold text-lg">
          {{`Volume ${route.params.id}`}}
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="disciplina in disciplinas"
            :key="disciplina.ttl+ 'acessar'"
            @click="() => router.push({path: '/tabs/videoaulas-assuntos/'+disciplina.id + '/volume/' + route.params.id, query: {disciplina: disciplina.ttl}})"
            lines="none"
        >
          <ion-label class="ion-padding-vertical text-white">
            <h2 class="font-bold text-white text-xl">
              {{ disciplina.ttl }}
            </h2>

            <article class="mt-8">
              <ion-text>
                <p>
                  {{disciplina.msg}}
                </p>
              </ion-text>

              <ion-progress-bar
                  :value="disciplina.progresso"
                  :color="'humanas'"
                  :buffer="disciplina.progresso"
                  class="w-3/5"
              />
            </article>
          </ion-label>

          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
              color="light"
              size="large"
              class=""
          />
        </ion-item>
      </ion-list>
      <Loading :isOpen="loading"></Loading>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage,IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonProgressBar, IonText} from '@ionic/vue';
import {notifications, arrowForwardCircleOutline} from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'
import Loading from "../../components/auxiliares/Loading";
import api from '../../api/basicUrl';
import { ref } from 'vue';
import storage from '../../storage/StorageKey';

export default {
  name: 'Videoaulas',
  components: {IonPage, IonTitle, IonContent, IonItem, IonLabel, IonList, IonIcon, IonSelect, IonSelectOption, IonProgressBar, IonText, Loading},

  setup () {
    const loading = ref(false);
    const disciplinas = ref([]);
    const disciplinasAuxiliar = ref([]);
    const user = ref({});

    return {
      notifications,
      arrowForwardCircleOutline,
      router: useRouter(),
      route: useRoute(),
      loading,
      disciplinas,
      disciplinasAuxiliar,
      user
    }
  },

  methods :{
    async pesquisarMateria (event) {
      let materia = (event.currentTarget.value);
      if (materia == 'todas') {
        this.disciplinas = this.disciplinasAuxiliar;
      }
      else {
        this.disciplinas = this.disciplinasAuxiliar.filter((el) => el.id == materia);
      }
    },

    async getMaterias () {
      try {
        this.loading = true;
        let volume = this.route.params.id;
        let dados = await api.get("/materias/"+volume+'/'+this.user.id);
        console.log(dados);
        this.disciplinas = dados.data.materias;
        this.disciplinasAuxiliar = dados.data.materias;
      }catch (e) {
        console.log(e);
      }
      this.loading = false;
    }

  },

  async ionViewWillEnter () {
    let usuario = await storage.get('user');
    usuario = JSON.parse(usuario.value);
    this.user = usuario;
    await this.getMaterias();
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
ion-item {
  --background: url('../../../public/assets/images/videoaula-secundario.png') var(--ion-color-primary) no-repeat center/100%;
}
ion-item.select {
  --background: white;
}
.text-white {
  color: white;
}

ion-list {
  --background: url('../../../public/assets/images/bg-principal.png') center;
  background: url('../../../public/assets/images/bg-principal.png') center;
}
h2.font-bold {
  font-weight: 600;
}
</style>
