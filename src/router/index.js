import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue')
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
        path: 'ver-rascunho-enviar-redacao',
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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
