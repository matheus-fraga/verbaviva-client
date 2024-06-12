import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import ParticipatoryBudgetingView from '../views/ParticipatoryBudgetingView.vue'
import UsuariosView from '../views/UsuariosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectView
    },
    {
      path: '/pb',
      name: 'pb',
      component: ParticipatoryBudgetingView
    },
    {
      path: '/userRegister',
      name: 'userRegister',
      component: () => import('../views/AddUsuario.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: UsuariosView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/UpdateUsuario.vue')
    }
  ]
})

export default router