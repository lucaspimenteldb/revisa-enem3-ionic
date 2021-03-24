<template>
  <ion-app>
    <ion-header>
      <ion-toolbar v-if="!(route.name == 'login')" :class="[(route.name == 'home') ? 'ml-2' : '']">
        <ion-title slot="start" class="ion-no-padding flex">
          <ion-buttons v-if="!(route.name == 'home')"  class="inline-block">
            <ion-back-button default-href="/home">voltar</ion-back-button>
          </ion-buttons>

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

        <ion-avatar @click="saida" class="ion-margin-end w-40 h-40" slot="secondary">
          <img src="assets/icon/sair.svg" >
        </ion-avatar>

        <ion-avatar class="ion-margin-end w-40 h-40 border-2 border-primary" slot="secondary">
          <img :src="user.photo" >
        </ion-avatar>

      </ion-toolbar>
    </ion-header>

    <ion-content >
      <ion-router-outlet />
      <AlertGeneric :dialog="dialog" :text="text" :buttons="buttons" />
    </ion-content>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonTitle, IonHeader, IonToolbar, IonImg, IonButtons, IonText, IonBackButton, IonAvatar, IonContent } from '@ionic/vue';
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
    IonApp, AlertGeneric, IonRouterOutlet,IonTitle,  IonHeader, IonToolbar, IonImg, IonButtons, IonText, IonBackButton, IonAvatar, IonContent
  },
  setup (){
    const text = ref( {
      header: 'Tem certeza que deseja sair ?',
              subHeader: '',
              message: '',
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
    },

    saida () {
      this.buttons = [{text: 'Quero Estudar', handler: () => this.dialog = false}, {text: 'Sair', handler: () => {this.router.replace('/login')}}]
      this.dialog = true;
    }
  }
});
</script>

<style scoped>
  .ml-2 {
    margin-left: 10px;
  }
</style>
