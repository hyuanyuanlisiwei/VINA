<template>
    <div>
      <bread-crumb :breadcrumbs="[{to:'',name:'创意报表'}]"></bread-crumb>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="QuotaByDayModel" class="demo-form-inline">
            <el-form-item label="时间">
              <el-date-picker
                @change="changeDateRange"
                format="yyyy-MM-dd"
                v-model="dateRange"
                type="daterange"
                range-separator="-"
                align="right"
                placeholder="选择日期范围"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="entityQuotaByDay">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="list" border>
            <el-table-column prop="day" label="日期"></el-table-column>
            <el-table-column prop="cost" label="当日花费"></el-table-column>
            <el-table-column prop="imp" label="曝光数"></el-table-column>
            <el-table-column prop="clk" label="点击数"></el-table-column>
            <el-table-column prop="active" label="激活数"></el-table-column>
            <el-table-column prop="rate" label="转化率" align="center"></el-table-column>
            <el-table-column prop="benefit" label="转化成本" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import * as EntityCtr from '@/api/entity'
import BreadCrumb from '@/views/layout/breadcrumb'

export default{
    components:{
      BreadCrumb
    },
    data(){
        return {
          dateRange:[],
          QuotaByDayModel:{
            id:'',
            sDate:'',
            eDate:''
          },
          list:[],
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
      this.initQuotaByDayModel();
      this.entityQuotaByDay();
    },
    methods:{
      initQuotaByDayModel(){
        let end = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.dateRange=[start,end];
        this.QuotaByDayModel.sDate=this.getDateStr(start);
        this.QuotaByDayModel.eDate=this.getDateStr(end);
      },
      getDateStr(date){
        let y=date.getFullYear();
        let m=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth())+1;
        let d=date.getDate()<10?'0'+date.getDate():date.getDate();
        return y+'-'+m+'-'+d;
      },
      changeDateRange(dateRange){
        this.QuotaByDayModel.sDate=dateRange.substr(0,10);
        this.QuotaByDayModel.eDate=dateRange.substr(11);
      },
      entityQuotaByDay(){
        let params=Object.assign({},this.QuotaByDayModel);
        EntityCtr.entityQuotaByDay(params)
          .then(res=>{
            let ret=res['data'];
            if('A000000'==ret['code']){
              //计算转化率,转化成本
              for(let item of ret.data){
                item['rate']='';
                item['benefit']='';
                if(item['clk'] && item['imp']){
                  item['rate']=((item['clk']/item['imp'])*100).toFixed(2)+'%';
                }
                if(item['cost'] && item['active']){
                  item['benefit']=((item['cost']/item['active'])*100).toFixed(2)+'%';
                }
              }
              this.list=ret.data;
            }
          }).catch(error=>{});
      }
    }
}

</script>
<style scoped lang="scss" ref="stylesheet/scss">


</style>
