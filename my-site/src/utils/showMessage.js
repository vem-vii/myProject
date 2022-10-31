import getComponentRootDom from './getComponentRootDom';
import Icon from '@/components/Icon';
import styles from "./showMessage.module.less";
/**
 * 
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info error success warm
 * @param {String} duration 多久消失 0为不消失
 * @param {HTMLElement} container 容器 消息会显示到该容器的正中 如果不传 则显示到页面正中
 */
//info添加默认值  duration 时间两秒
export default function(options = {}) {
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || "2000";
    const container = options.container || document.body;
    //创建消息元素
    const div = document.createElement("div");
    const iconDom = getComponentRootDom(Icon, { type });
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    //设置样式
    const typeClassName = styles[`message-${type}`];
    div.className = `${styles.message} ${typeClassName}`;

    if (options.container) {
        if ((getComputedStyle(container).position === "static")) {
            container.style.position = "relative";
        }
    }

    container.appendChild(div);

    // 强行渲染
    div.clientHeight;


    //回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%, -50%)`;
    div.clientHeight;

    //往上移动并消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%, -50%) translateY(-30px)`;
        div.addEventListener('transitionend', function() {
            div.remove();
            //如果传递了回调函数则运行他
            options.callback && options.callback();
        }, true)
    }, duration)
}