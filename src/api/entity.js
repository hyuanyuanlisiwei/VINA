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

  return service({
    method:"get",
    params:params,
    url:"/entity/getList"
  });
}
export function entityUpdate(params) {
  return service({
    method:"get",
    url:"/entity/update",
    params:params
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
  return service({
    method:"get",
    params:params,
    url:"/entity/quotaByDay"
  });
}






