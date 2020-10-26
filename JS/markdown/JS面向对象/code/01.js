// prototype ,__proto__,constructor
function People(name){
    this.name = name
}

let xiaoming = new People('小明')
console.log(xiaoming.__proto__ )
console.log(People.prototype)

