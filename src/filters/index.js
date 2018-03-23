export function rechargeFilter(v) {
  return v === 2 ? '成功' : '失败'
}

export function widthdrawFilter(v) {
  return v === 0 ? '待审核' : v === 1 ? '提现中' : v === 2 ? '成功' : '失败'
}
