<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(breadcrumb,index) in breadcrumbs" :key="index" :to="{path:breadcrumb.to}">{{breadcrumb.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default{
  data(){
      return{
      }
  },
  props:{
    breadcrumbs:{
      type:Array,
      required:true
    }
  },
  mounted(){

  },
  methods:{
  }
}
</script>
<style scoped lang="scss" ref="stylesheet/scss">
  .el-breadcrumb{
    height: 30px;
    border-bottom: 2px solid #ebeff5;
    margin-bottom: 20px;
  }
</style>
