Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('not function')
    }
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myAplly = function (context, args = []) {
    if (typeof this !== 'function') {
        throw new Error('not function')
    }
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myBind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('not function')
    }
    let obj = context || window
    return (...args2)=>{
        this.call(obj,..args,...args2)
    }
}