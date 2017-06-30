<template>
    <div>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="QuotaByDayModel" class="demo-form-inline">
            <el-form-item label="时间">
              <el-date-picker
                @change="changeDateRange"
                format="yyyy-MM-dd"
                v-model="QuotaByDayModel.dateRange"
                type="daterange"
                range-separator="-"
                align="right"
                placeholder="选择日期范围"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="planQuotaByDay">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <h1>计划报表</h1>
          <div id="charts"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <h1>计划详细数据报表</h1>
          <el-table :data="list" border>
            <el-table-column prop="day" label="日期"></el-table-column>
            <el-table-column prop="cost" label="当日花费"></el-table-column>
            <el-table-column prop="imp" label="曝光数"></el-table-column>
            <el-table-column prop="clk" label="点击数"></el-table-column>
            <el-table-column label="点击率">
              <template scope="scope">
                {{scope.row.clkRate | formatRate}}
              </template>
            </el-table-column>
            <el-table-column prop="active" label="激活数"></el-table-column>
            <el-table-column prop="rate" label="转化率" align="center">
              <template scope="scope">
                {{scope.row.rate | formatRate}}
              </template>
            </el-table-column>
            <el-table-column prop="benefit" label="转化成本" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import echarts from 'echarts'
import * as PlanCtr from '@/api/plan'
export default{
    data(){
        return {
          QuotaByDayModel:{
            id:'',
            sDate:'',
            eDate:'',
            dateRange:''
          },
          list:[],
          daysList:[],
          impList:[],
          clkList:[],
          activeList:[],
          costList:[],
          clkRateList:[],
          rateList:[],
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
        }
    },
    mounted(){
      this.QuotaByDayModel.id=this.$route.query.id;
      this.planQuotaByDay();
    },
    filters:{
      formatRate(val){
          return val+"%";
      }
    },
    methods:{
      changeDateRange(dateRange){
        this.QuotaByDayModel.sDate=dateRange.substr(0,10);
        this.QuotaByDayModel.eDate=dateRange.substr(13);
      },
      planQuotaByDay(){
        let params=Object.assign({},this.QuotaByDayModel);
        PlanCtr.planQuotaByDay(params)
          .then(res=>{
            let ret=res['data'];
            if('A000000'==ret['code']){
              //计算转化率,转化成本
              for(let item of ret.data){
                item['rate']=((item['active']/item['clk'])*100).toFixed(2);
                item['clkRate']=((item['clk']/item['imp'])*100).toFixed(2);
                item['benefit']=+(item['cost']/item['active']).toFixed(2);
              }
              this.list=ret.data;
              //重绘折线图
              this.initCharts('charts');
            }
          }).catch(error=>{});
      },
      initCharts(id){
          let charts=echarts.init(document.getElementById(id));
          //得到数据;
          for(let item of this.list){
            this.daysList.push(item['day']);
            this.activeList.push(item['active']);
            this.clkList.push(item['clk']);
            this.impList.push(item['imp']);
            this.clkRateList.push(item['clkRate']);
            this.rateList.push(item['rate']);
          }

          charts.setOption({
            tooltip:{
              trigger:'axis',
              axisPointer:{
               type:'shadow'
              }
            },
            legend:{
              data:['曝光数','点击数','激活数','点击率(%)','转化率(%)']
            },
            xAxis:[{
              type:'category',
              data:this.daysList,
              name:"时间"
            }],
            yAxis:[{
             type:'value',
             position:'left'
            },{
              type:'value',
              scale:true,
              precision:2,
              splitNumber:9,
              boundaryGap:[0.01,0.01],
              splitArea:{show:true},
              position:'right'
            }],
            series:[{
              name:'曝光数',
              type:'line',
              data:this.impList
            },{
              name:'点击数',
              type:'line',
              data:this.clkList
            },{
              name:'激活数',
              type:'line',
              data:this.activeList
            },{
              name:'点击率',
              type:'line',
              data:this.clkRateList
            },{
              name:'转化率',
              type:'line',
              data:this.rateList
            }]
          });
      },
    }
}

</script>
<style scoped lang="scss" ref="stylesheet/scss">
  #charts{
    margin: 0 auto;
    width:1200px;
    height:500px;
  }

</style>
