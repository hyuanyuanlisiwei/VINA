/**
 * Created by hyylsw on 2017/6/15.
 */
// import PlanMock from '@/mock/plan'
import service from './service'

export function getCostType() {
   return new Promise(function(resolve,reject) {
     resolve( {
       "code": "A000000",
       "data": [
         {
           "childs": [],
           "dicGroup": 49,
           "dicKey": "cost_type_cpc",
           "dicType": 1,
           "dicValue": "按点击付费",
           "enumValue": 1,
           "id": 50,
           "status": 1
         },
         {
           "dicValue": "按激活付费",
           "enumValue": 2,
           "id": 775,
           "status": 1
         }
       ],
       "timestamp": "20170615163033"
     });
   })
}
export function getDeliveryModes() {
    return service({
        method:"GET",
        url:"/adDic/getList?groupId=187"
    });
}
export function getFrequencPeriods() {
    return service({
        method:"GET",
        url:"/adDic/getList?groupId=190"
    });
}
export function getExtensionTypes() {
    return service({
        method:"GET",
        url:"/adDic/getList?groupId=20"
    });
}
export function getGenders() {
    return service({
        method:"GET",
        url:"/adDic/getList?groupId=17"
    });
}
export function getAcademics() {
    return service({
        method:"GET",
        url:"/adDic/getList?groupId=16"
    });
}
export function getSystems() {
    return service({
        method:"GET",
        baseURL:"http://test.dsp.f2time.com/",
        url:"/adDic/getList?groupId=20"
    });
}
export function getOperators() {
    return service({
        method:"GET",
        baseURL:"http://test.dsp.f2time.com/",
        url:"/adDic/getList?groupId=21"
    });
}
export function getNetworks() {
    return service({
        method:"GET",
        baseURL:"http://test.dsp.f2time.com/",
        url:"/adDic/getList?groupId=22"
    });
}
export function getAreas() {
    return service({
        method:"GET",
        baseURL:'/',
        url:"area.json"
    });
}
export function planList(data){
    data['token']=window.localStorage.getItem('token');
    data['type']=window.localStorage.getItem('type');
    return service({
        method:"get",
        url:"/plan/getList",
        params:data
    });
}
export function planSave(data) {
  data['token']=window.localStorage.getItem('token');
  data['type']=window.localStorage.getItem('type');
  return service({
    method:'get',
    url:'/plan/save',
    params:data
  });
}
export function planUpdate(data) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:'post',
    url:`/plan/update?token=${token}&type=${type}`,
    data:data
  });
}
export function planGet(params) {
  params['token']=window.localStorage.getItem('token');
  params['type']=window.localStorage.getItem('type');
  return service({
    method:"get",
    url:"/plan/get",
    params:params
  });
}
export function entityDelete(data){
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:'get',
    url:`/entity/delete?token=${token}&type=${type}`,
    params:data
  });
  // return service.post(`/entity/delete?token=${token}&type=${type}`,data);
}
export function entityGenerate(data) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:'post',
    url:`/entity/save?token=${token}&type=${type}`,
    data:data
  });
  // return service.post(`/entity/save?token=${token}&type=${type}`,data);
}
export function entitysSave(data){
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:'post',
    url:`/entity/save?token=${token}&type=${type}`,
    data:data
  });


}
export function planQuotaByDay(params) {
  let token=window.localStorage.getItem('token');
  let type=window.localStorage.getItem('type');
  return service({
    method:"get",
    params:params,
    url:`/plan/quotaByDay?token=${token}&type=${type}`
  });
}
