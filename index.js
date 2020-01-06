const fs = require("fs");

fs.readFile("./data/name.json", (err, data) => {
  if (!err) {
    setTimeout(() => {
      console.log("我要等3s才执行");
    }, 3000);
    console.log(data.toString());
  }
});

console.log("我要最后才执行");
