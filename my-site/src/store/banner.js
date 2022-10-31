//home页面数据
import { getBanners } from "@/api/banner";
export default {
    namespaced: true, //开启命名空间
    state: {
        loading: false,
        data: [],
    },
    mutations: {
        //唤醒一个mutations函数 使用store.commit()
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        },
    },
    actions: {
        // 触发一个actions通过store.dispath
        // 接收一个与store实例具有相同方法和属性的对象context
        async fetchBanner(ctx) {
            //如果页面加载过有数据了则不再进行加载
            if (ctx.state.data.length) {
                return;
            }
            ctx.commit("setLoading", true);
            const resp = await getBanners(); //获取左边栏的数据
            ctx.commit("setData", resp); //获取到的数据重新上传改变state
            ctx.commit("setLoading", false); //数据上传完毕后 改变state loading：false加载结束
        }
    }
}