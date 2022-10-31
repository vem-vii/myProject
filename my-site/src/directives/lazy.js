import eventBus from "@/eventBus"; //
import { debounce } from "@/utils";
import defaultGif from "@/assets/default.gif";
let imgs = [];

function setImage(img) {
    img.dom.src = defaultGif;

    const clientHeight = document.documentElement.clientHeight; //获取页面可视高度
    const rect = img.dom.getBoundingClientRect(); //获取元素宽高 top，left， right， bottom
    const height = rect.height || 150;
    if (rect.top >= -height && rect.top <= clientHeight) {
        img.dom.src = img.src;
        imgs = imgs.filter(i => i !== img); //筛选出页面刚出现时不在页面内的img
    }
}

function setImages() {
    // 再次滚动时就对刚刚筛选出来的
    // 不在可视范围内的图片进行再次处理setImage(img)
    // 
    for (const img of imgs) {
        // 处理图片
        setImage(img);
    }
}

function handleScroll() {
    //页面再次滚动时重新计算被筛选出的不在可视范围内的img 进行处理
    setImages();
}
// 监听mainScroll事件 
eventBus.$on("mainScroll", debounce(handleScroll, 50));
export default {
    // 钩子函数内的参数el指的是指令所绑定的元素
    // 被绑定元素插入父节点时调用
    inserted(el, binding) {
        const img = {
            dom: el,
            src: binding.value,
        };
        imgs.push(img);

        setImage(img);
    },
    unbind(el) {
        //指令和元素解除绑定时执行
        //（可以理解为刷新或者切换到别的画面 当前画面不展示 就会触发unbind钩子函数）
        imgs = imgs.filter(img => img.dom !== el);
    }
}