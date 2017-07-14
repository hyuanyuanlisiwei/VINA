<template>
    <div class="basic-wrapper">
        <el-row >
            <el-col :span="4" :offset="5">
              <el-card class="box-card">
                <span class="title">今日花费(¥):</span><span class="content">{{BasicInfo.todayCost}}</span>
              </el-card>
            </el-col>
            <el-col :span="4" :offset="5">
              <el-card class="box-card">
                <span class="title">账户余额(¥):</span><span class="content">{{BasicInfo.balance}}</span>
              </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import * as IndexCtr from '@/api/login'
export default{
  data(){
    return{
      BasicInfo:{
        todayCost:0,
        balance:0
      }
    };
  },
  mounted(){
    this.getBasicInfo();
  },
  methods:{
    getBasicInfo(){
      IndexCtr.getBasicInfo()
        .then(res=>{
           let ret=res['data'];
           if('A000000'==ret['code']){
               this.BasicInfo=ret['data'];
           }
        }).catch(error=>{});
    }
  }
}
</script>
<style scoped lang="scss" ref="stylesheet/scss">
  .box-card{
    text-align: center;
    background-color:#157abc;
    color: #fff;
    font-weight:700;
    .content{
      margin-left: 15px;
    }
  }
</style>
.box-card{
  background-color
}
