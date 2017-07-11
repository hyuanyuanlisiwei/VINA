/**
 * Created by hyylsw on 2017/6/14.
 */
import service from "@/api/service";
// import Mock from '@/mock/login'

export function login(params) {
    return service({
      method:'get',
      url:'/login/login',
      params:params
    });
}
export function updateUserInfo(params) {
  return service({
    method:'get',
    url:'/advertiser/update',
    params:params
  });
}
export function getUserInfo(params) {
  return service({
    method:'get',
    url:'/advertiser/get',
    params:params
  });
}
export function recordsList(params) {
  return service({
    method:'get',
    url:'/advertiser/getAdvertiserChargeList',
    params:params
  });
}
export function quotaByDay(params) {

  return service({
    method:'get',
    url:'/plan/sumQuotaByDay',
    params:params
  });
}

export function getBasicInfo(params) {
  return service({
    method:'get',
    url:'/advertiser/getCostInfo',
    params:params
  });
}

