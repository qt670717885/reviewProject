// push 返回原数组长度

Array.prototype._push = function () {
    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    let args = [...arguments]
    let arrL = arr.length
    if (args.length === 0) return arrL
    for (let i = 0; i < args.length; i++) {
        arr[arrL++] = args[i]
    }
    return arrL
}



/**
 * pop 删除元素最后一个元素，返回最后一个元素的值
 * */

Array.prototype._pop = function () {
    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    let length = arr.length
    if (length === 0) return
    let result = arr[length - 1]
    arr[length - 1] = null
    arr.length--
    return result
}


/**
 * unshift
 * 1. 接收不限个数的参数
 * 2. 获取原数组长度
 * 3. 把原数组向后移动一位
 * 4. 遍历参数，每遍历一个参数，数组长度加1，在数组头部添加该参数
 * 5. 返回数组长度
 * 
 */

Array.prototype._unshift = function () {
    let arr = this
    if (!Array.isArray(arr)) throw new Erroe('not Array')
    let args = [...arguments]
    let length = args.length
    let arrL = arr.length
    if (length === 0) return arrL
    // 先将原数组向后移动
    for (let i = arrL; i > 0; i--) {
        arr[i + length - 1] = arr[i - 1]
    }
    for (let i = 0; i < length; i++) {
        arr[i] = args[i]
        arrL++
    }
    return arrL
}

/**
 * 1. 不接受参数
 * 2. 把原数组中所有项向前移动一位
 * 3. 原数组长度减一
 * 4. 返回删除元素的值
 */
Array.prototype._shift = function () {
    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    if (arr.length === 0) return
    let result = arr[0]
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i + 1]
    }
    arr.length--
    return result
}

/**
 * concat 方法
 * 1. 接受不限个个数参数，参数类型可以是数组或其他类型
 * 2. 获取原数组长度，遍历concat的参数，如果参数是数组则拆开，如果数组中的元素还包括数组，不用一一拆分
 * 3. 每遍历一个，原数组长度加1，并作为索引，将当前元素添加到该索引上,为了完全达到手写目的，
 *    这里不采用push方法，而是for循环遍历赋值，真实环境下肯定是现有push才有concat，所以面试时可以直接用push
 * 4. 不会改变原数组，要用到深拷贝，不调用slice或其他方法，用for
 */

Array.prototype._concat = function () {
    let arr = this
    let args = [...arguments]
    if (!Array.isArray(arr)) throw new Error('not Array')
    if (args.length === 0) return arr
    let resultArr = []
    for (let i = 0; i < arr.length; i++) {
        resultArr[i] = arr[i]
    }
    for (let i = 0; i < args.length; i++) {
        if (Array.isArray(args.length[i])) {
            for (let j = 0; j < args[i].length; j++) {
                resultArr.push(args[i][j])
            }
        } else {
            resultArr.push(args[i])
        }
    }
    return resultArr
}

/**
 * isArray
 * 1. 使用Object.prototype.toString.call()来判断
 */

Array.prototype._isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]' ? true : false
}

/**
 * toString
 * 循环遍历逗号分隔即可  
 */
Array.prototype._toString = function () {
    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    let str = ''
    if (arr.length === 0) return str
    for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
            str += arr[i]
        } else {
            str += arr[i] + ','
        }
    }
    return str
}

/**
 * join
 * 类似toString，只是加了个分隔符号而已
 */

Array.prototype._join = function (point = ',') {
    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    let str = ''
    if (arr.length === 0) return str
    for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
            str += arr[i]
        } else {
            str += arr[i] + point
        }
    }
    return str
}

/**
 * indexof
 * 1.接收两个参数分别为查找的元素和起始位置，起始位置可选，默认从第一项开始查找
 * 2.遍历原数组，用全等去匹配每一项，如果匹配成功就返回当前元素下标，如果一直没匹配成功，则返回-1 
 */
Array.prototype._indexOf = function (ele, start) {
    let arr = this
    if (!Array.isArray(arr)) {
        throw new Error('not Array')
    }
    if (arr.length === 0) return -1
    let e = ele
    let s = start || 0
    let result = -1
    for (let i = s; i < arr.length; i++) {
        if (arr[i] === e) {
            result = i
            break
        }
    }
    return result
}

/**
 * forRach
 * 1.接收一个函数参数和一个函数执行作用域的参数（可选），参数函数也接受3个参数，分别是当前项值，当前项索引（可选），当前数组（可选）
 * 2.执行参数函数，默认执行环境为window，不返回任何值
 */

