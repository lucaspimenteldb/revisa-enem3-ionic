<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Atividades Disponíveis
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
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
        <ion-label class="font-bold text-lg">
          Atividades Escolares
        </ion-label>

        <ion-item
            class="ion-margin-top lista__professores rounded"
            v-for="professorDisciplina in opcoes"
            :key="professorDisciplina.ttl+ 'acessar'"
            @click="() => router.push('atividades-inicio')"
            lines="none"
        >
          <ion-avatar
              slot="start"
              class="border-3"
              :class="`border__${professorDisciplina.area}`"
          >
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
          </ion-avatar>

          <ion-label class="ion-padding ">
            <h2 class="text-white">
              {{ professorDisciplina.ttl.split('-')[0] }}
            </h2>
            <p class="ion-no-margin text-white text-lg">
              {{ professorDisciplina.disciplina }}
            </p>
          </ion-label>

          <div class="h-full w-80 absolute top-0 right-0" :class="`bg__${professorDisciplina.area}`">

          </div>
          <ion-icon
              slot="end"
              :icon="arrowForwardCircleOutline"
              color="dark"
              size="large"
              class="mr-8"
          />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonList, IonSelectOption, IonLabel, IonAvatar } from '@ionic/vue';
import { arrowForwardCircleOutline } from 'ionicons/icons'
import { useRouter} from 'vue-router';

export default  {
  name: 'Atividades',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSelect, IonList, IonSelectOption, IonLabel, IonAvatar },

  setup () {
    return {
      router: useRouter(),
      arrowForwardCircleOutline,
      opcoes: [
        {
          ttl: 'Professor x - Matemática',
          disciplina: 'Matemática',
          name: 'professor-x',
          area: 'linguagens',
          rota: 'atividades-inicio'
        },
        {
          ttl: 'Professor xz - Matemática',
          disciplina: 'Matemática',
          name: 'professor-x',
          area: 'matematica',
          rota: 'atividades-inicio'
        },
        {
          ttl: 'Professor xyz - Matemática',
          disciplina: 'Matemática',
          name: 'professor-x',
          area: 'humanas',
          rota: 'atividades-inicio'
        },
        {
          ttl: 'Professor xxsa - Matemática',
          disciplina: 'Matemática',
          name: 'professor-x',
          area: 'natureza',
          rota: 'atividades-inicio'
        },
        {
          ttl: 'Professor yysa - Matemática',
          disciplina: 'Matemática',
          name: 'professor-x',
          area: 'natureza',
          rota: 'atividades-inicio'
        },
        {
          ttl: 'Professor Par - Matemática',
          disciplina: 'Matemática',
          name: 'professor-x',
          area: 'linguagens',
          rota: 'atividades-inicio'
        },
      ]
    }
  }
}
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
.lista__professores {
  --background: var(--ion-color-primary);
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
