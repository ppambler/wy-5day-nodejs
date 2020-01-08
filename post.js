const http = require("http");
const queryString = require("querystring");
let server = http.createServer((request, response) => {
  let arr = []; // 很多时候传输的是文件 -> 所以用的是数组而不是字符串 -> 如果传过来的是字符串，那就用字符串拼接就好了

  // 开始接受数据 -> do -> callback
  request.on("data", data => {
    arr.push(data);
    console.log(1, arr); //[ <Buffer 75 73 65 72 6e 61 6d 65 3d 64 61 64 61 26 70 61 73 73 77 6f 72 64 3d 64 64> ]
  });
  // 数据接收完（数据不可能一直在接收，所以总有结束的时候） -> do -> callback
  request.on("end", () => {
    console.log(2, Buffer.concat(arr)); //<Buffer 75 73 65 72 6e 61 6d 65 3d 64 61 64 61 26 70 61 73 73 77 6f 72 64 3d 64 64>
    let buffer = Buffer.concat(arr); // post是分段传送，传递过来的是碎片，我们需要重新组装
    console.log(4, buffer.toString()); //'username=dada&password=dd'
    // 把数据解析成有意义的数据
    let post = queryString.parse(buffer.toString());
    console.log(3, post); //[Object: null prototype] { username: 'dada', password: 'dd' }
    console.log("走了几次这个end"); //  -> 2次，第一次就把数据走完了呀，为啥还要再走，而且第二次走的结果是「[Object: null prototype] { username: 'dada', password: 'dd' }「2，<Buffer>」「4，''」「3，[Object: null prototype] {}」，而这意味着执行了两次end()，但第一次end()的时候，意味着浏览器不会再旋转logo了
    response.end();
  });
});

server.listen(3000);
