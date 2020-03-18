<template>
  <d2-container>
    <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="120px" class="shop-form">
      <el-form-item label="店铺名称" prop="shop_name">
        <el-input v-model="form.shop_name" :maxlength="50" show-word-limit placeholder="请输入店铺名称"></el-input>
      </el-form-item>
      <el-form-item prop="logo">
        <span slot="label">店铺LOGO<br/></span>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-preview="handlePictureCardPreview"
          :before-remove="handleBeforeRemove"
          :on-remove="handleOnRemove"
          :http-request="uploadSectionFile"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.logo && form.logo.url" :src="form.logo.url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span style="font-size:12px">建议尺寸: 750px * 300px</span>
      </el-form-item>
      <el-form-item label="店主姓名" prop="shopkeeper">
        <el-input v-model="form.shopkeeper" :maxlength="50" show-word-limit placeholder="请输入店主姓名"></el-input>
      </el-form-item>
      <el-form-item label="店主手机号" prop="phone">
        <el-input v-model="form.phone" :maxlength="11" show-word-limit placeholder="请输入店主手机号"></el-input>
      </el-form-item>
      <el-form-item label="店铺电话">
        <el-input v-model="form.tel" :maxlength="11" show-word-limit placeholder="请输入店铺电话"></el-input>
      </el-form-item>
      <el-form-item label="店铺微信号" prop="weixin">
        <el-input v-model="form.weixin" :maxlength="50" show-word-limit placeholder="请输入店铺微信号"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址" prop="shop_address">
        <el-input v-model="form.shop_address" :maxlength="50" show-word-limit placeholder="请输入店铺地址"></el-input>
      </el-form-item>
      <el-form-item label="营业时间" prop="time_range">
        <el-time-picker
          is-range
          v-model="time_range"
          range-separator="至"
          value-format="HH:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="营业状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          active-text="正常"
          inactive-text="暂停">
        </el-switch>
      </el-form-item>
      <el-form-item label="店铺介绍" prop="describe">
        <el-input v-model="form.describe" :maxlength="300" show-word-limit type="textarea" :rows="4" placeholder="请输入店铺介绍"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClickSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import { saveChange, getShopInfo } from '@/api/order'
import { uploadImg, deleteImg } from '@/api/goods'

export default {
  name: 'shop',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      time_range: '',
      form: {
        shop_name: '',
        logo: {},
        shopkeeper: '',
        phone: '',
        tel: '',
        weixin: '',
        shop_address: '',
        status: 1,
        describe: ''
      },
      rules: {
        shop_name: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        shopkeeper: [
          { required: true, message: '请输入店主姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入店主手机号', trigger: 'blur' }
        ],
        weixin: [
          { required: true, message: '请输入店铺微信号', trigger: 'blur' }
        ],
        shop_address: [
          { required: true, message: '请输入店铺地址', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入店铺介绍', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传店铺LOGO图片' }
        ]
      }
    }
  },
  created () {
    this.handleGetShopInfo()
  },
  methods: {
    async handleGetShopInfo () {
      let res = await getShopInfo()
      if (res.started_at) {
        this.time_range = [
          res.started_at,
          res.ended_at
        ]
      }
      this.form = {
        ...res
      }
      console.log(this.form)
    },
    handleClickSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const {
            shop_name,
            logo,
            shopkeeper,
            phone,
            tel,
            weixin,
            shop_address,
            status,
            describe } = this.form

          let params = {
            shop_name,
            logo,
            shopkeeper,
            phone,
            tel,
            weixin,
            shop_address,
            status,
            describe
          }
          if (this.time_range) {
            params.started_at = this.time_range[0]
            params.ended_at = this.time_range[1]
          } else {
            params.started_at = '00:00:00'
            params.ended_at = '23:59:59'
          }
          this.handleSave(params)
        } else {
          return false
        }
      })
    },
    async handleSave (params) {
      let res = await saveChange(params)
      if (!res) {
        this.$message.success('保存成功！')
      }
    },
    async uploadSectionFile (params) {
      let form = new FormData()
      form.append('image', params.file)
      let res = await uploadImg(form)
      this.form.logo = res
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
      let res = await deleteImg({ id: this.form.logo.id })
      if (res) {
        return false
      }
      return true
    },
    handleOnRemove (file, fileList) {
      this.form.logo = {}
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChangeTimeRange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-form {
  max-width: 900px;
}
</style>
