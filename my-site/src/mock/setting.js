import Mock from "mockjs";
import qImg from "@/img/qq.jpg"
Mock.mock("/api/setting", "get", {
    code: 0,
    msg: "",
    data: {
        avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F30%2F20181030121325_KFeey.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667032351&t=dca805f0a8d238441b9d4cc69182ce49",
        siteTitle: "我的个人空间",
        github: "https://github.com/vem-vii",
        qq: "1401771935",
        qqQrCode: qImg,
        weixin: "aaron770126",
        weixinQrCode: qImg,
        mail: "1401771935@qq.com",
        icp: "备案号:112321424",
        githubName: "vem-vii",
        favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
    },
});