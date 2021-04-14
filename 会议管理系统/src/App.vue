<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html,body,#app{
  overflow: hidden;
  height: 100%;
  margin: 0;
}
/*登录输入框样式*/
.input input.el-input__inner{
  background: rgb(245,245,245);
  height: 58px;
  width: 390px;
  margin-bottom: 10px;
  font-size: 20px;
  padding-left: 50px;
}
</style>
