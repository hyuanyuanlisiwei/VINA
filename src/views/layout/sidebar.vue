<template>
    <div>
        <el-menu :router="true" :default-active="activeIndex" class="el-menu-vertical-demo" theme="light">
            <el-menu-item class="menu-item" :key="route.path" :index="route.path" v-for="route in routes">
                {{route.name}}
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
    .menu-item{
        text-align: center;
        font-weight: 700;
    }




</style>
