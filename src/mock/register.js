/**
 * Created by hyylsw on 2017/6/29.
 */
import Mock from 'mockjs'
Mock.mock(/\/advertiser\/register/,function (options) {
  return {
    code:"A000000",
    data:{

    },
    message:""
  }
});
