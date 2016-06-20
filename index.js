var express = require('express');
var livereload = require('livereload');
var metalsmith = require('./app/metalsmith')
var watch = require('watch')
var app = express();

metalsmith();

// Live-reload
server = livereload.createServer({port: 35729});
server.watch(__dirname + "/build");

// Web server
app.use('/', express.static(__dirname + '/build')); // ← adjust
app.listen(3000, function() { console.log('listening'); });

// File watch
watch.watchTree('./src', function (f, curr, prev) {
   metalsmith();
})
watch.watchTree('./layouts', function (f, curr, prev) {
   if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
   } else if (prev === null) {
      // f is a new file
   } else if (curr.nlink === 0) {
      // f was removed
   } else {
      // f was changed
   }
   metalsmith();
})
