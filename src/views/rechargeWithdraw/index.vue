<template>
  <div class="rwCon">
    <el-row style="margin:0 0 20px 0;">
      <el-col :span="12">
        <el-button @click="switchHandler(0)" :type="coinType === 0 ? 'primary' : ''">充值记录</el-button>
        <el-button @click="switchHandler(1)" :type="coinType === 1 ? 'primary' : ''">提币记录</el-button>
        <el-button @click="downData(1)">充值导出</el-button>
        <el-button @click="downData(2)">提币导出</el-button>
        <el-button @click="downData(3)">全部导出</el-button>
        <el-upload
          style="margin-top:15px"
          :action="urlData + '/transaction/import/transaction'"
          :limit="1"
          :headers="token"
          :on-success="handleAvatarSuccess"
          list-type="picture">
          <el-button type="primary">导入签名</el-button>
        </el-upload>
      </el-col>
      <el-col :span="6">
        <el-select v-model="orderStatus" @change="changeStatus" placeholder="请选择">
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
        label="金额"
      >
        <template slot-scope="scope">
          {{scope.row.number}}{{scope.row.tokenName}}
        </template>
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
          <span class="to-etherscan"
                @click="toEtherscan(scope.row.hash, scope.row.toAddress.length)">{{scope.row.hash}}</span>

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
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="operaRequest({id: scope.row.id, status: 1})">同意</el-dropdown-item>
              <el-dropdown-item @click.native="operaRequest({id: scope.row.id, status: 4})">拒绝</el-dropdown-item>
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
  import {mapGetters} from 'vuex'
  import {getToken} from '@/utils/auth'

  export default {
    name: 'rechargeWithdraw',
    data() {
      return {
        pageNum: 1,
        coinType: 0,
        urlData: window.urlData.url,
        token: {
          Authorization: getToken()
        },
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
      this.getTXList('pageNum=1&pageSize=10&orderBy=created_at desc&type=0')
    },
    computed: {
      ...mapGetters({
        txList: 'txList'
      })
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.$message.success('导入成功')
      },
      funDownload(content, filename) {
        const eleLink = document.createElement('a')
        eleLink.download = filename
        eleLink.style.display = 'none'
        const blob = new Blob([content])
        eleLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
      },
      downData(k) {
        const txt = k === 1 ? 'collect_' : k === 2 ? 'transaction_' : 'all_'
        this.$store.dispatch('down' + k + 'Handler').then((res) => {
          this.funDownload(JSON.stringify(res.data), txt + Date.parse(new Date()) + '.json')
        }).catch(() => {
        })
      },
      toEtherscan(v, n) {
        switch (n) {
          case 56:
            window.open(`https://stellarchain.io/tx/${v}`)
            break
          case 34:
            window.open(`http://explorer.bitcoingod.org/#/txts/${v}`)
            break
          case 42:
            window.open(`https://etherscan.io/search?q=${v}`)
            break
        }
      },
      handleCurrentChange(v) {
        this.pageNum = v
        this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at desc&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
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
        this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at desc&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
      },
      changeStatus(v) {
        this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at desc&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
      },
      searchHandler() {
        this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at desc&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
      },
      operaRequest(opt) {
        this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('operaHandler', opt).then(() => {
            this.getTXList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at desc&type=${this.coinType}&status=${this.orderStatus}&orderId=${this.orderId}`)
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
