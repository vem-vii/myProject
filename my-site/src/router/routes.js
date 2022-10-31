import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress"
//加载进度条 只是展示一个效果 并非真的数据加载进度
configure({
    trickleSpeed: 20, //速度
    showSpinner: false, //加载的圈圈
})

function delay(duration) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}

function getPageComponent(getCompResolver) {
    return async() => {
        start()
        if (process.env.NODE_ENV === "development") {
            //故意在开发环境时延迟方便观察
            await delay(2000);
        }
        const comp = await getCompResolver();
        done()
        return comp;

    }
}

export default [{
        name: "Home",
        path: "/",
        component: getPageComponent(() =>
            import ("@/views/Home")

        ),
        meta: {
            title: "首页",
        },
    },
    {
        name: "About",
        path: "/about",
        component: getPageComponent(() =>
            import ("@/views/About")
        ),
        meta: {
            title: "关于我",
        },
    },
    {
        name: "Blog",
        path: "/article",
        component: getPageComponent(() =>
            import ("@/views/Blog")
        ),
        meta: {
            title: "文章",
        },
    },
    {
        name: "CategoryBlog",
        path: "/article/cate/:categoryId",
        component: getPageComponent(() =>
            import ("@/views/Blog")
        ),
        meta: {
            title: "文章",
        },
    },
    {
        name: "BlogDetail",
        path: "/article/:id",
        component: getPageComponent(() =>
            import ("@/views/Blog/Detail")
        ),
        meta: {
            title: "文章详情",
        },
    },
    {
        name: "Project",
        path: "/project",
        component: getPageComponent(() =>
            import ("@/views/Project")
        ),
        meta: {
            title: "项目&效果",
        },
    },
    {
        name: "Message",
        path: "/message",
        component: getPageComponent(() =>
            import ("@/views/Message")
        ),
        meta: {
            title: "留言板",
        },
    },
];