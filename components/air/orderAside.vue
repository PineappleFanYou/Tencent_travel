<template>
    <div class="aside">
        <div class="air-info">
            <el-row type="flex" justify="space-between" class="info-top">
                <div>{{ data.dep_date }}</div>
                <div>{{ data.org_city_name }}-{{ data.dst_city_name }}</div>
            </el-row>
            <el-row type="flex" justify="space-between" align="middle" class="info-step">
                <el-col :span="5" class="flight-airport">
                    <strong>{{ data.dep_time }}</strong>
                    <span>{{ data.org_airport_name }}{{ data.org_airport_quay }}</span>
                </el-col>
                <el-col :span="14" class="flight-time">
                    <span>{{ rankTiem }}</span>
                    <span>{{ data.airline_name }}{{ data.flight_no }}</span>
                </el-col>
                <el-col :span="5" class="flight-airport">
                    <strong>{{ data.arr_time }}</strong>
                    <span>{{ data.dst_airport_name }}{{ data.dst_airport_quay }}</span>
                </el-col>
            </el-row>
        </div>
        <!-- 订单总价这行 -->
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>订单总价</span>
            <span>金额</span>
            <span>数量</span>
        </el-row>
        <!-- 成人机票这行 -->
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>成人机票</span>
            <span>￥{{ data.seat_infos.org_settle_price }}</span>
            <span>x1</span>
        </el-row>
        <!-- 机建+燃油 -->
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>机建+燃油</span>
            <span>￥{{ data.airport_tax_audlet }}/人/单程</span>
            <span>x1</span>
        </el-row>
        <!-- 应付总额 -->
         <el-row type="flex" justify="space-between" align="middle" class="info-bar">
            <span>应付总额：</span>
            <span class="price">￥{{ $store.state.airs.allPrice }} </span>
        </el-row>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    computed:{
        rankTiem() {
           if(this.data.arr_time){
                // 到达时间
            const arr = this.data.arr_time.split(":");
            // 出发时间
            const dep = this.data.dep_time.split(":");
            // 到达的总分钟数
            const arrVal = arr[0] * 60 + +arr[1];
            // 出发的总分钟数
            const depVal = dep[0] * 60 + +dep[1];

            // 相隔的时间数
            const dis = arrVal - depVal;

            // 如果是过了凌晨,则要加24小时
            if(dis < 0) {
                dis = arrVal + 24 * 60 - depVal;
            }

            // 向下取整小时数
            const hours = Math.floor(dis/60);
            // 取莫的分钟数
            const min = dis % 60;
            return `${hours}时${min}分`
           }
         }
    }
    
}
</script>
<style lang="less" scoped>
.aside {
    border: 1px #eee solid;
    width: 350px;
    height: fit-content;
}
.air-info {
    padding: 15px;

    .info-top {
        margin-bottom: 10px;

        > div:last-child {
            font-size: 14px;
        }
    }
    .info-step{
        .flight-airport{
            strong{
                display: block;
                font-size: 22px;
                font-weight: normal;
            }

            span{
                font-size: 12px;
                color:#999;
            }
        }

        .flight-time{
            text-align: center;
            font-size: 12px;
            color:#999;
            span{
                display: block;
            }
        }
    }
}

.info-bar{
    border-top:1px #ddd dashed;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;

    .price{
        font-size:28px;
        color: orange;
    }
}
</style>