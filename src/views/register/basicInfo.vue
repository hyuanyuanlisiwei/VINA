<template>
    <div>
      <el-row>
        <el-col :span="16" :offset="2">
          <el-form label-width="120px" :model="BasicInfo" :ref="form">
            <h1>基本信息</h1>
            <el-form-item label="用户名" prop="name">
              <el-input v-model="BasicInfo.name" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="BasicInfo.password" type="password" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="linkman">
              <el-input v-model="BasicInfo.linkman"  :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="营业执照" prop="businessLicense">
              <img :src="BasicInfo.businessLicense" class="img-rounded"/>
              <el-upload class="upload-demo" action="http://192.168.0.183:8080/upload/uploadFile" :data="{type:1}" name="myFile"  :on-success="uploadSuccess" ><el-button type="primary" icon="upload">上传图片</el-button></el-upload>
              <el-input v-model="BasicInfo.businessLicense" style="display:none"></el-input>
            </el-form-item>
            <el-form-item label="公司地址" prop="address">
              <el-input v-model="BasicInfo.address"  :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="tel">
              <el-input v-model="BasicInfo.tel" type="number" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="BasicInfo.email" type="email"  :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default{
    props:{
        BasicInfo:{
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
      uploadSuccess : function(response, file, fileList) {
        console.log(response);
        this.BasicInfo.businessLicense = response.data.url;
      },


    }




}

</script>
<style scoped lang="scss" ref="stylesheet/scss">


</style>
