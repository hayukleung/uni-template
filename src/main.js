import Vue from 'vue'
import App from './App'
// for uni-simple-router start
import { router, RouterMount } from './router'
Vue.use(router)
// for uni-simple-router end

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount()
// #endif
