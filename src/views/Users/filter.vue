<template>
  <el-form :model="form" class="filter-bar" label-position="left" label-width="130px" size="medium">
    <el-form-item label="创建时间">
      <el-date-picker
        v-model="form.created_at"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="用户昵称/姓名">
       <el-col :span="24">
         <el-input v-model="form.name" style="max-width: 400px" placeholder="输入用户昵称/姓名"></el-input>
         <el-button class="filter-bar-submit" type="primary" @click="handleSearch">查询</el-button>
       </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'user-filter',
  props: {
    form: {
      type: Object,
      default () {
        return {
          name: '',
          created_at: ''
        }
      }
    }
  },
  data () {
    return {
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
      this.$emit('search-user', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-bar {
  .el-form-item {
    margin-bottom: 10px;
  }
  .filter-bar-submit {
    margin-left: 10px;
  }
}
</style>
