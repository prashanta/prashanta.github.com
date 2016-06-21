var Log        = require('log');
var program    = require('commander');
var livereload = require('livereload');
var watch      = require('watch')
var express    = require('express');
var metalsmith = require('./app/metalsmith')
var blog       = require('./app/blog')

var app = express();
var log = new Log('info');

program.version('0.0.1')
.option('-p, --publish', 'Pulish site')
.option('-b, --blog', 'Create a new blog post')
.option('-d, --delete', 'Delete an existing blog post')
.parse(process.argv);

if (program.blog){
   blog("CREATE");
}
else if(program.delete){
   blog("DELETE");
}
else if (program.publish){
   log.info('Publishing ... ');
   metalsmith(1);
   app.use('/', express.static(__dirname + '/build')); // ← adjust
   app.listen(4000, function() {
      log.info('Server listing on port 4000 ...');
   });
}
else{
   // Live-reload
   server = livereload.createServer({port: 35730});
   server.watch(__dirname + "/build");

   metalsmith();

   // Web server
   app.use('/', express.static(__dirname + '/build')); // ← adjust
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
