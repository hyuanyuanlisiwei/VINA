<template>
    <section class="inputs">
        <div v-for="(item,index) in urls" :key="index" class="part">
            <el-input v-model="item.url" class="input"></el-input>
            <el-button type="danger"  icon="close" v-if="index>0" @click="remove(index)" size="small"></el-button>
            <el-button type="primary" icon="plus" @click="add" size="small"></el-button>
        </div>
    </section>
</template>
<script>
export default{
    props:{
       urls:{
            type:Array,
            default:function(){
                return [''];
            }
       }
    },
    methods:{
        add(){
           this.urls.push({url:''});
        },
        remove(index){
            this.urls.splice(index,1);
        }

    }
}

</script>
<style scoped lang="scss">
    .inputs{
        .part:not(:nth-of-type(1)){
            margin-top: 20px;
        }
        .input{
            width:calc(100% - 150px);
        }
    }

</style>