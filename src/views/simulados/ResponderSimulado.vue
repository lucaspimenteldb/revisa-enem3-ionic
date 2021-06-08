<template>
    <ion-page>
        <!--  menuzao lateral para ver o gabarito e os detalhes  -->
        <ion-menu
                side="end"
                menu-id="gabarito"
                content-id="responder"
        >
            <ion-content id="menuzao">
                <ion-fab vertical="top" horizontal="end">
                    <ion-fab-button color="light" @click="toggleMenu">
                        <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <ion-list class="mt-64">
                    <ion-item lines="none" @click="setOpen(true)">
                        <ion-label class="text-white">
                            Ver gabarito
                        </ion-label>
                    </ion-item>
                    <ion-item
                            lines="none"
                            class="mt-8"
                            @click="setDetalhesSimulado(true)"
                    >
                        <ion-label class="text-white">
                            Detalhes do simulado
                        </ion-label>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-menu>

        <!-- modal para finalizar o simulado -->
        <ion-modal
                :is-open="finalizarOpen"
                css-class="modalFinalizar"
                @onDidDismiss="setFinalizarOpen(false)"
        >
            <ion-content id="finalizar-simulado-modal" class="ion-padding">
                <ion-fab vertical="top" horizontal="end">
                    <ion-fab-button color="light" @click="fechar">
                        <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <h3 class="mt-64 text-white">
                    {{simulado.titulo}}
                </h3>

                <p class="text-white">
                    Tem certeza que deseja finalizar e enviar o seu simulado?
                </p>

                <section class="ion-padding-horizontal" v-if="brancos.length">
                    <p class="text-white">Você deixou algumas questões em branco</p>
                    <ion-button
                            v-for="(branco, index) in brancos"
                            :key="`questao-${branco.id}`"
                            @click="questoes(questoesId.indexOf(branco.id) + 1, false, true)"
                            class="mr-8 mb-8 btn-questao-gabarito rounded-sm"
                            :class="branco.resultado === 'Certo' ? 'border-2' : 'border-2 border-ruim'"
                    >
                        <div class="flex flex-column ion-align-items-center ion-justify-content-center">
                            <p class="mt-12 mb-0 text-black">
                                {{ (Number(index) + 1) }}
                            </p>

                            <p class="mt-8 text-black block font-bold">
                                <span v-if="branco.resposta">{{branco.resposta}}</span>
                                <span v-if="!questao.resposta">_</span>
                            </p>
                        </div>

                        <ion-icon
                                :icon="bookmarksOutline"
                                v-if="branco.salvar"
                                color="warning"
                                class="mt-1 absolute top-0 right--16 font-bold"
                                style="font-size: 16px;"
                        />
                    </ion-button>
                </section>

                <ion-button
                        @click="fechar"
                        color="danger"
                        class="text-none"
                >
                    Cancelar
                </ion-button>
                <ion-button
                        @click="finalizarSimulado"
                        class="text-primary text-none font-bold bg-white rounded"
                >
                    Finalizar simulado
                </ion-button>
            </ion-content>
        </ion-modal>

        <!-- modal para ver as informações do simulado -->
        <ion-modal
                :is-open="detalhesSimulado"
                css-class="modalFinalizar"
                @onDidDismiss="setDetalhesSimulado(false)"
        >
            <ion-content id="detalhes-simulado" class="ion-padding">
                <ion-fab vertical="top" horizontal="end">
                    <ion-fab-button color="light" @click="fecharDetalhes">
                        <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <h3 class="mt-64 text-white">
                    {{simulado.titulo}}
                </h3>

                <p class="mt-0 mb-32 text-white">
                    Todos os detalhes do seu simulado
                </p>

                <section>
                    <article class="mt-8">
                        <ion-text color="light">
                            <p class="ion-no-margin">
                                Disponível entre:
                                <ion-text color="verde" class="font-bold"> {{simulado.inicio}}</ion-text>
                                e
                                <ion-text color="vermelho" class="font-bold">{{simulado.fim}}</ion-text>
                            </p>

                            <!--              <p class="mb-0 mt-8">-->
                            <!--                Você ainda tem: <ion-text class="font-bold">{{simulado.duracao}}</ion-text>-->
                            <!--              </p>-->

                            <p class="mb-0 mt-8">
                                Áreas do simulado:
                                <ion-text>{{simulado.areas}}</ion-text>
                            </p>
                        </ion-text>
                    </article>
                </section>

                <ion-button
                        @click="fecharDetalhes"
                        color="danger"
                        class="mt-16 text-none"
                >
                    Fechar
                </ion-button>
            </ion-content>
        </ion-modal>

        <!--  modal com o gabarito das coisas ou os detalhes  -->
        <ion-modal
                :is-open="isOpenRef"
                css-class="modalzao"
                @onDidDismiss="setOpen(false)"
        >
            <ion-content id="gabarito-modal">
                <ion-fab vertical="top" horizontal="end">
                    <ion-fab-button color="light" @click="setOpen(false)">
                        <ion-icon :icon="closeCircleOutline" style="font-size: 30px;"></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <!--    ver o gabairto da área    -->
                <div
                        v-for="(gabarito, i) in meuGabaritoQuestoes"
                        :key="gabarito.area"
                        :class="i === 0 ? 'mt-80' : 'mt-8'"
                        @click="gabarito.aberto = !gabarito.aberto"
                >
                    <ion-item
                            class="pv-8"
                            lines="none"
                    >
                        <ion-icon
                                slot="start"
                                :icon="gridOutline"
                                :color="gabarito.color"
                        />
                        <ion-label color="" class="ion-text-wrap">
                            <p class="font-bold text-black">
                                Gabarito
                            </p>
                            <p class="text-md font-bold text-black">
                                {{ gabarito.area }}
                            </p>
                        </ion-label>
                        <ion-icon
                                slot="end"
                                :icon="gabarito.aberto ? chevronUpOutline : chevronDownOutline"
                                color="dark"
                        />
                    </ion-item>

                    <!--     botao das questoes do gabarito     -->
                    <section v-if="gabarito.aberto" class="ion-padding-horizontal">
                        <ion-button
                                v-for="(questao) in gabarito.questoes"
                                :key="`questao-${questao.id}`"
                                class="mr-8 mb-8 btn-questao-gabarito rounded-sm"
                                :class="questao.resultado === 'Certo' ? 'border-2' : 'border-2 border-ruim'"
                                @click="questoes(questoesId.indexOf(questao.id) + 1, false, true)"
                        >
                            <div class="flex flex-column ion-align-items-center ion-justify-content-center">
                                <p class="mt-12 mb-0 text-black">
                                    {{questoesId.indexOf(questao.id) + 1 }}
                                </p>

                                <p class="mt-8 text-black block font-bold">
                                    <span v-if="questao.resposta">{{questao.resposta}}</span>
                                    <span v-if="!questao.resposta">_</span>
                                </p>
                            </div>

                            <ion-icon
                                    :icon="bookmarksOutline"
                                    v-if="questao.salvar"
                                    color="warning"
                                    class="mt-1 absolute top-0 right--16 font-bold"
                                    style="font-size: 16px;"
                            />
                        </ion-button>
                    </section>
                </div>
            </ion-content>
        </ion-modal>

        <!-- comeco do conteudo -->
        <ion-content id="responder">
            <div class="ion-padding fundo-cima">
                <h4 class="ion-margin-vertical text-white">
                    {{simulado.titulo}}
                </h4>

                <ion-fab class="mt-8" vertical="top" horizontal="end">
                    <ion-fab-button color="light" @click="toggleMenu">
                        <ion-icon :icon="menuOutline"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </div>

            <ion-list class="ion-padding-vertical rounded-top questao">
                <!-- cardzao da questao -->
                <ion-item lines="none" class="questao">
                    <div class="max-w-100 flex flex-column text-black">
