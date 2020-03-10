<template>
  <d2-container>
    <el-button size="medium" @click="handleAddGoods">
          <d2-icon name="plus"></d2-icon> 新增商品
        </el-button>
    <el-form size="medium" label-position="left" :model="search" label-width="120px" class="search-form">
      <el-form-item label="所属分类" >
        <el-radio-group v-model="search.cid" class="classify-radio">
        <el-radio
          v-for="({value, label}, index) in classify"
          :key="`classify${index}`"
          :label="value">{{label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="置顶状态">
        <el-radio
          v-model="search.is_top"
          v-for="({value, label}, index) in isTopOption"
          :key="`isTop${index}`"
          :label="value">{{label}}
          </el-radio>
      </el-form-item>
      <el-form-item label="删除状态">
        <el-radio
          v-model="search.is_delete"
          v-for="({value, label}, index) in isDeleteOption"
          :key="`isDelete${index}`"
          :label="value">{{label}}
          </el-radio>
      </el-form-item>
      <el-form-item label="上架状态">
        <el-radio
          v-model="search.status"
          v-for="({value, label}, index) in statusOption"
          :key="`status${index}`"
          :label="value">{{label}}
          </el-radio>
      </el-form-item>
      <el-form-item label="价格区间">
        <el-col :span="4">
          <el-input v-model="search.min_price" min="0" type="number" placeholder="最小值"></el-input>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="4">
          <el-input v-model="search.max_price" min="0" type="number" placeholder="最大值"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="库存区间">
        <el-col :span="4">
          <el-input v-model="search.min_stock" min="0" type="number" placeholder="最小值"></el-input>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="4">
          <el-input v-model="search.max_stock" min="0" type="number" placeholder="最大值"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="创建时间区间">
        <el-date-picker
          v-model="createTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="商品名称关键词">
        <el-input v-model="search.name" class="name-input" placeholder="输入商品名称关键词查询"></el-input>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="list"
    style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="商品名称"
        width="180">
        <template slot-scope="scope">
          <div :style="nameScope" :title="scope.row.name">
            {{scope.row.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="封面图片"
        width="100">
        <template slot-scope="scope">
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
        label="所属分类"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.classify.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="置顶状态"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.is_top === 0? '未置顶': '置顶'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上架状态"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.status === 0? '草稿': (scope.row.status === 1? '下架中': (scope.row.status === 2? '上架中': ''))}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品状态"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.deleted_at === ''? '使用中': '已删除'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="单价"
        width="100">
        <template slot-scope="scope">
          <span>￥{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="库存"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.stock}}</span>
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
            v-if="scope.row.deleted_at === ''"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="success"
            style="margin-left: 10px"
            v-if="scope.row.deleted_at !== ''"
            @click="handleResetGoods(scope.row)"
            >还原</el-button>
          <el-button
            size="mini"
            type="warning"
            style="margin-left: 10px"
            v-if="scope.row.deleted_at === ''"
            @click="handleDeleteGoods(scope.row)"
            >删除</el-button>
          <el-popconfirm
            confirmButtonText='确定'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            title="删除后将不能恢复，是否确定删除？"
            v-if="scope.row.deleted_at !== ''"
            @onConfirm="handleDelete(scope.row)"
          >
            <el-button
              size="mini"
              type="danger"
              slot="reference"
              style="margin-left: 10px"
              >永久删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="list-pagination"
      layout="total, prev, pager, next"
      :page-size="searchData.page_size"
      :current-page="searchData.page_num"
      :total="total"
      @current-change="handleClickCurrentPage">
    </el-pagination>
  </d2-container>
</template>

<script>
import { getClassifyList } from '@/api/classify'
import { getGoodsList, updateGoods } from '@/api/goods'

export default {
  name: 'goods-list',
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
      classify: [],
      statusOption: [
        { value: '', label: '全部' },
        { value: 0, label: '草稿' },
        { value: 1, label: '下架中' },
        { value: 2, label: '上架中' }
      ],
      isTopOption: [
        { value: '', label: '全部' },
        { value: 0, label: '未置顶' },
        { value: 1, label: '置顶' }
      ],
      isDeleteOption: [
        { value: 0, label: '未删除' },
        { value: 1, label: '已删除' },
        { value: 2, label: '全部' }
      ],
      search: {
        status: '',
        is_top: '',
        name: '', // 商品名模糊查询
        // 价格区间查询
        min_price: '', // 最小值
        max_price: '', // 最大值
        // 库存区间查询
        min_stock: '', // 最小值
        max_stock: '', // 最大值
        cid: '', // 分类查询
        // 创建时间区间查询
        start_c: '', // 开始时间
        end_c: '', // 结束时间
        is_delete: 0 // 是否已删除，0 未删除，1已删除，2全部
      },
      total: 0,
      list: [],
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
      },
      createTime: '',
      searchData: {
        page_num: 1, // 页码
        page_size: 10 // 请求分页条数
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    handleAddGoods () {
      this.$router.push('/goods/add')
    },
    async initData () {
      let res = await getClassifyList()
      this.classify = [
        {
          value: '',
          label: '全部'
        }
      ]
      if (res && res.list) {
        res.list.forEach(item => {
          this.classify.push({
            value: item.cid,
            label: item.name
          })
        })
      }
      this.onSubmit()
    },
    onSubmit () {
      if (this.createTime) {
        this.search.start_c = this.createTime[0]
        this.search.end_c = this.createTime[1]
      }
      this.searchData = {
        page_num: 1, // 页码
        page_size: 10 // 请求分页条数
      }
      Object.keys(this.search).forEach(item => {
        if (this.search[item] !== '') {
          this.searchData[item] = this.search[item]
        }
      })
      this.handleGetGoodsList(this.searchData)
    },
    async handleGetGoodsList (data) {
      let { list, total } = await getGoodsList(data)
      if (list) {
        this.list = list
        this.total = total
      }
    },
    handleClickCurrentPage (current) {
      this.searchData.page_num = current
      this.handleGetGoodsList(this.searchData)
    },
    handleEdit (index, row) {
      this.$router.push(`/goods/edit/${row.id}`)
    },
    async handleResetGoods (row) {
      let res = await updateGoods({
        id: row.id,
        is_delete: 0
      })
      if (!res) {
        let text = row.status === 0 ? '草稿' : (row.status === 1 ? '已下架' : (row.status === 2 ? '已上架' : '未知'))
        this.$message.success(`商品已还原，当前商品处于${text}状态`)
        this.handleGetGoodsList(this.searchData)
      }
    },
    async handleDeleteGoods (row) {
      let res = await updateGoods({
        id: row.id,
        is_delete: 1
      })
      if (!res) {
        this.$message.success(`商品已删除，若想恢复，请查询已删除列表后操作！`)
        this.handleGetGoodsList(this.searchData)
      }
    },
    async handleDelete (row) {
      let res = await updateGoods({
        id: row.id,
        is_delete: 2
      })
      if (!res) {
        this.$message.success(`商品已删除，若想恢复，请查询已删除列表后操作！`)
        this.handleGetGoodsList(this.searchData)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.search-form .el-form-item {
  margin-bottom: 5px
}
.classify-radio .el-radio {
  line-height: 36px
}
.line {
  text-align: center
}
.name-input {
  margin-right: 10px;
  width: 350px
}
.list-pagination {
  margin: 20px 0;
  text-align: right
}
</style>
