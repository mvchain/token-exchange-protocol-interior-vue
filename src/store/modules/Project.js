import { cancelOrder, projectList, ossObjHandler, addProject, proInfo, orderHandler, salesHandler, deletePro, putShow, putProject, sendToken, retireToken } from '@/api/Home'

const Project = {
  state: {
    projectList: {},
    ossObj: {},
    projectInfo: {},
    orderList: {},
    salesList: {}
  },
  mutations: {
    SET_PROJECT_LIST: (state, projectList) => {
      state.projectList = projectList
    },
    SET_OSSOBJ: (state, ossObj) => {
      state.ossObj = ossObj
    },
    SET_PROJECT_INFO: (state, projectInfo) => {
      state.projectInfo = projectInfo
    },
    SET_ORDER_LIST: (state, orderList) => {
      state.orderList = orderList
    },
    SET_SALES_LIST: (state, salesList) => {
      state.salesList = salesList
    }
  },
  actions: {
    getProjectList: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        projectList(payload).then(res => {
          commit('SET_PROJECT_LIST', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getOssObj: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        ossObjHandler().then(res => {
          commit('SET_OSSOBJ', res.data)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAddProject: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        addProject(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getProjectInfo: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        proInfo(payload).then(res => {
          commit('SET_PROJECT_INFO', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getOrderList: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        orderHandler(payload).then(res => {
          commit('SET_ORDER_LIST', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getSalesHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        salesHandler(payload).then(res => {
          commit('SET_SALES_LIST', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteProHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        deletePro(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    putProHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        putShow(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    putProject: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        putProject(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    sendTokenHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        sendToken(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    retireHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        retireToken(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    cancelOrderHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        cancelOrder(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default Project
