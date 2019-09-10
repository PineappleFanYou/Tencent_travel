<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList"></FlightsFilters>
        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>
        <!-- 航班信息列表 -->
        <div>
          <!-- data 是用来父组件向子组件传值的，约定好用data,所以那边只能用data -->
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
          <!-- 分页 -->
          <!-- size-change：每页条数切换时候触发 -->
          <!-- current-change：页码切换时候触发 -->
          <!-- current-page: 当前的页码 -->
          <!-- page-size: 当前显示的条数 -->
          <!-- total: 总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div>
          <!-- 侧边栏 -->
        </div>
      </div>
      <FlightsAside></FlightsAside>
    </el-row>
  </section>
</template>
<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  // 注册使用
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      // 机票列表返回的总数据，总数据包含四个属性，flights/info/options/total
      flightsData: {
        info: {},
        options: {}
      },
      // 代表是大的数据，初始值和上面的flightsData是一样的，
      // 这个变量一旦赋值之后不能再被修改
      cacheFlightsData: {
        info: {},
        options: {}
      },
      //当前显示的列表数组
      dataList: [],
      //当前的页码
      pageIndex: 1,
      //每页的条数
      pageSize: 5,
      // 总条数，等一下会赋值
      total: 0
    };
  },
  watch:{
    // watch 可以监听this下的所有属性
    $route() {
      // 请求航班列表数据
    this.getData()
    }
  },
  mounted() {
    // 请求航班列表数据
    this.getData()
  },
  methods: {
    // 封装
    getData() {
      // 发送请求航班总数据
      this.$axios({
        url: "/airs",
        // 路由的参数
        params: this.$route.query
      }).then(res => {
        // console.log(res)
        // 赋值给航班总数据
        this.flightsData = res.data;
        console.log(this.flightsData);
        // 拷贝一份航班总数据，然后赋值给缓存数据
        this.cacheFlightsData = { ...res.data };
        // 赋值给当前显示的列表数组
        this.dataList = this.flightsData.flights.slice(0, this.pageSize);
        // 赋值给总条数
        this.total = this.flightsData.flights.length;
      });
    },
    // 每页条数切换时触发，val是条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // 如果我们跟新了每页的条数，那么页面也要刷新，也要跟着修改条数
      this.dataList = this.flightsData.flights.slice(0, val);
    },
    // 页码切换时触发， val是点击的页码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      // 我们点击不同的页面的时候，也要刷新页面
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },

    // 该方法传递子组件，修改dataList
    setDataList(arr) {
      // 修改总的航班列表
      this.flightsData.flights = arr;

      // 回到第一页
      this.pageIndex = 1;
      this.total = arr.length;
      // 我们点击不同的页面的时候，也要刷新页面
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  }
};
</script>
<style lang="less" scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
}
.flights-content {
  width: 745px;
  font-size: 14px;
}
.aside {
  width: 240px;
}
</style>