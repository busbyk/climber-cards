import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
Vue.use(VueResource);
Vue.use(VueRouter);

import App from './App.vue';
import Login from './Login.vue';

const routes = [
  {
    path: '/',
    component: App
  },{
    path: '/login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

const app = new Vue({
  router
}).$mount('#app');
