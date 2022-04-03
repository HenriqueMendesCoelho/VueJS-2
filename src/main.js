import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/'
Vue.use(VueRouter);

const router = new VueRouter({ 
  routes,
  mode: 'history'
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: 'Este campo é obrigatório!'
});