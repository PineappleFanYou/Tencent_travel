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
                   
                    <el-form :model="loginForm" :rules="rules" ref="loginForm"  class="form">
                    <!-- 用户名输入框 -->
                    <el-form-item prop="username" class="form-item">
                    <el-input v-model="loginForm.username" placeholder="用户名/手机"></el-input>
                    </el-form-item>
                    <!-- 密码输入框 -->
                    <el-form-item prop="password" class="form-item">
                    <el-input v-model="loginForm.password" placeholder="密码"></el-input>
                    </el-form-item>
                    
                
                <!-- 忘记密码 -->
                <p class="form-text">
                    <nuxt-link to="#">忘记密码</nuxt-link>
                </p>
                <!-- 登录按钮 -->
                <el-button type="primary" class="submit" @click="handleLoginSubmit">登录按钮</el-button>
                </el-form>
                <!-- 登录功能组件 -->
                <!-- <LoginForm v-if="currentTab == 0"/> -->

                <!-- 注册功能组件 -->
                <!-- <RegisterForm v-if="currentTab == 1"/> -->
            </div>
        </el-row>
  </div>
</template>
<script>
export default {
  data() {
      return {
          loginForm:{
              username:'',
              password:''
          },
           rules: {
          username: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
      },
      current:0
  }
},
methods:{
    handleClick(index) {
        this.current = index
    },
    // 提交登录
    handleLoginSubmit() {
        // 表单的二次验证
        this.$refs.loginForm.validate(valid=>{
            if(valid) {
                // 请求登录接口
                this.$axios({
                    url:'/accounts/login',
                    method: 'post',
                    data:this.loginForm
                }).then(res=>{
                    console.log(res)
                })
            }else {
                console.log('验证失败')
            }
        })
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
.form {
    padding:25px;
}
.form-item {
    margin-bottom:20px;
}
.form-text {
    font-size: 12px;
    color:#409EFF;
    text-align: right;
    line-height: 1;
}
.submit {
    width: 100%;
}
</style>