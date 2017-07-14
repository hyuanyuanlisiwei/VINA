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
export function updateUserInfo(data) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:'post',
    url:`/advertiser/update?token=${token}&type=${type}`,
    data:data
  });
}
export function getUserInfo(params){
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:'get',
    url:`/advertiser/get?token=${token}&type=${type}`,
    params:params
  });
}
export function recordsList(params) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:'get',
    url:`/advertiser/getAdvertiserChargeList?token=${token}&type=${type}`,
    params:params
  });
}
export function quotaByDay(params) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:'get',
    url:`/plan/sumQuotaByDay?token=${token}&type=${type}`,
    params:params
  });
}

export function getBasicInfo(params) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:'get',
    url:`/advertiser/getCostInfo?token=${token}&type=${type}`,
    params:params
  });
}

