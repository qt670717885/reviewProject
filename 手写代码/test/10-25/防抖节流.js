function debounce(fn, delay) {
    let timer = null
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(fn,delay)
    }
}

// 节流
function trottle (fn,delay) {
    let timer = false
    return function() {
        if(!timer) return
        timer = false
        setTimeout(()=>{
            fn.apply(this,arguments)
            timer = true
        },delay)
    }
}

function trottle(fn,delay){
    let prevent = 0
    return function() {
        let cur = Date.now()
        if(cur - prevent > delay) {
            fn.apply(this,arguments)
            prevent = cur
        }
    }
}