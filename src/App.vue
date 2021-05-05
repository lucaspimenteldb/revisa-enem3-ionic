<template>
  <ion-app>
    <ion-header clas="build-header-ios">
      <ion-toolbar 
        v-if="!(route.name == 'login')" 
        class="build-header-ios"
      >
        <ion-buttons v-if="!(route.name == 'home')" slot="start" class="inline-block">
          <ion-back-button default-href="/home" text="voltar"/>
        </ion-buttons>

        <ion-title class="ion-no-padding flex" slot="start">
          <section class="inline-flex ion-align-items-center vertical-text-bottom">
            <ion-img src="assets/icon/xp-estrela.png" class="mr-4 w-30 inline-block"/>

            <div>
              <ion-text color="primary">
                <p class="ion-no-margin text-xs font-bold">
                  Você tem
                </p>
                <p class="ion-no-margin text-sm" v-if="user.pontos">
                  {{user.pontos +' ponto(s)'}}
                </p>
              </ion-text>
            </div>
          </section>
        </ion-title>


        <ion-avatar class="w-40 h-40 border-2 border-primary" slot="end">
          <img :src="user.photo" >
        </ion-avatar>

        <ion-button 
          @click="saida" 
          class="ion-margin-start ion-no-padding w-40 h-40 no-shadow" 
          slot="end"
          color="white"
        >
          <img src="assets/icon/sair.svg" width="30">
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-router-outlet />
      <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
    </ion-content>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonTitle, IonHeader, IonToolbar, IonImg, IonButtons, IonButton, IonText, IonBackButton, IonAvatar, IonContent } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import storage from "./storage/StorageKey";
import api from './api/basicUrl';
import { Plugins } from '@capacitor/core';
import AlertGeneric from "./components/auxiliares/AlertGeneric";

const { App } = Plugins;


export default defineComponent({
  name: 'App',
  components: {
    IonApp, AlertGeneric, IonRouterOutlet,IonTitle,  IonHeader, IonToolbar, IonImg, IonButtons, IonButton, IonText, IonBackButton, IonAvatar, IonContent
  },
  setup (){
    const text = ref( {
      header: '',
      subHeader: 'Tem certeza que deseja sair?',
      message: '',
      cssClass: 'text-black',
    });
    const dialog = ref(false);
    const user = ref({});
    const buttons = ref([]);
    return {
      route: useRoute(),
      router: useRouter(),
      user,
      text,
      dialog,
      buttons,
    }
  },

  async created() {
    let usuario = await storage.get('user');
    usuario = JSON.parse(usuario.value);
    this.user = usuario;
    this.emitter.on('perfil', (emitter) => {
      this.user = emitter;
    })

    App.addListener('appStateChange' , (states) => {
      if (!states.isActive) {
        this.sair();
      }
    });

    this.emitter.on('pontos', async (pontos) => {
      this.user.pontos = pontos ? this.user.pontos + pontos : this.user.pontos;
      storage.set('user', JSON.stringify(this.user));
    })

    this.emitter.on('sair', () => {
      this.sair();
    })
  },

  methods: {
    sair () {
      api.get('/home-saiu/'+this.user.id);
      this.router.push('/login')
    },

    saida () {
      this.buttons = [{cssClass: 'text-black', text: 'Quero estudar', handler: () => this.dialog = false}, {cssClass: 'text-red', text: 'Sair', handler: async() => { await storage.remove('user'); this.router.replace('/login')}}]
      this.dialog = true;
    }
  }
});
</script>

<style scoped>
  .ml-2 {
    margin-left: 10px;
  }

  .no-shadow {
    --box-shadow: none;
  }
</style>
