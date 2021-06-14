<template>
  <ion-page>
    <ion-content >
      <!-- select da materia e professor-->
      <ion-item class="ion-margin rounded">
        <ion-label>
          Selecionar o professor...
        </ion-label>

        <ion-select class="rounded">
          <ion-select-option
              v-for="opcao in opcoes"
              :key="opcao.ttl"
              :name="opcao.name"
              style="width: 300px;"
          >
            {{ opcao.ttl }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <!-- container principal -->
      <ion-list class="ion-margin-top ion-padding rounded-top">
        <ion-label class="font-bold text-lg" color="primary">
          Atividades Escolares
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="professorDisciplina in opcoes"
            :key="professorDisciplina.id+ 'acessar'"
            @click="irAtividade(professorDisciplina)"
            lines="none"
        >
          <ion-avatar
              slot="start"
              class="border-4 w-50 h-50"
              :class="`border__${professorDisciplina.comp}`"
          >
            <img :src="professorDisciplina.photo">
          </ion-avatar>

          <ion-label class="ion-padding ">
            <h2 class="text-white">
              {{professorDisciplina.name}}
            </h2>
            <p class="ion-no-margin text-white text-lg">
              {{ professorDisciplina.disciplina }}
            </p>
          </ion-label>

          <article v-if="professorDisciplina.notificacao" class="absolute top-8 right-24">
            <div class="flex ion-align-items-center ion-justify-content-center h-16 w-16 absolute top--6 right--8 rounded-full notificacao z-1">
              <p class="ion-no-margin text-xxs">1</p>
            </div>
            <ion-icon
                :icon="notifications"
                class="text-lg text-white"
                color="light"
            />
          </article>

          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
              color="light"
              style="font-size: 36px;"
              class=""
          />
        </ion-item>
      </ion-list>
      <Loading :isOpen="loading"></Loading>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonSelect, IonList, IonSelectOption, IonLabel, IonAvatar } from '@ionic/vue';
import { arrowForwardCircleOutline, notifications } from 'ionicons/icons'
import { useRouter} from 'vue-router';
import Loading from "../components/auxiliares/Loading";
import {ref} from 'vue';
import api from "../api/basicUrl";
import storage from "../storage/StorageKey";

export default  {
  name: 'Atividades',
  components: {Loading, IonContent, IonPage, IonSelect, IonList, IonSelectOption, IonLabel, IonAvatar },

  setup () {
    const loading = ref(false);
    const user = ref({});
    return {
      router: useRouter(),
      arrowForwardCircleOutline,
      notifications,
      opcoes: [
        // {
        //   ttl: 'Professor x - Matemática',
        //   disciplina: 'Matemática',
        //   name: 'professor-x',
        //   area: 'linguagens',
        //   rota: 'atividades-inicio',
        //   notificacao: false,
        // },
        // {
        //   ttl: 'Professor xz - Matemática',
        //   disciplina: 'Matemática',
        //   name: 'professor-x',
        //   area: 'matematica',
        //   rota: 'atividades-inicio',
        //   notificacao: true,
        // },
        // {
        //   ttl: 'Professor xyz - Matemática',
        //   disciplina: 'Matemática',
        //   name: 'professor-x',
        //   area: 'humanas',
        //   rota: 'atividades-inicio',
        //   notificacao: false,
        // },
        // {
        //   ttl: 'Professor xxsa - Matemática',
        //   disciplina: 'Matemática',
        //   name: 'professor-x',
        //   area: 'natureza',
        //   rota: 'atividades-inicio',
        //   notificacao: false,
        // },
        // {
        //   ttl: 'Professor yysa - Matemática',
        //   disciplina: 'Matemática',
        //   name: 'professor-x',
        //   area: 'natureza',
        //   rota: 'atividades-inicio',
        //   notificacao: false,
        // },
        // {
        //   ttl: 'Professor Par - Matemática',
        //   disciplina: 'Matemática',
        //   name: 'professor-x',
        //   area: 'linguagens',
        //   rota: 'atividades-inicio',
        //   notificacao: false,
        // },
      ],
      loading,
      user
    }
  },

  methods : {
    irAtividade(professor) {
        this.router.push({path: 'atividades-inicio', query: { professor: JSON.stringify(professor) }});
    }
  },

  async ionViewWillEnter () {
    try {
      this.loading = true;
      let usuario = await storage.get('user');
      usuario = JSON.parse(usuario.value);
      this.user = usuario;
      let dados = await api.get('/professores/'+this.user.id_escola+"/"+this.user.id_turma);
      this.opcoes = dados.data.professores;

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
.lista__professores {
  --background: url('../../public/assets/images/atividade-secundario.png') var(--ion-color-primary) no-repeat center/100%;
}
p {
  color: white;
}
.text-lg {
  font-size: 1.15rem;
}

ion-list {
  --background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
  background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
}

</style>
