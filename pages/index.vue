<template>
  <div class="container">
    <!-- 轮播图组件 el-carousel-->
    <!-- interval自动切换的时间间隔，单位为毫秒 -->
     <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="(item,index) in banners" :key="index">
      <div :style="`background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;`" class="banner-image"></div>
    </el-carousel-item>
  </el-carousel>
       <!-- 搜索框 -->
        <div class="banner-content">
            <div class="search-bar">
                
                <!-- tab栏 -->
                <el-row 
                type="flex" 
                class="search-tab">
                    <span v-for="(item,index) in options" :key="index" @click="handleClick(index)" :class="{active:current==index}">
                        <i>{{item.title}}</i>
                    </span>
                </el-row>
                
                <!-- 输入框 -->
                <el-row 
                type="flex" 
                align="middle" 
                class="search-input">
                    <input  :placeholder="options[current].placeholder"/>
                    <i class="el-icon-search"></i>
                </el-row>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners:[
        // "http://157.122.54.189:9095/assets/images/th01.jfif",
        // "http://157.122.54.189:9095/assets/images/th02.jfif",
        // "http://157.122.54.189:9095/assets/images/th03.jfif"
      ],
      // 定义搜索tab切换数据
      options:[
          {
            title:'攻略',
            placeholder:'请输入城市'
          },
          {
            title:'酒店',
            placeholder:'请输入城市搜索酒店'
          },
          {
            title:'机票',
            placeholder:''
          }
      ],
      //当前的索引
      current:0
    }
  },
  methods:{
    // 点击搜索的tab栏时候触发
    handleClick(index) {
      //点击索引是2的时候，代表点击是机票
      if(index===2) {
        //用通用路由的方法
        this.$router.push('/air')
      }
      // 把当前点击的索引复制给current
      this.current = index
    }
  },
  mounted() {
    // 请求轮播图的数据
    // 该写法是一种通用的标准，nuxt帮我们封装好了。
    this.$axios({
      url:'/scenics/banners',
    }).then( res=>{
      // 获取轮播图数组
      const data = res.data.data;
      // 赋值给banners
      this.banners = data
    } )
  }
}
</script>
<style lang="less" scoped>
.banner-image {
  height: 700px;
}
/deep/.el-carousel__container {
  height: 700px;
}
   .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;
        .search-bar{
            width:552px;
            margin:0 auto;
        }
        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }
            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;
                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }
                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }
        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;
            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }
            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
</style>