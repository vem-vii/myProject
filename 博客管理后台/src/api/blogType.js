import request from '@/utils/request'
//添加文章分类
export function addBlogType(data) {
    return request({
        url: '/api/blogtype',
        method: 'post',
        data,
    })
}
// 删除文章分类接口
export function delBlogType(id) {
    return request.delete(`/api/blogtype/${id}`);
}
//修改某一个文章分类
export function updateOneBlogType(editInfo) {
    return request({
        url: `/api/blogtype/${editInfo._id}`,
        method: 'put',
        data: editInfo.data,
    })
}
//查找获取一个文章分类
export function findOneBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'get',
    })
}

// 获取文章分类
export function getBlogType() {
    return request({
        url: '/api/blogtype',
        method: 'get',
    })
}