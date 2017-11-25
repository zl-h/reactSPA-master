import {combineReducers} from "redux";
import {LanguageReducer} from "../index/language/LanguageRedux";
import {GroupReducer} from "../index/Group/LanguageRedux";
import {UserReducer} from "../index/User/UserRedux";
import {MenuReducer} from "../index/Menu/MenuRedux";
import {ChangePasswordReducer} from "../index/ChangePassword/ChangePasswordRedux";

export const CommonReduce = combineReducers({
    LanguageReducer,GroupReducer,UserReducer,MenuReducer,ChangePasswordReducer
});