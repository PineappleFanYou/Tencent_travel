<template>
  <div>
    <!-- 渲染头部组件，当做标签一样使用 -->
    <Header></Header>
    <!-- <nuxt /> 页面的占位符，类似于router-view -->
    <nuxt />
    <Footer></Footer>
  </div>
</template>
<script>
// 导入组件
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
export default {
  data() {
    return {

    }
  },
  // 注册
  components:{
    Header,
    Footer
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*{
  margin: 0;
  padding:0;
}
ul,ol,li {
  list-style: none;
}
a {
  color:inherit;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
i,em {
  font-style: normal;
}
</style>
