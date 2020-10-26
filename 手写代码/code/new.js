

function  myNew(context,...params){
    //1.以构造器的prototype属性为原型，创建新对象；
    
    //2.改变this指向
    
    //3.如果构造器没有手动返回对象，则返回第一步的对象
    
    // let obj = Object.create(context.prototype)
    // let result = context.apply(obj, params)
    // return typeof result === 'object' ? result : obj
    let obj = Object.create(context.prototype)
    let result = context.apply(obj,params)
    return typeof result === 'object' ? result : obj
}




function Father (name) {
    this.name = name
}

let father = myNew(Father,'qqq')
console.log(father.name) 
