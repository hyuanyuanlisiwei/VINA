<template>
    <div id="login-wrapper">
        <el-form class="login-container" label-width="80px" :rules="LoginRules" :model="LoginModel" ref="loginForm">
            <h3>系统登录</h3>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="LoginModel.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input @keyup.enter.native="login('loginForm')" v-model="LoginModel.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('loginForm')">登录</el-button>
                <el-button  @click="register">注册</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
    import * as LoginCtr from '@/api/login';
    export default{
        data(){
            return {
                LoginRules:{
                    name:[{
                        required:true,message:"请输入用户名",trigger:'blur'
                    }],
                    password:[{
                        required:true,message:"请输入密码",trigger:'blur'
                    }]
                },
                LoginModel:{
                    name:"",
                    password:''
                }
            }
        },
        mounted(){},
        methods:{
            login(formName){
                console.log('login');
                this.$refs[formName].validate((valid)=>{
                   if(!valid){
                     this.$msgbox({
                       type:'error',
                       title:'消息',
                       message:'用户名密码不能为空!'
                     });
                   }else{
                        LoginCtr.login(this.LoginModel)
                            .then(res=>{
                                let ret=res.data;
                                if("A000000"==ret.code){
                                    //保存登录成功后该用户的信息;
                                    this.$store.commit("saveUserInfo",ret.data);
                                    //保存token
                                    window.localStorage.setItem('token',ret.data.token);
                                    window.localStorage.setItem('type',ret.data.type);
                                    this.$router.push({path:'/index'});
                                }else{
                                  this.$message.error(ret.message);
                                }
                            }).catch(error=>{});
                   }
                });
            },
            register(){
              this.$router.push({path:'/register'});
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
#login-wrapper{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.login-container{
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title{
    margin: 0 auto 40px;
    text-align: center;
    color: #505458;
  }
}
</style>
