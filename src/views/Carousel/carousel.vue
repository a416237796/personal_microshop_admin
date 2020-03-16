<template>
  <d2-container>
    <el-button size="medium" @click="handleAddCarousel">
      <d2-icon name="plus"></d2-icon> 新增轮播图
    </el-button>
    <CarouselEdit :show="showEdit" :data="data" @cancel="showEdit = false"></CarouselEdit>
    <el-table
      :data="list"
      size="small"
      style="width: 100%">
       <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="轮播图名称"
        width="180">
        <template slot-scope="scope">
          <div :style="nameScope" :title="scope.row.name">
            {{scope.row.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="轮播图片"
        width="100">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: auto"
            :src="scope.row.image.url"
            fit="scale-down">
            <div slot="error" :style="imgSlot">
              <d2-icon name="picture-o"></d2-icon>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="关联商品"
        width="180">
        <template slot-scope="scope">
          <div :style="nameScope" :title="scope.row.goods.name">
            {{scope.row.goods.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="排序"
        prop="sort"
        width="50">
      </el-table-column>
      <el-table-column
        label="关联商品"
        width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
            @change="handleChangeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText='确定'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            title="删除后将不能恢复，是否确定删除？"
            @onConfirm="handleDelete(scope.row)"
          >
            <el-button
              size="mini"
              type="danger"
              slot="reference"
              style="margin-left: 10px"
              >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import { getCarousels, deleteCarousel, updateCarousel } from '@/api/carousel'
import CarouselEdit from './edit'
export default {
  name: 'carousel',
  components: {
    CarouselEdit
  },
  data () {
    return {
      nameScope: {
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      },
      imgSlot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        background: '#f5f7fa',
        color: '#909399'
      },
      showEdit: false,
      pagination: {
        page_num: 1, // 页码
        page_size: 10 // 请求分页条数
      },
      total: 0,
      list: [],
      data: {
        name: '', // 轮播图标题
        image: {}, // 轮播图地址
        goods_id: '', // 关联的商品id
        sort: 0, // 排序
        state: 1 // 状态，0 禁用， 1启用
      }
    }
  },
  created () {
    this.handleGetList()
  },
  methods: {
    async handleGetList () {
      let { list, total } = await getCarousels(this.pagination)
      this.total = total
      this.list = list
    },
    handleAddCarousel () {
      this.showEdit = true
      this.data = {
        name: '', // 轮播图标题
        image: {}, // 轮播图地址
        goods_id: '', // 关联的商品id
        sort: 0, // 排序
        state: 1 // 状态，0 禁用， 1启用
      }
    },
    async handleDelete (row) {
      let res = await deleteCarousel({ id: row.id })
      if (!res) {
        this.$message.success('删除成功！')
        const index = this.list.findIndex(item => item.id === row.id)
        this.list.splice(index, 1)
      }
    },
    async handleChangeStatus (row) {
      let res = await updateCarousel({ id: row.id, status: row.status === 0 ? 1 : 0 })
      if (!res) {
        this.$message.success('状态修改成功！')
        this.handleGetList()
      }
    },
    handleEdit (row) {
      this.data = {
        ...row,
        goods_id: row.goods.id
      }
      this.showEdit = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
