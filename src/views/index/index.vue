<template>
    <div class="index-wrapper">
      <bread-crumb :breadcrumbs="[{to:'',name:'首页概况'}]"></bread-crumb>
      <basic-comp></basic-comp>
      <el-row class="mtop">
        <el-col :span="20" :offset="4">
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
          <div id="charts" style="width: 1200px;height: 500px;margin: 30px auto"></div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import echarts from 'echarts'
import BasicComp from '@/views/basic/basic'
import BreadCrumb from '@/views/layout/breadcrumb'
import * as IndexCtr from '@/api/login'
export default{
  components:{
    BasicComp,
    BreadCrumb
  },
  data(){
    return {
      IndexModel:{
        id:'',
        date:'currentWeek',
      },
      list:[],
      daysList:[],
      activeList:[],
      clkList:[],
      impList:[],
      clkRateList:[],
      rateList:[],
      titleList:['曝光数','点击数','激活数','点击率(%)','转化率(%)'],
    };
  },
  mounted(){
    this.IndexModel.id=this.$store.getters.getUserInfo.id;
    this.quotaByDay();
    this.initCharts('charts');
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
              item['rate']='';
              item['clkRate']='';
              if(item['act'] && item['clk']){
                item['rate']=((item['act']/item['clk'])*100).toFixed(2);
              }
              if(item['clk'] && item['exp']){
                item['clkRate']=((item['clk']/item['exp'])*100).toFixed(2);
              }
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
        //计算点击率喝转换率
        if(item['imp'] && item['clk']){
          this.clkRateList.push(((item['clk']/item['imp'])*100).toFixed(2));
        }else{
            this.clkRateList.push('0');
        }
        if(item['clk'] && item['active']){
          this.rateList.push(((item['active']/item['clk'])*100).toFixed(2));
        }else{
          this.rateList.push('0');
        }
      }
      charts.setOption({
        tooltip:{
          trigger:'axis',
          axisPointer:{
           type:'cross',
           label:{
               backgroundColor:'#6a7985'
           }
          }
        },
        legend:{
          data:this.titleList
        },
        xAxis:[{
          type:'category',
          data:this.daysList
        }],
        yAxis:[{
          type:'value'
        }],
        series:[{
          name:this.titleList[0],
          type:'line',
          smooth:true,
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data:this.impList
        },{
          name:this.titleList[1],
          type:'line',
          data:this.clkList
        },{
          name:'激活数',
          type:'line',
          data:this.activeList
        },{
          name:'点击率(%)',
          type:'line',
          data:this.clkRateList
        },{
          name:'转化率(%)',
          type:'line',
          data:this.rateList
        }]
      });
    },
  }
}
</script>
<style scoped lang="scss" ref="stylesheet/scss">
.mtop{
  margin-top: 30px;
}

</style>
