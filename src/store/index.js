/**
 * Created by hyylsw on 2017/6/14.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router/index'
import Plan from '@/views/plan/plan'
import Entity from '@/views/entity/entity'
import AddEntity from '@/views/entity/add'
import EntityQuotaByDay from '@/views/entity/quotaByDay'
import PlanQuotaByDay from '@/views/plan/quotaByDay'
import PlanEdit from '@/views/plan/edit'
import Index from '@/views/index/index'
import Layout from '@/views/layout/layout'
import * as PlanCtr from '@/api/plan';
import UserInfo from '@/views/basic/userInfo'
import Records from '@/views/basic/records'

Vue.use(Vuex);
Vue.prototype.axios=axios;
const store=new Vuex.Store({
    state:{
        planId:'',
        costTypes:[],
        deliveryModes:[],
        extensionTypes:[],
        genders:[],
        academics:[],
        systems:[],
        operators:[],
        networks:[],
        entityTypes:[],
        routes:[],
        userInfo:{},
        sideMenus:[],
        allMenuRoutes:[
            {
                path:'/index',
                component:Layout,
                redirect:'/index/index',
                menu:'首页概况',
                meta:{roles:[2]},
                children:[
                  {path:'index',name:'首页概览',component:Index,meta:{roles:[2]}},
                  {path:'userInfo',name:'账号信息',component:UserInfo,meta:{roles:[2]}},
                  {path:'records',name:'充值记录',component:Records,meta:{roles:[2]}}
                ]
            },
            {
                path:'/plan',
                component:Layout,
                redirect:"/plan/index",
                menu:'计划管理',
                meta:{roles:[2]},
                children:[
                  {path:"index",name:"计划管理",component:Plan,meta:{roles:[2]}},
                  {path:"edit",name:'计划修改',component:PlanEdit,meta:{roles:[2]}},
                  {path:"entity",name:'创意管理',component:Entity,meta:{roles:[2]}},
                  {path:"addEntity",name:'创意修改',component:AddEntity,meta:{roles:[2]}},
                  {path:"entityQuotaByDay",name:'创意报表',component:EntityQuotaByDay,meta:{roles:[2]}},
                  {path:"planQuotaByDay",name:'计划报表',component:PlanQuotaByDay,meta:{roles:[2]}}
                ]
          }
        ]
    },
    mutations:{
        reset(state){
          state=null;
        },
        saveUserInfo(state,userInfo){
            state.userInfo=userInfo;
            //动态生成该用户的路由权限:这只是二级路由,如果是多级路由的话,得写一个递归函数了.稍后改写.
            let type=userInfo.type;
            state.routes=[];
            for(let menuRoute of state.allMenuRoutes){
              if(menuRoute.meta.roles.includes(type)){
                let newMenuRoute=Object.assign({},menuRoute);
                newMenuRoute.children=[];
                for(let child of menuRoute.children){
                  if(child.meta.roles.includes(type)){
                    newMenuRoute.children.push(child);
                  }
                }
                state.routes.push(newMenuRoute);
                router.addRoutes(state.routes);
              }
            }
        },
        saveCostTypes(state,costTypes){
            state.costTypes=costTypes;
        },
        saveDeliveryModes(state,deliveryModes){
            state.deliveryModes=deliveryModes;
        },
        saveFrequencPeriods(state,frequencPeriods){
            state.frequencPeriods=frequencPeriods;
        },
        saveExtensionTypes(state,extensionTypes){
            state.extensionTypes=extensionTypes;
        },
        saveGenders(state,genders){
            state.genders=genders;
        },
        saveAcademics(state,academics){
            state.academics=academics;
        },
        saveSystems(state,systems){
            state.systems=systems;
        },
        saveNetworks(state,networks){
            state.networks=networks;
        },
        saveOperators(state,operators){
            state.operators=operators;
        },
        saveAreas(state,areas){
            state.areas=areas;
        },
        saveEntityTypes(state,entityTypes){
            state.entityTypes=entityTypes;
        },
        savePlanId(state,planId){
          state.planId=planId;
        }
    },
    getters:{
        getUserInfo:state=>{
            return state.userInfo;
        },
        getRoutes:state=>{
            return state.routes;
        },
        getCostTypes:state=>{
            return state.costTypes;
        },
        getDeliveryModes:state=>{
            return state.deliveryModes;
        },
        getFrequencPeriods:state=>{
            return state.frequencPeriods;
        },
        getExtensionTypes:state=>{
            return state.extensionTypes;
        },
        getGenders:state=>{
            return state.genders;
        },
        getAcademics:state=>{
            return state.academics;
        },
        getOperators:state=>{
            return state.operators;
        },
        getSystems:state=>{
            return state.systems;
        },
        getNetworks:state=>{
            return state.networks;
        },
        getAreas:state=>{
            return state.areas;
        },
        getEntityTypes:state=>{
            return state.entityTypes;
        },
        getPlanId:state=>{
          return state.planId;
        }
    }
});
export default store;

