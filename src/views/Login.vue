<template>
  <ion-page>
    <ion-content>
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

        <IonItem class="rounded shadow">
          <IonLabel position="floating">
            Matrícula
          </IonLabel>

          <IonInput v-model="matricula" value="{{matricula}}"/>
        </IonItem>

        <ion-button expand="block" class="ion-margin-top shadow-btn">
          <ion-label class="text-none font-bold">
            Entrar
          </ion-label>
        </ion-button>

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

        <ion-button color="transparent" class=" ion-margin-top btn__ajuda">
          <ion-label class="text-none text-sm" color="primary">
            Preciso de ajuda
          </ion-label>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonImg, IonText, IonLabel, IonButton, IonItem, IonInput } from '@ionic/vue';
import { useRouter } from 'vue-router'

export default {
  components: { IonImg, IonText, IonLabel, IonButton, IonItem, IonInput },
  vueRouter: useRouter(),
  name: 'Login',

  data: () => ({
    matricula: '',
  }),
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
