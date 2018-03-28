import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_production')
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },

  {
    path: '/projectManage',
    component: Layout,
    redirect: '/projectManage/projectIndex',
    name: 'projectManage',
    meta: { title: '项目管理', icon: 'example' },
    children: [
      {
        path: 'projectIndex',
        name: 'projectIndex',
        component: _import('projectManage/index'),
        meta: { title: '项目管理', icon: 'example' }
      },
      {
        path: 'projectData',
        name: 'projectData',
        hidden: true,
        component: _import('projectManage/projectData/index'),
        meta: { title: '项目数据', icon: 'example' }
      },
      {
        path: 'projectEdit',
        name: 'projectEdit',
        hidden: true,
        component: _import('projectManage/projectEdit/index'),
        meta: { title: '项目编辑', icon: 'example' }
      },
      {
        path: 'addProject',
        name: 'addProject',
        hidden: true,
        component: _import('projectManage/addProject/index'),
        meta: { title: '新建项目', icon: 'example' }
      }
    ]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/basicInfo',
    name: 'userManage',
    meta: { title: '用户管理', icon: 'table' },
    children: [
      {
        path: 'basicInfo',
        name: 'basicInfo',
        component: _import('userManage/basicInfo/index'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        hidden: true,
        component: _import('userManage/userInfo/index'),
        meta: { title: '用户详情', icon: 'table' }
      }
    ]
  },
  {
    path: '/rechargeWithdraw',
    component: Layout,
    redirect: '/rechargeWithdraw/rwManage',
    name: 'rechargeWithdraw',
    meta: { title: '充提管理', icon: 'teacher' },
    children: [
      {
        path: 'rwManage',
        name: 'rwManage',
        component: _import('rechargeWithdraw/index'),
        meta: { title: '充提', icon: 'teacher' }
      }
    ]
  },
  {
    path: '/backSetting',
    component: Layout,
    redirect: '/backSetting/addManage',
    name: 'backSetting',
    meta: { title: '设置', icon: 'teacher' },
    children: [
      {
        path: 'addManage',
        name: 'addManage',
        component: _import('backSetting/index'),
        meta: { title: '设置', icon: 'teacher' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

