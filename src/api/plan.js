/**
 * Created by hyylsw on 2017/6/15.
 */
// import PlanMock from '@/mock/plan'
import service from './service'

export function getCostType() {
    return service({
        method:"GET",
        url:"/adDic/getList?groupId=49"
    });
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
        url:"/static/area.json"
    });
}
export function planList(params){
   console.log('mock planList');
    return service({
        method:"POST",
        url:"/plan/getList",
        params:params
    });
}
export function planSave(params) {
    return service({
        method:"POST",
        url:"/plan/save",
        params:params
    });
}
export function planUpdate(params) {
  return service({
    method:"POST",
    url:"/plan/update",
    params:params
  });
}
export function planGet(params) {
  return service({
    method:"POST",
    url:"/plan/get",
    params:params
  });
}
export function entityDelete(params) {
  return service({
    method:"POST",
    url:"/entity/delete",
    params:params
});
}

export function entitySave(params) {
  return service({
    method:"POST",
    url:"/entity/save",
    params:params
  });
}

export function planQuotaByDay(params) {
  return service({
    method:"POST",
    params:params,
    url:"/plan/quotaByDay"
  });
}



