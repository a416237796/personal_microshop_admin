<template>
  <el-form class="filter-bar" label-position="left" :model="search" label-width="130px" size="medium">
    <el-form-item label="订单状态">
       <el-radio-group v-model="search.status">
         <el-radio v-for="(item, index) in status" :key="`status${index}`" :label="item.label">{{item.name}}</el-radio>
       </el-radio-group>
    </el-form-item>
    <el-form-item label="成交时间">
      <el-date-picker
        v-model="search.finished_at"
        type="datetimerange"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="下单时间">
      <el-date-picker
        v-model="search.created_at"
        type="datetimerange"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="买家昵称/姓名">
       <el-input v-model="search.nickname" style="max-width: 400px" placeholder="请输入买家昵称/姓名"></el-input>
    </el-form-item>
    <el-form-item label="订单编号/商品标题">
       <el-col :span="24">
         <el-input v-model="search.order" style="max-width: 400px" placeholder="请输入订单编号/商品标题"></el-input>
         <el-button class="filter-bar-submit" type="primary" @click="handleSearch">查询</el-button>
       </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {
    search: {
      type: Object,
      default () {
        return {
          status: '',
          finished_at: '',
          created_at: '',
          nickname: ''
        }
      }
    }
  },
  data () {
    return {
      status: [
        {
          label: '',
          name: '全部'
        },
        {
          label: 0,
          name: '待付款'
        },
        {
          label: 1,
          name: '待发货'
        },
        {
          label: 2,
          name: '已完成'
        },
        {
          label: 3,
          name: '已关闭'
        }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    handleSearch () {
      this.$emit('search-orders', this.search)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-bar{
  .el-form-item {
    margin-bottom: 10px;
  }
  .filter-bar-submit {
    margin-left: 10px;
  }
}
</style>
