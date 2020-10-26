/**
 * 数组去重
 */

// 方法一 ,使用Set

function unique(arr) {
    // 或者 [...new Set(arr
// )]
return Array.from(new Set(arr))
}

// 方法二 使用indexOf去重

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

// 方法三 利用filter

function unique(arr) {
    return arr.filter(function (item, index, arr) {
        //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        return arr.indexOf(item, 0) === index;
    });
}