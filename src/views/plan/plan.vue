<template>
    <div class="plan-wrapper">
        <el-row>
           <el-col :span="24">
               <el-form :inline="true" :model="PlanModel" class="demo-form-inline">
                   <el-form-item label="计划名称">
                       <el-input v-model="PlanModel.pName" placeholder="请输入计划名称"></el-input>
                   </el-form-item>
                   <el-form-item label="投放状态">
                       <el-switch v-model="PlanModel.runState" on-text="启动" off-text="关闭"
                                  on-value="1" off-value="0">
                       </el-switch>
                   </el-form-item>
                   <el-form-item label="时间">
                       <el-date-picker
                               size="small"
                               @change="changeDateRange"
                               format="yyyy-MM-dd"
                               v-model="PlanModel.dateRange"
                               type="daterange"
                               range-separator="-"
                               align="right"
                               placeholder="选择日期范围"
                               :picker-options="pickerOptions">
                       </el-date-picker>
                   </el-form-item>
                   <el-form-item label="付费类型">
                       <el-select v-model="PlanModel.costType" placeholder="请选择付费类型">
                           <el-option value="" label="全部"></el-option>
                           <el-option v-for="item in costTypes" :key="item.id" :value="item.id" :label="item.dicValue"></el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item>
                       <el-button type="primary" @click="planSearch">查询</el-button>
                   </el-form-item>
               </el-form>
           </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button style="float:right" type="primary" @click="add">新增计划<i class="el-icon-plus el-icon--right"></i></el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="list" border>
                    <el-table-column label="ID" align="center">
                      <template scope="scope">
                         <span class="highlight" @click="entity(scope.row)">{{scope.row.id}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="计划名称" align="center">
                      <template scope="scope">
                          <span class="highlight" @click="entity(scope.row)">{{scope.row.unitName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="unitLimit" label="计划限额" align="center"></el-table-column>
                    <el-table-column prop="costTypeName" label="计费方式" align="center"></el-table-column>
                    <el-table-column prop="cost" label="花费" align="center"></el-table-column>
                    <el-table-column prop="imp" label="曝光数" align="center"></el-table-column>
                    <el-table-column prop="clk" label="点击数" align="center"></el-table-column>
                    <el-table-column prop="clkRate" label="点击率" align="center"></el-table-column>
                    <el-table-column prop="active" label="激活数" align="center"></el-table-column>
                    <el-table-column prop="rate" label="转化率" align="center"></el-table-column>
                    <el-table-column prop="benefit" label="转化成本" align="center"></el-table-column>
                    <el-table-column label="投放状态" algin="center">
                        <template scope="scope">
                            <el-switch
                                    v-model="scope.row.runState" @change="changeRunState(scope.row)"
                                    on-text="" off-text="">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" fit>
                        <template scope="scope">
                            <i tag="i" class="el-icon-edit" @click="edit(scope.row)" title="提示"></i>
                            <i tag="i" class="el-icon-picture" @click="preview(scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import * as PlanCtr from '@/api/plan';
export default{
    data(){
        return{
            PlanModel:{
                pName:"",
                runState:0,
                costType:'',
                sDate:'',
                eDate:'',
                dateRange:[],
            },
            pickerOptions:{
                shortcuts: [{
                    text: '昨天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 );
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '前天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24*2 );
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '上一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '上一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            //付费类型
            costTypes:[],
            //表格数据
            list:[]
        }
    },
    mounted(){
        this.initPlanModel();
        this.getCostTypes();
        this.planSearch();
    },
    methods:{
        initPlanModel(){
          let end = new Date();
          let start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          this.PlanModel.dateRange=[start,end];
          this.PlanModel.sDate=this.getDateStr(start);
          this.PlanModel.eDate=this.getDateStr(end);
        },
        getDateStr(date){
          let y=date.getFullYear();
          let m=(date.getMonth()+1)<10?'0'+(date.getMonth+1):(date.getMonth()+1);
          let d=date.getDate()<10?'0'+date.getDate():date.getDate();
          return y+'-'+m+'-'+d;
        },
        getCostTypes(){
            this.costTypes=this.$store.getters.getCostTypes;
            if(this.costTypes && this.costTypes.length>0){
               return;
            }
            PlanCtr.getCostType().then(res=>{
                if('A000000'==res.code){
                    this.costTypes=res.data;
                    this.$store.commit("saveCostTypes",res.data);
                }
            }).catch(error=>{});
        },
        entity(row){
            this.$store.commit("savePlanId",row.id);
            this.$router.push({path:'/plan/entity',query:{id:row.id,entityName:row.entityName}});
        },
        planSearch(){
          PlanCtr.planList(this.PlanModel).then(res=>{
            let ret=res.data;
            if("A000000"==ret.code){
                //计算转化率,转化成本
                for(let item of ret.data.data){
                  //显示处理
                  item['rate']='';
                  item['clkRate']='';
                  item['benefit']='';
                  if(item['clk'] && item['active']){
                    item['rate']=((item['active']/item['clk'])*100).toFixed(2)+'%';
                  }
                  if(item['imp'] && item['clk']){
                    item['clkRate']=((item['clk']/item['imp'])*100).toFixed(2)+'%';
                  }
                  if(item['active'] && item['cost']){
                    item['benefit']=(item['cost']/item['active']).toFixed(2);
                  }
                  item['runState']=item['runState']==1?true:false;
                }
                this.list=ret.data.data;
            }
          }).catch(error=>{});
        },
        changeDateRange(dateRange){
            this.PlanModel.sDate=dateRange.substr(0,10);
            this.PlanModel.eDate=dateRange.substr(11);
        },
        success(){
            this.$message({
                duration:2000,
                showClose:true,
                message:'操作成功',
                type:'success'
            });
        },
        error(msg){
            this.$message({
                duration:2000,
                showClose:true,
                message:msg,
                type:'error'
            });
        },
        changeRunState(row){
            let params={id:row.id,runState:row.runState?0:1};
            PlanCtr.planUpdate(params).then(res=>{
                let ret=res.data;
                if('A000000'==ret.code){
                    this.success();
                }else{
                    this.error(ret.msg);
                }
            }).catch(error=>{
            });
        },
        add(){
            this.$router.push({path:'/plan/edit'});
        },
        edit(row){
            this.$router.push({path:'/plan/edit',query:{id:row.id}});
        },
        preview(row){
            this.$router.push({path:'/plan/planQuotaByDay',query:{id:row.id}});
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../../styles/styles';
    [class*='el-icon']{
        padding: 5px;
        cursor: pointer;
    }
    [class*='el-icon']+[class*='el-icon']{
        margin-left: 10px;
    }
    .highlight{
      color: green;
      cursor: pointer;
      width:100%;
      height: 100%;
      display: inline-block;
    }
</style>


