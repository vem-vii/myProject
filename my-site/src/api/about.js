import request from "./request";
export async function getAbout() {
    ///api/about url省略协议主机名端口号，可以自动添加
    return request.get('/api/about');
}