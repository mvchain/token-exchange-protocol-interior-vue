export function rechargeFilter(v) {
  return v === 2 ? '成功' : '失败'
}

export function widthdrawFilter(v) {
  return v === 0 ? '待审核' : v === 1 ? '提现中' : v === 2 ? '成功' : '失败'
}
export function statusFilter(v) {
  if (v.retire === 1) {
    return '清退'
  } else {
    if (v.orderStatus === 9) {
      return '已取消'
    } else if (v.sendToken === 1) {
      return '已发币'
    } else {
      return '未发币'
    }
  }
}
