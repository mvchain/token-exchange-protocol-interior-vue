<template>
  <div class="rwCon">
    <el-row style="margin:0 0 20px 0;">
      <el-col :span="12">
        <el-button @click="switchHandler(0)" :type="coinType === 0 ? 'primary' : ''">充值记录</el-button>
        <el-button @click="switchHandler(1)" :type="coinType === 1 ? 'primary' : ''">提币记录</el-button>
      </el-col>
      <el-col :span="6">
        <el-select v-model="orderStatus"  @change="changeStatus" placeholder="请选择">
          <el-option
            v-for="item in (coinType === 0 ? options2 : options)"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input v-model="orderId">
          <el-button @click="searchHandler" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-table
      :data="txList.list"
      style="width: 100%">
      <el-table-column
        prop="orderId"
        label="单号"
        >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="时间"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="userId"
        label="UID"
      >
      </el-table-column>
      <el-table-column
        prop="number"
        label="金额"
      >
      </el-table-column>
      <el-table-column
        prop="toAddress"
        label="地址"
        width="400"
      >
      </el-table-column>
      <el-table-column
        label="交易哈希"
      >
        <template slot-scope="scope">
          <span class="to-etherscan" @click="toEtherscan(scope.row.hash)">{{scope.row.hash}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <span v-show="coinType === 0">{{ scope.row.status | rechargeFilter}}</span>
          <span v-show="coinType === 1">{{ scope.row.status | widthdrawFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-dropdown v-show="scope.row.type == 1 && scope.row.status == 0">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item  @click.native="operaRequest({id: scope.row.id, status: 1})">同意</el-dropdown-item>
              <el-dropdown-item  @click.native="operaRequest({id: scope.row.id, status: 9})">拒绝</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:30px;text-align: center;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="txList.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'rechargeWithdraw',
    data() {
      return {
        pageNum: 1,
        coinType: 0,
        orderId: '',
        orderStatus: '',
        options: [
          {
            label: '所有订单',
            value: ''
          },
          {
            label: '待审核',
            value: '0'
          },
          {
            label: '等待提币',
            value: '1'
          },
          {
            label: '提币成功',
            value: '2'
          }
        ],
        options2: [
          {
            label: '所有订单',
            value: ''
          },
          {
            label: '成功',
            value: '2'
          },
          {
            label: '失败',
            value: '9'
          }
        ]
      }
    },
    mounted() {
      this.getTXList('pageNum=1&pageSize=10&orderBy=created_at&type=0')
    },
    computed: {
      ...mapGetters({
        txList: 'txList'
      })
    },
    methods: {
      toEtherscan(v) {
        window.location.href = `https://etherscan.io/search?q=${v}`
      },
      handleCurrentChange(v) {
        this.pageNum = v
        this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
      },
      getTXList(str) {
        this.$store.dispatch('getTXList', str).then(() => {
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      switchHandler(v) {
        this.coinType = v
        this.orderStatus = ''
        this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
      },
      changeStatus(v) {
        this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
      },
      searchHandler() {
        this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
      },
      operaRequest(opt) {
        this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('operaHandler', opt).then(() => {
            this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
          }).catch((err) => {
            this.$message.error(err)
          })
        }).catch(() => {
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import './index';
</style>
