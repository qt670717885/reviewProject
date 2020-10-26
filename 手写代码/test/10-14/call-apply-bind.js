
Function.prototype.myCall = function (context,...args) {
    if(typeof this !== 'function'){
        throw new TypeError('Error')
    }
    context = context || window
    context,fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function (contxet,args = []) {
    if(typeof this !== 'function'){
        throw new Error('error')
    }
    context = contxet || window
    context.fn = this
    const result = contxet.fn(...args)
    delete contxet.fn
    return result
}

Function.prototype.mybind = function (context,...args) {
    if(typeof this !== 'function'){
        throw new Error('error')
    }
    let obj = context || window
    return (...arg2) =>{
        this.call(obj,...args,...arg2)
    }
}

Function.prototype.mybind = function (context,...args) {
    if(typeof this !== 'function'){
        throw new Error('error')
    }

    let obj = contxet || window 
    return (...args2) =>{
        this.call(obj,...args,...args2)
    }
}