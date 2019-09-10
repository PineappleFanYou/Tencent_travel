<template>
  <div class="filters">
          <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" placeholder="起飞机场" v-model="airport" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
          <el-select size="mini" placeholder="起飞时间" v-model="flightTimes" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00` "
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
            <el-select size="mini" placeholder="航空公司" v-model="company" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company" 
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
            <el-select size="mini" placeholder="机型" v-model="airSize" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini"
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            // 起飞机场
            airport:'',
            // 起飞时间
            flightTimes:'',
            // 航空公司
            company:'',
            // 机型
            airSize:'',
          //机型大小的选项
          airSizeList:[
            {label:'大', value:'L'},
            {label:'中', value:'M'},
            {label:'小', value:'S'}
          ]
        }
    },
    // 子组件接收值
    props: {
    // data 是 flights 组件获取的大的数据，包含了 flights/[info/options]/total
        data: {
            type: Object,
            default: {}
        }
    },
    methods:{
        // 选择机场时触发
        handleAirport(value) {
          const arr = this.data.flights.filter(e=>{
            return e.org_airport_name = value
          })
          this.$emit('setDataList',arr)
        },

        // 选择起飞时间时触发
        handleFlightTimes(value){
          // 数组的结构赋值  const [from,to] = [6,12]
          const [from,to] = value.split(',');
          const arr = this.data.flights.filter(e=>{
            // 每趟航班出发时间的小时
            const current = e.dep_time.split(':')[0];
            // 需要满足在时间段内 比如 6 - 12;
            return +current >= +from &&  +current <  +to;
          })
          this.$emit('setDataList',arr);
        },

        // 选择航空公司是触发
        handleCompany(value) {
        // 筛选数据，只保留选中的航空公司的航班
        const arr = this.data.flights.filter(e=>{
          return e.airline_name === value;
        })
        this.$emit('setDataList',arr)
        },
        
        // 选择飞机大小时触发
        handleAirSize(value) {
          const arr = this.data.flights.filter(e=>{
            return e.plane_size === value
          })
          this.$emit('setDataList',arr)
        },

        // 撤销--所谓的撤销，就是初始化所有的条件
        handleFiltersCancel() {
          this.airport = '';
          this.flightTimes = '';
          this.company = '';
          this.airSize = '';
          this.pageIndex = 1;
          // 返回全部的数据
          this.$emit('setDataList',this.data.flights)
        }
    }
};
</script>
<style lang="less" scoped>
.filters {
  margin-bottom: 20px;
}
.filters-top {
    >div {
        /deep/ .el-select {
            margin-left: 10px;
        }
    }
}
.filter-cancel {
    margin-top: 10px;
}
</style>