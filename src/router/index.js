import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'
import Storage from '../storage/StorageKey';

const routes = [
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/login'
      },

      {
        path: '/login',
        name:'login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/simulados/SimuladosInicio.vue')
      },
      {
        path: 'atividades',
        component: () => import('@/views/Atividades.vue'),
      },
      {
        path: 'atividades-inicio',
        component: () => import('@/views/atividades/AtividadesInicio.vue')
      },
      {
        path: 'atividades-disponiveis',
        component: () => import('@/views/atividades/AtividadesDisponiveis.vue')
      },
      {
        path: 'atividades-entregues',
        component: () => import('@/views/atividades/AtividadesEntregues.vue')
      },
      {
        path: 'correcao-atividades-entregues',
        component: () => import('@/views/atividades/CorrecaoAtividadesEntregues.vue')
      },
      {
        path: 'meu-desempenho',
        component: () => import('@/views/atividades/VerDesempenhoDisciplinas.vue')
      },
      {
        path: 'ver-atividades',
        component: () => import('@/views/atividades/VerAtividades.vue')
      },
      {
        path: 'ver-simulados',
        component: () => import('@/views/atividades/VerSimulados.vue')
      },
      {
        path: 'correcao-simulados-entregues',
        component: () => import('@/views/atividades/CorrecaoSimuladosEntregues.vue')
      },
      {
        path: 'videoaulas',
        component: () => import('@/views/Videoaulas.vue')
      },
      {
        path: 'videoaulas-inicio/:id',
        component: () => import('@/views/videoaulas/VideoaulasInicio.vue')
      },
      {
        path: 'videoaulas-assuntos/:id/volume/:volume',
        component: () => import('@/views/videoaulas/VideoaulasAssuntos.vue')
      },
      {
        path: 'ver-videoaula/:id',
        component: () => import('@/views/videoaulas/VerVideoaulas.vue')
      },
      {
        path: 'redacoes',
        component: () => import('@/views/Redacoes.vue')
      },
      {
        path: 'redacoes-inicio',
        component: () => import('@/views/redacoes/RedacoesInicio.vue')
      },
      {
        path: 'ver-rascunho-enviar-redacao/:id',
        component: () => import('@/views/redacoes/VerRascunhoEnviarRedacao.vue')
      },
      {
        path: 'ver-correcao-redacao',
        component: () => import('@/views/redacoes/VerCorrecaoRedacao.vue')
      },
      {
        path: 'redacoes-entregues',
        component: () => import('@/views/redacoes/RedacoesEntregues.vue')
      },
      {
        path: 'ranking',
        component: () => import('@/views/ranking/RankingInicio.vue')
      },
      {
        path: 'simulado',
        component: () => import('@/views/simulados/SimuladosInicio.vue')
      },
      {
        path: 'desempenho-simulados-estaduais',
        component: () => import('@/views/simulados/DesempenhoSimuladosEstaduais.vue')
      },
      {
        path: 'ver-simulado/:id',
        component: () => import('@/views/simulados/SimuladosDiasRedacao.vue')
      },
      {
        path: 'ver-meu-desempenho-geral',
        component: () => import('@/views/simulados/VerMeuDesempenhoGeral.vue')
      },
      {
        path: 'ver-meu-desempenho-areas',
        component: () => import('@/views/simulados/VerDesempenhoArea.vue')
      },
      {
        path: 'responder-simulado/:id',
        component: () => import('@/views/simulados/ResponderSimulado.vue')
      },
      {
        path: 'responder-redacao',
        component: () => import('@/views/simulados/ResponderRedacao.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( async (to, from, next) => {
  try{
    let user = await Storage.get('user');
    console.log('Usuário:' ,user);
    if (user.value && to.name == 'login') {
    // if (false) {
      // await api.get('/noticias');
      next({name: 'home'})
  }
  }catch(e) {
    console.log(e);
    // window.localStorage.removeItem('_cap_user');
    next();
  }

  next();
});

export default router
