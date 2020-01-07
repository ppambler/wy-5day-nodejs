const http = require("http");
const fs = require("fs");
let server = http.createServer((request, response) => {
  // 处理静态资源
  let url = request.url;
  fs.readFile(`index${url}`, (err, buffer) => {
    if (err) {
      response.write("this page is not found");
      response.end();
    } else {
      response.write(buffer);
      response.end();
    }
  });
});

server.listen(3000);
