function myNew(context,...args) {
    const o = Object.create(context.prototype)
    const result = context.call(o,...args)
    return typeof result === 'object' ? result : o

}