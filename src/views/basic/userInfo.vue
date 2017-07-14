<template>
    <div>
      <basic-comp></basic-comp>
      <basic-info-comp :BasicInfo="BasicInfoModel" :form="BasicInfoForm" :isDisabled="BasicInfoDisabled"></basic-info-comp>
      <el-row>
        <el-col :span="22" :offset="19">
          <el-button type="primary" @click="startUpdate">启动修改基本信息</el-button>
        </el-col>
      </el-row>
      <invoice-info-comp :InvoiceInfo="InvoiceInfoModel" :form="InvoiceInfoForm" :isDisabled="InvoiceDisabled"></invoice-info-comp>
      <el-row>
        <el-col :span="22" :offset="20">
          <el-button type="primary" @click="updateUserInfo" size="large">保存</el-button>
          <el-button @click="quitUpdate" size="large">取消</el-button>
        </el-col>
      </el-row>

    </div>
</template>
<script>
import BasicInfoComp from '@/views/register/basicInfo'
import InvoiceInfoComp from '@/views/register/invoiceInfo'
import BasicComp from '@/views/basic/basic'
import * as UserInfoCtr from '@/api/login'
export default{
    components:{
      BasicInfoComp,
      InvoiceInfoComp,
      BasicComp
    },
    data(){
      return{
        BasicInfoForm:'BasicInfoForm',
        InvoiceInfoForm:'InvoiceInfoForm',
        BasicInfoDisabled:true,
        InvoiceDisabled:true,
        BasicInfoModel:{
          id:'',
          name:'',
          password:'',
          linkman:'',
          businesslicense:'',
          address:'',
          tel:'',
          email:''
        },
        InvoiceInfoModel:{
          invoiceCompany:'',
          invoiceTaxpayer:'',
          invoiceAddress:'',
          invoiceTel:'',
          invoiceType:'',
          invoiceProject:''
        }
      }
    },
    mounted(){
        this.BasicInfoModel.id=this.$store.getters.getUserInfo.id;
        this.getUserInfo();
    },
    methods:{
      getUserInfo(){
        let params={};
        params['id']=this.BasicInfoModel.id;
        UserInfoCtr.getUserInfo(params)
          .then(res=>{
              let ret=res.data;
              if('A000000'==ret['code']){
                for(let key in ret['data']){
                  if(this.BasicInfoModel.hasOwnProperty(key)){
                      this.BasicInfoModel[key]=ret['data'][key];
                  }else if(this.InvoiceInfoModel.hasOwnProperty(key)){
                      this.InvoiceInfoModel[key]=ret['data'][key];
                  }
                }
              }
          }).catch(error=>{});
      },
      startUpdate(){
         this.BasicInfoDisabled=false;
      },
      updateUserInfo(){
        let params=Object.assign({},this.BasicInfoModel);
        UserInfoCtr.updateUserInfo(params)
          .then(res=>{
              let ret=res['data'];
              if('A000000'==ret['code']){
                this.$alert("修改成功",'结果',{
                   confirmButtonText:'确定',
                   callback:action=>{
                     this.$router.go(-1);
                   }
                });
              }
          }).catch(error=>{});
      },
      quitUpdate(){
        this.$router.go(-1);
      }
    }
}
</script>
<style scoped lang="scss" ref="stylesheet/scss">


</style>
