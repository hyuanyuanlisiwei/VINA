/**
 * Created by hyylsw on 2017/6/14.
 */
import Mock from 'mockjs'
Mock.mock(/\/login\/login/,function (options) {
    return {
        code:"A000000",
        data:{
            id:"121",
            name:"putaoyou",
            realName:"中了互动",
            uuid:"dwdbfe",
            type:"2",
            token:"dgnwewt23gwdafe2",
            permissions:[
                {
                    name:"首页概览",
                    url:"/index"
                },
                {
                    name:"计划管理",
                    url:"/plan",
                }
            ]
        },
        message:""
    }
});


