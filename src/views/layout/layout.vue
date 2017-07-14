<template>
    <div class="wrapper">
        <app-header class="header"></app-header>
        <div class="container-wrapper">
          <sidebar class="sidebar-wrapper"></sidebar>
          <main-content class="main-wrapper"></main-content>
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
      .header{
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        line-height: 70px;
        color: #fff;
        position:fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index:1000
      }
      .container-wrapper {
         position: relative;
         width: 100%;
         height: 100%;
        .sidebar-wrapper{
          position: fixed;
          width: 180px;
          top: 70px;
          bottom: 0;
          left: 0;
          overflow: hidden;
          transition: all .28s ease-out;
          background-color: #48576a;
        }
        .main-wrapper{
          box-sizing: border-box;
          padding: 20px;
          padding-top: 100px;
          background-color: #fff;
          min-height: 100%;
          transition: all .28s ease-out;
          margin-left: 180px;
        }
      }
  }
</style>
