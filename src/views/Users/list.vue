<template>
  <el-table
    :data="data"
    size="small"
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
      width="50">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称">
    </el-table-column>
    <el-table-column
      prop="realname"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="avatar_url"
      label="头像">
      <template slot-scope="scope">
        <el-avatar :size="60" :src="scope.row.avatar_url" fit="scale-down">
          <img :src="avatarError"/>
        </el-avatar>
      </template>
    </el-table-column>
    <el-table-column
      prop="created_at"
      label="创建时间">
    </el-table-column>
  </el-table>
</template>

<script>
import avatarError from '@/assets/image/avatar-error.png'
export default {
  name: 'user-filter',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      avatarError
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
