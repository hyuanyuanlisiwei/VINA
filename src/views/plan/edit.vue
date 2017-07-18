<template>
    <div class="edit-wrapper">
      <bread-crumb :breadcrumbs="[{to:'/plan',name:'计划管理'},{to:'',name:'计划新增或修改'}]"></bread-crumb>
      <el-row >
            <el-col :span="24" v-if="!editState">
                <!--创建-->
                <el-steps space="33%" :active="addActive" style="margin-left: 16%">
                    <el-step title="基本信息"></el-step>
                    <el-step title="定向设置"></el-step>
                    <el-step title="创建广告"></el-step>
                </el-steps>
            </el-col>
            <el-col :span="24" v-if="editState">
                <!--修改-->
                <el-steps space="50%" :active="editActive" style="margin-left: 25%">
                    <el-step title="基本信息"></el-step>
                    <el-step title="定向设置"></el-step>
                </el-steps>
            </el-col>
        </el-row>
        <!--基本信息-->
        <el-row class="mtop" v-show="showStep1">
            <el-col :span="12" :offset="4">
                <el-form :model="BasicInfoModel" :rules="BasicInfoRules"  ref="BasicInfoForm" label-width="150px">
                    <el-form-item label="计划名称" prop="unitName">
                        <el-input v-model="BasicInfoModel.unitName"></el-input>
                    </el-form-item>
                    <el-form-item label="计费方式">
                        <template>
                            <el-radio-group v-model="BasicInfoModel.costType">
                                <el-radio class="radio" :label="50">CPM</el-radio>
                                <el-radio class="radio" :label="775" :disabled="isCPA==0">CPA</el-radio>
                            </el-radio-group>
                            <el-tooltip content="完成S2S对接后可开启此选项" placement="top-start" v-show="isCPA==0">
                              <span class="el-icon-information" style="color:#157abc"></span>
                            </el-tooltip>
                        </template>
                    </el-form-item>
                    <policy :policies="policies"></policy>
                    <el-form-item label="投放方式">
                        <template>
                            <el-radio-group v-model="BasicInfoModel.deliveryMode">
                               <el-radio class="radio" v-for="(item,index) in deliveryModes" :key="index" :label="item.id">{{item.dicValue}}</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="是否频次控制">
                        <el-radio-group v-model="BasicInfoModel.isFrequency">
                            <el-radio class="radio" :label="1">是</el-radio>
                            <el-radio class="radio" :label="0">否</el-radio>
                        </el-radio-group>
                        <div v-show="BasicInfoModel.isFrequency==1">
                            <el-form-item label="频次周期">
                                <el-radio-group v-model="BasicInfoModel.frequencPeriod">
                                    <el-radio v-for="(item,index) in frequencPeriods" :key="index" :label="item.id">{{item.dicValue}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="频次值">
                              <el-input-number v-model="BasicInfoModel.frequencyNum" type="number"></el-input-number>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item label="是否过滤非法设备ID">
                        <el-radio-group v-model="BasicInfoModel.isfilterDeviceCode">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="投放类型">
                        <el-radio-group v-model="BasicInfoModel.extensionType">
                            <el-radio label="">不限</el-radio>
                            <el-radio v-for="(item,index) in extensionTypes" :key="index" :label="item.id">{{item.dicValue}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="推广链接" prop="landUrl">
                        <el-input v-model="BasicInfoModel.landUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="点击上报地址">
                        <inputs :urls="clkMonitorUrls"></inputs>
                    </el-form-item>
                    <el-form-item label="曝光上报地址">
                        <inputs :urls="impMonitorUrls"></inputs>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!--定向设置-->
        <el-row class="mtop" v-show="showStep2">
            <el-col :span="12" :offset="4">
                <el-form :model="TargetSetModel" label-width="150px">
                    <el-form-item label="年龄">
                        <el-radio-group v-model="dxNlFlag">
                            <el-radio label="">不限</el-radio>
                            <el-radio :label="1">自定义</el-radio>
                        </el-radio-group>
                        <div v-show="dxNlFlag==1">
                            <el-checkbox-group v-model="TargetSetModel.dxNl">
                                <el-checkbox v-for="(item,index) in ages" :key="index" :label="item.key">{{item.value}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="TargetSetModel.dxXb">
                            <el-radio v-for="(item,index) in genders" :key="index" :label="item.id">{{item.dicValue}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="学历">
                        <el-radio-group v-model="dxXlFlag">
                            <el-radio label="">不限</el-radio>
                            <el-radio :label="1">自定义</el-radio>
                        </el-radio-group>
                        <div v-show="dxXlFlag==1">
                            <el-checkbox-group v-model="TargetSetModel.dxXl">
                                <el-checkbox style="margin-left: 15px" v-for="(item,index) in academics" :key="index" :label="item.id">{{item.dicValue}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                    <el-form-item label="操作系统">
                        <el-radio-group v-model="dxCzxtFlag">
                            <el-radio label="">不限</el-radio>
                            <el-radio :label="1">自定义</el-radio>
                        </el-radio-group>
                        <div v-show="dxCzxtFlag==1">
                            <el-checkbox-group v-model="TargetSetModel.dxCzxt">
                                <el-checkbox style="margin-left: 15px" v-for="(item,index) in systems" :key="index" :label="item.id">{{item.dicValue}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                    <el-form-item label="运营商">
                        <el-radio-group v-model="dxYysFlag">
                            <el-radio label="">不限</el-radio>
                            <el-radio :label="1">自定义</el-radio>
                        </el-radio-group>
                        <div v-show="dxYysFlag==1">
                            <el-checkbox-group v-model="TargetSetModel.dxYys">
                                <el-checkbox style="margin-left: 15px" v-for="(item,index) in operators" :key="index" :label="item.id">{{item.dicValue}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                    <el-form-item label="网络">
                        <el-radio-group v-model="dxWlFlag">
                            <el-radio label="">不限</el-radio>
                            <el-radio :label="1">自定义</el-radio>
                        </el-radio-group>
                        <div v-show="dxWlFlag==1">
                            <el-checkbox-group v-model="TargetSetModel.dxWl">
                                <el-checkbox style="margin-left: 15px" v-for="(item,index) in networks" :key="index" :label="item.id">{{item.dicValue}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                    <el-form-item label="地区">
                        <el-radio-group v-model="dxDqFlag">
                            <el-radio label="">不限</el-radio>
                            <el-radio :label="1">自定义</el-radio>
                        </el-radio-group>
                        <div v-show="dxDqFlag==1">
                            <el-tree :data="areas" :props="treeProps"
                                     ref="treeAreas"
                                     show-checkbox node-key="id"
                                     :highlight-current='true'
                            ></el-tree>
                        </div>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!--创建广告-->
        <el-row class="mtop" v-show="showStep3">
          <add-entity></add-entity>
        </el-row>
        <el-row>
            <el-col :span="6" :offset="18" v-if="editState">
                <el-button style="margin-top: 12px;" @click="editActive--" :disabled="editActive==0">上一步</el-button>
                <el-button style="margin-top: 12px;" @click="next" :disabled="editActive==1">下一步</el-button>
                <el-button style="margin-top: 12px;" @click="planUpdate">完成</el-button>
            </el-col>
            <el-col :span="6" :offset="18" v-if="!editState">
                <el-button style="margin-top: 12px;" @click="addActive--" :disabled="addActive==0">上一步</el-button>
                <el-button style="margint-top:12px" @click="planSave" v-if="addActive==1">生成计划</el-button>
                <el-button style="margin-top: 12px;" @click="next" v-if="addActive!=1" :disabled="addActive==2">下一步</el-button>
                <el-button style="margin-top: 12px;" @click="addFinish">完成</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import policy from './policy.vue'
import * as PlanCtr from '@/api/plan';
import inputs from './inputs.vue'
import moment from 'moment';
import AddEntity from '@/views/entity/addEntity'
import BreadCrumb from '@/views/layout/breadcrumb'
export default{
    components:{
        policy,
        inputs,
        AddEntity,
        BreadCrumb
    },
    data(){
        return {
            isCPA:true,
            id:'',
            editActive:0,
            addActive:0,
            formNames:["BasicInfoForm","TargetSetForm","CreateAdForm"],
            //图片上传
//            uploadURL:'http://192.168.0.254:8080/upload/uploadFile',
            uploadURL:'/upload/uploadFile',
            picDialogVisible:false,
            picDialogUrl:'',
            //贴片上传
            videoDialogVisible:false,
            videoDialogUrl:'',
            //返显和提交时候重组的数据;
            //传入子组件的值;
            policies:[],
            clkMonitorUrls:[{url:''}],
            impMonitorUrls:[{url:''}],
            //字典数据;
            costTypes:[],
            deliveryModes:[],
            frequencPeriods:[],
            extensionTypes:[],
            ages:[],
            genders:[],
            academics:[],
            areas:[],
            systems:[],
            operators:[],
            networks:[],
            //标志位
            dxNlFlag:'',
            dxXlFlag:'',
            dxDqFlag:'',
            dxCzxtFlag:'',
            dxYysFlag:'',
            dxWlFlag:'',
            //基本信息
            BasicInfoModel:{
                unitName:'',
                costType:50,
                deliveryMode:188,
                isFrequency:0,
                frequencyNum:0,
                //这两个单词错误
                frequencPeriod:0,
                isfilterDeviceCode:0,
                frequencyNum:0,
                extensionType:47,
                landUrl:'',
                clkMonitorUrl:'',
                impMonitorUrl:''
            },
            BasicInfoRules:{
                unitName: [
                    { required: true, message: '请输入计划名称', trigger: 'blur' },
                ],
                landUrl:[
                    {required:true, message:'请输入推广链接', trigger: 'blur'}
                ]
            },
            //定向设置
            TargetSetModel:{
                dxNl:[],
                dxXb:23,
                dxXl:[],
                dxDq:[],
                dxCzxt:[],
                dxYys:[],
                dxWl:[],
            },
            treeProps: {
                children: 'childs',
                label: 'dicValue'
            }
        }
    },
    mounted(){
        this.id=this.$route.query.id;
        this.isCPA=this.$store.getters.getUserInfo.isCPA;
        if(this.editState){
            this.planGet();
        }
        this.initPolicies();
        //------字典数据---------
        this.getAreas();
        this.getCostTypes();
        this.getDeliveryModes();
        this.getFrequencPeriods();
        this.getExtensionTypes();
        this.getAges();
        this.getGenders();
        this.getAcademics();
        this.getSystems();
        this.getOperators();
        this.getNetworks();
    },
    computed:{
        editState(){
            return this.id?true:false;
        },
        showStep1(){
            if(this.editState){
                return this.editActive==0
            }else{
                return this.addActive==0;
            }
        },
        showStep2(){
            if(this.editState){
                return this.editActive==1;
            }else{
                return this.addActive==1;
            }
        },
        showStep3(){
            if(this.editState){
                return false;
            }else{
                return this.addActive==2;
            }
        }
    },
    methods:{
        next(){
            let finished=this.editState?this.editActive:this.addActive;
            let formName=this.formNames[finished];
            if(finished==0){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.editState ? this.editActive++ : this.addActive++;
                    }else{
                        this.$alert("有些输入不合法!",'警告',{
                            confirmButton:"确定"
                        });
                        return false;
                    }
                });
            }else if(finished==1){
                this.editState ? this.editActive++ : this.addActive++;
            }else if(finished==2){
                this.editState ? this.editActive++ : this.addActive++;
            }
        },
        addFinish(){
            this.$router.push({path:"/plan"});
        },
        initPolicies(limits){
            if(!limits){
                this.policies=[{
                    date:['',''],
                    timeFlag:0,
                    times:[{startTime:'00:00',endTime:'00:00'}],
                    limit:0
                }];
                return;
            }
            let limitsArr=JSON.parse(limits);
            this.policies=[];
            for(let limit of limitsArr){
                let policy={};
                this.policies.push(policy);
                policy['date']=this.initPolicyDateFromStr(limit['date']);
                policy['limit']=limit['limit']/100;
                if(limit['times']){
                    policy['times']=this.formatTimesStr(limit['times']);
                    policy['timeFlag']=1;
                }else{
                    policy['timeFlag']=0;
                }
            }
        },
        initPolicyDateFromStr(dateStr){
            let dateStrArr=dateStr.split('-');
            let ret=[];
            ret.push(moment(dateStrArr[0],'YYYY-MM-DD')._d);//moment类型转换为Date类型
            ret.push(moment(dateStrArr[1],'YYYY-MM-DD')._d);//moment类型转换为Date类型
            return ret;
        },
        formatTimesStr(times){
             let timesArr=times.split(',');
             let ret=[];
             for(let item of timesArr){
                 let time={};
                 ret.push(time);
                 let temp=item.split("-");
                 time["startTime"]=temp[0]+":00";
                 time["endTime"]=temp[1]+":00";
             }
             return ret;
        },
        formatDateStr(date){
            let dateArr=date.split('-');
            let ret=[];
            ret[0]=dateArr[0].substring(0,4)+'-'+dateArr[0].substring(4,6)+'-'+dateArr[0].substring(6,8);
            ret[1]=dateArr[1].substring(0,4)+'-'+dateArr[1].substring(4,6)+'-'+dateArr[1].substring(6,8);
            return ret;
        },
        planGet(){
            let params={id:this.id};
            PlanCtr.planGet(params).then(res=>{
                let ret=res.data;
                if("A000000"==ret['code']){
                    this.initModel(ret['data']);
                }
            }).catch(err=>{});
        },
        createUrls(urlsArrObj,urls){
            for(let url of urls){
                urlsArrObj.push({'url':url});
            }
        },
        initModel(data){
          for(let key of Object.keys(data)){
            if("impMonitorUrl"==key){
              this.impMonitorUrls=[];
              this.createUrls(this.impMonitorUrls,data[key].split(","));
              continue;
            }else if('clkMonitorUrl'==key){
                this.clkMonitorUrls=[];
                this.createUrls(this.clkMonitorUrls,data[key].split(","));
              continue;
            }else if('limits'==key){
              this.initPolicies(data[key]);
              continue;
            }else if('dxDq'==key){
                this['dxDqFlag']=1;
                this.TargetSetModel[key]=data[key].split(",");
                this.$refs.treeAreas.setCheckedKeys(this.TargetSetModel[key]);
                continue;
            }
            //反显基本信息
            if(this.BasicInfoModel.hasOwnProperty(key)){
              this.BasicInfoModel[key]=data[key];
            }else if(this.TargetSetModel.hasOwnProperty(key)){ //反显定向设置.
              let flag=key+'Flag';
              if(!this.hasOwnProperty(flag)){
                continue;
              }
              if(this.TargetSetModel[key]){
                this[flag]=1;

                if(data[key] && data[key]==parseInt(data[key])){
                  this.TargetSetModel[key]=[+data[key]];
                }else if(key=='dxNl'){
                    this.TargetSetModel[key]=data[key].split(',');
                }else{
                  this.TargetSetModel[key]=(data[key]).split(',').map((item)=>{
                      return +item;
                  });
                }
              }else{
                this[flag]='';
              }
            }
          }
        },
        planUpdate(){
            let params=this.initParams();
            params["id"]=this.id;
            //2,发送请求
            PlanCtr.planUpdate(params).then((res)=>{
              let ret=res.data;
              if("A000000"==ret['code']){
                 this.$router.push({path:"/plan"});
              }
            }).catch(err=>{});
        },
        planSave(){
            let params=this.initParams();
            //2,发送请求
            PlanCtr.planSave(params).then((res)=>{
                let ret=res.data;
                if("A000000"==ret['code']){
                  this.$store.commit('savePlanId',ret['data']);
                    this.next();
                }else{
                  this.$message.error(ret['message']);
                }
            }).catch(err=>{});
        },
        initParams(){
          //1,准备参数;
          let params=Object.assign({},this.BasicInfoModel,this.TargetSetModel);
          //数组转化为字符串;
          params['dxDq']=this.$refs.treeAreas.getCheckedKeys().join(',');
          params['dxNl']=params['dxNl'].join(',');
          params['dxWl']=params['dxWl'].join(',');
          params['dxXl']=params['dxXl'].join(',');
          params['dxYys']=params['dxYys'].join(',');
          params['dxCzxt']=params['dxCzxt'].join(',');
          //多个
          params['clkMonitorUrl']=this.getUrls(this.clkMonitorUrls);
          params['impMonitorUrls']=this.getUrls(this.impMonitorUrls);
          //复杂的分段处理
          params['limits']=this.getSavedPolicies();
          return params;
        },
        getSavedPolicies(){
            let ret=[];
            for(let item of this.policies){
                let obj={};
                ret.push(obj);
                obj['date']=this.getFormatDateStr(item['date'][0])+'-'+this.getFormatDateStr(item['date'][1]);
                obj['limit']=item['limit']*100;
                if(0==item['timeFlag']){
                    obj["times"]='';
                }else{
                    let times=[];
                    for(let time of item['times']){
                        times.push(time['startTime'].substring(0,2)+'-'+time['endTime'].substring(0,2));
                    }
                    obj['times']=times.join(',');
                }
            }
            return JSON.stringify(ret);
        },
        getFormatDateStr(date){
            if(!date){
                return '';
            }
            let y=date.getFullYear();
            let m=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1;
            let d=date.getDate()<10?'0'+(date.getDate()):date.getDate();
            return y+m+d;
        },
        getUrls(array){
            let ret=[];
            for(let item of array){
                ret.push(item['url']);
            }
            return ret.join(',');
        },
        //------字典数据-------
        getCostTypes(){
            this.costTypes=this.$store.getters.getCostTypes;
            if(this.costTypes && this.costTypes.length>0){
                return;
            }
            PlanCtr.getCostType().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.costTypes=ret.data;
                    this.$store.commit("saveCostTypes",ret.data);
                }
            }).catch(error=>{});
        },
        getDeliveryModes(){
            this.deliveryModes=this.$store.getters.getDeliveryModes;
            if(this.deliveryModes && this.deliveryModes.length>0){
                return;
            }
            PlanCtr.getDeliveryModes().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.deliveryModes=ret.data;
                    this.$store.commit("saveDeliveryModes",ret.data);
                }
            }).catch(error=>{});
        },
        getFrequencPeriods(){
            this.frequencPeriods=this.$store.getters.getFrequencPeriods;
            if(this.frequencPeriods && this.frequencPeriods.length>0){
                return;
            }
            PlanCtr.getFrequencPeriods().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.frequencPeriods=ret.data;
                    this.$store.commit("saveFrequencPeriods",ret.data);
                }
            }).catch(error=>{});
        },
        getExtensionTypes(){
            this.extensionTypes=this.$store.getters.getExtensionTypes;
            if(this.extensionTypes && this.extensionTypes.length>0){
                return;
            }
            PlanCtr.getExtensionTypes().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.extensionTypes=ret.data;
                    this.$store.commit("saveExtensionTypes",ret.data);
                }
            }).catch(error=>{});
        },
        getAges(){
            this.ages=[
                {key:'0-18',value:'18岁以下'},
                {key:'18-23',value:'18-23岁'},
                {key:'24-30',value:'24-30岁'},
                {key:'31-40',value:'31-40岁'},
                {key:'41-50',value:'41-50岁'},
                {key:'50-200',value:'50岁以上'}
            ];
        },
        getGenders(){
            this.genders=this.$store.getters.getGenders;
            if(this.genders && this.genders.length>0){
                return;
            }
            PlanCtr.getGenders().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.genders=ret.data;
                    this.$store.commit("saveGenders",ret.data);
                }
            }).catch(error=>{});
        },
        getAcademics(){
            this.academics=this.$store.getters.getAcademics;
            if(this.academics && this.academics.length>0){
                return;
            }
            PlanCtr.getAcademics().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.academics=ret.data;
                    this.$store.commit("saveAcademics",ret.data);
                }
            }).catch(error=>{});
        },
        getSystems(){
            this.systems=this.$store.getters.getSystems;
            if(this.systems && this.systems.length>0){
                return;
            }
            PlanCtr.getSystems().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.systems=ret.data;
                    this.$store.commit("saveSystems",ret.data);
                }
            }).catch(error=>{});
        },
        getNetworks(){
            this.networks=this.$store.getters.getNetworks;
            if(this.networks && this.networks.length>0){
                return;
            }
            PlanCtr.getNetworks().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.networks=ret.data;
                    this.$store.commit("saveNetworks",ret.data);
                }
            }).catch(error=>{});
        },
        getOperators(){
            this.operators=this.$store.getters.getOperators;
            if(this.operators && this.operators.length>0){
                return;
            }
            PlanCtr.getOperators().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.operators=ret.data;
                    this.$store.commit("saveOperators",ret.data);
                }
            }).catch(error=>{});
        },
        getAreas(){
            this.areas=this.$store.getters.getAreas;
            if(this.areas && this.areas.length>0){
                return;
            }
            PlanCtr.getAreas().then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.areas=ret.data;
                    this.$store.commit("saveAreas",ret.data);
                }
            }).catch(error=>{});
        },
    }
}
</script>
<style scoped lang="scss" ref="stylesheet/scss">
    .mtop{
        margin-top: 40px;
    }
    .mbottom{
        margin-bottom: 30px;
    }
</style>
