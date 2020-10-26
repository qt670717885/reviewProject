/**
 * 排序算法
 */

let arr = [3, 1, 6, 5, 9, 7, 4, 8, 2]

// 冒泡排序
// 时间复杂度 O(n^2) 空间复杂度 O(1)
function bubbleSort(arr) {

    for (let i = 0; i < arr.length; i++) { // 总共需要的轮数
        for (let j = 0; j < arr.length - i - 1; j++) { // 两两比较的轮数
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = tmp
            }
        }
    }

    return arr
}
// console.log(bubbleSort(arr))

// 选择排序
// 时间复杂度 O(n^2),空间复杂度 O(1)
// 工作原理 : 初始时在未排序的数组中找最小的元素，放到起始位置作为已排序序列，再在剩余未排序中继续找，以此类推


function selectSort(arr) {
    let len = arr.length;
    //已排序序列的末尾
    for (let i = 0; i < len; i++) {
        let min = i;
        //待排序序列
        for (let j = i + 1; j < len; j++) {
            //从待排序序列中找到最小值
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;

}

// console.log(selectSort(arr))

// 插入排序
// 平均时间复杂福 O(n^2) 空间复杂度 O(1) 稳定性：稳定

function insertSort(arr) {
    let len = arr.length
    let preIndex, current
    for (let i = 1; i < len; i++) {
        preIndex = i - 1
        current = arr[i]
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
        }
        arr[preIndex + 1] = current
    }
    return arr
}
// console.log(insertSort(arr))

// 快速排序
// 时间复杂度 O(nlogn) 空间复杂度O(logn) 
function quickSort(nums) {
    if (nums.length < 2) return nums;

    const pivot = Math.floor(num.length/2);
    const left = [];
    const right = [];
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < pivot) {
            left.push(nums[i])
        } else {
            right.push(nums[i])
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)]

}

// 归并排序
// 平均时间复杂福O(nlogn) 空间复杂度O(n),稳定
function mregeSort(arr) {
    if (arr.length < 2) return arr
    let mid = Math.floor(arr.length / 2)
    let left = arr.slice(0, mid)
    let right = arr.slice(mid)
    return mrege(mregeSort(left), mregeSort(right))
}

function mrege(left, right) {
    let result = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    while (left.length) {
        result.push(left.shift())
    }
    while (right.length) {
        result.push(right.shift())
    }
    return result
}



console.log(mregeSort(arr))