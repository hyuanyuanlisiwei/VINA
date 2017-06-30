<template>
    <section id="tasks">
        <div class="task" v-for="(item,index) in policies" :key="index">
            <el-button type="danger" icon="close" class="btn-remove-task" v-if="index>0" @click="removePolicy(index)"></el-button>
            <el-button type="info" icon="plus" class="btn-add-task" @click="addPolicy"></el-button>
            <el-form-item label="投放日期">
                <el-date-picker v-model="item.date" format="yyyy-MM-dd" range-separator="-"  type="daterange" placeholder="请选择日期范围"></el-date-picker>
            </el-form-item>
            <el-form-item label="投放时段">
                <template>
                    <el-radio-group v-model="item.timeFlag">
                        <el-radio label="">全时段</el-radio>
                        <el-radio :label="1">指定时段</el-radio>
                    </el-radio-group>
                    <times v-show="item.timeFlag==1" :times="item.times"></times>
                </template>
            </el-form-item>
            <el-form-item label="每日限额¥">
                <el-input-number v-model="item.limit" type="number"></el-input-number>
            </el-form-item>

        </div>
    </section>
</template>
<script>
    import times from './times.vue'
    export default{
        components: {times},
        data(){
            return {
                timeFlag:'',
                time:'',
                date:'',
                limit:''
            }
        },
        props:{
            policies:{
                type:Array,
                default:function () {
                    return [];
                }
            }
        },
        methods:{
            removePolicy(index){
                this.policies.splice(index,1);
            },
            addPolicy(){
                this.policies.push({
                    date:['',''],
                    timeFlag:0,
                    times:[{startTime:'',endTime:''}],
                    limit:0
                });
            }
        }
    }
</script>
<style scoped lang="scss" ref="stylesheet/scss">
    #tasks{
        .task{
            padding: 20px;
            padding-top: 38px;
            margin-bottom: 20px;
            background-color: #f5f5f5;
            border: 2px dashed #1AB394;
            border-radius: 4px;
            position: relative;
            .btn-add-task{
                position: absolute;
                top: 10px;
                right: 10px;
            }
            .btn-remove-task{
                position: absolute;
                top:10px;
                right:80px;
            }
        }

    }
</style>
