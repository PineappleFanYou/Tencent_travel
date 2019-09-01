<template>
    <div class="container">
        <el-row type="flex" class="main" justify="space-between">
            <!-- logo -->
            <div class="logo">
                <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
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
            <div>
                <nuxt-link to="/user/login">登录/注册</nuxt-link>
            </div>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.container {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    box-shadow: 0,2px,2px,#ddd;
}
.navs {
    flex: 1;
    margin-left: 10px;
    a {
        display: block;
        height: 60px;
        padding: 0 20px;
        &:hover {
            color:#409eff;
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
</style>