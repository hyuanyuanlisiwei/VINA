/**
 * Created by hyylsw on 2017/6/15.
 */
import Mock from 'mockjs'

Mock.mock(/\/adDic\/getList\?groupId=49/,function (options) {
    return {
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
                "childs": [],
                "dicGroup": 49,
                "dicKey": "cost_type_cpm",
                "dicType": 1,
                "dicValue": "按千次展示付费",
                "enumValue": 2,
                "id": 51,
                "status": 1
            }
        ],
        "timestamp": "20170615163033"
    }
});
Mock.mock(/\/adDic\/getList\?groupId=187/,function (options) {
   return  {
            "code": "A000000",
            "data": [{
                    "childs": [],
                    "dicGroup": 187,
                    "dicKey": "delivery_mode_fast",
                    "dicType": 1,
                    "dicValue": "标准投放",
                    "enumValue": 1,
                    "id": 188,
                    "status": 1
                },
                {
                    "childs": [],
                    "dicGroup": 187,
                    "dicKey": "delivery_mode_uniform",
                    "dicType": 1,
                    "dicValue": "匀速投放",
                    "enumValue": 2,
                    "id": 189,
                    "status": 1
                }
            ],
            "timestamp": "20170620164310"
    }
});
Mock.mock(/\/adDic\/getList\?groupId=190/,function (options) {
    return {
        "code": "A000000",
        "data": [
        {
            "childs": [],
            "dicGroup": 190,
            "dicKey": "frequency_period_day",
            "dicType": 1,
            "dicValue": "天",
            "enumValue": 1,
            "id": 191,
            "status": 1
        },
        {
            "childs": [],
            "dicGroup": 190,
            "dicKey": "frequency_period_week",
            "dicType": 1,
            "dicValue": "周",
            "enumValue": 2,
            "id": 192,
            "status": 1
        },
        {
            "childs": [],
            "dicGroup": 190,
            "dicKey": "frequency_period_month",
            "dicType": 1,
            "dicValue": "月",
            "enumValue": 3,
            "id": 193,
            "status": 1
        }
    ],
        "timestamp": "20170620174542"
    }
});
Mock.mock(/\/adDic\/getList\?groupId=20/,function (options) {
   return {
       "code": "A000000",
       "data": [
           {
               "childs": [],
               "dicGroup": 20,
               "dicKey": "czxt_ios",
               "dicType": 2,
               "dicValue": "操作系统：IOS",
               "enumValue": 1,
               "id": 25,
               "status": 1
           },
           {
               "childs": [],
               "dicGroup": 20,
               "dicKey": "czxt_android",
               "dicType": 2,
               "dicValue": "操作系统：Android",
               "enumValue": 2,
               "id": 26,
               "status": 1
           }
       ],
       "timestamp": "20170621092353"
   }
});
Mock.mock(/\/adDic\/getList\?groupId=17/,function (options) {
    return {
        "code": "A000000",
        "data": [
            {
                "childs": [],
                "dicGroup": 17,
                "dicKey": "xb_male",
                "dicType": 2,
                "dicValue": "性别：男",
                "enumValue": 1,
                "id": 23,
                "status": 1
            },
            {
                "childs": [],
                "dicGroup": 17,
                "dicKey": "xb_female",
                "dicType": 2,
                "dicValue": "性别：女",
                "enumValue": 2,
                "id": 24,
                "status": 1
            },
            {
                "childs": [],
                "dicGroup": 17,
                "dicKey": "xb_unknow",
                "dicType": 2,
                "dicValue": "性别：未知",
                "enumValue": 0,
                "id": 206,
                "status": 1
            }
        ],
        "timestamp": "20170621174723"
    }
});
Mock.mock(/\/adDic\/getList\?groupId=16/,function (options) {
    return {
        "code": "A000000",
        "data": [
            {
                "childs": [],
                "dicGroup": 16,
                "dicKey": "xl_bs",
                "dicType": 2,
                "dicValue": "学历：博士",
                "enumValue": null,
                "id": 38,
                "status": 1
            },
            {
                "childs": [],
                "dicGroup": 16,
                "dicKey": "xl_ss",
                "dicType": 2,
                "dicValue": "学历：硕士",
                "enumValue": null,
                "id": 39,
                "status": 1
            },
            {
                "childs": [],
                "dicGroup": 16,
                "dicKey": "xl_bk",
                "dicType": 2,
                "dicValue": "学历：本科",
                "enumValue": null,
                "id": 40,
                "status": 1
            },
            {
                "childs": [],
                "dicGroup": 16,
                "dicKey": "xl_gz",
                "dicType": 2,
                "dicValue": "学历：高中",
                "enumValue": null,
                "id": 41,
                "status": 1
            },
            {
                "childs": [],
                "dicGroup": 16,
                "dicKey": "xl_cz",
                "dicType": 2,
                "dicValue": "学历：初中",
                "enumValue": null,
                "id": 42,
                "status": 1
            },
            {
                "childs": [],
                "dicGroup": 16,
                "dicKey": "xl_xx",
                "dicType": 2,
                "dicValue": "学历：小学",
                "enumValue": null,
                "id": 43,
                "status": 1
            },
            {
                "childs": [],
                "dicGroup": 16,
                "dicKey": "xl_other",
                "dicType": 2,
                "dicValue": "学历：其他",
                "enumValue": null,
                "id": 44,
                "status": 1
            }
        ],
        "timestamp": "20170622105801"
    }
});



Mock.mock(/\/plan\/getList/,function(options){
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
                'unitName|1-3':'ce',
                'unitLimit|2000-50000':2000,
                'costTypeName':'cpa',
                'runState|0-1':1,
                'price|500-1000':500,
                'cost|100-5000':123,
                'imp|5000-10000':5000,
                'clk|3000-5000':3000,
                "active|1000-3000":1000
            }]
        }
    });
});
Mock.mock(/\/plan\/update/,{
    code:'A000000',
    data:'',
    message:'修改成功'
});
Mock.mock(/\/plan\/save/,{
  code:'A000000',
  data:1,
  message:'修改成功'
});

Mock.mock(/\/plan\/quotaByDay/,function(options) {
  return Mock.mock({
    code:'A000000',
    'data|15':[
      {
        'unitName|1-3':'ce',
        'unitLimit|1000-50000':1000,
        'day|+1':
          ["2017-06-12","2017-06-13","2017-06-14","2017-06-15","2017-06-15","2017-06-17","2017-06-18","2017-06-19","2017-06-20","2017-06-21","2017-06-22","2017-06-23","2017-06-24","2017-06-25","2017-06-26" ],
        'cost|100-5000':123,
        'imp|5000-10000':5000,
        'clk|3000-5000':3000,
        "active|1000-3000":1000
      }
    ]
  });
});

