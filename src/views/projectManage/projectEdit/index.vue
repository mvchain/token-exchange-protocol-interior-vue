<template>
  <div class="edit-project">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="币种名称" prop="tokenName">
        <el-input v-model="ruleForm.tokenName"></el-input>
      </el-form-item>
      <el-form-item label="ETH购买总数" prop="ethNumber">
        <el-input v-model="ruleForm.ethNumber"></el-input>
      </el-form-item>
      <el-form-item label="兑换比例" prop="ratio">
        <el-input v-model="ruleForm.ratio"></el-input>
      </el-form-item>
      <el-form-item label="开放购买时间">
        <el-date-picker
          v-model="ruleForm.startTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="白皮书" prop="whitePaperAddress">
        <pro-oss @set-img-url="getImg"  :payload="'pdf'" :limit="10" :type="'white'"></pro-oss>
      </el-form-item>
      <el-form-item label="白皮书链接">
        <el-input v-model="ruleForm.whitePaperAddress"></el-input>
      </el-form-item>
      <el-form-item label="白皮书名称">
        <el-input v-model="ruleForm.whitePaperName"></el-input>
      </el-form-item>
      <el-form-item label="官网" prop="homepage">
        <el-input v-model="ruleForm.homepage"></el-input>
      </el-form-item>
      <el-form-item label="项目介绍" prop="projectImageAddress">
        <pro-oss @set-img-url="getImg"  :payload="'image/jpeg/image/png/image/jpg'" :limit="10"
                 :type="'introduction'"></pro-oss>
      </el-form-item>
      <el-form-item label="项目封面" prop="projectCoverAddress">
        <pro-oss @set-img-url="getImg"  :payload="'image/jpeg/image/png/image/jpg'" :limit="1"
                 :type="'cover'"></pro-oss>
      </el-form-item>
      <el-form-item label="创始人头像" prop="leaderImageAddress">
        <pro-oss @set-img-url="getImg"  :payload="'image/jpeg/image/png/image/jpg'" :limit="1"
                 :type="'leader'"></pro-oss>
      </el-form-item>
      <el-form-item label="创始人名字" prop="leaderName">
        <el-input v-model="ruleForm.leaderName"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="ruleForm.position"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改项目</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import oss from '../../../components/ossload'
  import {mapGetters} from 'vuex'

  export default {
    name: 'projectEdit',

    components: {
      'pro-oss': oss
    },
    computed: {
      ...mapGetters({
        projectInfo: 'projectInfo'
      })
    },
    data() {
      return {
        ruleForm: {
          description: '',
          ethNumber: '',
          leaderImageAddress: '',
          leaderImageName: '',
          leaderName: '',
          position: '',
          projectCoverAddress: '',
          projectCoverName: '',
          projectImageAddress: '',
          projectImageName: '',
          ratio: '',
          startTime: '',
          homepage: '',
          stopTime: '',
          title: '',
          tokenName: '',
          whitePaperAddress: '',
          whitePaperName: ''
        },
        rules: {
          description: [
            {required: true, message: '请输入创始人介绍', trigger: 'blur'},
            {max: 500, message: '字数请少于500字', trigger: 'blur'}
          ],
          ethNumber: [
            {required: true, message: '请输入ETH总数', trigger: 'blur'}
          ],
          leaderImageAddress: [
            {required: true, message: '请上传创始人头像'}
          ],
          leaderName: [
            {required: true, message: '请输入创始人名称', trigger: 'blur'}
          ],
          position: [
            {required: true, message: '请输入创始人职务', trigger: 'blur'}
          ],
          projectCoverAddress: [
            {required: true, message: '请上传项目封面图片'}
          ],
          projectImageAddress: [
            {required: true, message: '请上传项目介绍图片'}
          ],
          ratio: [
            {required: true, message: '请输入兑换比例', trigger: 'blur'}
          ],
          startTime: [
            {required: true, message: '请选择开放时间'}
          ],
          homepage: [
            {required: true, message: '请输入官网地址', trigger: 'blur'}
          ],
          stopTime: [
            {required: true, message: '请选择结束时间'}
          ],
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          tokenName: [
            {required: true, message: '请币种名称', trigger: 'blur'}
          ],
          whitePaperAddress: [
            {required: true, message: '请上传白皮书'}
          ]
        }
      }
    },
    created() {
      this.getInfo(this.$route.query.id)
    },
    methods: {
      getImg(v) {
        if (v.type === 'introduction') {
          this.ruleForm.projectImageName = v.name
          this.ruleForm.projectImageAddress = v.url
        } else if (v.type === 'white') {
          this.ruleForm.whitePaperAddress = v.url
          this.ruleForm.whitePaperName = v.name
        } else if (v.type === 'leader') {
          this.ruleForm.leaderImageAddress = v.url
          this.ruleForm.leaderImageName = v.name
        } else if (v.type === 'cover') {
          this.ruleForm.projectCoverAddress = v.url
          this.ruleForm.projectCoverName = v.name
        }
      },
      submitForm(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this[name].stopTime = Date.parse(this[name].startTime[1])
            this[name].startTime = Date.parse(this[name].startTime[0])
            this.$store.dispatch('putProject', this[name]).then(() => {
              this.$router.back()
              this.$message.success('修改成功')
              window.sessionStorage.removeItem('fileList')
            }).catch((err) => {
              this.$message.error(err)
            })
          } else {
            this.$message.error('请完善表单')
            return false
          }
        })
      },
      getInfo(id) {
        this.$store.dispatch('getProjectInfo', id).then(() => {
          const str = JSON.stringify(this.projectInfo)
          const st = new Date(this.projectInfo.startTime)
          const ot = new Date(this.projectInfo.stopTime)

          this.ruleForm = JSON.parse(str)
          this.ruleForm.ethNumber = String(this.ruleForm.ethNumber)
          this.ruleForm.ratio = String(this.ruleForm.ratio)
          this.ruleForm.startTime = [
            st, ot
          ]
          this.fileList['white'] = {
            name: this.ruleForm.whitePaperName,
            url: this.ruleForm.whitePaperAddress
          }
          this.fileList['introduction'] = {
            name: this.ruleForm.projectImageName,
            url: this.ruleForm.projectImageAddress
          }
          this.fileList['leader'] = {
            name: this.ruleForm.leaderImageName,
            url: this.ruleForm.leaderImageAddress
          }
          this.fileList['cover'] = {
            name: this.ruleForm.projectCoverName,
            url: this.ruleForm.projectCoverAddress
          }
          window.sessionStorage.setItem('fileList', JSON.stringify(this.fileList))
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
