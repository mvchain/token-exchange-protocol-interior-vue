<template>
  <div class="setting-con">
    <div style="margin-bottom:15px;border-bottom:1px solid #ddd;padding-bottom:15px;">
      <el-button type="success" @click="addPro">添 加</el-button>
    </div>
    <div class="setting-grid-row" v-for="(v,k) in tokenConfig" :key="k">
      <div class="setting-left">
        <el-button type="primary" @click="subModify(k)">保存</el-button>
        <el-input @click.native="giveNum(k)"  :disabled="disabledFlag !== k" v-model="v.tokenName"></el-input>
      </div>
      <div class="setting-grid">
          <el-row :gutter="24">
            <el-col style="margin-bottom:20px;" :span="6">
              <div class="bg-purple">
                <span class="label-switch">展示:</span>
                <el-switch
                  v-model="v.needShow"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="开"
                  inactive-text="关">
                </el-switch>
              </div>
            </el-col>
            <el-col style="margin-bottom:20px;" :span="6">
              <div class="bg-purple">
                <span class="label-switch">充值:</span>
                <el-switch
                  v-model="v.rechargeStatus"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="开"
                  inactive-text="关">
                </el-switch>
              </div>
            </el-col>
            <el-col style="margin-bottom:20px;" :span="6">
              <div class="bg-purple">
                <span class="label-switch">提现:</span>
                <el-switch
                  v-model="v.withdrawStatus"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="开"
                  inactive-text="关">
                </el-switch>
              </div>
            </el-col>
            <el-col style="margin-bottom:20px;" :span="6">
              <div class="bg-purple">
                <el-col :span="10" class="label-switch">最小提现金额:</el-col>
                <el-col :span="14">
                  <el-input v-model="v.min" placeholder="最小提现金额"></el-input>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="6">
              <div class="bg-purple">
                <el-col :span="10" class="label-switch">单日提币上限:</el-col>
                <el-col :span="14">
                  <el-input v-model="v.max" placeholder="单日提币上限"></el-input>
                </el-col>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bg-purple">
                <el-col :span="10" class="label-switch">手续费:</el-col>
                <el-col :span="14">
                  <el-input v-model="v.poundage" placeholder="手续费"></el-input>
                </el-col>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bg-purple">
                <el-col :span="10" class="label-switch">合约地址:</el-col>
                <el-col :span="14">
                  <el-input v-model="v.contractAddress" placeholder="合约地址"></el-input>
                </el-col>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bg-purple">
                <el-col :span="10" class="label-switch">位数:</el-col>
                <el-col :span="14">
                  <el-input v-model="v.decimals" placeholder="位数"></el-input>
                </el-col>
              </div>
            </el-col>
          </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'setting',
    data() {
      return {
        disabledFlag: ''
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
        this.$store.dispatch(!isNaN(this.tokenConfig[idx].id) ? 'modifyTokenConfigHandler' : 'addCoinHandler', this.tokenConfig[idx]).then(() => {
          this.$message.success('修改成功')
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      addPro() {
        const obj = {
          contractAddress: '',
          decimals: '',
          max: '',
          min: '',
          needShow: 0,
          rechargeStatus: 0,
          withdrawStatus: 0,
          poundage: '',
          tokenName: ''
        }
        this.tokenConfig.unshift(obj)
      },
      giveNum(k) {
        this.disabledFlag = k
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import './index';
</style>
