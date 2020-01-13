import request from '@/router/axios';

export const getList = (current, size, data) => {
  return request({
    url: '/menu/list',
    method: 'post',
    data:data
  })
}
export const remove = (ids) => {
  return request({
    url: '/menu/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/menu/add',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/menu/update',
    method: 'post',
    data: row
  })
}

export const getMenu = (id) => {
  return request({
    url: '/menu/detail/'+id,
    method: 'get',
    params: {

    }
  })
}
