var livereload = require('livereload');

server = livereload.createServer({port: 35729});
server.watch(__dirname + "/build");
