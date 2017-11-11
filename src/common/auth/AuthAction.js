
export const AuthActionHead = "001";


//权限检查异步请求进行中
export const AuthActionLoading = {
    type:AuthActionHead + '004',
    remark:'权限检查异步请求进行中'
}

//权限检查异步请求成功
export const AuthActionSuccess = {
    type:AuthActionHead + '005',
    remark:'权限检查异步请求成功'
}

//权限检查异步请求失败
export const AuthActionFailure = {
    type:AuthActionHead + '006',
    remark:'权限检查异步请求失败'
}