<template>
  <d2-container>
    <filter-bar @search-orders="handleSearch"></filter-bar>
    <template v-if="list.length === 0">
      <div class="no-list">暂无订单</div>
    </template>
    <template v-else>
      <orders-card v-for="(item, index) in list" :key="`order-list${index}`" :data="item" ></orders-card>
    </template>
    <el-pagination
      v-if="list.length > 0"
      class="list-pagination"
      background
      layout="total, prev, pager, next"
      :total="total"
      :page-size="pagination.page_size"
      :current-page="pagination.page_num"
      @current-change="handleChangePage">
    </el-pagination>
  </d2-container>
</template>

<script>
import { getOrdersList } from '@/api/order'
import FilterBar from './filter'
import OrdersCard from './card'
import { mapState } from 'vuex'
export default {
  name: 'orders',
  components: {
    FilterBar,
    OrdersCard
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  created () {
    this.initList()
  },
  data () {
    return {
      list: [],
      total: 0,
      pagination: {
        page_num: 1,
        page_size: 10
      },
      params: {}
    }
  },
  methods: {
    initList () {
      const { uid } = this.info
      this.params = {
        user_id: uid,
        ...this.pagination
      }
      this.handleGetOrdersList()
    },
    handleSearch (data) {
      const { uid } = this.info
      this.params = {
        user_id: uid,
        ...this.pagination
      }
      Object.keys(data).forEach(item => {
        if (item === 'finished_at' && data[item] && data[item].length > 0) {
          this.params['finished_start'] = data[item][0]
          this.params['finished_end'] = data[item][1]
        } else if (item === 'created_at' && data[item] && data[item].length > 0) {
          this.params['created_start'] = data[item][0]
          this.params['created_end'] = data[item][1]
        } else if (data[item] !== '') {
          this.params[item] = data[item]
        }
      })
      this.handleGetOrdersList()
    },
    handleChangePage (current) {
      this.params.page_num = current
      this.handleGetOrdersList()
    },
    async handleGetOrdersList () {
      let { list, total } = await getOrdersList(this.params)
      if (list) {
        this.list = list
        this.total = total
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.no-list {
  margin: 20px 0;
  padding: 20px;
  font-size: 14px;
  color: #c0c4cc;
  text-align: center;
  border-top: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6
}
.list-pagination {
  margin: 20px 0;
  text-align: right
}
</style>
