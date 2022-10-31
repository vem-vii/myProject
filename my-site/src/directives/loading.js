//自定义指令
//到main.js全局注册指令



import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";

//得到一个el中带有loading效果的img元素

function getLoadingImage(el) {
    return el.querySelector("img[data-role=loading]")
}

function createLoadingImage() {
    const img = document.createElement("img");
    img.dataset.role = "loading";
    img.src = loadingUrl;
    img.className = styles.loading;
    return img;
}

// 导出指令的配置对象
// 钩子函数 bind 和 update 可以简写为一下这样 同样可以触发这两个钩子函数
export default function(el, binding) {
    const curImg = getLoadingImage(el);
    //根据binding.value的值 决定创建或删除img元素
    if (binding.value) {
        //如果没有img元素 创建img元素
        if (!curImg) {
            const img = createLoadingImage();
            el.appendChild(img);
        }
    } else {
        //如果有img元素 则删除
        if (curImg) {
            curImg.remove();
        }
    }

}