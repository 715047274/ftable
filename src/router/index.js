import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const base = '/FunctionalTestRepository.DevConfig.AcceptanceTestSuite.FuncSuite.PayrollSuite.HtmlSuite.FtablePraser';

const routes = [
  {
    path: `${base}`,
    name: 'home',
    component: HomeView
  },
  {
    path: `${base}/about`,
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'home',
    component: HomeView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
