import Mock from 'mockjs';
import qs from "querystring"

Mock.mock("/api/message", "post", {
    code: 0,
    msg: "",
    data: {
        id: "@guid",
        content: "@cparagraph(1, 10)",
        nickname: "@cname",
        createDate: Date.now(),
        "avatar|1": [
            "https://img0.baidu.com/it/u=1485165134,2288647736&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=496",
            "https://img2.baidu.com/it/u=2601343992,2153205866&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665334800&t=07edfbd1e9e1f0130d96817666cf28be",
            "https://img1.baidu.com/it/u=102219484,3963682828&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665334800&t=5de328ec74e94b3f307ee4d8708da9a7",
            "https://img1.baidu.com/it/u=2083704038,3161911432&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1665334800&t=7f1cd3dcaa27f4794c21296206e3de08",
        ]
    }
})
Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function(options) {
    const query = qs.parse(options.url);
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            total: 52, //总页数
            [`rows|${query.limit || 10}`]: [{
                // //当前页列表数据
                id: "@guid",
                nickname: "@cname",
                content: "@cparagraph(1, 10)",
                createDate: Date.now(),
                "avatar|1": [
                    "https://img0.baidu.com/it/u=1485165134,2288647736&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=496",
                    "https://img2.baidu.com/it/u=2601343992,2153205866&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665334800&t=07edfbd1e9e1f0130d96817666cf28be",
                    "https://img1.baidu.com/it/u=102219484,3963682828&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665334800&t=5de328ec74e94b3f307ee4d8708da9a7",
                    "https://img1.baidu.com/it/u=2083704038,3161911432&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1665334800&t=7f1cd3dcaa27f4794c21296206e3de08",
                ],
            }]
        }
    })
})