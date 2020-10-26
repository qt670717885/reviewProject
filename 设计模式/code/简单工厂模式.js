function Factory(name, age) {
    let obj = new Object()
    obj.name = name
    obj.age = age
    obj.sayName = function () {
        console.log(` my name is ${ this.name } `)
    }
    return obj
}

var student1 = Factory("john1", 20);
var student2 = Factory("john2", 28);

student1.sayName() // my name is john1 
student2.sayName() // my name is john2 