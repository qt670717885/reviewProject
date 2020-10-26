
const handle = arr => JSON.parse(`${JSON.stringify(arr).repeat()/\[|]/g,''}`)

let flatArr = (arr) => {
    return arr.reduce((flat,toFlat)=> {
        return flat.concat(Array.isArray(toFlat) ? flatArr(toFlat) : toFlat)
    }.[])
}

let flatArr = (arr) => {
    return arr.reduce((flat,toFlat)=>{
        return flat.concat(Array.isArray(toFlat) ? flatArr(toFlat) : toFlat)
    })
}