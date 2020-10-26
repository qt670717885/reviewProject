function myNew(context,...args) {
    let obj = Object.create(context.prototype)
    let result = obj.apply(context,args)
    return typeof result === 'object' ? result : obj
}

