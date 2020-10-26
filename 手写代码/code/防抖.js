// 防抖
// 在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时。
function debounce(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
        }
        timer = setTimeout(fn, delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
    }
}

function showTop() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    console.log('滚动条位置：' + scrollTop);
}
window.onscroll = debounce(showTop, 200) // 为了方便观察效果我们取个大点的间断值，实际使用根据需要来配置