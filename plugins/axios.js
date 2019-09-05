// 这个文件是错误拦截的请求用的
// 按需引入element-ui
import { Message } from 'element-ui'
export default (({$axios})=>{
    // console.log($axios)
   $axios.onError(res=>{
    //    console.log(res.response)
       const { message, statusCode } = res.response.data
       if(statusCode === 400) {
        Message.error(message)
       }
   })
}) 