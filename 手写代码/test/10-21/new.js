function myNew (context,...args){
    let obj = Object.create(context.prototype)
    let result = context.apply(obj,args)
    return typeof result === 'object' ? result : obj
}

