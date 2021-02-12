import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/home'
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
        path: 'ver-atividades',
        component: () => import('@/views/atividades/VerAtividades.vue')
      },
      {
        path: 'videoaulas',
        component: () => import('@/views/Videoaulas.vue')
      },
      {
        path: 'videoaulas-inicio',
        component: () => import('@/views/videoaulas/VideoaulasInicio.vue')
      },
      {
        path: 'redacoes',
        component: () => import('@/views/Redacoes.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
