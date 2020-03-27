import axios from 'axios';
import servicePath from '../../../config';

/**
 * 获取用户个人信息
 */
export const getUserInfo = () => axios({
  url: servicePath.getUserInfo,
  method: 'get',
  withCredentials: true
});

/**
 * 更新个人信息
 */
export const updateUserInfo = (data) => axios({
  url: servicePath.updateUserInfo,
  method: 'post',
  data,
  withCredentials: true
});