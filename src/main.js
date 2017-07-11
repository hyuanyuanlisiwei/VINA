import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Mock from 'mockjs'
import Vuex from 'vuex'
import echarts from 'echarts'

import App from './App'
import router from './router/index'
import store from './store/index'

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.axios=axios;
Vue.prototype.echarts=echarts;

//router拦截
// router.beforeEach((to,from,next)=>{
//   next();
// });

new Vue({
    el: '#app',
    router,
    store,
    render:h=>h(App)
})
