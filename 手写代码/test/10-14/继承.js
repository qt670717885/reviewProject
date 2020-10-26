

function Father(name , age) {
    this.name = name
    this.age = gae
}

Father.prototype.say = function () {
    console.log('Hello')
}

function Child(like) {
    this.like = like
}

// 1. 原型链继承
// 优点 ： 简单，父类新增的实例与方法子类都能访问到
// 缺点 ： 1. 子类更改从父类引用过来的属性，由于原型属性上的引用类型属性会被所有实例共享，所以会影响其他实例
// 2. 创建子类时，没有办法做到不影响其他实例对父类进行传参
// 3. 不能实现多继承
// 4. 在创建子类实例时不能向父类构造函数传参

Child.prototype = new Father('',10)

// 借用构造函数
// 优点 ： 1.解决了子类构造函数向父类构造函数传参
// 可以实现多继承（call或者apply多个父类）
// 缺点 ： 1. 方法都在构造函数中定义，无法复用	
// 2. 不能继承原型属性/方法，只能继承父类的实例属性和方法

function Child(name,age,like) {
    Father.call(this,name,age)
    this.like = like
}

// 组合继承
// 优点 ： 函数可以服用
// 不存在引用属性的问题
// 可以继承属性和方法，并且可以继承原型的属性和方法
// 缺点 ： 需要调用两次父类

function Child3(name,age,like) {
    this.like = like 
    Father.call(this,name,age)
}
Child3.prototype = new Father('',10)

// 组合寄生继承

// 继承父类的方法
function createFn(Father,Child) {
    let o = Object.create(Father.prototype)
    o.constructor = Child
    Child.prototype = o
}

