<template>
    <div>
      <el-row>
        <el-col :span="24" :offset="4">
          <el-form :model="CreateAdModel" label-width="150px" class="mbottom">
            <el-form-item label="图片素材">
              <el-upload
                action="/upload/upload"
                auto-upload
                drag
                :data="{type:1}"
                list-type="picture-card"
                :before-upload="beforePicUpload"
                :on-preview="handlePreviewPic"
                :on-success="picUploadSuccess"
                :on-remove="handleRemovePic">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="picDialogVisible">
                <img width="100%" :src="picDialogUrl">
              </el-dialog>
            </el-form-item>
            <el-form-item label="视频素材" class="mtop">
              <el-upload
                action="/upload/upload"
                auto-upload
                drag
                :data="{type:5}"
                list-type="picture-card"
                :before-upload="beforeVideoUpload"
                :on-preview="handlePreviewVideo"
                :on-success="videoUploadSuccess"
                :on-remove="handleRemoveVideo">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="videoDialogVisible">
                <img width="100%" :src="videoDialogUrl">
              </el-dialog>
            </el-form-item>
            <el-form-item label="广告类型" class="mtop">
              <el-checkbox-group v-model="CreateAdModel.entityTypes">
                <el-checkbox :label="36">图片</el-checkbox>
                <el-checkbox :label="53">贴片</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="entitySave">生成创意</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="22" :offset="1">
          <h1>创意列表</h1>
          <el-table
            :data="entityList" border>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="entityName" label="创意名称"></el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button :plain="true" type="success" @click="entityPreview(scope.row)" icon="picture"></el-button>
                <el-button :plain="true" type="danger" @click="entityRemove(scope.row,scope.$index)" icon="close"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--预览创意 -->
          <el-dialog title="预览创意" :visible="entityPreviewFlag">
            <img :src="entityPrevUrl">
          </el-dialog>
        </el-col>
      </el-row>

    </div>
</template>
<script>
import * as PlanCtr from '@/api/plan'
export default{
    data(){
        return {
          CreateAdModel:{
            uId:'',
            picUrls:[],
            videoUrls:[],
            entityTypes:[],
          },
          entityList:[],
          entityPreviewFlag:false,
          entityPrevUrl:'',
          picDialogVisible:false,
          picDialogUrl:''
        }
    },
    mounted(){
    },
    methods:{
      entityPreview(row){
        this.entityPreviewFlag=true;
        this.entityPrevUrl=row.entityUrl;
      },
      entityRemove(row,index){
        let params={id:row.id};
        PlanCtr.entityDelete(params)
          .then(res=>{
            let ret=res.data;
            if("A000000"==ret['code']){
              this.$message({
                type:'success',
                message:"创意删除成功!"
              });
              this.entityList.splice(index,1);
            }else{
              this.$message.error("创意删除失败!");
            }
          }).catch(err=>{});
      },
      beforePicUpload(file){

      },
      handlePreviewPic(file){
        this.picDialogUrl=file.url;
        this.picDialogVisible=true;
      },
      picUploadSuccess(response,file,fileList){
        this.CreateAdModel.picUrls.push(response.data.url);
      },
      handleRemovePic(file,fileList){
        console.log('-------remove---------');
        console.log(file);
        let index=this.CreateAdModel.picUrls.indexOf(file.url);
        this.CreateAdModel.picUrls.splice(index,1);
      },
      beforeVideoUpload(file){
        let flag=file.size/1024/1024>10;
        if(flag){
          this.$message.error("上传的视频不能大于10MB!");
        }
        return !flag;
      },
      handlePreviewVideo(file){
        this.videoDialogUrl=file.url;
        this.videoDialogVisible=true;
      },
      videoUploadSuccess(response,file,fileList){
        this.CreateAdModel.videoUrls.push(response.data.url);
      },
      handleRemoveVideo(file,fileList){
        console.log('-------remove---------');
        console.log(file);
        let index=this.CreateAdModel.videoUrls.indexOf(file.url);
        this.CreateAdModel.videoUrls.splice(index,1);
      },
      entitySave(){
        this.CreateAdModel[uId]=this.$store.getters.getPlanId;
        let params=Object.assign({},this.CreateAdModel);
        params["vedioUrls"]=params["vedioUrls"].join(',');
        params["picUrls"]=params["picUrls"].join(',');
        params["entityTypes"]=params["entityTypes"].join(',');
        PlanCtr.entitySave(params).then(res=>{
          let ret=res['data'];
          if('A000000'==ret['code']){
              this.entityList=ret['data'];
          }
        }).catch(err=>{});
      },

    }


}

</script>
<style scoped lang="scss" ref="stylesheet/scss">
  .mbottom{
    margin-bottom: 30px;
  }

</style>
