<template>
  <div class="project-manage">
    <div class="project-manage-title">
      <router-link  :to="{path: 'addProject'}" class="router-btn">新建项目</router-link>
      <el-input placeholder="查询余额" v-model="searchBalance" style="margin-top:30px;">
        <el-button slot="append" icon="el-icon-search" @click="searchBalanceHandler"></el-button>
      </el-input>
    </div>
    <div>
      <el-table
        :data="projectList.list"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="项目名"
          width="150">
        </el-table-column>
        <el-table-column
          label="时间段"
        >
          <template slot-scope="scope">
            <span>{{scope.row.startTime||'待定'}}至{{scope.row.stopTime||'待定'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <router-link :to="{path: 'projectData', query: {id: scope.row.id}}" class="manage-btn">项目数据</router-link>
            <el-button v-loading="toFlag && toId === scope.row.id"  element-loading-text="正在跳转" type="text" @click="toEdit(scope.row.id)" class="manage-btn">项目编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-show="scope.row.needShow === 0" @click.native="showHandler({id: scope.row.id, show: 1})">展示开启</el-dropdown-item>
                <el-dropdown-item v-show="scope.row.needShow !== 0" @click.native="showHandler({id: scope.row.id, show: 0})">展示关闭</el-dropdown-item>
                <el-dropdown-item @click.native="sendTokenFun({id: scope.row.id, send: 1})" :disabled="!(scope.row.status === 2 && scope.row.sendToken === 0)">项目发币</el-dropdown-item>
                <el-dropdown-item @click.native="retireFun({id: scope.row.id, retire: 1})" :disabled="!(scope.row.status === 2 && scope.row.retire === 0 && scope.row.tokenWithdrawStatus === 0)">项目清退</el-dropdown-item>
                <el-dropdown-item :disabled="!(scope.row.status === 0 || scope.row.sendToken === 1)" @click.native="deleteHandler(scope.row.id)">删除项目</el-dropdown-item>
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
          :total="projectList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'projectIndex',
    data() {
      return {
        listLoading: false,
        pageNum: 1,
        toFlag: false,
        toId: '',
        searchBalance: ''
      }
    },
    mounted() {
      this.getProList('pageNum=1&pageSize=10&orderBy=created_at desc')
    },
    computed: {
      ...mapGetters({
        projectList: 'projectList',
        projectInfo: 'projectInfo'
      })
    },
    methods: {
      searchBalanceHandler() {
        this.$store.dispatch('getBalance', this.searchBalance).then((res) => {
          this.$message.success(String(res) + ' ' + this.searchBalance)
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      handleCurrentChange(v) {
        this.pageNum = v
        this.getProList(`pageNum=${v}&pageSize=10&orderBy=created_at desc`)
      },
      getProList(str) {
        this.listLoading = true
        this.$store.dispatch('getProjectList', str).then(() => {
          this.listLoading = false
        }).catch((err) => {
          this.listLoading = false
          this.$message.error(err)
        })
      },
      toEdit(id) {
        this.toFlag = true
        this.toId = id
        this.$store.dispatch('getProjectInfo', id).then(() => {
          const str = JSON.stringify(this.projectInfo)
          const from1 = JSON.parse(str)
          const fileList = {}
          fileList['white'] = {
            name: from1.whitePaperName,
            url: from1.whitePaperAddress
          }
          fileList['introduction'] = {
            name: from1.projectImageName,
            url: from1.projectImageAddress
          }
          fileList['leader'] = {
            name: from1.leaderImageName,
            url: from1.leaderImageAddress
          }
          fileList['cover'] = {
            name: from1.projectCoverName,
            url: from1.projectCoverAddress
          }
          this.toFlag = false
          window.sessionStorage.setItem('fileList', JSON.stringify(fileList))
          this.$router.push({path: 'projectEdit', query: { id: id }})
        }).catch((err) => {
          this.toFlag = false
          this.$message.error(err)
        })
      },
      deleteHandler(idx) {
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteProHandler', idx).then(() => {
            this.getProList('pageNum=1&pageSize=10&orderBy=created_at desc')
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch((err) => {
            this.$message.error(err)
          })
        }).catch(() => {
        })
      },
      showHandler(opt) {
        this.$store.dispatch('putProHandler', opt).then(() => {
          this.getProList('pageNum=1&pageSize=10&orderBy=created_at desc')
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      sendTokenFun(opt) {
        this.$confirm('是否确认发币', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('sendTokenHandler', opt).then(() => {
            this.$message.success('发币成功')
            this.getProList('pageNum=1&pageSize=10&orderBy=created_at desc')
          }).catch((err) => {
            this.$message.error(err)
          })
        }).catch(() => {})
      },
      retireFun(opt) {
        this.$confirm('是否确认清退', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('retireHandler', opt).then(() => {
            this.$message.success('清退成功')
            this.getProList('pageNum=1&pageSize=10&orderBy=created_at desc')
          }).catch((err) => {
            this.$message.error(err)
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
