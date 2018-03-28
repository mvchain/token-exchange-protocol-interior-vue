<template>
  <div class="user-info-con">
    <el-table
      :data="userInfo"
      style="width: 100%">
      <el-table-column
        prop="tokenName"
        label="币种"
      >
      </el-table-column>
      <el-table-column
        prop="balance"
        label="余额"
      >
      </el-table-column>
    </el-table>
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
      this.getUserInfo(this.$route.query.id)
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    },
    methods: {
      getUserInfo(str) {
        this.$store.dispatch('infoHandler', str).then(() => {
        }).catch((err) => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import './index';
</style>
