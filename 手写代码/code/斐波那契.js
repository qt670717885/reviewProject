function fib = function (n) {
    let fibonacci = [0, 1];
    for (let i = 0; i <= n; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 1]
    }
    return fibonacci[n]
}


function fib = function (n) {
    if (n < 2) return n
    let i = 1,
        pre = 0,
        cur = 1,
        result = 0
    while (i++ < n) {
        result = (pre + cur) 
        pre = cur
        cur = result
    }
    return result
}