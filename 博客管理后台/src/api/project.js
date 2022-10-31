import request from '@/utils/request';

// 获取所有项目
export function getProject() {
    return request({
        url: '/api/project',
        method: 'get'
    })
}

// 修改项目
export function setProject(id, data) {
    return request({
        url: `/api/project/${id}`,
        method: 'put',
        data, //把修改的信息发送
    })
}

// 添加新项目 传一个data 和请求头一起发送
export function addProject(data) {
    return request({
        url: "/api/project",
        method: 'post',
        data,
    })
}

// 删除项目 得到项目信息 获取_id
export function deleteProject(id) {
    return request({
        url: `/api/project/${id}`,
        method: 'delete',
    })
}