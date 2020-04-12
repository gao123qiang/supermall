import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'components/common/toast'

import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

import store from './store'

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(ElementUI);
Vue.use(Toast);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
