<template>
  <div class="search-form">
    <!-- 头部切换tab -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handleClick(index)"
        :class="{active: index===current}"
      >
        <i :class="item.icon"></i>
        {{ item.name }}
      </span>
    </el-row>
    <!-- 搜索框 -->
    <!-- 该表单没有model和rules -->
    <el-form ref="form" class="search-form-content" label-width="80px">
      <!-- 出发城市 -->
      <!-- fetch-suggestions: 每次输入时候都会执行，获取搜索建议，并且显示在输入框的下拉框中 -->
      <!-- select：在下拉框中选中时候时候触发的事件 -->
      <!-- 搜索肯定是要加一个双向数据绑定v-model，我们是搜索城市，所以我们只需要绑定城市即可 -->
      <el-form-item label="出发城市">
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请输入出发城市"
          @select="handleDepartSelect"
          v-model="form.departCity"
          @blur="handleDepartBlur"
        ></el-autocomplete>
      </el-form-item>
      <!-- 到达城市 -->
      <!-- fetch-suggestions: 每次输入时候都会执行，获取搜索建议，并且显示在输入框的下拉框中 -->
      <!-- select：在下拉框中选中时候时候触发的事件 -->
      <el-form-item label="到达城市">
        <el-autocomplete 
        :fetch-suggestions="queryDestSearch"
        placeholder="请输入到达城市"
        @select="handleDestSelect"
        v-model="form.destCity"
        >
        </el-autocomplete>
      </el-form-item>
      <!-- 出发时间 -->
      <el-form-item label="出发时间">
        <!-- change：选中日期时候触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
          @blur="handleDestBlur"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
// 引入moment 
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      current: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      // 存储后台返回的出发城市数组
      departData:[],
      // 存储后台返回的到达城市的数组
      destData:[]
    };
  },
  methods: {
    handleClick(index) {
      if (index === 1) {
        this.$alert("目前不支持往返业务", "提示");
      }
    },
    // 出发城市的搜索建议的事件
    //value是输入框的值
    // cb 是一个回调函数必须要调用，参数的值会显示在下拉框中
    // cb 调用时候必须要接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性
    queryDepartSearch(value, cb) {
      // 这里判断一下，如果用户在输入框没有输入值，则不需要显示下拉
      if (!value) {
        //传递空数组不会出现下拉框
        cb([]);
        return;
      }

      // 根据用户的输入发送建议城市请求
      this.$axios({
        url: "/airs/city",
        params: {
          // 输入框的关键字，因为value是输入框的值
          name: value
        }
      }).then(res => {
        // console.log(res)
        // 解构出返回的数组
        const { data } = res.data;
        // 因为返回在的数组对象中，没有value属性，所以我们要给数组中每个对象添加value属性
        const newData = [];
        data.forEach(e => {
          // 添加value属性，在这之前先把“市”去掉
          e.value = e.name.replace("市", "");
          // 把带有value属性的对象添加到新数组中
          newData.push(e);
        });
        // 把后台的数据存储到数组
        this.departData = newData
        //显示到下拉列表中
        cb(newData);
      });
    },
    // 鼠标移开会触发的blur的事件，然后默认选中
    handleDepartBlur() {
      // 用三元表达式判断用户有没有输入，如果没有输入，我们不判断，会报错，我们应该给个空值就行了
      this.form.departCity = this.departData[0] ? this.departData[0].value : '';
      this.form.departCode = this.departData[0] ? this.departData[0].sort : '';
    },
    queryDestSearch(value,cb){
        if(!value) {
            cb([])
            return;
        }
        // 发送请求，获取城市
        this.$axios({
            url:'/airs/city',
            params:{
                name:value
            }
        }).then(res=>{
            const { data } = res.data
            const newData = [];
            data.forEach(e=>{
                e.value = e.name.replace('市','')
                newData.push(e)
            })
            // 默认选中第一个
            // this.form.departData = newData[0].value
            // this.form.destCode = newData[0].sort
            this.destData = newData
            // 显示下拉列表
            cb(newData);
        })
    },
    // 鼠标移开会触发的blur的事件，然后默认选中
     handleDestBlur(){
      this.form.destCity = this.destData[0] ? this.destData[0].value : '';
      this.form.destCode = this.destData[0] ? this.destData[0].sort : '';
    },
    // 确认选择日期是触发
    // value 会返回选中的日期
    handleDate(value){
        this.form.departDate = moment(value).format(`YYYY-MM-DD`)   
    },
    // 出发城市下拉选择时触发
    // item 是我们选中的对象，只是一个名字而已，可以随便改
    handleDepartSelect(item){
        this.form.departCity = item.value;
        this.form.departCode = item.sort;
    },
    // 到达城市下拉选择时触发
    handleDestSelect(item) {
        this.form.destCity = item.value;
        this.form.destCode = item.sort;
    },

    // 点击交换，然后出发城市和到达城市互换
    handleReverse() {
        // 把四个要用的值解构出来，方便使用
        const { departCity, departCode, destCode, destCity } = this.form
        //交叉赋值
        this.form.departCity = destCity;
        this.form.departCode = destCode;

        this.form.destCity = departCity;
        this.form.destCode = departCode;
    },
    // 提交表单时触发
    handleSubmit() {
        const { departCity, destCity, departDate} = this.form
        // 判断输入框不能为空
        if(!departCity) {
            this.$alert('请选择出发城市','提示');
        }
        if(!destCity) {
            this.$alert('请选择到达城市','提示');
        }
        if(!departDate) {
            this.$alert('请选择查询时间','提示');
        }
        // 跳转到机票列表页
        this.$router.push({
            path:'/air/flights',
            query:this.form
        })
    }
  }
};
</script>
<style lang="less" scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}
.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background-color: #eee;
  }
  .active {
    border-top: 3px orange solid;
    background-color: #fff;
  }
  i {
    margin-right: 5px;
    font-size: 18px;
    &:first-child {
      font-size: 16px;
    }
  }
}
.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;
  .el-autocomplete {
    width: 100%;
  }
}
.reverse {
  position: absolute;
  top: 35px;
  right: 15px;
  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }
  &:after {
    top: 0;
  }
  &:before {
    top: 60px;
  }
  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }
    &:after {
      top: -20px;
    }
    &:before {
      top: 20px;
    }
  }
}
</style>