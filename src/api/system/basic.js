import request from '@/router/axios';

export const getList = (current, size, data) => {
  return request({
    url: '/basic/list',
    method: 'post',
    data: data
  })
}
export const remove = (ids) => {
  return request({
    url: '/basic/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/basic/add',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/basic/update',
    method: 'post',
    data: row
  })
}

export const getUser = (id) => {
  return request({
    url: '/basic/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/basic/info',
    method: 'get',
  })
}


