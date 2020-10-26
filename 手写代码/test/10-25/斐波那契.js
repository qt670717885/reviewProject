function fib(n) {
    let arr = [0, 1]
    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[n]
}

function fib(n) {
    if (n < 2) return n
    let i = 1,
        pre = 0,
        cur = 1,
        result = 0

    while (i++ < n){
        result = pre + cur
        pre = cur
        cur = result
    }
    return result
}