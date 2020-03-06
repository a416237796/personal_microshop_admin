<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.nickname ? `你好 ${info.nickname}` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="changePwd">
        <d2-icon name="lock" class="d2-mr-5"/>
        修改密码
      </el-dropdown-item>
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" v-model="ruleForm.rePassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangePwd">确 定</el-button>
      </span>
    </el-dialog>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  data () {
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    const validateRePassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入新密码'))
      } else if (this.ruleForm.newPassword !== value) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validateNewPassword, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, validator: validateRePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout',
      'changePassword',
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    /**
     * @description 修改密码
    */
    changePwd () {
      this.dialogVisible = true
      this.ruleForm = {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      }
    },
    /**
     * @description 提交修改的密码
    */
    handleChangePwd () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.postChange()
        } else {
          return false
        }
      })
    },
    async postChange () {
      let res = await this.changePassword(this.ruleForm)
      if (!res) {
        let that = this
        this.$message({
          type: 'success',
          message: '密码修改成功！即将退出重新登录。。。',
          onClose: () => {
            that.dialogVisible = false
            that.logout()
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: res
        })
      }
    }
  }
}
</script>
