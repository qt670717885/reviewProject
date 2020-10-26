
  ​	首先http缓存指的是当客户端向服务器发送请求时，会先抵达浏览器缓存，如果浏览器有“请求资源”的副本，就可以直接从浏览器缓存中提取而不是从原始服务器中提取这个资源。一般的http缓存只能缓存get请求响应的资源。

  ​	http缓存都是从第二次请求开始的，第一次请求资源时，服务器会返回资源，并在response header头中回传资源的缓存参数，第二次请求时，浏览器判断这些请求参数，命中强缓存就直接200，否则就把请求参数加到request header头中传给服务器，看是否命中协商缓存，命中则返回304，否则服务器会返回新的资源。

  - 强缓存

    强制缓存在缓存数据未失效的情况下(即Cache-Contril的max-age没有过期或者Expries的缓存时间没有过期)，就会直接使用浏览器的缓存数据。不再向服务器发送任何请求。强制缓存生效时，http状态码为200。这种方式页面的加载速度是最快的，性能也是很好的，但是在这期间，如果服务器端的资源修改了，页面上是拿不到的，因为它不会再向服务器发请求了。这种情况就是我们在开发种经常遇到的，比如你修改了页面上的某个样式，在页面上刷新了但没有生效，因为走的是强缓存，所以Ctrl + F5一顿操作之后就好了。  跟强制缓存相关的header头属性有（Pragma/Cache-Control/Expires）

    ![img](https://upload-images.jianshu.io/upload_images/4845448-217723260f75ed90?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

    Pragma和Cache-control共存时，Pragma的优先级是比Cache-Control高的。

  - 协商缓存

    当第一次请求时服务器返回的响应头中没有Cache-Control和Expires或者Cache-Control和Expires过期还或者它的属性设置为no-cache时(即不走强缓存)，那么浏览器第二次请求时就会与服务器进行协商，与服务器端对比判断资源是否进行了修改更新。如果服务器端的资源没有修改，那么就会返回304状态码，告诉浏览器可以使用缓存中的数据，这样就减少了服务器的数据传输压力。如果数据有更新就会返回200状态码，服务器就会返回更新后的资源并且将缓存信息一起返回。跟协商缓存相关的header头属性有（ETag/If-Not-Match 、Last-Modified/If-Modified-Since）请求头和响应头需要成对出现。

    ![img](https://upload-images.jianshu.io/upload_images/4845448-a22cef109d00aa79?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

    协商缓存的执行流程是这样的：当浏览器第一次向服务器发送请求时，会在响应头中返回协商缓存的头属性：ETag和Last-Modified,其中ETag返回的是一个hash值，Last-Modified返回的是GMT格式的最后修改时间。然后浏览器在第二次发送请求的时候，会在请求头中带上与ETag对应的If-Not-Match，其值就是响应头中返回的ETag的值，Last-Modified对应的If-Modified-Since。服务器在接收到这两个参数后会做比较，如果返回的是304状态码，则说明请求的资源没有修改，浏览器可以直接在缓存中取数据，否则，服务器会直接返回数据。

    http缓存流程图

    自制 ： 
    
    ![image-20200901113955918](C:\Users\邱添\AppData\Roaming\Typora\typora-user-images\image-20200901113955918.png)
    
    网络图：
    
    ![img](https://upload-images.jianshu.io/upload_images/4050018-76363a70319fe522.png?imageMogr2/auto-orient/strip|imageView2/2/w/692/format/webp)
    
    

参考文章：

https://segmentfault.com/a/1190000008377508