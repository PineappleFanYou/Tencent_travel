<template>
    <div class="contianer">
        <div class="mian">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥{{ order.price }}</span> 
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                    <el-row type="flex" justify="between" align="middle" class="pay-qrcode">
                        <div class="qrcode">
                            <!-- 二维码 -->
                            <canvas id="qrcode-stage"></canvas>
                            <p>请使用微信扫一扫</p>
                            <p>扫描二维码支付</p>
                        </div>
                        <div class="pay-example">
                            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                        </div>
                    </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import QRCode from "qrcode";
export default {
    data() {
        return {
            // 订单详情
            order:{},
            //定时器的变量
            timer:null
        }
    },
    mounted () {
        setTimeout(()=>{
            // 请求订单详情
            this.$axios({
            url:`/airorders/${ this.$route.query.id }`,
            headers:{Authorization:`Bearer ${this.$store.state.user.userInfo.token} `}
        }).then(res=>{
            // console.log(res)
            // 赋值给订单详情
            this.order = res.data;

            // 获取canvas节点
            const canvas = document.getElementById('qrcode-stage');

            // 生成二维码的连接
            const { code_url } = res.data.payInfo

            QRCode.toCanvas(canvas, code_url,{
                width: 200
            })

            // 轮询，每隔3秒就查询一次
            this.timer = setInterval(() => {
                this.checkPay();
            }, 3000);
        })
        },10);
    },
      // 生命周期的函数，页面跳转是触发
       destroyed() {
           // 清除定时器
           clearInterval(this.timer);
           this.timer = null;
       },

    methods:{
        // 查询订单是否完成
        checkPay() {
            this.$axios({
                url:'/airorders/checkpay',
                method:'POST',
                data:{
                    id:this.$route.query.id,
                    nonce_str:this.order.price,
                    out_trade_no:this.order.payInfo.order_no
                },
                headers:{ Authorization: `Bearer ${this.$store.state.user.userInfo.token}` }
            }).then(res=>{
                // console.log(res)
                const { statusTxt } = res.data;
                if(statusTxt === '支付完成') {
                    // 清除定时器
                    clearInterval(this.timer);
                    this.timer = null;

                    // 提示用户支付成功
                    this.$alert('支付成功','提示');
                    // 支付完成，跳转到首页
                    this.$router.push('/');
                }
            })
        }
    }
    
}
</script>
<style lang="less" scoped>
.contianer {
    background: #f5f5f5;
    padding: 30px 0;
    .mian {
        width: 1000px;
        margin: 0 auto;

    .pay-title {
        text-align: right;

        .pay-price {
            font-size: 28px;
            color: red;
        }
    }
    }
    
}
.pay-main {
    border-top: 5px orange solid;
    margin-top: 10px;
    padding: 30px;
    background: #fff;

    h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
    }
    .pay-qrcode {
        padding: 0 80px;

        .qrcode {
            border: 1px #ddd solid;
            padding: 15px;
            height: fit-content;

            #qrcode-stage {
                width: 200px;
                height: 200px;
                margin-bottom:10px;
            }

            p {
                line-height: 20px;
                text-align: center;
            }
        }
    }
}
.pay-example {
    margin-left: 200px;
    img {
        display: block;
        width: 100%;
    }
}
</style>