<template>
  <ion-page>
    <ion-content>
      <Loading :isOpen="loading"></Loading>
      <div class="ion-padding flex ion-justify-content-center">
        <ion-img src="assets/images/logo-revisa.png" class="ion-margin-end w-80"/>
        <ion-img src="assets/images/logo-mvc.png" class="ion-margin-start w-80"/>
      </div>

      <div class="bg__paper h-full ion-padding rounded">
        <ion-text color="primary">
          <h3 class="ion-text-center font-bold">
            Bem-vindo ao Revisa ENEM!
          </h3>
        </ion-text>

        <br>
        <form @submit.prevent="formMatricula">
        <IonItem class="rounded shadow">
          <IonLabel position="floating">
            Matrícula
          </IonLabel>

          <IonInput v-model="matricula" value="{{matricula}}"/>
        </IonItem>

        <ion-button type="submit" expand="block" class="ion-margin-top shadow-btn">
          <ion-label class="text-none font-bold">
            Entrar
          </ion-label>
        </ion-button>
        </form>

        <!--<ion-button
            class="ion-margin-top"
            expand="block"
            color="light"
        >
          <ion-label class="font-bold text-none" color="primary">
            Entrar com a Google
          </ion-label>

          <ion-img src="assets/images/logo-google.png" class="ion-margin-start w-30"/>
        </ion-button>

        <ion-button
            class="ion-margin-top"
            expand="block"
        >
          <ion-label class="text-none">
            Entrar com o Facebook
          </ion-label>

          <ion-img src="assets/images/face-logo.png" class="ion-margin-start w-30"/>
        </ion-button>-->

        <ion-button  color="transparent" class=" ion-margin-top btn__ajuda">
          <ion-label class="text-none text-sm" color="primary">
            Preciso de ajuda
          </ion-label>
        </ion-button>
      </div>
    </ion-content>
    <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
  </ion-page>
</template>
<script>
import { IonImg, IonText, IonLabel, IonButton, IonItem, IonInput } from '@ionic/vue';
import { useRouter } from 'vue-router'
import  Loading  from '../components/auxiliares/Loading';
import AlertGeneric from "../components/auxiliares/AlertGeneric";
import {ref} from 'vue';
import api from "../api/basicUrl";
import object from "../storage/StorageKey";
import browser from "../plugins/browser";

export default {
  components: { Loading, AlertGeneric, IonImg, IonText, IonLabel, IonButton, IonItem, IonInput },
  vueRouter: useRouter(),
  name: 'Login',

  setup () {
    const loading = ref(false);
    const matricula = ref('');
    const dialog =  ref(false);
    const text =  ref({
      header: 'Ops!',
      subHeader: '',
      message: 'Selecione uma das alternativas :)',
    });

    const buttons = [];
    const router = useRouter();
    return {
      loading,
      router,
      matricula,
      dialog,
      text,
      buttons
    }
  },

  methods : {
    async formMatricula() {
      try{
        this.loading= true;
        let user = await api.post('/login', {matricula: this.matricula});
        let xyz = this.formandoXyz(user.data.xyz, user.data.xyz_type);
        user = user.data.user;
        await object.set('user', JSON.stringify(user));
        await object.set('xyz', JSON.stringify(xyz));
        this.emitter.emit('perfil', user);
        this.router.push('/tabs/home');
      }catch (e) {
        if(e.response) {
         if (e.response.status == 403) {
          // window.open('https://ro.revisaenem.com.br/google');
           await browser.open(e.response.data.message);

         }
         else if(e.response.status == 400) {
            //ok
           this.text.message = e.response.data.message;
           this.buttons = [{text: 'Ok', handler: () => this.dialog = false}]
           this.dialog = true;
         }
        }
        else {
          this.text.message = 'Sem conexão com o servidor';
          this.buttons = [{text: 'Ok', handler: () => this.dialog = false}]
        }
      }

      this.loading = false;
    },

    formandoXyz (xyz, xyz_type) {
      let xyz_local = {
        xyz,
        xyz_type,
        xyz_completo: xyz_type + ' '+xyz
      }

      return xyz_local;
    }
  }
}
</script>
<style scoped>
ion-content {
  --background: var(--ion-color-primary);
}
.bg__paper {
  background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
}
.btn__ajuda {
  --box-shadow: none;
}

</style>
