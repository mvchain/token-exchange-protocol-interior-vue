<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from './store'

  export default {
    name: 'app',
    mounted() {
      window.setInterval(showMsgIcon, 1500000)
      function showMsgIcon() {
        const user = window.sessionStorage.getItem('user')
        if (user) {
          store.dispatch('getReferToken')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';
  // normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
