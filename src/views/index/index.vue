<template>
    <div class="index-wrapper">
      <basic-comp></basic-comp>
      <el-row>
        <el-col :span="24">
          <el-radio-group v-model="IndexModel.day" @change="changeDay">
            <el-radio :label="7">最近7天</el-radio>
            <el-radio :label="15">最近15天</el-radio>
            <el-radio :label="30">最近30天</el-radio>
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
      day:7,
      IndexModel:{
        day:7,
        sDate:'',
        endDate:''
      },
      list:[]
    };
  },
  mounted(){
    this.quotaByDay();
  },
  methods:{
    changeDay(day){
      let now=new Date();
      this.IndexModel.endDate=this.formateDate(now,0);
      this.IndexModel.sDate=this.formateDate(now,day);
      this.quotaByDay();
    },
    formateDate(now,day){
      let date=new Date(now.getTime()-day*12*60*60*60);
      let y=now.getFullYear();
      let m=(now.getMonth()+1)<10?'0'+now.getMonth():now.getMonth();
      let d=now.getDate()<10?'0'+now.getDate():now.getDate();
      return y+m+d;
    },
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
