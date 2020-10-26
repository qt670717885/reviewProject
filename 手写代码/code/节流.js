// 节流
// 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
function throttle(fn, delay) {
    let valid = true
    return function () {
        if (!valid) return;
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn.apply(this,arguments)
            valid = true;
        }, delay)
    }
}

function showTop() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    console.log('滚动条位置：' + scrollTop);
}
window.onscroll = throttle(showTop, 200)

// 计算时间差

function throttle(fn,delay) {
    let previos = 0

    return function () {
        let now = Date.now()
        if(now-previos > delay) {
            previos = now
            fn.apply(this,arguments)
        }
    }
}