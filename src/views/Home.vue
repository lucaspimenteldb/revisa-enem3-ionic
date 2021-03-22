<template>
    <ion-page>
        <ion-content class="fundo">
            <div>
                <IonSlides :pager="true" :options="slideOpts" class="slide__principal"
                           v-if="noticias.length > 0">
                    <IonSlide v-for="noticia in noticias" :key="noticia.id">
                        <IonImg class="classe2"  :src="noticia.imagem"/>
                    </IonSlide>

                    <!--          <IonSlide class="ion-margin-end">-->
                    <!--            <IonImg src="assets/images/banner-home.png" />-->
                    <!--          </IonSlide>-->

                    <!--          <IonSlide class="ion-margin-end">-->
                    <!--            <IonImg src="assets/images/banner-home.png" />-->
                    <!--          </IonSlide>-->
                </IonSlides>
            </div>

            <IonList class="ion-margin-top ion-padding rounded-top">
                <IonItem
                        class="ion-margin-top rounded"
                        :disabled="menu.disabled"
                        :class="menu.slug + '__fundo'"
                        v-for="menu in menus"
                        :key="menu.id"
                        @click="() => router.push(menu.slug)"
                >
                    <IonLabel class="ion-padding-vertical ion-margin-vertical">
                        <h2 class="text-white font-bold text-lg">
                            {{ menu.nome }}

                            <ion-icon
                                    :icon="notifications"
                                    class="vertical-middle"
                                    color="white"
                                    v-if="menu.notificacao"
                            />
                        </h2>
                    </IonLabel>

                    <ion-icon
                            slot="end"
                            :icon="arrowForwardCircleOutline"
                            color="light"
                            size="large"
                            class=""
                    />
                    <!--<IonIcon :icon="airplaneOutline" slot="start"></IonIcon>
                    <ion-icon :icon="heart"></ion-icon>-->

                    <!-- <IonBadge
                         color="primary"
                         slot="end"
                     >
                       Pei
                     </IonBadge>-->
                </IonItem>
            </IonList>
            <Loading :is-open="loading"/>
        </ion-content>
    </ion-page>
</template>

<script>
    import {IonPage, IonContent, IonList, IonItem, IonLabel, IonImg, IonSlides, IonSlide} from '@ionic/vue';
    import {heart, airplaneOutline, arrowForwardCircleOutline, notifications} from 'ionicons/icons'
    import {useRouter} from 'vue-router';
    import {ref} from 'vue';
    import Loading from "@/components/auxiliares/Loading";
    import api from '../api/basicUrl';

    export default {
        name: 'Home',
        components: {Loading, IonContent, IonList, IonItem, IonLabel, IonPage, IonImg, IonSlides, IonSlide},

        setup() {
            let loading = ref(false);
            let noticias = ref([]);
          const slideOpts = {
            grabCursor: true,
            speed: 500,
            autoplay: {
              delay:7000
            },
          }
            return {
                airplaneOutline,
                heart,
                arrowForwardCircleOutline,
                notifications,
                router: useRouter(),
                loading,
                noticias,
                slideOpts,

                menus: ref([
                    // {
                    //     ttl: 'Atividades',
                    //     rota: 'atividades',
                    //     class: 'atividades__fundo',
                    //     notificacao: true,
                    // },
                    // {
                    //     ttl: 'Videoaulas',
                    //     rota: 'videoaulas',
                    //     class: 'videoaulas__fundo',
                    //     notificacao: false,
                    // },
                    // {
                    //     ttl: 'Redações',
                    //     rota: 'redacoes',
                    //     class: 'redacoes__fundo',
                    //     notificacao: true,
                    // },
                    // {
                    //     ttl: 'Ranking',
                    //     rota: 'ranking',
                    //     class: 'ranking__fundo',
                    //     notificacao: false,
                    // },
                    // {
                    //     ttl: 'Praticar',
                    //     rota: 'praticar',
                    //     class: 'praticar__fundo',
                    //     notificacao: false,
                    // },
                ]),
            };
        },

        async created() {
            try {
                this.loading = true
                let dados = await api.get('/noticias');
                this.noticias = dados.data.noticias;
                this.loading = false;
                this.menus = dados.data.menus;
            } catch (e) {
                console.log(e);

                this.loading = false;
            }


        }
    }
</script>

<style scoped>
    ion-content {
        --background: var(--ion-color-primary);
    }


    ion-list {
        --background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
        background: url('../../public/assets/images/bg-principal.png') no-repeat center/100%;
    }

    ion-item {
        --background: var(--ion-color-primary);
    }

    .rounded {
        border-radius: 10px;
    }

    .classe2 {
      width: 346px;
      height: 196px;
    }

    .slide__principal{
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .atividades__fundo {
        --background: url('../../public/assets/images/atividades-fundo.png') var(--ion-color-primary) no-repeat center/70%;
    }

    .videoaulas__fundo {
        --background: url('../../public/assets/images/videoaulas-fundo.png') var(--ion-color-primary) no-repeat center/70%;
    }

    .redacoes__fundo {
        --background: url('../../public/assets/images/redacoes-fundo.png') var(--ion-color-primary) no-repeat center/70%;
    }

    .ranking__fundo {
        --background: url('../../public/assets/images/rankings-fundo.png') var(--ion-color-primary) no-repeat center/70%;
    }

    .praticar__fundo {
        --background: url('../../public/assets/images/praticar-fundo.png') var(--ion-color-primary) no-repeat center/70%;
    }
</style>
