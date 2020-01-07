const http = require("http");
const fs = require("fs");
const url = require("url"); //用于解析处理url
let server = http.createServer((request, response) => {
  // 处理静态资源
  // let url = request.url;
  // fs.readFile(`index${url}`, (err, buffer) => {
  //   if (err) {
  //     response.write("this page is not found");
  //     response.end();
  //   } else {
  //     console.log(buffer);
  //     response.write(buffer);
  //     response.end();
  //   }
  // });
  let { path, query } = url.parse(request.url, true); //true -> 把查询字符串 -> queryString -> 「username=dada&password=dada」转化成对象，不然你就用正则去处理
  console.log(path);
  console.log(query);
  //path -> /get?username=dada&password=dada
  //query -> { username: 'dada', password: 'dada' }
  response.end();
});

server.listen(3000);
