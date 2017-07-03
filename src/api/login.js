/**
 * Created by hyylsw on 2017/6/14.
 */
import service from "@/api/service";
// import Mock from '@/mock/login'

export function login(params) {
    return service({
        method:"post",
        url:"/login/login",
        params:params
    });
}
export function updateUserInfo(params) {
  return service({
    method:'POST',
    url:'/advertiser/update',
    params:params
  });
}
export function getUserInfo(params) {
  return service({
    method:'POST',
    url:'/advertiser/get',
    params:params
  });
}
export function recordsList(params) {
  return service({
    method:'POST',
    url:'/advertiser/getAdvertiserChargeList',
    params:params
  });
}
export function quotaByDay(params) {
  return service({
    method:'POST',
    url:'/plan/sumQuotaByDay',
    params:params
  });
}
export function getBasicInfo(params) {
  return service({
    method:'POST',
    url:'/advertiser/getCostInfo',
    params:params
  });
}

