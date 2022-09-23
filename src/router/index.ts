import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PromotionsView from '../views/PromotionsView.vue'
import CustomersView from '../views/CustomersView.vue'
import ModeratorsView from '../views/ModeratorsView.vue'
import StoresView from '../views/StoresView.vue'
import SettingsView from '../views/SettingsView.vue'
import LoginView from '../views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home' , component: HomeView }, 
    { path: '/customers', name: 'customers', component: CustomersView }, 
    { path: '/promotons', name: 'promotions', component: PromotionsView }, 
    { path: '/moderators', name: 'moderators', component: ModeratorsView }, 
    { path: '/stores', name: 'stores', component: StoresView }, 
    { path: '/settings', name: 'settings', component: SettingsView }, 
    { path: '/login', name: 'login', component: LoginView }, 

  ]
})

export default router
