Promise.resolve = function (val) {
    return new Promise((resolve, reject) => {
        resolve(val)
    })
}

Promise.reject = function (val) {
    return new Promise((resolve, reject) => {
        reject(val)
    })
}

// race
Promise.race = function (arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].then(resolve, reject)
        }
    })
}

// all

Promise.all = function (arr) {
    let result = []
    let i = 0

    function processData(index, data) {
        result[index] = data
        if (i == arr.length) {
            resolve(result)
        }

    }
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].then(data => {
                processData(i,data)
            }, reject)
        }
    })
}