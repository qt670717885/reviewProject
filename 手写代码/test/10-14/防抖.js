function debounce(fn,delay) {
    let timer = null 
    if(timer) {
        clearTimeout(timer)
    }else {
        timer = setTimeout(fn, delay);
    }
}