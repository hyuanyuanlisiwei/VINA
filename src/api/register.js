/**
 * Created by hyylsw on 2017/6/29.
 */
import service from './service'
// import RegisterMock from '@/mock/register'
export function register(data) {
  return service.post('/advertiser/register',data);
}
