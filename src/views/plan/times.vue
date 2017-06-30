<template>
    <section class="times">
        <div class="time" v-for="(item,index) in times" :key="index">
            <el-time-select
                    editable
                    clearable
                    placeholder="起始时间"
                    v-model="item.startTime"
                    :picker-options="{
                 start:'00:00',
                 end:'24:00:',
                 step:'01:00'
            }"></el-time-select>
            <el-time-select
                    placeholder="结束时间"
                    v-model="item.endTime"
                    :picker-options="{
                         start:'00:00',
                         end:'24:00',
                         step:'01:00',
                         minTime:item.startTime
            }"></el-time-select>
           <el-button type="danger" icon="close" size="small" @click="removeTime(index)" v-if="index>0"></el-button>
           <el-button type="info" icon="plus" size="small" @click="addTime"></el-button>
        </div>
    </section>
</template>
<script>
export default{
    data(){
        return {


        }
    },
    props:{
        times:{
            type:Array,
            default:function() {
                return [{startTime:'',endTime:''}];
            }
        }
    },
    methods:{
        removeTime(index){
            this.times.splice(index,1);
        },
        addTime(index){
            this.times.push({startTime:'',endTime:''});
        }


    }
}

</script>
<style scoped lang="scss" ref="stylesheet/scss">
    .times{
        .time{
            margin:20px;
            margin-left: 30px;
        }

    }

</style>