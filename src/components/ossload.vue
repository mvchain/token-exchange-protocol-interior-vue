<template>

  <el-upload
    :action="imgBase"
    :data="imgObj"
    :limit="limit"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeAvatarUpload"
    :file-list="fileList"
    list-type="picture">
    <span>{{fileList[0]}}</span>
    <el-button size="small" type="primary" @click.native="updateImg">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传{{payload}}文件，且不超过{{limit}}M</div>
  </el-upload>
</template>
<script type='text/ecmascript-6'>
  import { mapGetters } from 'vuex'
  export default {
    name: 'ossload',
    props: {
      limit: Number,
      fileList: Array,
      type: String,
      payload: String
    },
    data() {
      return {
        imgName: '',
        imgBase: '',
        imgObj: {
          name: '',
          key: '',
          policy: '',
          OSSAccessKeyId: '',
          success_action_status: '200',
          signature: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        ossObj: 'ossObj'
      })
    },

    methods: {
      updateImg() {
        this.$store.dispatch('getOssObj').then((res) => {
          this.imgObj.OSSAccessKeyId = this.ossObj.accessid
          this.imgObj.policy = this.ossObj.policy
          this.imgObj.signature = this.ossObj.signature
          this.imgBase = this.ossObj.host
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      random_string(len) {
        len = len || 32
        const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        const maxPos = chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      },
      dateFormat(date, format) {
        const o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        }

        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (const k in o) {
          if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
          }
        }
        return format
      },
      get_suffix(filename) {
        const pos = filename.lastIndexOf('.')
        let suffix = ''
        if (pos !== -1) {
          suffix = filename.substring(pos)
        }
        return suffix
      },
      calculate_object_name(filename) {
        const now = new Date()
        const nowStr = this.dateFormat(now, 'yyyyMMddhhmmss')
        const suffix = this.get_suffix(filename)
        return this.ossObj.dir + nowStr + this.random_string(10) + suffix
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = this.imgBase + '/' + this.imgObj.key
        this.$emit('set-img-url', { name: file.name, url: this.imageUrl, type: this.type })
      },
      beforeAvatarUpload(file) {
        let isJPG = false
        if (this.type === 'introduction' || this.type === 'leader' || this.type === 'cover') {
          isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        } else if (this.type === 'white') {
          isJPG = file.name.includes('pdf')
        }
        const isLt2M = file.size / 1024 / 1024 < this.limit
        this.imgObj.key = this.calculate_object_name(file.name)
        if (!isJPG) {
          this.$message.error(`上传头像图片只支持${this.payload}格式图片!`)
        }
        if (!isLt2M) {
          this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
        }
        if (this.imgName === file.name) {
          this.$message.error('请勿重复上传')
          return false
        } else {
          this.imgName = file.name
        }
        return isJPG && isLt2M
      },
      handleAvatarError(err) {
        this.$message.error(err)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
