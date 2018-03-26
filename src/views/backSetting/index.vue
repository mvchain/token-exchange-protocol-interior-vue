<template>
  <div class="setting-con">
    <el-row class="setting-grid" :gutter="24" v-for="(v,k) in tokenConfig" :key="k">
      <el-col :span="2">
        <div class="bg-purple">
          {{v.tokenName}}
        </div>
      </el-col>
      <el-col :span="3">
        <div class="bg-purple">
          <el-switch
            v-model="v.rechargeStatus"
            :active-value="1"
            :inactive-value="0"
            active-text="开"
            inactive-text="关">
          </el-switch>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="bg-purple">
          <el-switch
            v-model="v.withdrawStatus"
            :active-value="1"
            :inactive-value="0"
            active-text="开"
            inactive-text="关">
          </el-switch>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="bg-purple">
          <el-input v-model="v.min" placeholder="最小提现金额"></el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="bg-purple">
          <el-input v-model="v.max" placeholder="单日提币上限"></el-input>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="bg-purple">
          <el-input v-model="v.poundage" placeholder="手续费"></el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="bg-purple">
          <el-button @click="subModify(k)">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'setting',
    data() {
      return {
      }
    },
    mounted() {
      this.getConfig()
    },
    computed: {
      ...mapGetters({
        tokenConfig: 'tokenConfig'
      })
    },
    methods: {
      getConfig() {
        this.$store.dispatch('tokenConfigHandler').then(() => {
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      subModify(idx) {
        this.$store.dispatch('modifyTokenConfigHandler', this.tokenConfig[idx]).then(() => {
          this.$message.success('修改成功')
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
