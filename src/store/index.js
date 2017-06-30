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
        userInfo:{},
        routes:[],
        entityTypes:[],
        allMenus:[
            {
                path:'/index',
                component:Layout,
                redirect:'/index/index',
                name:"首页概览",
                children:[
                    {path:'index',component:Index}
                ]
            },
            {
                path:'/plan',
                component:Layout,
                redirect:"/plan/index",
                name:"计划管理",
                children:[
                    {path:"index",component:Plan},
                    {path:"edit",component:PlanEdit},
                    {path:"entity",component:Entity},
                    {path:"addEntity",component:AddEntity},
                    {path:"entityQuotaByDay",component:EntityQuotaByDay},
                    {path:"planQuotaByDay",component:PlanQuotaByDay}
                ]
            },
        ]
    },
    mutations:{
        reset(state){
          state=null;
        },
        saveUserInfo(state,userInfo){
            state.userInfo=userInfo;
            let permissions=userInfo.permissions;
            state.routes=[];
            for(let permission of permissions){
                for(let menu of state.allMenus){
                    if(menu['path']==permission['url']){
                        state.routes.push(menu);
                    }
                }
            }
            router.addRoutes(state.routes);
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
        getUserMenus:state=>{
            return state.userInfo.permissions;
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

