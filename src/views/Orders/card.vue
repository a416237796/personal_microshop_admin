<template>
  <el-card class="box-card" shadow="hover" :body-style="{padding: '10px'}">
    <div slot="header" class="clearfix">
      <span>下单时间：{{data.created_at}}</span>
      <span style="margin-left: 20px">订单编号：{{data.order}}</span>
      <el-link @click="handlePrint" :type="type" class="box-header-right" :disabled="disabled" :underline="false">{{typeText}}</el-link>
    </div>
    <el-row>
      <el-col :span="18">
        <el-row style="margin-bottom: 10px" :gutter="20" v-for="(item, index) in data.goods" :key="`goods-order${index}`">
          <el-col :span="3">
            <el-image
              style="width: 100%; height: auto"
              :src="item.goods_img[0].url"
              fit="contain ">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-col>
          <el-col :span="9">
            <el-link href="" :title="item.goods_name">{{item.goods_name}}</el-link>
          </el-col>
          <el-col :span="6">单价：{{item.goods_price / 100}} 元</el-col>
          <el-col :span="6">数量：{{item.goods_num}} </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="order-remark">总价：<el-link type="primary" :underline="false">{{data.total_price}}</el-link></div>
        <div class="order-remark">总数：{{data.total_num}}</div>
        <div class="order-remark">买家备注：{{!data.remark ? '无': data.remark}}</div>
        <div class="order-remark">
          <span v-if="data.admin_remark">卖家备注：{{data.admin_remark}}</span>
          <el-link v-else type="warning" :underline="false">添加备注</el-link>
        </div>
      </el-col>
    </el-row>
    <el-row style="font-size: 14px">
      <el-col :span="24">收货地址：{{data.name}}，{{data.phone}}，{{data.address}}</el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'orders-card',
  props: {
    data: {
      type: Object,
      default () {
        return {
          id: '',
          order: '',
          user_id: '',
          nickname: '',
          goods: [],
          total_num: '',
          total_price: '',
          name: '',
          phone: '',
          address: '',
          wepay_code: '',
          created_at: '',
          paid_at: '',
          finished_at: '',
          closed_at: '',
          closed_reason: '',
          remark: '',
          admin_remark: ''
        }
      }
    }
  },
  computed: {
    type () {
      const type = ['primary', 'danger', 'success', 'info']
      return type[this.data.status]
    },
    typeText () {
      const typeText = ['待付款', '待发货', '已完成', '已关闭']
      return typeText[this.data.status]
    },
    disabled () {
      return this.data.status !== 1
    }
  },
  methods: {
    handlePrint () {
      if (this.data.status === 1) {
        console.log(this.data)
        this.$router.push(`/print/${this.data.id}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
  font-size: 14px;
  ::v-deep .el-card__header {
    padding: 10px
  }
}
.box-header-right {
  float: right;
  padding: 3px 0;
}
.order-remark {
  margin-bottom: 10px
}
</style>
