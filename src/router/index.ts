import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */'@/views/Home.vue')
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
