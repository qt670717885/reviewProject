function countoff(N,M){
    if(N < 1 || M <1) return
    let arr = []
    for(let i = 1;i<=N;i++){
        arr.push(i)
    }
    let index = 0;
    while(arr.length > 1){
        index = (index+M-1) % arr.length
        arr.splice(index,1)
    }
    return arr[0]
}

console.log(countoff(3,2)) 