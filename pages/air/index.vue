<template>
  <section class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>
    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索表单 -->
        <searchForm></searchForm>
      <!-- banner 广告 -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg"/>
      </div>
    </el-row>

    <!-- 中间的认证，保证，服务 -->
    <el-row type="flex" class="statement">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" style="color:green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>

    <!-- 特价机票 -->
    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>

    <!-- 特价机票 -->
    <div class="air-sale">
        <el-row type="flex" class="air-sale-pic" justify="space-between">
          <el-col 
          :span="6"
          v-for="(item,index) in sales"
          :key="index"
          >
          <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
          <!-- 封面图片 -->
          <img :src="item.cover" />
          <!-- 航班信息 -->
          <el-row class="layer-bar" type="flex" justify="space-between">
            <span>{{ item.departCity }}--{{ item.destCity }}</span>
            <span>￥{{ item.price }}</span>
          </el-row>
          </nuxt-link>
          </el-col>
        </el-row>
    </div>
  </section>
</template>
<script>
import searchForm from '@/components/air/searchForm.vue'
export default {
  // 注册使用
  components:{
    searchForm
  },
  data() {
    return {
      sales:[]
    }
  },
  mounted() {
    this.$axios({
      url:'/airs/sale'
    }).then(res=>{
      // console.log(res)
      const { data } = res.data
      this.sales = data
    })
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.air-title {
  color: orange;
  font-size: 20px;
  font-weight: normal;
  margin: 15px 0;
  span {
    font-size: 20px;
  }
}
.statement {
  margin:15px 0; 
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  height: 58px;
  padding: 10px 0;
  box-sizing: border-box;

  > div {
    text-align: center;
    line-height: 38px;
    border-right: 1px #ddd solid;
    &:last-child{
      border-right: none;
    }
  }
  * {
    vertical-align: middle;
  }
  i {
    font-size: 30px;
  }
}
.air-sale-title {
  font-size: 20px;
  font-weight: normal;
  margin: 15px 0;
  color: #409EFF;
  span {
    font-size: 20px;
  }
}
.air-sale {
  border: 1px #ddd solid;
  padding: 20px;
  margin-bottom: 50px;
  .air-sale-pic {
    > div {
      width: 225px;
      height: 140px;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
      }
      .layer-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        height: 30px;
        line-height: 30px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;
        span:last-child {
          font-size: 18px;
        }
      }
    }
  }
}
</style>