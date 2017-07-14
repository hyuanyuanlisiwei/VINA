<template>
    <section id="tasks">
        <div class="task" v-for="(task,index) in policies" :key="index">
            <el-button type="danger" icon="close" class="btn-remove-task" v-if="index>0" @click="removePolicy(index)" size="small"></el-button>
            <el-button type="primary" icon="plus" class="btn-add-task" @click="addPolicy" size="small"></el-button>
            <el-form-item label="投放日期">
                <el-date-picker v-model="task.date" type="daterange" placeholder="请选择日期范围"></el-date-picker>
            </el-form-item>
            <el-form-item label="投放时段">
                <template>
                    <el-radio-group v-model="task.timeFlag">
                      <el-radio :label="0">全时段</el-radio>
                      <el-radio :label="1">指定时段</el-radio>
                    </el-radio-group>
                    <div v-show="task.timeFlag==1">
                      <section class="times">
                        <div class="time" v-for="(time,index2) in task.times" :key="index2">
                          <el-time-select
                            size="small"
                            editable
                            clearable
                            placeholder="起始时间"
                            v-model="time.startTime"
                            :picker-options="{
                               start:'00:00',
                               end:'24:00:',
                               step:'01:00'
                            }"></el-time-select>
                          <el-time-select
                            size="small"
                            placeholder="结束时间"
                            v-model="time.endTime"
                            :picker-options="{
                               start:'00:00',
                               end:'24:00',
                               step:'01:00',
                               minTime:time.startTime
                            }"></el-time-select>
                          <el-button type="danger" icon="close" size="mini" @click="removeTime(index2,index)" v-if="index2>0"></el-button>
                          <el-button type="info" icon="plus" size="mini" @click="addTime(index2,index)"></el-button>
                        </div>
                      </section>
                    </div>
                </template>
            </el-form-item>
            <el-form-item label="每日限额¥">
                <el-input-number v-model="task.limit" type="number"></el-input-number>
            </el-form-item>

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
          policies:{
              type:Array,
              required:true,
              default:function () {
                return []
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
            },
            removeTime(timeIndex,taskIndex){
                console.log("removeTime",timeIndex,taskIndex);
                this.policies[taskIndex]['times'].splice(timeIndex,1);
                this.$set(this.policies,taskIndex,this.policies[taskIndex]);

            },
            addTime(timeIndex,taskIndex){
                console.log('addTime',timeIndex,taskIndex);
                this.policies[taskIndex]['times'].push({startTime:'',endTime:''})
                this.$set(this.policies,taskIndex,this.policies[taskIndex]);
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
            .times{
               .time{
                 margin:20px;
                 margin-left: 30px;
               }
             }
        }
    }
</style>
