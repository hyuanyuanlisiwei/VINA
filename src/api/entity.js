/**
 * Created by hyylsw on 2017/6/28.
 */
// import EntityMock from '@/mock/entity'
import service from './service'

export function getEntityTypes() {
  return service({
    method:"get",
    url:"/adDic/getList?groupId=761"
  });
}
export function entitySearch(params) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:"get",
    params:params,
    url:`/entity/getList?token=${token}&type=${type}`
  });
}
export function entityUpdate(params) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:"get",
    params:params,
    url:`/entity/update?token=${token}&type=${type}`
  });
}
export function entityPreview(params) {
  return service({
    method:"get",
    url:"/entity/get",
    params:params
  });
}
export function entityQuotaByDay(params) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:"get",
    url:`/entity/quotaByDay?token=${token}&type=${type}`,
    params:params,
  });
}






