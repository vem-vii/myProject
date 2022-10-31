//拦截api发送的数据请求模拟数据返回
//mock模拟数据 在浏览器中运行的
import Mock from "mockjs";
import "./banner";
import "./blog";
import "./setting";
import "./about";
import "./project";
import "./message";


Mock.setup({
    timeout: '500-800',
})