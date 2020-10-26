
function instanceof(left,right) {
    let leftValue = left.__proto__
    let rightValue = right.prototype
    while(true){
        if(leftValue === null){
            return false
        }else if(leftValue === rightValue){
            return true
        }
        leftValue = leftValue.__proto__
    }
}