/**
 *  原生JS实现ajax
 */

// 简单来说就是 通过XmlHttpRequest对象向服务器发异步请求，从服务器获得数据，然后用 javascript 来操作DOM更新页面的技术。
// open(method, url, async, username, password)
// 必填 method 请求的类型 值包括 GET、POST 和 HEAD 必填 url 请求的路径 需要向服务器请求的路径 可选 async 此次请求的方式 默认为true 即为异步 可选 username 与 password 此次请求需要的身份验证
// 同时该请求会将 readyState 设置为1
// send 发送此次请求
// 语法： send(body) 参数说明： 可选 传递的参数列表,如果不需要通过请求主体发送数据，则必须传 null
// 请求发送后， send()会把 readyState 设置为 2，并触发 onreadystatechange 事件。
// 当所有的 HTTP 响应头部已经接收，send() 或后台线程把 readyState 设置为 3 并触发 onreadystatechange 事件。
// 当响应完成，send() 或后台线程把 readyState 设置为 4，并最后一次触发事件。

// readyState状态值
/*
    0 表示请求未初始化 刚开始就是这个状态,还未调用open()方法
    1 启动 此时已经调用了open()方法
    2 发送 此时已经调用了send()方法
    3 请求接收中 此时已经接受了一部分数据
    4 请求完成 数据接受完毕
*/
function ajax(url, method, val, callback, cb) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.open(method, url)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status == 200 || XHR.status === 304)) {
                // success 回调
                resolve(xhr.responseText)
            } else {
                // error 回调
                reject(Error)
            }
        }
        xhr.send(val)
    })

}