var express = require('express');
var livereload = require('livereload');
var metalsmith = require('./app/metalsmith')
var watch = require('watch')
var Log = require('log');
var log = new Log('info');

var app = express();

metalsmith();

// Live-reload
server = livereload.createServer({port: 35729});
server.watch(__dirname + "/build");

// Web server
app.use('/', express.static(__dirname + '/build')); // ← adjust
app.listen(3000, function() {
   log.info('Server listing on port 3000 ...');
});

// File watch
watch.watchTree('./src', function (f, curr, prev) {
   if (typeof f == "object" && prev === null && curr === null) {
      log.info("Finished walking the tree at /src");
   }
   else{
      log.info("File changed: " + f);
      metalsmith();
   }
})
watch.watchTree('./layouts', function (f, curr, prev) {
   if (typeof f == "object" && prev === null && curr === null) {
      log.info("Finished walking the tree at /layouts");
   }
   else{
      log.info("File changed: " + f);
      metalsmith();
   }
})
