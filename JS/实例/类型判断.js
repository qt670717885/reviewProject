// typeof 1 // 'number'
// typeof '1' // 'string'
// typeof undefined // 'undefined'
// typeof true // 'boolean'
// typeof Symbol() // 'symbol'
// typeof null // 'object'

a = ()=>{}

// console.log(typeof 1)
// console.log(typeof '1')
// console.log(typeof undefined)
// console.log(typeof true)
// console.log(typeof Symbol())
// console.log(typeof null )
// console.log(typeof [1,2,3] )
// console.log( typeof a)
// console.log( 1 instanceof Number )
// console.log( '1' instanceof String )
// console.log( true instanceof Boolean )
// console.log( [1,2,3] instanceof Array )
// console.log( a instanceof Function )
Object.prototype.toString.call(1) // [object Number]
Object.prototype.toString.call('1')//[object String]
Object.prototype.toString.call(true)//[object Boolean]
Object.prototype.toString.call(null)//[object Null]
Object.prototype.toString.call(undefind)//[object Undefind]
Object.prototype.toString.call(Symbol()) //[object Symbol]
Object.prototype.toString.call(()=>{})//[object Function]
Object.prototype.toString.call({})//[object Object]
Object.prototype.toString.call([1,2,3])//[object Array]