
function ajax(method,url,async,val=null) {
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open(method,url,async)
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4 && (xhr.status>=200 && xhr.status <400)){
                resolve(xhr.responseText)
            }else{
                reject(xhr.status,Error)
            }
        }
    })
    xhr.send(val) // 没有时需要传null
}