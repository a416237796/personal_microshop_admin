<template>
  <d2-container>
    <div>
      <el-button size="medium" @click="handleClickPrint">打印</el-button>
      <el-button size="medium" type="primary" v-if="data.status === 1" @click="handleClickPost">确认发货</el-button>
    </div>
    <div class="print-dom">
      <div ref="print" class="print-dom-body">
        <h1 class="print-dom-center">发货单</h1>
        <el-row>
          <el-col :span="12">订单编号：{{data.order}}</el-col>
          <el-col :span="12" class="print-dom-fr">下单时间：{{data.created_at}}</el-col>
        </el-row>
        <el-table
          class="print-dom-table"
          :data="data.goods"
          border
          size="small"
          show-summary
          :summary-method="getSummaries"
          style="width: 100%">
          <el-table-column
            type="index"
            label="#"
            width="50">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="单价(元)">
            <template slot-scope="scope">
              {{scope.row.goods_price / 100}}
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_num"
            label="数量">
          </el-table-column>
          <el-table-column
            label="合计(元)"
            prop="goods_total">
            <template slot-scope="scope">
              {{scope.row.goods_total / 100}}
            </template>
          </el-table-column>
        </el-table>
        <el-row class="print-dom-row">
          <el-col :span="12">用户昵称: {{data.nickname}}</el-col>
          <el-col :span="12" class="print-dom-fr">付款流水号：{{data.wepay_code}}</el-col>
          <el-col :span="12">收件人: {{data.name}}</el-col>
          <el-col :span="12" class="print-dom-fr">联系电话: {{data.phone}}</el-col>
          <el-col :span="24" >收货地址: {{data.address}}</el-col>
        </el-row>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { getOrderInfo } from '@/api/order'
export default {
  name: 'print',
  created () {
    this.id = this.$route.params.id
    this.handleGetOrderInfo()
  },
  data () {
    return {
      id: '',
      data: {
        id: ''

      }
    }
  },
  methods: {
    handleClickPrint () {
      this.$print(this.$refs['print'])
    },
    async handleGetOrderInfo () {
      let res = await getOrderInfo({ id: this.id })
      if (res && res.id) {
        let goods = res.goods.map(item => {
          return {
            ...item,
            goods_total: item.goods_price * item.goods_num
          }
        })
        this.data = {
          ...res,
          goods
        }
      }
    },
    handleClickPost () {

    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          if (column.property === 'goods_price' || column.property === 'goods_total') {
            sums[index] = sums[index] / 100
          }
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>

<style lang="scss" scoped>
.print-dom {
  margin: 20px auto;
  padding: 20px;
  width: 100%;
  max-width: 689px;
  min-height: 1018px;
  border: 1px solid #EBEEF5;
}
.print-dom-body {
  width: 100%;
}
.print-dom-center {
  text-align: center;
}
.print-dom-fr {
  text-align: right;
}
.print-dom-table {
  margin: 20px 0;
}
.print-dom-row {
  line-height: 36px;
}
</style>
