
function trottle (fn,delay){
    let previos = 0
    return function() {
        let now = Date.now()
        if(now-previos > delay){
            fn.apply(this,arguments)
            previos = now
        }
    }
}

function trottle2(fn,delay){
    let valid = true
    return function () {
        if(!valid) return
        valid = false
        setTimeout(()=>{
            fn.apply(this,arguments)
            valid = true
        },delay)
    }
}