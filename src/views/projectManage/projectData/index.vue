<template>
  <div class="project-data">
    <div class="project-data-title">
      <ul>
        <li>当前购买金额：{{salesList.soldEth}}/{{salesList.ethNumber}}ETH</li>
        <li>所需发放代币数量：{{salesList.tokenNumber}}</li>
        <li>购买人数：{{salesList.buyerNum}}</li>
      </ul>
    </div>
    <div>
      <el-input v-model="searchOrder" placeholder="请输入订单号" class="input-with-search">
        <el-button @click="searchHandler" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div>
      <el-table
        :data="orderList.list"
        border
        style="width: 100%">
        <el-table-column
          prop="orderId"
          label="订单号"
        >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="时间"
        >
        </el-table-column>
        <el-table-column
          prop="userId"
          label="UID"
        >
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
        >
        </el-table-column>
        <el-table-column
          prop="ethNumber"
          label="参与购买金额"
        >
        </el-table-column>
        <el-table-column
          prop="tokenNumber"
          label="应发代币数量"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="项目状态"
        >
          <template slot-scope="scope">
             <span>{{scope.row.status === 2 ? '成功' : scope.row.status === 1 ? '正在进行' : '失败'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row | statusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="cancelOrder(scope.row.id)">取消订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:30px; text-align: center;">
      <el-pagination
        @current-change="handleClick"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="orderList.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'projectData',
    data() {
      return {
        tableData: [
          {
            name: 'MVC',
            startTime: '2018/18/15',
            endTime: '2018/18/15'
          }
        ],
        pageNum: 1,
        searchOrder: ''
      }
    },
    mounted() {
      this.$store.dispatch('getSalesHandler', this.$route.query.id).then(() => {
      }).catch((err) => {
        this.$message.error(err)
      })
      this.getOrderList(`projectId=${this.$route.query.id}&orderBy=created_at`)
    },
    computed: {
      ...mapGetters({
        orderList: 'orderList',
        salesList: 'salesList'
      })
    },
    methods: {
      handleClick(v) {
        this.pageNum = v
        this.getOrderList(`pageNum=${v}&pageSize=10&orderBy=created_at&id=1&orderId=${this.searchOrder}&projectId=${this.$route.query.id}`)
      },
      searchHandler() {
        this.getOrderList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at&orderId=${this.searchOrder}&projectId=${this.$route.query.id}`)
      },
      getOrderList(str) {
        this.$store.dispatch('getOrderList', str).then(() => {
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      cancelOrder(idx) {
        this.$confirm('是否取消该订单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('cancelOrderHandler', idx).then(() => {
            this.$message.success('取消成功')
            this.getOrderList(`projectId=${this.$route.query.id}&orderBy=created_at`)
          }).catch((err) => {
            this.$message.error(err)
          })
        }).catch()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
