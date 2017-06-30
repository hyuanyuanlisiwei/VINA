<template>
    <div class="wrapper">
        <div class="header-wrapper">
            <app-header class="header"></app-header>
        </div>
        <div class="container-wrapper">
            <div class="sidebar-wrapper">
              <sidebar class="sidebar"></sidebar>
            </div>
            <div class="main-wrapper">
               <div class="breadcrumb-wrapper">
                 <breadcrumb></breadcrumb>
               </div>
               <div class="content-wrapper">
                 <main-content class="content"></main-content>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AppHeader from './app-header';
    import sidebar from './sidebar'
    import content from './content'
    import breadcrumb from './breadcrumb'
    export default{
        components:{
            'app-header':AppHeader,
            sidebar,
            'main-content':content,
            breadcrumb
        }
    }
</script>
<style lang="scss">
  .wrapper{
      .header-wrapper{
        position:relative;
        box-sizing: border-box;
        padding-left: 20px;
        width: 100%;
        height: 70px;
        line-height: 70px;
        color: #fff;
        background-color: #2483ff;
      }
      .container-wrapper {
        display: flex;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        .sidebar-wrapper{
          flex: 0 0 220px;
          background-color: #ebeef5;
        }
        .main-wrapper{
          flex: 1;
          box-sizing: border-box;
          padding: 20px;
          background-color: #fff;
          .breadcrumb-wrapper{
            width: 100%;
            height: 30px;
            border-bottom: 1px solid #d1d7e5;
          }
          .content-wrapper{
            width: 100%;
            margin-top: 20px;
          }
        }
      }


  }


</style>
