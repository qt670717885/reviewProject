
Function.prototype._call = function (context,...args) {
    if(typeof this !== 'function'){
        throw new Error ('not function')
    }
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype._apply = function (context,args=[]) {
    if(typeof this !== 'function'){
        throw new Error('not function')
    }
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype._bind = function (context,...args) {
    if(typeof this !== 'function') {
        throw new Error('not function')
    }
    context = context || window
    return function (...args) {
        this.call(context,...args,...arg2)
    }
}