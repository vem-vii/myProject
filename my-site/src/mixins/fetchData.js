//公共的远程获取数据代码
//具体的组件中国 需要提供一个远程获取数据的方法 fetchData

//组件混入

export default function(defaultDatatValue = null) {
    return {
        data() {
            return {
                isLoading: true,
                data: defaultDatatValue,
            };
        },

        async created() {
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    }

}