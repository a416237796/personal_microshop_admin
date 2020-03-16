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
        <el-avatar :size="60" :src="scope.row.avatar_url" @error="errorHandler">
          <img :src="avatarError"/>
        </el-avatar>
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.image[0].url"
          fit="scale-down">
          <div slot="error" :style="imgSlot">
            <d2-icon name="picture-o"></d2-icon>
          </div>
        </el-image>
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
