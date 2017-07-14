<template>
    <div>
      <bread-crumb :breadcrumbs="[{to:'',name:'创意管理',to:'',name:'创意新增或修改'}]"></bread-crumb>
      <add-entity></add-entity>
      <el-row>
       <el-col :span="4" :offset="16" style="margin-top: 30px">
         <el-button type="primary" @click="finish">完成</el-button>
       </el-col>
     </el-row>
    </div>
</template>
<script>
import AddEntity from './addEntity.vue'
import BreadCrumb from '@/views/layout/breadcrumb.vue'
export default{
    components:{
      AddEntity,
      BreadCrumb
    },
    data(){
      return{

      }
    },
    methods:{
       finish(){
           this.$router.push({path:'/plan/entity'});
      }
    }
}

</script>
<style scoped lang="scss" ref="stylesheet/scss">


</style>
