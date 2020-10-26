function throttle(fn, delay) {
    let viod = true
    return function () {
        if (!viod) return
        viod = false
        setTimeout(() => {
            fn.apply(this, arguments),
                viod = true
        }, delay)
    }
}

function throttle(fn, delay) {
    let viod = false
    return function () {
        if (!viod) return
        setTimeout(() => {
            fn.apply(this, arguments)
            viod = true
        }, delay)
    }
}

function throttle(fn, delay) {
    let previos = 0
    return function () {
        let now = Date.now()
        if (now - previos > delay) {
            fn.apply(this, arguments)
            previos = now
        }
    }

}

function throttle(fn, delay) {
    let previos = 0
    return function () {
        let now = Date.now()
        if (now - previos > delay) {
            fn.apply(this,arguments)
            previos = now
        }
    }

}