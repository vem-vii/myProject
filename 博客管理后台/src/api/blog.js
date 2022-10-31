import request from '@/utils/request'
// 查找文章
export function findBlog(page = 1, limit = 10) {
    return request({
        url: "/api/blog",
        method: "get",
        params: {
            page,
            limit,
        }
    })
}

// 删除文章
export function deleteBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: "delete",
    })
}

// 添加文章
export function addBlog(data) {
    return request({
        url: '/api/blog',
        method: "post",
        data,
    })
}
// 修改文章
// blogInfo为选中要编辑文章的所有信息
// 
export function editBlog(blogInfo) {
    return request({
        url: `/api/blog/${blogInfo._id}`,
        method: "put",
        data: blogInfo.data,
    })
}

//根据id查找一篇文章
export function findOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: "get",
    })
}