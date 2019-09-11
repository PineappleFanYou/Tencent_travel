// 这个文件是错误拦截的请求用的
// 按需引入element-ui
import { Message } from 'element-ui'
export default (({ $axios, redirect })=>{
    // console.log($axios)
   $axios.onError(res=>{
    //    console.log(res.response)
       const { message, statusCode } = res.response.data
       if(statusCode === 400) {
        Message.error(message)
       }

       if(statusCode === 401 || statusCode === 403) {
        // console.log(nuxt)
        Message.error('请登录！');
        // 跳转到登录页
        redirect('/user/login');
        
       }
   })
}) 