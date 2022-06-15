import { emailCode, emailLogin, passwordLogin } from './login'
import { tokenToUserInfo } from './tokenToUserInfo'
import { getUserPlace, getUserPlaceWeather } from './getUserPlace'
import { getBlog, getPoetry, sendFootprint, getCommentPageNumberMax, getComments } from './center'

// 主页数据相关接口
export const getBlogAPI = getBlog
export const getPoetryAPI = getPoetry
export const sendFootprintAPI = sendFootprint
export const getCommentsAPI = getComments
export const getCommentPageNumberMaxAPI = getCommentPageNumberMax

// 登录相关接口
export const emailCodeAPI = emailCode
export const emailLoginAPI = emailLogin
export const passwordLoginAPI = passwordLogin

// token验证取用户数据
export const tokenToUserInfoAPI = tokenToUserInfo

// 百度地图定位API
export const getUserPlaceAPI = getUserPlace
export const getUserPlaceWeatherAPI = getUserPlaceWeather
