/**
 * 配置url
 * @type {string}
 */
//;//spring cloud zuul网关地址
// var zuul_url = "http://127.0.0.1:8765";

var zuul_url = "http://39.106.34.93:8765";

//zuul里面配置的模块对应的路径
var index_single_server = "/login";
//zuul配置映射具体模块的地址
var index_middleware = "/index";
//具体的url

export const  index_menu_url = zuul_url + index_middleware + "/menu/getIndexMenu";
//登录
export const login_url = zuul_url + index_single_server +"/log/login";
//校验token
export const check_token_url = zuul_url + index_single_server + "/log/checkToken";

var index_language_getTableData_url = zuul_url + index_middleware + "/language/getTableData";

var index_language_editData_url = zuul_url + index_middleware + "/language/setData";

var index_language_getData_url = zuul_url + index_middleware + "/language/getData";

var index_language_addData_url = zuul_url + index_middleware + "/language/addData";

var index_language_removeData_url = zuul_url + index_middleware + "/language/removeData";

var login_init = zuul_url + index_middleware + "/login/init";



export const url = {
    login_url:login_url,
    check_token_url:check_token_url,
    index_menu_url:index_menu_url,
    index_language_getTableData_url:index_language_getTableData_url,
    index_language_editData_url:index_language_editData_url,
    index_language_addData_url:index_language_addData_url,
    index_language_removeData_url:index_language_removeData_url,
    index_language_getData_url:index_language_getData_url,
    login_init:login_init
};