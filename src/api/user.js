import request from '@/router/axios';
// import {baseUrl} from '@/config/env';

export const loginByUsername = (account, password, verificationCode) => request({
  url: '/login',
  method: 'post',
  data: {
    account,
    password,
    verificationCode,
  }
})

export const getButtons = () => request({
  url: '/api/blade-system/menu/buttons',
  method: 'get'
});

export const getUserInfo = () => request({
  url: '/user/getUserInfo',
  method: 'get'
});

export const refeshToken = () => request({
  url:  '/user/refesh',
  method: 'post'
})

export const getMenu = () => request({
  url: '/api/blade-system/menu/routes',
  method: 'get'
});

export const getTopMenu = () => request({
  url: '/user/getTopMenu',
  method: 'get'
});

export const sendLogs = (list) => request({
  url: '/user/logout',
  method: 'post',
  data: list
})

export const logout = () => request({
  url:  '/user/logout',
  method: 'get'
})
