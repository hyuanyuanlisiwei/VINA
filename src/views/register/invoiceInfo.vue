<template>
    <div>
      <el-row>
        <el-col :span="16" :offset="2">
          <el-form label-width="120px" :model="InvoiceInfo" :ref="form">
            <h1>开票信息</h1>
            <el-form-item label="开票公司名称" prop="invoiceCompany">
              <el-input v-model="InvoiceInfo.invoiceCompany"  :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号" prop="invoiceTaxpayer">
              <el-input v-model="InvoiceInfo.invoiceTaxpayer" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="开票公司地址" prop="invoiceAddress">
              <el-input v-model="InvoiceInfo.invoiceAddress"  :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="开票公司电话" prop="invoiceTel">
              <el-input v-model="InvoiceInfo.invoiceTel"  :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="发票类型" prop="invoiceType">
              <el-input v-model="InvoiceInfo.invoiceType"  :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="发票项目" prop="invoiceProject">
              <el-input v-model="InvoiceInfo.invoiceProject"  :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

    </div>
</template>
<script>
  export default{
    props:{
      InvoiceInfo:{
        type:Object,
        required:true
      },
      form:{
        type:String,
        required:true
      },
      isDisabled:{
        default:false
      }
    },
    data(){
      return {

      }
    },
    mounted(){

    },
    methods:{


    }




  }

</script>
<style scoped lang="scss" ref="stylesheet/scss">


</style>
