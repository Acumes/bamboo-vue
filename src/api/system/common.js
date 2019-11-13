import request from '@/router/axios';

export const getCaptchaImage = () => {
  return request({
    url: '/base64Captcha',
    method: 'get'
  })
}
