<template>
  <d2-container>
    <user-filter/>
    <user-list/>

  </d2-container>
</template>

<script>
import UserFilter from './filter'
import UserList from './list'
export default {
  name: 'users',
  components: {
    UserFilter,
    UserList
  }
}
</script>

<style lang="scss" scoped>

</style>