<!--                        <div class="ion-margin-bottom ion-padding flex ion-align-items-center ion-justify-content-center font-bold bg-primary rounded">-->
<!--                            <ion-icon-->
<!--                                    :icon="timeOutline"-->
<!--                                    style="font-size: 30px;"-->
<!--                                    class="mr-4 text-white"-->
<!--                            />-->

<!--&lt;!&ndash;                            <p class="ion-no-margin font-bold text-white">&ndash;&gt;-->
<!--&lt;!&ndash;                                restam {{simulado.horas}}:{{simulado.minutos}}:{{simulado.segundos}}&ndash;&gt;-->
<!--&lt;!&ndash;                            </p>&ndash;&gt;-->
<!--                        </div>-->

                        <div class="ion-no-margin flex ion-align-items-center ion-justify-content-between">
                            <p class="font-bold">Questão - {{ questao.numero }}</p>

                            <ion-button
                                    @click="salvarResposta()"
                                    size="small"
                                    class="h-40"
                                    fill="outline"
                            >
                                <ion-label
                                        slot="start"
                                        class="text-none font-bold text-primary"
                                        v-text="questao.salvar ? 'salva' : 'salvar'"
                                >
                                </ion-label>
                                <ion-icon
                                        :color="questao.salvar ? 'warning' : 'primary'"
                                        :icon="questao.salvar ? bookmarks : bookmarksOutline"
                                        style="font-size: 24px;"
                                        slot="end"
                                />
                            </ion-button>
                        </div>

                        <!--      questaozona      -->
                        <section>
                            <h5 class="text-sm font-bold">
                                {{ questao.area }}
                            </h5>

                            <div v-html="questao.descricao" class="enunciado-questoes"></div>

                            <ion-button
                                    v-for="alternativa in questao.alternativas"
                                    :key="alternativa.alternativa"
                                    class="mb-8 ion-text-wrap ion-text-left border-1 shadow rounded cursor-pointer alternativas text-none"
                                    :class="questao.selecionada === alternativa.alternativa ? 'text-white' : 'text-black'"
                                    :color="questao.selecionada === alternativa.alternativa ? 'primary' : 'white'"
                                    @click="questaoSelecionada(alternativa.alternativa)"
                                    expand="block"
                            >

                                <div class="ion-margin-vertical mr-8 pt-10 text-black border-2 border-primary bg-white rounded-full alternativa ion-text-center pointer-events-none">
                                    {{alternativa.alternativa}}
                                </div>

                                <p class="mr-auto text-xs pointer-events-none text-alternativa"
                                   v-html="alternativa.texto">

                                </p>
                            </ion-button>
                        </section>

                        <!--      menu da questão      -->
                        <section class="mt-8">
                            <ion-button
                                    v-if="previous"
                                    fill="outline"
                                    color="primary"
                                    class="mr-2 text-none"
                                    @click="questoes(previous, false)"
                            >
                                Anterior
                            </ion-button>
                            <ion-button
                                    v-if="nextPage"
                                    fill="outline"
                                    color="primary"
                                    class="text-none"
                                    @click="questoes(nextPage,true)"
                            >
                                Próxima
                            </ion-button>

                            <ion-button
                                    color="primary"
                                    class="ion-float-right text-none font-bold"
                                    @click="verBrancos"
                            >
                                Finalizar simulado
                            </ion-button>
                        </section>
                    </div>
                </ion-item>
            </ion-list>
            <Loading :isOpen="loading"></Loading>
            <AlertGeneric :text="text" :dialog="dialog" :buttons="buttons"></AlertGeneric>
        </ion-content>
    </ion-page>
