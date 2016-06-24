var Log        = require('log');
var program    = require('commander');
var serve = require('./app/serve')
var metalsmith = require('./app/metalsmith')
var blog       = require('./app/blog')

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
}
else{
   serve(log);
}
