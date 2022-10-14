import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PromotionsView from '../views/PromotionsView.vue'
import CustomersView from '../views/CustomersView.vue'
import ModeratorsView from '../views/ModeratorsView.vue'
import StoresView from '../views/StoresView.vue'
import SettingsView from '../views/SettingsView.vue'
import LoginView from '../views/LoginView.vue'
import ResetView from '../views/ResetView.vue'
import ForgetView from '../views/ForgetView.vue'
import AboutView from '../views/AboutView.vue'
import CreateCustomerView from '@/views/CreateCustomerView.vue'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home' , component: AboutView }, 
    { path: '/customers', name: 'customers', component: CustomersView }, 
    { path: '/promotions', name: 'promotions', component: PromotionsView }, 
    { path: '/moderators', name: 'moderators', component: ModeratorsView }, 
    { path: '/customer/:id', name: 'customer', component: CreateCustomerView }, 
    { path: '/stores', name: 'stores', component: StoresView }, 
    { path: '/settings', name: 'settings', component: SettingsView }, 
    { path: '/login', name: 'login', component: LoginView }, 
    { path: '/reset', name: 'reset', component: ResetView }, 
    { path: '/forget', name: 'forget', component: ForgetView }, 

  ]
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['login', 'reset', 'forget', 'customer'];
  const authRequired = !publicPages.includes(to.name.toString());
  const auth = useAuthStore();

  // console.log(auth.user);
  if (authRequired && !auth.user) {
      auth.returnUrl = to.fullPath;
      return '/login';
  }
  if (!authRequired && auth.user)
  {
    // auth.returnUrl = to.fullPath;
    return '/';
  }
});

export default router
