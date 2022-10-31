//左边指示栏的数据
import { getSetting } from "@/api/setting";
import { titleController } from "@/utils"
export default {
    // 必须注意，不要在不同的、无命名空间的模块中定义两个相同的 getter 从而导致错误
    namespaced: true, //开启命名空间
    state: {
        loading: false,
        data: null,
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        },
    },
    actions: {
        async fetchSetting(ctx) {
            ctx.commit("setLoading", true);
            const resp = await getSetting();
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false);
            // 小图标
            if (resp.favicon) {
                let link = document.querySelector("link[rel='shortcut icon']")
                if (link) {
                    return;

                }
                link = document.createElement("link");
                link.rel = "shortcut icon";
                link.type = "images/x-icon";
                link.href = resp.favicon;
                document.querySelector("head").appendChild(link);

            }

            if (resp.siteTitle) {
                titleController.setSiteTitle(resp.siteTitle);
            }

        }
    }
}