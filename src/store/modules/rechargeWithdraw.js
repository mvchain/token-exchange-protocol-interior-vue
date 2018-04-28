import { txListHandler, opera, userList, userInfoS, tokenConfig, modifyTokey, addCoin, getAddress, down1, down2, down3 } from '@/api/recharge'

const rechargeWithdraw = {
  state: {
    txList: {},
    userList: {},
    userInfo: [],
    tokenConfig: [],
    addressCount: ''
  },
  mutations: {
    SET_TX_LIST: (state, txList) => {
      state.txList = txList
    },
    SET_USER_LIST: (state, userList) => {
      state.userList = userList
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN_CONFIG: (state, tokenConfig) => {
      state.tokenConfig = tokenConfig
    },
    SET_ADDRESS_COUNT: (state, addressCount) => {
      state.addressCount = addressCount
    }
  },
  actions: {
    down1Handler: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        down1().then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    down2Handler: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        down2().then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    down3Handler: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        down3().then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAddressCount: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        getAddress(payload).then(res => {
          commit('SET_ADDRESS_COUNT', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTXList: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        txListHandler(payload).then(res => {
          commit('SET_TX_LIST', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    operaHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        opera(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    orderHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        userList(payload).then(res => {
          commit('SET_USER_LIST', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    infoHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        userInfoS(payload).then(res => {
          commit('SET_USER_INFO', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    tokenConfigHandler: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        tokenConfig().then(res => {
          commit('SET_TOKEN_CONFIG', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    modifyTokenConfigHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        modifyTokey(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addCoinHandler: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        addCoin(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default rechargeWithdraw
