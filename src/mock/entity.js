/**
 * Created by hyylsw on 2017/6/28.
 */
import Mock from 'mockjs'

Mock.mock(/\/adDic\/getList\?groupId=761/,function (options) {
  return {
    "code": "A000000",
    "data": [
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_video",
        "dicType": 1,
        "dicValue": "视频贴片",
        "enumValue": 1,
        "id": 762,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_pause",
        "dicType": 1,
        "dicValue": "暂停图",
        "enumValue": 2,
        "id": 763,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_infor_stream",
        "dicType": 1,
        "dicValue": "信息流",
        "enumValue": 3,
        "id": 764,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_text_link",
        "dicType": 1,
        "dicValue": "文字链",
        "enumValue": 4,
        "id": 765,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_banner",
        "dicType": 1,
        "dicValue": "banner",
        "enumValue": 5,
        "id": 766,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_acrco",
        "dicType": 1,
        "dicValue": "通栏",
        "enumValue": 6,
        "id": 767,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_corner",
        "dicType": 1,
        "dicValue": "角标",
        "enumValue": 7,
        "id": 768,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_open_screen",
        "dicType": 1,
        "dicValue": "开屏",
        "enumValue": 8,
        "id": 769,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_insert_screen",
        "dicType": 1,
        "dicValue": "插屏",
        "enumValue": 9,
        "id": 770,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "ad_game_video",
        "dicType": 1,
        "dicValue": "游戏内视频",
        "enumValue": 10,
        "id": 771,
        "status": 1
      },
      {
        "childs": [],
        "dicGroup": 761,
        "dicKey": "",
        "dicType": 1,
        "dicValue": "其他",
        "enumValue": null,
        "id": 774,
        "status": 1
      }
    ],
    "timestamp": "20170628141843"
  }
});

Mock.mock(/\/entity\/getList/,function(options){
  return Mock.mock({
    code:"A000000",
    message:'',
    data:{
      currentPageNum:1,
      nextpage:true,
      pageSize:15,
      prepage:false,
      sum:null,
      'totalItemNum|40-100':50,
      'totalPageNum|5-10':6,
      'data|15':[{
        'id|+1':1,
        'entityName|1-3':'ce',
        'entityTypeName':'图片',
        'runState|0-1':1,
        'cost|1000-10000':2000,
        'imp|3000-20000':3000,
        'clk|2000-7000':3000,
        'active|20-800':21
      }]
    }
  });
});

Mock.mock(/\/entity\/update/,{
  code:'A000000',
  data:'',
  message:'修改成功'
});

Mock.mock(/\/entity\/get/,{
  code:'A000000',
  data:{
    id:12,
    entityName:"百度创意1",
    entityUrl:'https://www.baidu.com/img/bd_logo1.png',
    threadPic1:'https://www.baidu.com/img/bd_logo1.png',
  },
  message:'修改成功'
});

Mock.mock(/\/entity\/quotaByDay/,function(options) {
  return Mock.mock({
    code:'A000000',
    'data|15':[
      {
        day:"2017-12-12",
        'cost|100-5000':123,
        'imp|5000-10000':5000,
        'clk|3000-5000':3000,
        "active|1000-3000":1000
      }
    ]

  });
});








