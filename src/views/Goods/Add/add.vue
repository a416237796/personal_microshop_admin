<template>
  <d2-container>
    <el-form ref="goods" :model="goods" :rules="rules" size="medium" label-width="120px" class="edit-form">
      <el-form-item label="商品名称" class="edit-form-item" prop="name">
        <el-input type="text" v-model="goods.name" maxlength="50" show-word-limit placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item :label="`商品封面${goods.image.length}/5`" prop="image">
        <el-upload
          action=""
          list-type="picture-card"
          :limit="5"
          :file-list="goods.image"
          :on-preview="handlePictureCardPreview"
          :before-remove="handleBeforeRemove"
          :on-remove="handleOnRemove"
          :http-request="uploadSectionFile"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="所属分类" prop="cid">
        <el-select v-model="goods.cid" placeholder="请选择所属分类">
          <el-option v-for="(item, index) in classify" :key="`classify${index}`" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品单价（分）" class="edit-form-item-number" prop="price">
        <el-input type="number" v-model="goods.price" min="1" maxlength="50" placeholder="商品单价（单位：分）"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" class="edit-form-item-number" prop="stock">
        <el-input type="number" v-model="goods.stock" min="1" maxlength="50" placeholder="商品库存"></el-input>
      </el-form-item>
      <el-form-item label="补充参数" class="edit-form-item-number">
        <el-row v-for="(item, index) in goods.params" :key="`params${index}`" class="params-row">
          <el-col :span="10" >
            <el-input type="text" placeholder="键名" v-model="goods.params[index].k" maxlength="50" show-word-limit style="width: 100%;"></el-input>
          </el-col>
          <el-col class="line" :span="2">:</el-col>
          <el-col :span="10">
            <el-input type="text" placeholder="键值" v-model="goods.params[index].v" maxlength="50" show-word-limit style="width: 100%;"></el-input>
          </el-col>
          <el-col class="line" :span="2">
            <d2-icon name="remove" @click.native="handleRemoveParams(index)" title="删除此项"></d2-icon>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-button @click="handleAddParams">
              <d2-icon name="plus"></d2-icon> 添加参数
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="是否置顶" class="edit-form-item-number" prop="is_top">
        <el-radio-group v-model="goods.is_top">
          <el-radio :label="0">不置顶</el-radio>
          <el-radio :label="1">置顶</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品简介" class="edit-form-item-number" prop="describe">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="goods.describe"
          maxlength="500"
          show-word-limit
          :autosize="{minRows: 4, maxRows: 6}"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品详情" class="edit-form-item-edit" prop="info">
        <d2-tinymce :value="goods.info" @input="handleChangeContent"></d2-tinymce>
         <span>若编辑器加载失败，请刷新页面</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave(2)">保存上架</el-button>
        <el-button @click="handleSave(1)">保存不上架</el-button>
        <el-button @click="handleSave(0)">存草稿</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>

import { uploadImg, deleteImg, saveGoods } from '@/api/goods'
import { getClassifyList } from '@/api/classify'
export default {
  name: 'goods-add',
  created () {
    this.handleGetClassifyList()
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      classify: [],
      goods: {
        name: '',
        cid: '',
        image: [],
        price: '',
        stock: '',
        params: [],
        is_top: 0,
        status: 0,
        describe: '',
        info: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        cid: [
          { required: true, message: '请选择商品所属分类', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传至少一张商品封面图片' }
        ],
        price: [
          { required: true, message: '请输入商品单价（单位：分）', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '请输入商品库存', trigger: 'blur' }
        ],
        is_top: [
          { required: true, message: '请选择是否置顶', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入商品简介', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请输入商品详情', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleGetClassifyList () {
      let data = await getClassifyList()
      this.classify = []
      data.list.forEach(item => {
        this.classify.push({
          value: item.cid,
          label: item.name
        })
      })
    },
    handleAddParams () {
      if (this.goods.params.length < 15) {
        this.goods.params.push({ k: '', v: '' })
      } else {
        this.$message({
          type: 'warning',
          message: '参数添加已达上限！'
        })
      }
    },
    handleRemoveParams (index) {
      this.goods.params.splice(index, 1)
    },
    handleChangeContent (value) {
      this.goods.info = value
    },
    async uploadSectionFile (params) {
      let form = new FormData()
      form.append('image', params.file)
      let res = await uploadImg(form)
      this.goods.image.push(res)
    },
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg') ||
        (file.type === 'image/png') ||
        (file.type === 'image/bmp') ||
        (file.type === 'image/webp')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传封面图片只能是 JPG/BMP/PNG/WEBP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async handleBeforeRemove (file, fileList) {
      const index = this.goods.image.findIndex(item => item.url === file.url && item.name === file.name)
      let res = await deleteImg({ id: this.goods.image[index].id })
      if (res) {
        return false
      }
      return true
    },
    handleOnRemove (file, fileList) {
      const index = this.goods.image.findIndex(item => item.url === file.url && item.name === file.name)
      this.goods.image.splice(index, 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSave (status) {
      this.$refs['goods'].validate((valid) => {
        if (valid) {
          this.goods.status = status
          this.handleSaveGoods(this.goods)
        } else {
          return false
        }
      })
    },
    async handleSaveGoods (data) {
      let res = await saveGoods(data)
      if (!res) {
        this.$message.success('修改成功！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-form {
  .edit-form-item {
    .el-input {
      max-width: 800px;
    }
  }
  .edit-form-item-number {
    max-width: 650px;
    .el-input {
      max-width: 217px;
    }
    .params-row {
      margin-bottom: 10px;
      .line {
        text-align: center;
        .fa-remove {
          display: inline-block;
          width: 32px;
          height: 32px;
          line-height: 32px;
          cursor: pointer;
          &:hover {
            color: #EE7219
          }
        }
      }
    }
  }
  .edit-form-item-edit {
    max-width: 900px
  }
}
</style>
