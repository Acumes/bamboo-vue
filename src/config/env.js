// 配置编译环境和线上环境之间的切换

let baseUrl = 'http://localhost:9966/bamboo';
let iconfontVersion = ['567566_pwc3oottzol', '1066523_v8rsbcusj5q'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
const env = process.env
if (env.NODE_ENV == 'development') {
    baseUrl = `http://localhost:9966/bamboo`; // 开发环境地址
} else if (env.NODE_ENV == 'production') {
    baseUrl = `http://192.168.1.68:9966/bamboo`; //生产环境地址
} else if (env.NODE_ENV == 'test') {
    baseUrl = ``; //测试环境地址
}
let codeUrl = `${baseUrl}/code`
export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    env

}
