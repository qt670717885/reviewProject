function flat (arr) {
    return arr.reduce((flat,toFlat)=> {
        return flat.concat(Array.isArray(toFlat) ? flat(toFlat) : toFlat)
    },[])
}