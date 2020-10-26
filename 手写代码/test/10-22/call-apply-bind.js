Function.prototype.call = function (context,...args) {
    if(typeof this !== 'function'){
        throw new Error('not function')
    }
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.apply =  function (context,args = []){
    if(typeof this !== 'function') {
        throw new Error('not function')
    }
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.mybind = function(context,...args){
    if(typeof this !== 'function'){
        throw new Error('not function')
    }
    context = context || window
    return () {
        this.call(this,...args)
    }
}