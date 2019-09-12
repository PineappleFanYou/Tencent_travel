<template>
  <div class="mian">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div 
        class="menber-info-item"
        v-for="(item,index) in users"
        :key="index">
          <!-- 乘机人类型 -->
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" placeholder="请选择" value="1">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 证件类型 -->
          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" placeholder="请选择" value="1">
                <el-option label="身份证" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 移除乘机人按钮 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>
      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <!-- 保险 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index" @change="handleChange(item.id)">
          <el-checkbox :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" border></el-checkbox>
        </div>
      </div>
    </div>

    <!-- 联系人 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <!-- 姓名 -->
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>
          <!-- 手机 -->
          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <!-- 提交订单按钮 -->
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
        <!-- 模板中引用总价格出发计算 -->
        <span v-show="false">{{ allPrice }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            // 用户数据
            users:[{
                username:'',
                id:''
            }],
            // 机票的数据
            infoData:{},
            // 保险数据id的集合
            insurances:[],
            // 验证码
            captcha: "",
            //联系人名字
            contactName:'',
            // 联系人电话
            contactPhone:'',
            // 是否需要发票，这里暂且是false
            invoice:false,
            // 座位id--来自于url的参数
            seat_xid:'',
            // 航班id--来自于url的参数
            air:''
        }
    },
    methods:{
        // 点击添加乘机人，添加一个
        handleAddUsers() {
            // 给 users 添加多一项
            this.users.push({
                username:'',
                id:''
            })
        },

        // 删除乘机人
        handleDeleteUser(index) {
            // 把users中的某一项删除掉
            this.users.splice(index,1);
        },

        // 选中保险时触发
        handleChange(id) {
            // 先判断数组中是否包含了该id
            const index = this.insurances.indexOf(id);

            // 如果包含了，就应该删除
            if(index > -1) {
                this.insurances.splice(index,1);
            }else {
                // 添加id到数组
                this.insurances.push(id);
            }
            // console.log(this.insurances.length)
        },

        // 点击发送验证码
        handleSendCaptcha() {
            // 判断手机号是否为空
            if(!this.contactPhone) {
                this.$message.error('请输入手机号码');
                return;
            }

            // 发送请求，获取验证码
            this.$axios({
                url:'/captchas',
                method:'post',
                data:{
                    tel:this.contactPhone
                }
            }).then(res=>{
                // console.log(res)
                // 解构 出 code 验证码
                const { code } = res.data;
                // 弹出提示框
                this.$alert(`模拟的手机验证码是：${code}`,'提示');
            })
        },

        // 提交订单
        handleSubmit() {
            // 提交给后台的接口字段
            const data = {
                users: this.users,
                insurances:this.insurances,
                contactName: this.contactName,
                contactPhone: this.contactPhone,
                captcha:this.captcha,
                invoice:this.invoice,
                seat_xid:this.$route.query.seat_xid,
                air:this.$route.query.id
            }

            // 判断乘机人是否为空
            if(!this.users[0].username || !this.users[0].id) {
                this.$message.error('乘机人不能为空');
                return;
            }

            // 判断联系人是否为空
            if(!this.contactName) {
                this.$message.error('联系人不能为空');
                return;
            }

            // 判断联系电话是否为空
            if(!this.contactPhone) {
                this.$message.error('电话不能为空');
                return;
            }

            // 判断验证码是否为空
            if(!this.captcha) {
                this.$message.error('验证码不能为空');
                return;
            }

            // 提交订单
            this.$axios({
                url:'/airorders',
                method:'POST',
                // 可以给接口单独加上请求头
                headers:{
                   Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                },
                data
            }).then(res=>{
                console.log(res)
                // 解构出订单 id
                const { id } = res.data.data;
                this.$router.push({
                    path:'/air/pay',
                    query:{
                        id
                    }
                })
            })
        }
    },
    mounted() {
        // 解构出所需要的两个参数--机票id，和座位seat_xid
        const { id, seat_xid } = this.$route.query;
        this.$axios({
            url:`/airs/${id}`,
            params:{
                seat_xid
            }
        }).then(res=>{
            // console.log(res)
            //保存机票的数据
            this.infoData = res.data;

            // 调用store的方法，把infoData存到store中
            this.$store.commit('airs/setInfoData',this.infoData);
        })
    },
    computed:{
      // 计算总价格
      allPrice() {

        // 如果请求未完成，暂时不需要计算，返回0
        if(!this.infoData.seat_infos) {
          return 0;
        }

        let price = 0;

        // 机票单价，座位信息的第一个价格
        price += this.infoData.seat_infos.org_settle_price;

        // 燃油费
        price += this.infoData.airport_tax_audlet;

        // 保险费
        price += 30 * this.insurances.length;

        // 如果有多个人乘坐的费用
        price *= this.users.length;

        // 把值存到store
        this.$store.commit('airs/setAllPrice',price);

        return price;
      }
    }
};
</script>
<style lang="less" scoped>
.air-column {
    border-bottom: 1px #ddd dashed;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.air-column h2 {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: normal;
}
/deep/ .el-select .el-input {
        width: 130px;
    }
  .input-with-select{
        width:590px;
    }
.input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
   .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }
.menber-info-item{
    border-bottom: 1px #eee dashed;
    padding-bottom: 20px;
    position: relative;
    &:first-child{
            .delete-user{
                display: none;
            }
    }
}
.add-member{
        margin-top:20px;
    }
 .delete-user{
        display: block;
        background:pink;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>