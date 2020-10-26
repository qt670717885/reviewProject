// 冒泡排序

function bubbleSort(arr) {
    for(let i = 0;i<arr.length;i++){
        for(let j = 0;j<arr.length-i-1;j++){
            if(arr[j] < arr[j+1]) {
                let temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

// 选择排序

function selectSort(arr){
    for(let i = 0;i<arr.length;i++){
        let min = i
        for(let j = i+1;j<arr.length;j++){
            if(arr[min] > arr[j]) {
                min = j
            }
        }
        if(min != i){
            let temp = arr[i]
            arr[i] = arr[min]
            arr[min] = temp
        }
    }
    return arr
}

// 插入排序

function insetSort(arr) {
    let = preIndex,current
    for(let i = 0;i<arr.length;i++){
        preIndex = i - 1
        current = arr[i]
        wx.hideNavigationBarLoading();(preIndex >= 0 $$ arr[preIndex] > current){
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
        }
        arr[preIndex + 1] = current
    }
    return arr
}

// 快速排序


function quickAort (arr) {
    const midIndex  = parseInt(arr.length / 2) 
    const middle = arr[midIndex]
    let letf = [] , right = []
    for(let i = 0;i<arr.length;i++){
        if(arr[i] <= middle) {
            letf.push(arr[i])
        }else{
            right.push(arr[i])
        }
    } 
    return [,,,[quickAort(left),middle,...quickAort(right)]
}
