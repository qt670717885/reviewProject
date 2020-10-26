function unique(arr) {
    return [...new Set(arr)]
}

function unique(arr) {
    return arr.filter((item, index, arr) => {
        return arr.indexof(item, 0) === index
    })
}


function unique(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i])
        }
    }
    return array;
}