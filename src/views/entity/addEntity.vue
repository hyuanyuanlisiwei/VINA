<template>
    <div>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form :model="CreateAdModel" label-width="150px" >
            <el-form-item label="图片素材" class="mbottom">
              <el-upload
                :action="uploadURL"
                auto-upload
                drag
                name="myFile"
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
            <el-form-item label="视频素材" class="mbottom">
              <el-upload
                class="upload-demo"
                :action="uploadURL"
                auto-upload
                drag
                name="myFile"
                :data="{type:5}"
                :before-upload="beforeVideoUpload"
                :on-preview="handlePreviewVideo"
                :on-success="videoUploadSuccess"
                :on-remove="handleRemoveVideo">
                <el-button type="primary">上传视频素材</el-button>
              </el-upload>
              <el-dialog v-model="videoDialogVisible">
                <video width="100%" :src="videoDialogUrl" controls="controls"></video>
              </el-dialog>
            </el-form-item>
            <el-form-item label="广告类型" class="mbottom">
              <el-checkbox-group v-model="CreateAdModel.entityTypes">
                <el-checkbox :label="36">图片</el-checkbox>
                <el-checkbox :label="53">贴片</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="entityGenerate">生成创意</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16" :offset="1">
          <h1>创意列表</h1>
          <el-table
            :data="entityList" border>
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="entityName" label="创意名称" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <i class="el-icon-picture" @click="entityPreview(scope.row)"></i>
                <i class="el-icon-close" @click="entityRemove(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <!--预览创意 -->
          <el-dialog title="预览创意" v-model="entityPreviewFlag">
            <video width="100%" :src="videoUrl" controls="controls" v-show="videoUrl"></video>
            <img width="100%" :src="picUrl"/>
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
//          uploadURL:'http://192.168.0.254:8080/upload/uploadFile',
          uploadURL:'/upload/uploadFile',
          CreateAdModel:{
            uId:'',
            picUrls:[],
            videoUrls:[],
            entityTypes:[],
          },
          entityList:[],
          entityPreviewFlag:false,
          videoUrl:'',
          picUrl:'',
          picDialogVisible:false,
          picDialogUrl:'',
          videoDialogVisible:false,
          videoDialogUrl:'',
        }
    },
    mounted(){
    },
    methods:{
      entityPreview(row){
        this.entityPreviewFlag=true;
        if(row.entityType==53){
          this.videoUrl=row.entityUrl;
          this.picUrl=row.threadPic1;
        }else{
          this.picUrl=row.entityUrl;
          this.videoUrl='';
        }
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
      handlePreviewVideo(file){
        this.videoDialogUrl=file.response.data.url;
        this.videoDialogVisible=true;
      },
      picUploadSuccess(response,file,fileList){
        this.CreateAdModel.picUrls.push(response.data.url);
      },
      handleRemovePic(file,fileList){
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
      videoUploadSuccess(response,file,fileList){
        this.CreateAdModel.videoUrls.push(response.data.url);
      },
      handleRemoveVideo(file,fileList){
        let index=this.CreateAdModel.videoUrls.indexOf(file.url);
        this.CreateAdModel.videoUrls.splice(index,1);
      },
      entityGenerate(){
        this.CreateAdModel['uId']=this.$store.getters.getPlanId;
        let params=Object.assign({},this.CreateAdModel);
        params["videoUrls"]=params["videoUrls"].join(',');
        params["picUrls"]=params["picUrls"].join(',');
        params["entityTypes"]=params["entityTypes"].join(',');
        PlanCtr.entityGenerate(params).then(res=>{
          let ret=res['data'];
          if('A000000'==ret['code']){
              this.entityList=ret['data'];
          }
        }).catch(err=>{});
      }
    }
}

</script>
<style scoped lang="scss" ref="stylesheet/scss">
  .mbottom{
    margin-bottom: 50px;
  }
</style>
