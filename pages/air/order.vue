<template>
    <div class="continaer">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm></OrderForm>

            <!-- 侧边栏 -->
            <OrderAside :data="$store.state.airs.infoData"></OrderAside>
        </el-row>
    </div>
</template>
<script>
import OrderForm from '@/components/air/orderForm.vue'
import OrderAside from '@/components/air/orderAside.vue'
export default {
    // 注册使用
    components:{
        OrderForm,
        OrderAside
    },
    data() {
        return {
        }
    }
}
</script>
<style lang="less" scoped>
.continaer {
    width: 1000px;
    margin: 20px auto;
}
</style>