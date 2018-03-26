const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  projectList: state => state.project.projectList,
  ossObj: state => state.project.ossObj,
  projectInfo: state => state.project.projectInfo,
  orderList: state => state.project.orderList,
  salesList: state => state.project.salesList,
  txList: state => state.rechargeWithdraw.txList,
  userList: state => state.rechargeWithdraw.userList,
  userInfo: state => state.rechargeWithdraw.userInfo,
  tokenConfig: state => state.rechargeWithdraw.tokenConfig
}
export default getters
