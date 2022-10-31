//把时间戳计算成年月日

export default function(timestamp) {
    const date = new Date(+timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); //填充字符串 不足两位的用0补足
    const day = date.getDay().toString().padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
}