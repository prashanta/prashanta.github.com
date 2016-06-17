var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var collections    = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var Handlebars  = require('handlebars');
var test  = require('./plugins/test');

Handlebars.registerHelper('link', function(path) {
    return metadata.baseUrl + '/' + path;
});

Metalsmith(__dirname)
.metadata({
   maintitle: "prashanta.xyz",
   description: "I love moving electrons!"
})
.source('./src')
.destination('./build')
.clean(false)
.use(collections({
   posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
   }
}))
.use(test())
.use(markdown())
.use(permalinks())
.use(layouts({
   engine: 'handlebars',
   partials: 'layouts/partials'
}))
.build(function(err, files) {
   if (err) { throw err; }
});
