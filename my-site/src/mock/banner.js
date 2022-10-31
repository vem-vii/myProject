/*
 * @Descripttion: 
 * @version: 
 * @Author: aaron
 * @Date: 2022-05-28 19:01:53
 * @LastEditors: aaron
 * @LastEditTime: 2022-07-25 16:41:03
 */
import Mock from 'mockjs';

Mock.mock("/api/banner", "get", {
    code: 0,
    msg: "",
    data: [{
            id: "1",
            midImg: "https://img2.baidu.com/it/u=368225609,3199574883&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500",
            bigImg: "https://img0.baidu.com/it/u=1009810309,3692597295&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
            title: "我叫哈士奇",
            description: "我不会写日记",
        },
        {
            id: "2",
            midImg: "https://img1.baidu.com/it/u=2550182280,2269202707&fm=253&fmt=auto&app=138&f=JPEG?w=868&h=500",
            bigImg: "https://img2.baidu.com/it/u=3906248424,3880450973&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
            title: "我叫哈士奇",
            description: "我不会粉饰自己",
        },
        {
            id: "3",
            midImg: "https://img1.baidu.com/it/u=226095871,1479421372&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            bigImg: "https://img2.baidu.com/it/u=4216347423,4030323999&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
            title: "我叫哈士奇",
            description: "别对我好奇",
        },
    ]
})