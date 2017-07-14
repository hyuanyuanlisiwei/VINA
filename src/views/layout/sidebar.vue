<template>
    <div>
        <el-menu :router="true" :default-active="activeIndex" class="el-menu-vertical-demo" theme="light">
            <el-menu-item :key="route.path" :index="route.path" v-for="route in routes">
                {{route.menu}}
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return{
               activeIndex:this.$route.redirectedFrom
            }
        },
        created(){

        },
        computed:{
            ...mapGetters({
                routes:'getRoutes'
            })
        },
        methods:{


        }
    }
</script>
<style scoped lang="scss" ref="stylesheet/scss">
    .el-menu{
       background-color: #48576a;
       color: #fff;
       font-weight: 700;
      .el-menu-item{
        text-align: center;
        font-weight: 700;
        color:#fff;
        &:hover{
          background-color: #006fba;
        }
        &.is-active{
         background-color:#006fba
        }
      }
    }

</style>
