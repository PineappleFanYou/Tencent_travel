<template>
  <!-- 登录框 -->
  <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">
    <el-form-item prop="username" class="form-item">
      <el-input v-model="loginForm.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <!-- 密码框 -->
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
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules:{
          username:[{reqired:true,message:'请输入用户名',trigger:'blur'}],
          password:[{reqired:true,message:'请输入密码',trigger:'blur'}]
      }
    }
  },
  methods:{
      handleLoginSubmit() {
          // 二次验证
         this.$refs.loginForm.validate((valid) =>{
             if(valid) {
                 this.$axios({
                     url:'/accounts/login',
                     method:'post',
                     data:this.loginForm
                 }).then (res=>{
                     // 如何调用mutations 下的setUserInfo的方法  commit
                     // commit 接受两个参数，第一个mutations 参数是方法名，第二个参数是数据
                     this.$store.commit('user/setUserInfo',res.data)
                     this.$router.push('/')
                 })
             }else {
                 console.log('验证失败')
             }
         }) 
      }
  }
};
</script>
<style lang="less" scoped>
.form {
    padding:25px;
}
.form-item {
    margin-bottom:15px;
}
.form-text {
    font-size: 12px;
    text-align: right;
    color:#409EFF;
}
.submit {
    width: 100%;
    background-color: #409EFF;
    color:#fff;
}
</style>