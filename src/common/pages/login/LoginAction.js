
export const LoginActionHead = "000";
//表格点击增加按钮动作

//初始化异步请求进行中
export const initActionLoading = {
    type:LoginActionHead + '001',
    remark:'异步请求进行中'
}

//初始化异步请求成功
export const initActionSuccess = {
    type:LoginActionHead + '002',
    remark:'异步请求成功'
}

//初始化异步请求失败
export const initActionFailure = {
    type:LoginActionHead + '003',
    remark:'异步请求失败'
}


//登陆异步请求进行中
export const loginActionLoading = {
    type:LoginActionHead + '004',
    remark:'登陆异步请求进行中'
}

//登陆异步请求成功
export const loginActionSuccess = {
    type:LoginActionHead + '005',
    remark:'登陆异步请求成功'
}

//登陆异步请求失败
export const loginActionFailure = {
    type:LoginActionHead + '006',
    remark:'登陆异步请求失败'
}