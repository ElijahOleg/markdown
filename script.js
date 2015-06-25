var fs = require("fs"),
    http = require("http"),
    url = require('url'),
    exec = require("child_process").exec,
    marked = require('marked');


http.createServer(responseHandler).listen(process.env.PORT);


function responseHandler(req, res) {
  if (req.url.match("/")) {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('index.html', 'utf8', function (err,data) {
      res.write(data);
      res.end();
    });
  }else if(req.url.match(/\/markdown\//)){
    var content = req.url.match(/\/markdown\/(.*)/)[1];
    console.log(content);
    var markedup = marked(decodeURIComponent(content));
    res.write(markedup);
    res.end();
  }
}
