<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="RecordsModel" class="demo-form-inline">
          <el-form-item label="时间">
            <el-date-picker
              @change="changeDateRange"
              format="yyyy-MM-dd"
              v-model="RecordsModel.dateRange"
              type="daterange"
              range-separator="-"
              align="right"
              placeholder="选择日期范围"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="recordsList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="list" border>
          <el-table-column prop="createTime" label="日期"></el-table-column>
          <el-table-column prop="price" label="充值金额"></el-table-column>
          <el-table-column prop="comment" label="备注"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import * as UserInfoCtr from '@/api/login'
  export default{
    data(){
      return {
        RecordsModel:{
          id:'',
          sDate:'',
          eDate:'',
          dateRange:''
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
      this.RecordsModel.id=this.$store.getters.getUserInfo.id;
      this.recordsList();
    },
    methods:{
      changeDateRange(dateRange){
        this.RecordsModel.sDate=dateRange.substr(0,10);
        this.RecordsModel.eDate=dateRange.substr(13);
      },
      recordsList(){
        let params=Object.assign({},this.RecordsModel);
        UserInfoCtr.recordsList(params)
          .then(res=>{
            let ret=res['data'];
            if('A000000'==ret['code']){
              this.list=ret.data;
            }
          }).catch(error=>{});
      }
    }
  }

</script>
<style scoped lang="scss" ref="stylesheet/scss">


</style>
