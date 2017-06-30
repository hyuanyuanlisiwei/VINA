/**
 * Created by hyylsw on 2017/6/14.
 */
import service from "@/api/service";
import Mock from '@/mock/login'

export function login(params) {
    return service({
        method:"POST",
        url:"/login/login",
        data:params
    });
}
export function updateUserInfo(params) {
  return service({
    method:'POST',
    url:'/advertiser/update',
    data:params
  });
}
export function getUserInfo(params) {
  return service({
    method:'POST',
    url:'/advertiser/get',
    data:params
  });
}
export function recordsList(params) {
  return service({
    method:'POST',
    url:'/advertiser/getAdvertiserChargeList',
    data:params
  });
}
export function quotaByDay(params) {
  return service({
    method:'POST',
    url:'/plan/sumQuotaByDay',
    data:params
  });
}
export function getBasicInfo(params) {
  return service({
    method:'POST',
    url:'/advertiser/getCostInfo',
    data:params
  });
}
export function getAreas() {
  return service({
    method:'POST',
    url:'/adDic/getList?groupId=1001'
  });
}
