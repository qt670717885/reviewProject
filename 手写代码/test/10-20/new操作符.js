function _new ( context , ...parmas ) {
    const obj = Object.create(context.prototype)
    const result = context.apply(obj,parmas)
    return typeof result === 'object' ? result : obj
}

let obj = {
    name : '111'
}

function Test(name) {
    this.name = name
    
}

const test = _new(Test,'111')
console.log(test.name)