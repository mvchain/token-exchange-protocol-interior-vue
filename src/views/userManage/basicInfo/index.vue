<template>
  <div class="user-list">
    <el-table
      :data="userList.list"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="UID"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
      >
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="订单数"
      >
      </el-table-column>

      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="operaRequest(scope.row.id)">用户详情</el-dropdown-item>
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
        :total="userList.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'basicInfo',
    data() {
      return {
        pageNum: 1
      }
    },
    computed: {
      ...mapGetters({
        userList: 'userList'
      })
    },
    mounted() {
      this.getList('pageNum=1&pageSize=11&orderBy=created_at')
    },
    methods: {
      operaRequest(k) {
        this.$router.push({ path: 'userInfo', query: { id: k }})
      },
      handleCurrentChange(v) {
        this.pageNum = v
        this.getList(`pageNum=${v}&pageSize=10&orderBy=created_at`)
      },
      getList(str) {
        this.$store.dispatch('orderHandler', str).then(() => {
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
