export default function(refValue) {
    return {
        //操作dom元素需要挂在完成 最早要在mounted中进行
        mounted() {
            // 监听setMainScroll事件  回调函数为this.handleSetMainScroll
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handleMainScroll); //监听鼠标滚动事件
        },
        beforeDestroy() {
            this.$bus.$emit("mainScroll")
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);
        },
        methods: {
            handleSetMainScroll(scrollTop) {
                // 回到顶部
                this.$refs[refValue].scrollTop = scrollTop;
            },
            handleMainScroll() {
                // 触发mainScroll事件 传递参数
                this.$bus.$emit("mainScroll", this.$refs[refValue])
            }
        }
    }
}