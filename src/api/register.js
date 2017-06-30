/**
 * Created by hyylsw on 2017/6/29.
 */
import service from './service'
// import RegisterMock from '@/mock/register'
export function register(params) {
  return service({
    method:"POST",
    data:params,
    url:"/advertiser/register"
  });
}
