<template>
  <d2-container>
    <user-filter :form="search" @search-user="handleSearch"/>
    <user-list :data="list"/>
    <el-pagination
      background
      v-if="list.length > 0"
      class="list-pagination"
      layout="total, prev, pager, next"
      :page-size="pagination.page_size"
      :current-page="pagination.page_num"
      :total="total"
      @current-change="handleClickCurrentPage">
    </el-pagination>
  </d2-container>
</template>

<script>
import UserFilter from './filter'
import UserList from './list'
import { getUserList } from '@/api/user'
export default {
  name: 'users',
  components: {
    UserFilter,
    UserList
  },
  created () {
    this.handleGetUsers()
  },
  data () {
    return {
      search: {
        name: '',
        created_at: ''
      },
      pagination: {
        page_num: 1,
        page_size: 10
      },
      list: [],
      total: 0
    }
  },
  methods: {
    async handleGetUsers () {
      let params = {
        ...this.pagination
      }
      if (this.search.created_at !== '') {
        params.created_start = this.search.created_at[0]
        params.created_end = this.search.created_at[1]
      }
      if (this.search.name !== '') {
        params.name = this.search.name
      }
      let { list, total } = await getUserList()
      if (list) {
        this.list = list
        this.total = total
      }
    },
    handleSearch (form) {
      this.search = form
      this.pagination = {
        page_num: 1,
        page_size: 10
      }
      this.handleGetUsers()
    },
    handleClickCurrentPage (current) {
      this.pagination.page_num = current
      this.handleGetUsers()
    }
  }
}
</script>

<style lang="scss" scoped>
.list-pagination {
  margin: 20px 0;
  text-align: right
}
</style>
