function flatArr (arr) {
    if(!Array.isArray(arr)) return throw new Error ('not array')

    arr.reduce((flat,toflat)=>{
        return flat.concat(Array.isArray(toflat) ? flatArr(toflat) : toflat)

    },[])
}