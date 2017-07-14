import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import '../static/css/theme-blue/index.css'
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

//拦截路由,权限控制;
router.beforeEach((to,from,next)=>{


   if(hasPermission(to)){
     next();
   }else{
     window.alert(`对不起,您没有访问:${to.name}的权限!`);
     next(false);
   }
});
//根据路由的name进行判断
function hasPermission(to){
  let ret=false;
  //是否是通用的路由
  for(let commonRoute of router.options.routes){
    if(commonRoute.name==to.name){
      ret=true;
      break;
    }
  }
  if(!ret){
    let allRoutes=store.state.allMenuRoutes;
    for(let routes of allRoutes){
      for(let route of routes.children){
        if(route.name==to.name){
          ret=true;
          break;
        }
      }
    }
  }
  return ret;
}
new Vue({
    el: '#app',
    router,
    store,
    render:h=>h(App)
})