Array.prototype._forEach = function (fn, scope) {
    let arr = this
    if (!Array.isArray(arr)) {
        throw new Error('not Array')
    }
    if (typeof fn !== 'function') {
        throw new Error('argument error')
    }
    if (arr.length === 0) return
    let sp = scope || window
    for (let i = 0; i < arr.length; i++) {
        fn.call(sp, arr[i], i, arr)
    }

}

/** map
 * 1.接收一个函数参数和一个函数执行作用域的参数（可选），参数函数也接受3个参数，分别是当前项值，当前项索引（可选），当前数组（可选）
 * 2.执行参数函数，默认执行环境为window，把参数函数返回的结果push到一个新的数组中，最后把这个新的数组返回到外部
 */
Array.prototype._map = function (fn, scope) {
    let arr = this
    if (!Array.isArray(arr)) {
        throw new Error('not Array')
    }
    if (typeof fn !== 'function') {
        throw new Error('argument error')
    }
    if (arr.length === 0) return []
    let sp = scope || window
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let back = fn.call(arr[i], i, arr)
        result.push(back)
    }
    return result
}

/** filter
 *  1.接收一个函数参数和一个函数执行作用域的参数（可选），参数函数也接受3个参数，分别是当前项值，当前项索引（可选），当前数组（可选）
 *  2.执行参数函数，默认执行环境为window，把参数函数返回为true的项push到一个新的数组中，最后把这个新的数组返回到外部
 *  3. filter 不改变原数组
 */
Array.prototype._filter = function (fn, scope) {

    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    if (typeof fn !== 'function') throw new Error('arguments Erroe')
    if (arr.length === 0) return []
    let resultArr = []
    let sp = scope || window
    for (let i = 0; i < arr.length; i++) {
        let back = fn.call(sp, arr[i], i, arr)
        if (back) {
            resultArr.push(arrp[i])
        }
    }
    return resultArr
}

/**
 * every
 *  1. 接收一个函数参数和一个函数执行作用域的参数（可选），参数函数也接受3个参数，分别是当前项值，当前项索引（可选），当前数组（可选）
 * 2. 执行参数函数，默认执行环境为window，如果返回值全为true，最终的every返回true，当有一个返回false时，退出循环，立即返回false 
 */

Array.prototype._every = function (fn, scope) {
    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    if (typeof fn !== 'function') throw new Error('arguments Erroe')
    if (arr.length === 0) return false
    let sp = scope || window
    for (let i = 0; i < arr.length; i++) {
        let back = fn.call(sp, arr[i], i, arr)
        if (!back) {
            return false
        }
    }
    return true
}

/**
 * some
 *  1. 接收一个函数参数和一个函数执行作用域的参数（可选），参数函数也接受3个参数，分别是当前项值，当前项索引（可选），当前数组（可选）
 *  2. 执行参数函数，默认执行环境为window，如果返回值有一个为true，退出循环，最终的every返回true，当全部返回false时，最终返回false
 */

Array.prototype._some = function (fn, scope) {
    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    if (typeof fn !== 'function') throw new Error('arguments Erroe')
    if (arr.length === 0) return false
    let sp = scope || window
    for (let i = 0; i < arr.length; i++) {
        let back = fn.call(sp, arr[i], i, arr)
        if (back) {
            return true
        }
    }
    return false
}

/**
 * reduce
 * 1.接收函数参数和一个初始值，初始值默0，参数函数也有四个参数，分别是上一次计算的值，当前项，当前项索引，当前数组
 * 2.遍历数组，依次把当前项与上一项之和，当前项的值，当前项索引，当前数组传入参数函数
 * 3.执行参数函数，并把归并后的值保存下来，提供给下一项使用
 */
Array.prototype._reduce = function (fn, init) {
    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    if (typeof fn !== 'function') throw new Error('arguments Erroe')
    let total = init || 0
    for (let i = 0; i < arr.length; i++) {
        total = fn(total, arr[i], i, arr)
    }
    return total
}




/** sort
 * 1.接收一个比较函数作为参数，比较函数接收两个参数
 * 2.遍历原数组，如果存在参数函数，获取参数函数的返回值，如果返回值为1，则前一项移至后一项的后面，如果为-1，则前一项排列在前面，如果等于0，位置不变
 * 3.如果不存在参数函数，就按照字符串比较大小，按从小到大排列，返回排列后的数组
 * 如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。
 * */

