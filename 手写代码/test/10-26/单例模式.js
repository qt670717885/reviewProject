
function getSingleton (fn){
    let insatnce = null
    return function() {
        if(!insatnce) {
            insatnce = fn.apply(this,arguments)
        }
        return insatnce
    }
}