import { putProject } from '@/api/Home'

const Info = {
  state: {
    projectList: {}
  },
  mutations: {
    SET_PROJECT_LIST: (state, projectList) => {
      state.projectList = projectList
    }
  },
  actions: {
    putProject: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        putProject(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default Info
