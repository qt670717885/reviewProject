function throttle(fn,delfay) {
    let valid = true
    return function () {
        if(!valid) return 
        valid = false
        setTimeout(()=>{
            fn.apply(this,arguments)
            valid = true
        },delfay)
    }
}

function throttle(fn,delay) {
    let previos = 0
    return function () {
        let current = Date.now()
        if(current - previos > delay) {
            fn.apply(this,arguments)
            previos = current
        }
    }
}