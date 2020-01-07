const http = require("http"); //系统内置的模块，如果使用第三方模块，需要用npm或yarn安装

let server = http.createServer((request, response) => {
  response.write("hello world!");
  response.end(); //没有这行代码，浏览器那个tab的logo会一直转。总之，咩有这行代码的话，那么浏览器就会傻傻地在等待，认为请求仍在处理中
});

server.listen(3000);
