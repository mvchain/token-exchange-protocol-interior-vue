<template>
  <div class="user-list">
    <div>
      <el-upload
        style="margin-bottom:15px"
        :action="urlData + '/transaction/import/account'"
        :limit="1"
        :headers="token"
        :on-success="handleAvatarSuccess"
        list-type="picture">
        <el-button type="primary" >导入地址</el-button>
      </el-upload>
      <span >待分配地址剩余：{{addressCount}}</span>
    </div>
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
        prop="addressEth"
        label="地址"
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
  import { mapGetters } from 'vuex'
  import { getToken } from '@/utils/auth'
  export default {
    name: 'basicInfo',
    data() {
      return {
        pageNum: 1,
        urlData: window.urlData.url,
        token: {
          Authorization: getToken()
        }
      }
    },
    computed: {
      ...mapGetters({
        userList: 'userList',
        addressCount: 'addressCount'
      })
    },
    mounted() {
      this.getList('pageNum=1&pageSize=11&orderBy=created_at desc')
      this.$store.dispatch('getAddressCount')
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.$store.dispatch('getAddressCount')
        this.$message.success('导入成功')
      },
      operaRequest(k) {
        this.$router.push({ path: 'userInfo', query: { id: k }})
      },
      handleCurrentChange(v) {
        this.pageNum = v
        this.getList(`pageNum=${v}&pageSize=10&orderBy=created_at desc`)
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
