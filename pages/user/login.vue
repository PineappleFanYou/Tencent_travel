<template>
  <div class="container">
     <!-- 主要内容 -->
        <el-row 
        type="flex" 
        justify="center" 
        align="middle" 
        class="main">

            <div class="form-wrapper">
                <!-- 表单头部tab -->
                <el-row type="flex" justify="center" class="tabs">
                    <span v-for="(item,index) in ['登录','注册']" :key="index" @click="handleClick(index)" :class="{active:current === index}">
                        {{ item }}
                    </span>
                    </el-row>
                   
                <!-- 登录功能组件 -->
                <loginForm v-if="current === 0"></loginForm>
                <!-- 注册功能组件 -->
                <registerForm v-if="current === 1"></registerForm>
                <!-- <RegisterForm v-if="currentTab == 1"/> -->
            </div>
        </el-row>
  </div>
</template>
<script>
// 引入注册
import loginForm from '@/components/user/loginForm.vue'
import registerForm from '@/components/user/registerForm.vue'
export default {
    // 注册
    components:{
        loginForm,
        registerForm
    },

  data() {
      return {
          current:0
      }
  },
methods:{
    handleClick(index) {
        this.current = index
    }
}
}
</script>
<style lang="less" scoped>
.container {
    background:url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
    height: 700px;
    min-width: 1000px;
    .main {
        width: 1000px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        .form-wrapper {
            width: 400px;
            margin: 0 auto;
            background-color: #fff;
            box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
            overflow: hidden;
            .tabs {
                span {
                    display: block;
                    width: 50%;
                    height: 50px;
                    box-sizing: border-box;
                    border-top: 2px #eee solid;
                    background-color: #eee;
                    line-height: 48px;
                    text-align: center;
                    cursor: pointer;
                    color: #666;
                    &.active {
                        color: orange;
                        border-top-color:orange;
                        background-color: #fff;
                        font-weight: bold;
                    }
                }
            }
        }
}
}
</style>