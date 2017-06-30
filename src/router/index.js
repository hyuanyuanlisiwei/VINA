/**
 * Created by hyylsw on 2017/6/14.
 */
import Login from '@/views/login/login'
import Register from '@/views/register/register'
import UserInfo from '@/views/basic/userInfo'
import Records from '@/views/basic/records'
import VueRouter from 'vue-router'
const initRoutes=[
    {
        path:'/',
        component:Login
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/userInfo',
        component:UserInfo
    },
   {
        path:'/records',
        component:Records
   }
]
export default new VueRouter({
    mode:"history",
    routes:initRoutes
})



