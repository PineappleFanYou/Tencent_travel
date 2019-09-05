<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <!-- 登录导航 -->
      <el-row type="flex" class="navs">
        <!-- nuxt-link 的作用和使用，完全和router-link一样 -->
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录跳转 -->
      <!-- $store.state 是仓库 -->
      <!-- 这个user是因为我们有一个user的文件名，我们要区分开来，里面有叫userInfo的对象，或者我们打印出this.$store.state,在这个文件的钩子函数里面打印 -->
      <div v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
              <img :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`">
              <span>{{ $store.state.user.userInfo.user.nickname }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
      // console.log(this.$store.state)
  },
  methods:{
    // 退出
    handleLogout() {
      // 清除登录信息
      this.$store.commit('user/clearUserInfo')
      // 提示退出成功
      this.$message.success('退出成功')
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0, 2px, 2px, #ddd;
}
.navs {
  flex: 1;
  margin-left: 10px;
  a {
    display: block;
    height: 60px;
    padding: 0 20px;
    &:hover {
      color: #409eff;
      border-bottom: 5px solid #409eff;
      box-sizing: border-box;
    }
  }
  .nuxt-link-exact-active {
    background-color: #409eff;
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}
.main {
  width: 1000px;
  margin: 0 auto;
}
.logo {
  padding-top: 9px;
  img {
    width: 156;
    height: 42px;
    display: block;
  }
}
.el-dropdown-link img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
    box-sizing: border-box;
    border:2px solid #fff;
    &:hover {
        border:2px solid #409eff;
    }
}
</style>