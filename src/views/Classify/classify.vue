<template>
  <d2-container>
    <el-button @click="openAdd" size="medium">
      <d2-icon name="plus"/>
      新增分类
    </el-button>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updated_at"
        label="更新日期"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText='确定'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            title="删除后将不能恢复，是否确定删除？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
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
    <el-dialog
      :title="title"
      :visible.sync="addDom"
      width="30%">
      <el-form :model="classifyForm" :rules="rules" ref="classifyForm" label-width="80px">
        <el-form-item label="分类名" prop="name">
          <el-input
            type="text"
            placeholder="请输入分类名"
            v-model="classifyForm.name"
            maxlength="10"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDom = false">取 消</el-button>
        <el-button type="primary" @click="handleClickSave">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import { getClassifyList, deleteClassify, updateClassify, addClassify } from '@/api/classify'
export default {
  name: 'classify',
  data () {
    return {
      list: [],
      addDom: false,
      title: '新增分类',
      classifyForm: {
        cid: '',
        name: ''
      },
      rules: {
        name: [ { required: true, message: '请输入分类名', trigger: 'blur' } ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let data = await getClassifyList()
      if (data.list) {
        this.list = data.list
      } else {
        this.$message({
          type: 'error',
          message: data
        })
      }
    },
    async handleDelete (index, row) {
      let data = await deleteClassify(row.cid)
      if (!data) {
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
      }
    },
    openAdd () {
      this.addDom = true
      this.title = '新增分类'
      this.classifyForm = {
        cid: '',
        name: ''
      }
    },
    handleEdit (index, row) {
      this.addDom = true
      this.title = '编辑分类'
      this.classifyForm = {
        cid: row.cid,
        name: row.name
      }
    },
    handleClickSave () {
      this.$refs['classifyForm'].validate((valid) => {
        if (valid) {
          if (this.classifyForm.cid !== '' && this.title === '编辑分类') {
            this.handleUpdate(this.classifyForm)
          } else {
            this.handleAddSave(this.classifyForm.name)
          }
        } else {
          return false
        }
      })
    },
    async handleUpdate (data) {
      let res = await updateClassify(data)
      if (!res) {
        this.addDom = false
        this.getList()
      }
    },
    async handleAddSave (name) {
      let res = await addClassify({
        name
      })
      if (!res) {
        this.addDom = false
        this.$message({
          type: 'success',
          message: '新增成功！'
        })
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
