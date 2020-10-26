/**
 * instanceof原理
 */

// 思路 : 右边对象的原型存在在左边的原型链上
function instanceof(left, right) {
    let leftValue = left.__proto__
    let rightValue = right.prototype
    while(true){
        if(leftValue === null) {
            return false
        }else if(leftValue === rightValue) {
            return true
        }
        leftValue = leftValue.__proto__
    }
}