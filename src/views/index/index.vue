<template>
    <div class="index-wrapper">
      <basic-comp></basic-comp>
      <el-row>
        <el-col :span="24">
          <el-radio-group v-model="IndexModel.date" @change="quotaByDay">
            <el-radio label="currentWeek">本周</el-radio>
            <el-radio label="lastWeek">上周</el-radio>
            <el-radio label="currentMonth">本月</el-radio>
            <el-radio label="lastMonth">上月</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div id="charts"></div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import echarts from 'echarts'
import BasicComp from '@/views/basic/basic'
import * as IndexCtr from '@/api/login'
export default{
  components:{
      BasicComp,
  },
  data(){
    return {
      IndexModel:{
        id:'',
        date:'currentWeek',
      },
      list:[]
    };
  },
  mounted(){
    this.IndexModel.id=this.$store.getters.getUserInfo.id;
    this.quotaByDay();
  },
  methods:{
    quotaByDay(){
      let params=Object.assign({},this.IndexModel);
      IndexCtr.quotaByDay(params)
        .then(res=>{
          let ret=res['data'];
          if('A000000'==ret['code']){
            //计算转化率,转化成本
            for(let item of ret.data){
              item['rate']=((item['act']/item['clk'])*100).toFixed(2);
              item['clkRate']=((item['clk']/item['exp'])*100).toFixed(2);
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


</style>
