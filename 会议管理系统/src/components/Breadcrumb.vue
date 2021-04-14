<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >{{loaction}}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadList: [],
      loaction:'\u3000 当前位置：'
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    isHome(route) {
      return route.name === "home";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.breadList = matched;
    }
  },
  created() {
    this.getBreadcrumb();
  }
};
</script>

<style scoped>

</style>