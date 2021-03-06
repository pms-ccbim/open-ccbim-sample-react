import { extend, ResponseError } from 'umi-request';
import { message } from 'antd';
import { isString } from 'lodash';

interface ICodeMessage {
  [key: number]: string;
}

const codeMessage: ICodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  205: '请求参数类型错误/缺少必要参数。',
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

// 400 500 错误处理程序
// 400 500 错误处理程序
export const errorHandler = (error: ResponseError & any) => {
  const { errorCode, errorMsg, closeThrowErr } = error;
  if (!errorCode) {
    console.error(`${codeMessage[404]}`);
  } else {
    const errorText = errorMsg || codeMessage[errorCode] || '未知错误';
    if (!closeThrowErr) {
      message.error(errorText);
    }
    throw { errorCode: errorCode, errorMessage: errorText };
  }
};

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include',
});

request.interceptors.response.use(async (response, options) => {
  //新增非json类型reponse判断
  if (response.status !== 200) {
    throw { errorCode: response.status, closeThrowErr: options.closeThrowErr };
  }
  try {
    await response.clone().json();
  } catch {
    return response;
  }
  const res = await response.clone().json();
  if (isString(res) && res.includes('哎呦，出错了！！！')) {
    throw { errorCode: 205, closeThrowErr: options.closeThrowErr };
  }
  if (res.errorMsg) {
    throw { ...res, closeThrowErr: options.closeThrowErr };
  }
  return res;
});

export default request;
