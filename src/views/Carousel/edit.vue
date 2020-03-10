<template>
  <el-dialog
  :title="title"
  :visible="show"
  width="40%"
  @close="handleCancel">
  <el-form ref="form" :model="data" :rules="rules" label-width="120px" size="medium">
    <el-form-item label="轮播标题" prop="name">
      <el-input v-model="data.name" placeholder="请输入轮播图标题" maxlength="50" show-word-limit></el-input>
    </el-form-item>
    <el-form-item prop="image">
      <span slot="label">轮播图片<br/></span>
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-preview="handlePictureCardPreview"
        :before-remove="handleBeforeRemove"
        :on-remove="handleOnRemove"
        :http-request="uploadSectionFile"
        :before-upload="beforeAvatarUpload">
        <img v-if="data.image && data.image.url" :src="data.image.url" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span style="font-size:12px">建议尺寸: 750px * 300px</span>
    </el-form-item>
    <el-form-item label="关联商品" prop="goods_id">
      <el-autocomplete
        class="inline-input"
        v-model="data.goods_id"
        :fetch-suggestions="handleQuerySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
        style="width: 100%"
      >
      <template slot-scope="{ item }">
        <div class="name">{{ item.name }}</div>
        <span class="id">{{ item.id }}</span>
      </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="data.sort" placeholder="请输入轮播图序号排序（越小越前）" type="number" min="0"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch
        v-model="data.status"
        active-value="1"
        inactive-value="0"
        active-text="启用"
        inactive-text="禁用">
      </el-switch>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleCancel" size="medium">取 消</el-button>
    <el-button type="primary" @click="handleSubmit" size="medium">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import { uploadImg, deleteImg, getGoodsList } from '@/api/goods'
import { updateCarousel, saveCarousel } from '@/api/carousel'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default () {
        return {
          name: '', // 轮播图标题
          image: {}, // 轮播图地址
          goods_id: '', // 关联的商品id
          sort: 0, // 排序
          state: 1 // 状态，0 禁用， 1启用
        }
      }
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      timeout: null,
      rules: {
        name: [
          { required: true, message: '请输入轮播标题', trigger: 'blur' }
        ],
        goods_id: [
          { required: true, message: '请选择商品', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传轮播图片' }
        ],
        sort: [
          { required: true, message: '请输入序号', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请输入选择轮播图状态', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title () {
      if (this.data && this.data.id && this.data.id !== '') {
        return '编辑轮播图'
      } else {
        return '新增轮播图'
      }
    }
  },
  methods: {
    async uploadSectionFile (params) {
      let form = new FormData()
      form.append('image', params.file)
      let res = await uploadImg(form)
      this.data.image = res
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
      let res = await deleteImg({ id: this.goods.image.id })
      if (res) {
        return false
      }
      return true
    },
    handleOnRemove (file, fileList) {
      this.data.image = {}
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async handleGetGoodsList (data) {
      let { list, total } = await getGoodsList(data)
      if (list) {
        this.list = list
        this.total = total
      }
    },
    handleQuerySearch (queryString, cb) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        let results = await getGoodsList({
          name: queryString,
          is_delete: 0,
          page_num: 1, // 页码
          page_size: 10 // 请求分页条数})
        })
        cb(results.list)
      }, 500)
    },
    handleSelect (item) {
      this.data.goods_id = item.id
    },
    handleCancel () {
      this.$emit('cancel')
    },
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.data.id && this.data.id !== '') {
            this.handleUpdate()
          } else {
            this.handleSave()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async handleUpdate () {
      let res = await updateCarousel(this.data)
      if (!res) {
        this.$message.success('修改成功！')
        this.handleCancel()
      }
    },
    async handleSave () {
      let res = await saveCarousel(this.data)
      if (!res) {
        this.$message.success('保存成功！')
        this.handleCancel()
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
