<template>
  <div class="add-project">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="币种名称" prop="tokenName">
        <el-input v-model="ruleForm.tokenName"></el-input>
      </el-form-item>
      <el-form-item label="购买总数" prop="ethNumber">
        <el-input v-model="ruleForm.ethNumber"></el-input>
      </el-form-item>
      <el-form-item label="结算币种"  prop="coin">
        <el-input v-model="ruleForm.coin"></el-input>
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
        <pro-oss @set-img-url="getImg" :fileList="fileList" :payload="'pdf'" :limit="10" :type="'white'"></pro-oss>
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
        <pro-oss @set-img-url="getImg" :fileList="intList" :payload="'image/jpeg/image/png/image/jpg'" :limit="10" :type="'introduction'"></pro-oss>
      </el-form-item>
      <el-form-item label="项目封面" prop="projectCoverAddress">
        <pro-oss @set-img-url="getImg" :fileList="homeList" :payload="'image/jpeg/image/png/image/jpg'" :limit="1" :type="'cover'"></pro-oss>
      </el-form-item>
      <el-form-item label="创始人头像" prop="leaderImageAddress">
        <pro-oss @set-img-url="getImg" :fileList="avoList" :payload="'image/jpeg/image/png/image/jpg'" :limit="1" :type="'leader'"></pro-oss>
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
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import oss from '../../../components/ossload'
  export default {
    name: 'addProject',

    components: {
      'pro-oss': oss
    },
    data() {
      return {
        ruleForm: {
          description: '',
          ethNumber: '',
          coin: '',
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
          coin: [
            { required: true, message: '请输入结算货币', trigger: 'blur'}
          ],
          description: [
            { required: true, message: '请输入创始人介绍', trigger: 'blur' },
            { max: 500, message: '字数请少于500字', trigger: 'blur' }
          ],
          ethNumber: [
            { message: '请输入总数', trigger: 'blur' }
          ],
          leaderImageAddress: [
            { required: true, message: '请上传创始人头像' }
          ],
          leaderName: [
            { required: true, message: '请输入创始人名称', trigger: 'blur' }
          ],
          position: [
            { required: true, message: '请输入创始人职务', trigger: 'blur' }
          ],
          projectCoverAddress: [
            { required: true, message: '请上传项目封面图片' }
          ],
          projectImageAddress: [
            { required: true, message: '请上传项目介绍图片' }
          ],
          ratio: [
            { message: '请输入兑换比例', trigger: 'blur' }
          ],
          startTime: [
            { message: '请选择开放时间' }
          ],
          homepage: [
            { required: true, message: '请输入官网地址', trigger: 'blur' }
          ],
          stopTime: [
            { message: '请选择结束时间' }
          ],
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          tokenName: [
            { required: true, message: '请币种名称', trigger: 'blur' }
          ],
          whitePaperAddress: [
            { required: true, message: '请上传白皮书' }
          ]
        },
        fileList: [],
        intList: [],
        avoList: [],
        homeList: []
      }
    },
    mounted() {
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
            this[name].coin = this[name].coin.toUpperCase()
            this[name].stopTime = this[name].startTime ? Date.parse(this[name].startTime[1]) : ''
            this[name].startTime = this[name].startTime ? Date.parse(this[name].startTime[0]) : ''
            this.$store.dispatch('getAddProject', this[name]).then(() => {
              this.$router.back()
              this.$message.success('创建成功')
            }).catch((err) => {
              this.$message.error(err)
            })
          } else {
            this.$message.error('请完善表单')
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
