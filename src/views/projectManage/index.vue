<template>
  <div class="project-manage">
    <div class="project-manage-title">
      <router-link  :to="{path: 'addProject'}" class="router-btn">新建项目</router-link>
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
            <span>{{scope.row.startTime}}至{{scope.row.stopTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <router-link :to="{path: 'projectData', query: {id: scope.row.id}}" class="manage-btn">项目数据</router-link>
            <router-link :to="{path: 'projectEdit', query: {id: scope.row.id}}" class="manage-btn">项目编辑</router-link>
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
                <el-dropdown-item :disabled="scope.row.sendToken === 0">项目发币</el-dropdown-item>
                <el-dropdown-item :disabled="scope.row.retire === 0">项目清退</el-dropdown-item>
                <el-dropdown-item @click.native="deleteHandler(scope.row.id)">删除项目</el-dropdown-item>
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
        pageNum: 1
      }
    },
    mounted() {
      this.getProList('pageNum=1&pageSize=10&orderBy=created_at')
    },
    computed: {
      ...mapGetters({
        projectList: 'projectList'
      })
    },
    methods: {
      handleCurrentChange(v) {
        this.pageNum = v
        this.getProList(`pageNum=${v}&pageSize=10&orderBy=created_at`)
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
      deleteHandler(idx) {
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteProHandler', idx).then(() => {
            this.getProList('pageNum=1&pageSize=10&orderBy=created_at')
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
          this.getProList('pageNum=1&pageSize=10&orderBy=created_at')
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
