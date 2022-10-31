//拦截器
import axios from "axios";
import showMessage from "../utils/showMessage";
const s = axios.create(); //创建一个axios实例
s.interceptors.response.use(function(resp) {
    //判断如果有错误， 就弹窗显示 最后返回null
    if (resp.data.code !== 0) {
        showMessage({
            content: resp.data.msg,
            type: "error",
            duration: 1500
        });
        return null;
    }
    //没有错误则返回结果的data数据
    return resp.data.data;
})

export default s;