<template>
    <div class="entityWrapper">
        <bread-crumb :breadcrumbs="[{to:'',name:'创意管理'}]"></bread-crumb>
        <el-row>
          <el-col :span="24">
            <el-form :model="EntityModel" :inline="true">
              <el-form-item label="创意类型">
                <el-select v-model="EntityModel.entityType" placeholder="请选择创意类型">
                  <el-option  :value="36" label="图片"></el-option>
                  <el-option  :value="53" :label="贴片"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="投放状态">
                <el-radio-group v-model="EntityModel.runState">
                  <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button :label="1">启动</el-radio-button>
                  <el-radio-button :label="0">关闭</el-radio-button>
                </el-radio-group>
              </el-form-item>
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
                <el-button type="primary" @click="entitySearch">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button style="float:right;margin-bottom: 15px" size="small" type="primary" @click="add">新增创意<i class="el-icon-plus el-icon--right"></i></el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="list" border>
              <el-table-column prop="id" label="ID" align="center"></el-table-column>
              <el-table-column label="广告创意名称" align="center">
                <template scope="scope">
                  <span class="highlight" @click="preview(scope.row)">
                   {{scope.row.entityName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="entityTypeName" label="创意类型" align="center"></el-table-column>
              <el-table-column prop="cost" label="花费" align="center"></el-table-column>
              <el-table-column prop="imp" label="曝光数" align="center"></el-table-column>
              <el-table-column prop="clk" label="点击数" align="center"></el-table-column>
              <el-table-column prop="clkRate" label="点击率" align="center"></el-table-column>
              <el-table-column prop="active" label="激活数" align="center"></el-table-column>
              <el-table-column prop="rate" label="转化率" align="center"></el-table-column>
              <el-table-column prop="benefit" label="转化成本" align="center"></el-table-column>
              <el-table-column label="操作" align="center" fit>
                <template scope="scope">
                  <el-switch
                    v-model="scope.row.runState" @change="changeRunState(scope.row)"
                    on-text="" off-text="">
                  </el-switch>
                  <i tag="i" class="el-icon-picture" @click="quotaByDay(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="mtop">
          <el-col>
            <el-pagination
              @current-change="entitySearch"
              :current-page.sync="EntityModel.cp"
              :page-size="EntityModel.ps"
              layout="total, prev, pager, next"
              :total="totalItemNum">
            </el-pagination>
          </el-col>
        </el-row>
        <!--创意预览-->
      <el-dialog v-model="entityDialogVisible">
        <img width="100%" :src="entityUrl">
        <video :scr="threadPic1"></video>
      </el-dialog>
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
        //字典数据;
        entityTypes:[],
        dateRange:[],
        totalItemNum:0,
        EntityModel:{
          cp:1,
          ps:15,
          id:'',
          runState:'',
          entityType:'',
          sDate:'',
          eDate:''
        },
        //表格数据;
        list:[],
        //预览
        entityDialogVisible:false,
        entityUrl:'',
        threadPic1:'',
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
      this.EntityModel.id=this.$route.query.id;
      this.initEntityModel();
      //字典数据
      this.entitySearch();
    },
    methods:{
      initEntityModel(){
        let end = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.dateRange=[start,end];
        this.EntityModel.sDate=this.getDateStr(start);
        this.EntityModel.eDate=this.getDateStr(end);
      },
      getDateStr(date){
        let y=date.getFullYear();
        let m=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
        let d=date.getDate()<10?'0'+date.getDate():date.getDate();
        return y+'-'+m+'-'+d;
      },
      initEntityTypes(){
        this.entityTypes=this.$store.getters.getEntityTypes;
        if(!this.entityTypes){
            return;
        }
        EntityCtr.getEntityTypes().then(res=>{
           let ret=res.data;
           if("A000000"==ret['code']){
               this.entityTypes=ret['data'];
           }
        }).catch(error=>{});
      },
      changeDateRange(dateRange){
        this.EntityModel.sDate=dateRange.substr(0,10);
        this.EntityModel.eDate=dateRange.substr(11);
      },
      entitySearch(){
        let params=Object.assign({},this.EntityModel);
        EntityCtr.entitySearch(params)
          .then(res=>{
            let ret=res.data;
            if("A000000"==ret['code']){
              //重置分页数据
              this.totalItemNum=ret.data.totalItemNum;
              this.EntityModel.cp=ret.data.currentPageNum;
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
        EntityCtr.entityUpdate(params).then(res=>{
          let ret=res.data;
          if('A000000'==ret.code){
            this.success();
          }else{
            this.error(ret.msg);
          }
        }).catch(error=>{
        });
      },
      preview(row){
          let params={id:row.id};
          EntityCtr.entityPreview(params)
            .then(res=>{
              let ret=res['data'];
              if('A000000'==ret['code']){
                  this.entityUrl=ret['data']['entityUrl'];
                  this.threadPic1=ret['data']['threadPic1'];
                  this.entityDialogVisible=true;
              }
            }).catch(error=>{});
      },
      add(){
          this.$router.push({path:'/plan/addEntity'});
      },
      quotaByDay(row){
          this.$router.push({path:'/plan/entityQuotaByDay',query:{id:row.id}});
      }
    }
}
</script>
<style scoped lang="scss" ref="stylesheet/scss">
  .highlight{
    color: #0b3aa7;
    cursor: pointer;
    width:100%;
    height: 100%;
    display: inline-block;
  }
</style>
