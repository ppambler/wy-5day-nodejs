const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");

let app = http.createServer((request, response) => {
  let path = null;
  let get = {};
  let post = {};
  // 大写的动词
  if (request.method === "GET") {
    console.log(1, "Get");
    let { pathname, query } = url.parse(request.url, true);
    path = pathname;
    get = query;
    complete();
  } else if (request.method === "POST") {
    let arr = [];
    let { pathname } = url.parse(request.url);
    path = pathname;
    request.on("data", data => {
      arr.push(data);
    });

    request.on("end", () => {
      let buffer = Buffer.concat(arr); // post是分段传送，传递过来的是碎片，我们需要重新组装，
      post = querystring.parse(buffer.toString());
      complete();
    });
  }

  function complete() {
    console.log(5, path === "/reg");
    console.log(6, path);
    if (path === "/reg") {
      console.log("访问了注册页面");
    } else if (path === "/login") {
      console.log("访问了登录页面");
    } else {
      console.log(2, "static");
      console.log(4, request.url);
      let url = request.url;
      fs.readFile(`index${url}`, (err, buffer) => {
        console.log(3, err);
        if (err) {
          response.write("this page is not found");
          response.end();
        } else {
          response.write(buffer);
          response.end();
        }
      });
    }
  }
});

app.listen(3000);