Array.prototype._sort = function () {
    let arr = this
    if (!Array.isArray(arr)) {
        throw new Error("not Array")
    }
    let compare = [...arguments]
    let length = compare.length
    if (length === 0) {
        for (let i = 0; i < arr.length - 1; i++) { // 两两相邻互换
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j + 1]
                    arr[j + 1] = arr[j]
                    arr[j] = temp
                }
            }
        }
    }
    if (length > 0) {
        let fn = compare[0]
        for (let i = 0; i < arr.length - 1; i++) { // 两两相邻互换
            for (let j = 0; j < arr.length - 1 - i; j++) {
                let result = fn(arr[j], arr[j + 1])
                if (result < 0) {
                    let temp = arr[j + 1]
                    arr[j + 1] = arr[j]
                    arr[j] = temp
                } else {
                    continue
                }
            }
        }
    }
}

/** reverse
 * 1.不接收参数
 * 2.循环一次，循环长度为原数组长度一半，两端位置互换
 * 
 */

Array.prototype._reverse = function () {
    let arr = this
    if (!Array.isArray(arr)) {
        throw new Error('not Array')
    }
    if (arr.length === 0) {
        return arr
    }
    for (let i = 0, len = arr.length; i < len / 2; i++) {
        let temp = arr[i]
        arr[i] = arr[len - 1 - i]
        arr[len - 1 - i] = temp
    }
    return arr
}


/** slice
 * 1.接收两个参数，第二个参数可选，如果不传第二个参数，默认原数组长度，即一直截取到末尾
 * 2.从第一个参数开始遍历原数组，直到结束位置时结束遍历，把遍历的每一项push到一个新的数组中，返回这个新数组
 * 3.如果第一个参数是负数，则起始位置为数组长度 + 第一个参数。结束位置的下标不能小于或等于起始位置下标，否则返回空数组
 * 4.返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
 */
Array.prototype._slice = function (start, end) {
    let arr = this
    if (!Array.isArray(arr)) {
        throw new Error('not Array')
    }
    if (arr.length === 0) {
        return []
    }
    let s = start
    if (start < 0) {
        s = start + arr.length
    }
    let e = end || arr.length
    if (end < 0) {
        e = end + arr.length
    }
    if (e < s) {
        return []
    }
    let result = []
    for (let i = s; i < e; i++) {
        result.push(arr[i])
    }
    return result
}

/**
 * splice
 * 1.有三个功能，删除、替换、插入，根据参数不同来进行操作
 * 2.如果是插入或替换，只需用替换元素长度减去删除的个数即可得出向后移动的位置数，把插入替换的元素在移动出空缺的位置上对号入座；
 *   如果是删除，则从起始下标与删除个数之和作为向前移动的开始下标，向前移动删除个数个位置
 * 3.位置查询，如果第一个参数是正数，则是从前往后执行，如果是负数，则是从后往前执行
 * 4.改变原数组，返回删除的值组成的数组
 */

Array.prototype._splice = function () {
    let arr = this
    if (!Array.isArray(arr)) {
        throw new Error('not Array')
    }
    if (arguments.length === 0) {
        return []
    }
    let idx // 第一个参数，起始下标
    // 如果传入的起始下标小于零，就从末尾倒数，如果下标在倒数时超过了数组长度，则直接设为0
    if (arguments[0] < 0) {
        idx = arr.length + arguments[0]
    } else {
        idx = arguments[0]
    }
    let num = arguments[1] // 第二个参数，删除的个数
    // 第三个及以后的参数，要添加或替换到原数组的元素，这里直接用了slice，可以用for挨个遍历
    let ele = Array.prototype.slice.call(arguments, 2)
    if (num > arr.length - idx) {
        // 如果传入的删除个数大于了起始位置到末尾位置之间元素的个数，最多删除到元素组最后一个元素
        num = arr.length - idx
    }
    let result = []
    for (let i = idx; i < idx + num; i++) {
        // 要返回删除的项
        result.push(arr[i])
    }
    if (ele.length > 0) {
        // 第三个参数存在，则是插入或替换，插入或替换
        for (let i = arr.length - 1, len = ele.length - num; i >= idx; i--) {
            // 从idx开始所有元素向后移len个长度
            if (len < 0) len = 0 // 防止覆盖起始下标之前的元素
            arr[i + len] = arr[i]
        }
        // 从起始位置开始将插入或替换的元素对号入座
        for (let j = 0; j < ele.length; j++) {
            arr[idx++] = ele[j]
        }
    } else {
        // 删除，后面的元素往前移num个位置，length-num
        for (let i = idx; i < arr.length; i++) {
            arr[i] = arr[i + num]
        }
        arr.length = arr.length - num
    }
    return result;
}