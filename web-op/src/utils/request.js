/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import React from 'react'
import { notification } from 'antd';
import fetch from 'dva/fetch';
import router from 'umi/router';


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status == '401') {
      // 清空缓存，跳转登录
      localStorage.clear();
      router.push({
      pathname: '/user/login',
      });
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(errortext);
  error.status = response.status;
  error.response = response;
  throw error;
}

const request = (url, data) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...data,
  };
  const token = localStorage.getItem('token');
  if (defaultOptions.body) {
    defaultOptions.body = JSON.stringify(defaultOptions.body)
  }
  if (token) {
    defaultOptions.headers = {
      Authorization: `Basic ${token}`,
      ...defaultOptions.headers,
    };
  }
  return fetch(url, defaultOptions).then(checkStatus).then(response => response.json()).catch(e => {
    notification.error({
      message: `请求错误 ${e.status}: ${e.response.url}`,
      description: e.message,
    });
  })
};

export default request;
