<template>
  <div>
    用户详情
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'userInfo',
    data() {
      return {
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters({
        configData: 'configData'
      })
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import './index';
</style>
