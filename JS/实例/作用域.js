var i = 1;
function test() {
    i = 2;
    console.log(i); // 2
    for(var i = 3;i<5;i++){
        console.log(i)
    }
    console.log(this.i) // 1
    console.log(i) // 5
}

test()
console.log(i) // 1