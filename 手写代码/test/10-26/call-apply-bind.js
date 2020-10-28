Function.prototype.mycall = function (context, ...args) {
    if (typeof this !== 'function') return throw new Error('not function')
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function (context, arg = []) {
    if (typeof this !== 'function') return throw new Error('not function')
    context = context || window
    context.fn = this
    const result = context.fn(...arg)
    delete context.fn
    retrun result
}

Function.prototype.myBind = function (context, ...arg1) {
    if (typeof this !== 'function') return throw new Error('not function')
    context = context || window
    return function (...args2) {
        return this.call(context,...arg1,...args2)
    }
}