
var livereload = require('livereload');
var watch      = require('watch')
var express    = require('express');
var metalsmith = require('./metalsmith')
var app = express();

module.exports = serve;

function serve(log){
   // Live-reload
   server = livereload.createServer({port: 35730});
   server.watch(__dirname + "/../build");

   metalsmith();

   // Web server
   console.log(__dirname);
   app.use('/', express.static(__dirname + '/../build')); // ← adjust
   app.listen(4000, function() {
      log.info('Server listing on port 4000 ...');
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
   });

   watch.watchTree('./layouts', function (f, curr, prev) {
      if (typeof f == "object" && prev === null && curr === null) {
         log.info("Finished walking the tree at /layouts");
      }
      else{
         log.info("File changed: " + f);
         metalsmith();
      }
   });
}
