import { txListHandler, opera } from '@/api/recharge'

const rechargeWithdraw = {
  state: {
    txList: {}
  },
  mutations: {
    SET_TX_LIST: (state, txList) => {
      state.txList = txList
    }
  },
  actions: {
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
    }
  }
}

export default rechargeWithdraw
