<template>
  <d2-container>
    <div ref="print">ssss</div>
    <div>
      <el-button @click="handleClickPrint">确认打印</el-button>
    </div>
  </d2-container>
</template>

<script>
export default {
  name: 'print',
  methods: {
    handleClickPrint () {
      this.$print(this.$refs['print'])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
