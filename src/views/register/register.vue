<template>
    <div>
      <basic-info-comp :BasicInfo="BasicInfoModel" :form="BasicInfoForm"></basic-info-comp>
      <invoice-info-comp :InvoiceInfo="InvoiceInfoModel" :form="InvoiceInfoForm"></invoice-info-comp>
      <el-row>
        <el-col :span="22" :offset="20">
          <el-button type="primary" @click="register" size="large">注册</el-button>
          <el-button @click="quitRegister" size="large">取消</el-button>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import BasicInfoComp from './basicInfo.vue';
import InvoiceInfoComp from './invoiceInfo.vue'
import * as RegisterCtr from '@/api/register'
export default{
    components:{
      BasicInfoComp,
      InvoiceInfoComp
    },
    data(){
      return {
        BasicInfoForm:'BasicInfoForm',
        InvoiceInfoForm:'InvoiceInfoForm',
        BasicInfoModel:{
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


    },
    methods:{
      register(){
        let params=Object.assign({},this.BasicInfoModel,this.InvoiceInfoModel);
        RegisterCtr.register(params)
          .then(res=>{
            let ret=res['data'];
            if('A000000'==ret['code']){
              this.$alert('恭喜你,注册成功,请登录!','注册结果',{
                confirmButtonText:'确定',
                callback:action=>{
                    this.$router.push({path:'/'});
                }
              });
            }
          }).catch(error=>{});


      },
      quitRegister(){
         this.$router.push({path:'/'});
      }


    }
}

</script>
<style scoped lang="scss" ref="stylesheet/scss">


</style>
