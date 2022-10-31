import { getAbout } from "@/api/about"
export default {
    namespaced: true, //开启命名空间
    state: {
        loading: false,
        data: "",
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions: {
        async fetchAbout(ctx) {
            if (ctx.state.data) {
                return;
            }
            //commit调用一个mutation处理函数， ture为提交的负荷payload（传值）
            ctx.commit("setLoading", true);
            const resp = await getAbout();
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false);
        }
    }
}