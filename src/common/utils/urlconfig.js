/**
 * 配置url
 * @type {string}
 */
// var zuul_url = "http://127.0.0.1:8765";
// localStorage.zuul_url="http://39.106.34.93:8765";
// localStorage.zuul_url="http://127.0.0.1:8765";

export const zuul_url = document.getElementById("zuulHost").value;

//zuul里面配置的模块对应的路径
const index_single_server = "/login";
//zuul配置映射具体模块的地址
const index_middleware = "/index";
//具体的url

const index_menu_url = zuul_url + index_middleware + "/menu/getIndexMenu";
//登录
const login_url = zuul_url + index_single_server +"/log/login";
//校验token
const check_token_url = zuul_url + index_single_server + "/log/checkToken";

const login_init = zuul_url + index_middleware + "/login/init";

const index_language_getTableData_url = zuul_url + index_middleware + "/language/getTableData";

const index_language_editData_url = zuul_url + index_middleware + "/language/setData";

const index_language_getData_url = zuul_url + index_middleware + "/language/getData";

const index_language_addData_url = zuul_url + index_middleware + "/language/addData";

const index_language_removeData_url = zuul_url + index_middleware + "/language/removeData";


const index_group_getTableData_url = zuul_url + index_middleware + "/group/getTableData";

const index_group_editData_url = zuul_url + index_middleware + "/group/setData";

const index_group_getData_url = zuul_url + index_middleware + "/group/getData";

const index_group_addData_url = zuul_url + index_middleware + "/group/addData";

const index_group_removeData_url = zuul_url + index_middleware + "/group/removeData";


const index_user_getTableData_url = zuul_url + index_middleware + "/user/getTableData";

const index_user_editData_url = zuul_url + index_middleware + "/user/setData";

const index_user_getData_url = zuul_url + index_middleware + "/user/getData";

const index_user_addData_url = zuul_url + index_middleware + "/user/addData";

const index_user_removeData_url = zuul_url + index_middleware + "/user/removeData";


const index_menu_getTableData_url = zuul_url + index_middleware + "/menu/getTableData";

const index_menu_editData_url = zuul_url + index_middleware + "/menu/setData";

const index_menu_getData_url = zuul_url + index_middleware + "/menu/getData";

const index_menu_addData_url = zuul_url + index_middleware + "/menu/addData";

const index_menu_removeData_url = zuul_url + index_middleware + "/menu/removeData";

const index_change_password_url = zuul_url + index_middleware + "/change_password";

export const url = {

    login_url:login_url,
    check_token_url:check_token_url,
    index_menu_url:index_menu_url,
    login_init:login_init,

    index_language_getTableData_url:index_language_getTableData_url,
    index_language_editData_url:index_language_editData_url,
    index_language_addData_url:index_language_addData_url,
    index_language_removeData_url:index_language_removeData_url,
    index_language_getData_url:index_language_getData_url,

    index_group_getTableData_url:index_group_getTableData_url,
    index_group_editData_url:index_group_editData_url,
    index_group_addData_url:index_group_addData_url,
    index_group_removeData_url:index_group_removeData_url,
    index_group_getData_url:index_group_getData_url,


    index_user_getTableData_url:index_user_getTableData_url,
    index_user_editData_url:index_user_editData_url,
    index_user_addData_url:index_user_addData_url,
    index_user_removeData_url:index_user_removeData_url,
    index_user_getData_url:index_user_getData_url,


    index_menu_getTableData_url:index_menu_getTableData_url,
    index_menu_editData_url:index_menu_editData_url,
    index_menu_addData_url:index_menu_addData_url,
    index_menu_removeData_url:index_menu_removeData_url,
    index_menu_getData_url:index_menu_getData_url,


    index_change_password_url:index_change_password_url
};