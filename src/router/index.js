/**
 * Created by hyylsw on 2017/6/14.
 */
import Login from '@/views/login/login'
import Register from '@/views/register/register'
import NotFound from '@/views/error/error404'
import VueRouter from 'vue-router'
const initRoutes=[
    {
        path:'/',
        name:'登录',
        component:Login
    },{
      path:'/register',
      name:'注册',
      component:Register
  },{
      path:'*',
      component:NotFound
  }
];
export default new VueRouter({
    mode:'history',
    routes:initRoutes
})



