import Vue from 'vue'
import App from './App'
import dotenv from 'dotenv'

dotenv.config()
import vueDebounce from 'vue-debounce'

Vue.use(vueDebounce)
// Setting a different event to listen to
Vue.use(vueDebounce, {
  listenTo: 'input'
})
new Vue({
  render: h => h(App),
}).$mount('#app')
