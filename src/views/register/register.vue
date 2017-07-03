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
          name:'hyy',
          password:'123',
          linkman:'hyylsw',
          businessLicense:'',
          address:'北京朝阳',
          tel:'123123123',
          email:'2312312'
        },
        InvoiceInfoModel:{
          invoiceCompany:'非凡',
          invoiceTaxpayer:'123123123',
          invoiceAddress:'光华soho',
          invoiceTel:'18123213213',
          invoiceType:'发票类型',
          invoiceProject:'vina'
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
