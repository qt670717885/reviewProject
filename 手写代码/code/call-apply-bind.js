//call:改变this指向，并执行该函数

Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myAplly = function (context, args = []) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myBind = function (context,...arg) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    let obj = context || window
    return (...arg) => {
        this.call(obj, ...arg, ...arg2)
    }
}


let obj = {
    name: 'qqq'
}

function fn(age, like) {

    console.log(this.name)
    console.log(this.age)
    console.log(this.like)
}
// fn.myCall(obj,18,'q')\
fn.myAplly(obj, [18, 'q'])