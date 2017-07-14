<template>
    <div>
        <el-row>
            <el-col :span="4">
                <div class="system-title">
                    VINA奖励视频广告平台
                </div>
            </el-col>
            <el-col :span="4" :offset="16">
               <el-dropdown @command="handleUserCommond">
                 <span class="el-dropdown-link">
                  <span>欢迎 :<i class=""></i></span><span class="username">{{user.name}}</span><i class="el-icon-caret-bottom el-icon--right"></i>
                 </span>
                 <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item command="userInfo">账号信息</el-dropdown-item>
                   <el-dropdown-item command="records">充值记录</el-dropdown-item>
                   <el-dropdown-item command="logout">退出</el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
export default{
    components: {ElButton},
    data(){
        return {

        }
    },
    methods:{
      handleUserCommond(command){
        switch(command){
          case 'userInfo':this.userInfo();break;
          case 'records': this.records();break;
          case 'logout':this.logout();break;
        }
      },
      userInfo(){
        this.$router.push({path:'/index/userInfo'});
      },
      records(){
        this.$router.push({path:'/index/records'});
      },
      logout(){
        this.$store.commit('reset');
        this.$router.push({path:"/"});
      }
    },
    computed:{
        ...mapGetters({
            user:'getUserInfo'
        })
    }
}
</script>
<style scoped lang="scss">
.el-dropdown-link{
  color:#ffffff;
  font-weight: 700;
}
.system-title{
  padding-left: 20px;
}
.username{
  margin-left: 10px;
}

</style>