</template>

<script>
    import alerts from '../../mixins/Alerts';
    // import {IonPage,IonTitle, IonHeader, IonToolbar, IonContent, IonItem, IonLabel, IonList, IonIcon, IonButton, IonProgressBar, IonText, IonMenu, IonFab, IonFabButton, menuController, modalController, IonModal} from '@ionic/vue';
    import {
        IonPage,
        IonContent,
        IonItem,
        IonLabel,
        IonList,
        IonIcon,
        IonButton,
        IonMenu,
        IonFab,
        IonFabButton,
        menuController,
        IonModal
    } from '@ionic/vue';
    import {
        bookmarks,
        bookmarksOutline,
        closeCircleOutline,
        menuOutline,
        gridOutline,
        chevronDownOutline,
        chevronUpOutline,
        timeOutline
    } from 'ionicons/icons';
    import {useRouter, useRoute} from 'vue-router'
    import Loading from "../../components/auxiliares/Loading";
    import api from '../../api/basicUrl';
    import {ref} from 'vue';
    import storage from "../../storage/StorageKey";
    import AlertGeneric from "../../components/auxiliares/AlertGeneric";
    import objeto from "../../mixins/Captcha";
    // import storage from '../../storage/StorageKey';

    export default {
        name: 'Simulados',
        // components: {IonPage, IonTitle, IonHeader, IonToolbar, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonProgressBar, IonText, Loading, IonMenu, IonFab, IonFabButton, IonModal},
        components: {
            IonPage,
            AlertGeneric,
            IonContent,
            IonItem,
            IonLabel,
            IonList,
            IonButton,
            IonIcon,
            Loading,
            IonMenu,
            IonFab,
            IonFabButton,
            IonModal
        },
        mixins: [objeto, alerts],

        setup() {
            const loading = ref(false);
            const isOpenRef = ref(false);
            const setOpen = state => isOpenRef.value = state;
            const detalhesSimulado = ref(false);
            const setDetalhesSimulado = state => detalhesSimulado.value = state;
            const user = ref({});
            const finalizarOpen = ref(false);
            const setFinalizarOpen = state => finalizarOpen.value = state;

            return {
                bookmarks,
                bookmarksOutline,
                closeCircleOutline,
                menuOutline,
                gridOutline,
                chevronDownOutline,
                chevronUpOutline,
                timeOutline,
                isOpenRef,
                setOpen,
                detalhesSimulado,
                setDetalhesSimulado,
                finalizarOpen,
                setFinalizarOpen,
                router: useRouter(),
                route: useRoute(),
                loading,
                user,
            }
        },

        data() {
            return {
                questao: {

                },
                brancos: [],

                questoesId: [],
                questoesEmCache: [],
                nextPage: null,
                previous: null,
                simulado: {
                    // duracao: '180',
                    // inicio: '14/11 às 9:85',
                    // disponivel: '124/124/124 e 1924/2/42',
                    // areas: 'Linguagens e Ciências Humanas'
                },

                timer: null,

                meuGabaritoQuestoes: [
                    // {
                    //   area: 'Linguagens, Códigos e suas Tecnologias',
                    //   icon: '/iconsinhos/linguagens-cor.png',
                    //   questoes: 44,
                    //   color: 'linguagens',
                    //   aberto: ref(false),
                    // },
                    // {
                    //   area: 'Ciências Humanas e suas Tecnologias',
                    //   icon: '/iconsinhos/humanas-cor.png',
                    //   questoes: 44,
                    //   color: 'humanas',
                    //   aberto: ref(false),
                    // }
                ],
            }
        },

        methods: {
            toggleMenu() {
                menuController.enable(true, 'gabarito');
                menuController.toggle('gabarito');
            },

            async verBrancos() {
                try {
                    this.loading = true;
                    this.setFinalizarOpen(true);
                    await api.get('/verificar-brancos/' + this.simulado.id + '/' + this.user.id);
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                    if (e.response) {
                        this.brancos = e.response.data.brancos;
                        console.log(e.response.data.brancos);
                    }
                    console.log(e);
                }
            },

            fechar() {
                this.setFinalizarOpen(false);
            },

            fecharDetalhes() {
                this.setDetalhesSimulado(false);
            },

            irListagem() {
                this.fechar();
                this.router.push('/ver-simulado/' + this.simulado.master);
            },

            async finalizarSimulado() {
                try {
                    this.loading = true;
                    let objeto = {
                        id_simulado: this.simulado.id,
                        id_user: this.user.id
                    };
                    let dados = await api.post('/finalizar-simulado', objeto);
                    this.loading = false;
                    this.text.header = dados.data.message;
                    this.buttons = [{text: 'ok', handler: this.irListagem}];
                    this.dialog = true;
                    // this.router.push('/ver-simulado/'+this.simulado.master);
                } catch (e) {
                    console.log(e);
                    this.text.header = 'Não foi possível a entrega do simulado, por favor tente novamente mais tarde.';
                    this.loading = false;
                    this.buttons = [{text: 'ok', handler: () => this.dialog = false}];
                    this.dialog = true;
                }
            },

            async inicio(page = 1) {
                try {
                    this.loading = true;
                    this.text.message = '';
                    this.questoesEmCache = [];
                    let questaoId = this.route.params.id;
                    let dados = await api.get(`/questoes-estaduais/${questaoId}/${this.user.id}?page=${page}`);
                    this.questao = dados.data.questoes.data[0];
                    this.questoesId = dados.data.todas_questoes;
                    this.simulado = dados.data.simulado;
                    this.colocandoAlternativas();
                    this.colocarMeusGabaritos(this.simulado.areasGabarito, dados.data.questoes_gabarito);
                    this.nextPage = this.verificarNull(dados.data.questoes.next_page_url, dados.data.questoes.path);
                    this.previous = this.verificarNull(dados.data.questoes.prev_page_url, dados.data.questoes.path);
                    this.loading = false;
                    this.questoesEmCache.push(this.questao);
                    // this.acionandoCronometro();
                } catch (e) {
                    this.alertErro(e);
                }
            },

            cache(page, prox) {
                let quest = this.questoesId[page - 1];

                let q = this.questoesEmCache.filter((e) => e.id === quest);
                if (q.length > 0) {
                    this.questao = q[0];
                    if (prox) {
                        this.nextPage = Number(this.nextPage) + 1;
                        this.previous = Number(this.previous) + 1;
                        if (this.nextPage > this.questoesId.length) {
                            this.nextPage = null;
                        }
                    } else {
                        this.previous = Number(this.previous) - 1;
                        this.nextPage = Number(this.nextPage) - 1;

                        if (this.previous < 0) {
                            this.previous = 0;
                        }

                        if (this.nextPage <= 1) {
                            this.nextPage = 2;
                        }
                    }
                    return true;
                }

                return false;
            },

            cacheGab(page) {
                let quest = this.questoesId[page - 1];
                let q = this.questoesEmCache.filter((e) => e.id === quest);
                if (q.length > 0) {
                    this.questao = q[0];
                    this.nextPage = page + 1;
                    this.previous = page - 1;

                    if (this.nextPage > this.questoesId.length) {
                        this.nextPage = null;
                    }

                    if (this.previous < 0) {
                        this.previous = 0;
                    }

                    return true;
                }

                return false;
            },

            async questoes(page = 1, prox, gab = false) {
                try {
                    this.isOpenRef = false;
                    menuController.enable(false, 'gabarito');
                    this.setFinalizarOpen(false);
                    if (gab && this.cacheGab(page)) {
                        return;
                    }
                    if (this.cache(page, prox)) {
                        return;
                    }
                    this.loading = true;
                    let questaoId = this.route.params.id;
                    let dados = await api.get(`/questoes-estaduais-parte/${questaoId}/${this.user.id}?page=${page}`);
                    this.questao = dados.data.data[0];
                    this.colocandoAlternativas();
                    this.nextPage = this.verificarNull(dados.data.next_page_url, dados.data.path);
                    this.previous = this.verificarNull(dados.data.prev_page_url, dados.data.path);
                    this.loading = false;
                    this.questoesEmCache.push(this.questao);
                } catch (e) {
                    console.log(e);
                    this.loading = false;
                }
            },

            async salvarResposta() {
                try {
                    this.questao.salvar = !this.questao.salvar;
                    let token = await this.recaptcha();
                    let objeto = {
                        id_questao: this.questao.id,
                        id_user: this.user.id,
                        id_simulado: this.simulado.id,
                        salvar: this.questao.salvar,
                        token
                    };

                    await api.post('/salvar-resposta', objeto);
                    this.atualizandoOGabarito();
                } catch (e) {
                    console.log(e);
                    this.irFora(e);
                    this.text.header = 'Não foi possível realizar o procedimento! Verifique a sua conexão e tente novamente.';
                    this.buttons = [{text: 'ok', handler: () => this.dialog = false}];
                    this.questao.salvar = !this.questao.salvar;
                    this.dialog = true;
                }
            },

            atualizandoOGabarito(salvar = true) {
                let id = this.questao.id;
                for (let i = 0; i < this.meuGabaritoQuestoes.length; i++) {
                    let x = this.meuGabaritoQuestoes[i];
                    if (x) {
                        let q = x.questoes.filter((e) => e.id == id);
                        if (q[0]) {
                            let index = x.questoes.indexOf(q[0]);
                            if (salvar) {
                                q[0].salvar = this.questao.salvar;
                            } else {
                                q[0].resposta = this.questao.selecionada;
                            }
                            x.questoes.splice(index, 1, q[0]);
                            this.meuGabaritoQuestoes[i] = x;
                        }

                    }
                }
            },

            async questaoSelecionada(alternativa) {
                let aux = this.questao.selecionada;
                if (aux == alternativa) {
                    return;
                }
                try {
                    this.questao.selecionada = alternativa;
                    let token = await this.recaptcha();
                    let objeto = {
                        id_questao: this.questao.id,
                        id_simulado: this.simulado.id,
                        alternativa,
                        id_user: this.user.id,
                        token,
                    };
                    await api.post('/inserir-resposta', objeto);
                    this.atualizandoOGabarito(false);
                } catch (e) {
                    console.log(e);
                    this.irFora(e);
                    this.text.header = 'Sua resposta não foi enviada! Verifique a sua conexão e tente novamente.';
                    this.buttons = [{text: 'ok', handler: () => this.dialog = false}];
                    this.dialog = true;
                    this.questao.selecionada = aux;
                }
            },

            colocandoAlternativas() {
                if (!this.questao) {
                    return;
                }
                let alternativas = [];
                let words = ['A', 'B', 'C', 'D', 'E'];

                for (let i = 0; i < words.length; i++) {
                    alternativas.push({alternativa: words[i], texto: this.questao['r' + words[i].toLowerCase()]});
                }

                this.questao.alternativas = alternativas;
                let index = this.questoesId.indexOf(this.questao.id);
                if (index >= 0) {
                    this.questao.numero = (index + 1) + '/' + this.questoesId.length;
                } else {
                    this.questao.numero = 1 + '/45';
                }

            },


            tempo() {
                if (this.simulado.segundos !== undefined) {
                    this.simulado.segundos -= 1;

                    if (this.simulado.segundos < 0) {
                        this.simulado.segundos = 59;
                        this.simulado.minutos -= 1;

                        if (this.simulado.minutos < 0) {
                            this.simulado.minutos = 59;
                            this.simulado.horas -= 1;

                            if (this.simulado.horas < 0) {
                                this.simulado.horas = 0;
                            }
                        }
                    }

                    if (this.simulado.horas == 0 && this.simulado.minutos == 0 && this.simulado.segundos == 0) {
                        clearInterval(this.timer);
                        this.finalizarSimulado();
                    }
                }
            },

            acionandoCronometro() {
                this.timer = setInterval(this.tempo, 1000);
            },

            verificarNull(variavel, path) {
                if (!variavel) {
                    return null;
                }

                let page = variavel.replace(path + '?page=', '');

                return page;
            },

            colocarMeusGabaritos(areas, gabarito) {
                for (let area of areas) {
                    let objeto = {
                        area: area.titulo,
                        color: area.slug,
                        aberto: false,
                        icon: `/iconsinhos/${area.slug}-cor.png`,
                        questoes: gabarito.filter((e) => e.areaId == area.areaId)
                    };
                    this.meuGabaritoQuestoes.push(objeto);
                }
            }
        },

        async ionViewWillEnter() {
            this.loading = false;
            let usuario = await storage.get('user');
            usuario = JSON.parse(usuario.value);
            this.user = usuario;
            await this.inicio();
        }
    }
</script>

<style scoped>
    ion-content {
        --background: var(--ion-color-primary);
    }

    ion-item.questao {
        --background: white;
    }

    ion-list.questao {
        background: white;
        --background: white;
    }

    #menuzao ion-item, #menuzao ion-list {
        background: var(--ion-color-primary);
        --background: var(--ion-color-primary);
    }

    #gabarito-modal {
        background: rgba(20, 20, 20, .7);
        --background: rgba(20, 20, 20, .7);
    }

    #gabarito ion-item, #gabarito ion-list {
        background: #fff;
        --background: #fff;
    }

    .btn-questao-gabarito {
        width: 54px;
        height: 54px;
        --background: white;
        background: white;
    }

    .alternativas {
        height: auto;
    }

    .alternativa {
        min-width: 40px;
        width: 40px;
        min-height: 40px;
        height: 40px;
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

    .text-primary {
        color: #000952;
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

    ion-button {
        --box-shadow: none;
    }

    .text-alternativa {
        font-family: arial, sans, sans-serif;
        font-size: 13px;
        text-transform: initial
    }

    .bg-white {
        --background: white;
    }
</style>
