
function instanceof(left,right) {
    let leftValie = left.__propto__
    let rightValue = right.protoType
    while(true){
        if(leftValie === null) {
            return false
        }else if(leftValie === rightValue){
            returbn true
        }
        leftValie = leftValie.__propto__
    }
}