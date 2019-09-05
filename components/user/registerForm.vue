<template>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" class="form">
  <el-form-item class="form-item" prop="username">
    <el-input placeholder="用户名/手机" v-model="registerForm.username"></el-input>
  </el-form-item>
  <!-- 验证码 -->
  <el-form-item class="form-item" prop="captcha">
    <el-input placeholder="验证码" v-model="registerForm.captcha">
    <!-- append 插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。 -->
        <template slot="append">
          <!-- 内部实现了调用this.$emit('click') 触发传递的方法，所以这里的@click不用加native -->
            <el-button type="info" @click="handleSendCaptcha">发送验证码</el-button>
        </template>
    </el-input>
  </el-form-item>
  <el-form-item class="form-item" prop="nickname">
    <el-input placeholder="你的名字" v-model="registerForm.nickname"></el-input>
  </el-form-item>
  <el-form-item class="form-item" prop="password">
    <el-input placeholder="密码" v-model="registerForm.password"></el-input>
  </el-form-item>
  <el-form-item class="form-item" prop="checkPassword">
    <el-input placeholder="确认密码" v-model="registerForm.checkPassword"></el-input>
  </el-form-item>
  <el-button type="primary" class="submit" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>
<script>
export default {
    data() {
      // rule 当前规则，目前为空
      // value 输入框的值
      // callback 回调函数，必须要调用
      const checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          // 代表验证通过
          callback();
        }
      };
        return {
          // 表单数据
            registerForm:{
              // 用户名
              username:'',
              // 昵称
              nickname:'',
              // 验证码
              captcha:'',
              // 密码
              password:'',
              // 确认密码
              checkPassword:''
            },
            // 验证规则
            rules:{
              username:[{required:true,message:'请输入用户名',trigger:'blur'}],
              nickname:[{required:true,message:'请输入昵称',trigger:'blur'}],
              captcha:[{required:true,message:'请输入验证码',trigger:'blur'}],
              password:[{required:true,message:'请输入密码',trigger:'blur'}],
              // validator 不能改，表示指向验证指数
              checkPassword: [{ validator: checkPassword, trigger: 'blur' }]
            }
        }
    },
    methods: {
      handleSendCaptcha() {
        // 判断手机号码是否为空，如果是空，不发送请求
        if(!this.registerForm.username) {
          this.$message.error('请输入手机号码')
          return;
        }
        this.$axios({
          url:'/captchas',
          method:'POST',
          data:{
            tel:this.registerForm.username
          }
        }).then(res=>{
          // console.log(res)
          // 解构出code，这里的意思是，我们要拿到res.data里面的code,不是赋值
          const { code } = res.data
          this.$alert(`模拟的手机验证码是${code}`, '提示')
        })
      },
      handleRegSubmit() {
        // console.log(123)
        this.$refs.registerForm.validate((valid)=>{
          if(valid) {
            // 可以使用 ... + 变量名会指向剩余的属性
            console.log(this.registerForm)
            const {checkPassword, ...rest} = this.registerForm
            console.log(rest)
            this.$axios({
              url:'/accounts/register',
              method:'POST',
              data:rest
            }).then(res=>{
              console.log(res)
              //注册成功后帮用户自动登录
              this.$store.commit('user/setUserInfo',res.data)
              this.$router.push('/')
            }).catch(err=>{
              console.log(err)
            })
          }else {
            console.log('注册失败')
            return false
          }
        })
      }
    }
}
</script>
<style lang="less" scoped>
.form {
    padding:25px;
}
.form-item {
    margin-bottom: 20px;
}
.submit {
    width: 100%;
    background-color:#409eff;
    color: #fff;
}
</style>