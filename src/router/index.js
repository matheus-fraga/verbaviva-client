import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import ParticipatoryBudgetingView from '../views/ParticipatoryBudgetingView.vue'
import UsuariosView from '../views/UsuariosView.vue'
import CriarProjetoView from '../views/CriarProjetoView.vue'
import UserRegister from '../views/UserRegister.vue'
import AdminView from '../views/AdminView.vue'

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
      path: '/user-register',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/users',
      name: 'users',
      component: UsuariosView
    },
    {
      path: '/create_project',
      name: 'create_project',
      component: CriarProjetoView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/UpdateUsuario.vue')
    }
  ]
})

export default router