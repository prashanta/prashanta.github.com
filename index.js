var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var metallic    = require('metalsmith-metallic');
var hljs        = require('highlight.js');


var test  = require('./plugins/test');

Metalsmith(__dirname)
.metadata({
   maintitle: "prashanta.xyz",
   description: "I love moving electrons"
})
.source('./src')
.destination('./build')
.clean(false)
.use(test())
.use(collections({
   posts: {
      pattern: 'blog/posts/*.md',
      sortBy: 'date',
      reverse: true
   }
}))
.use(markdown({
    highlight: function (code, lang, callback) {
        console.log(code);
        console.log(lang);
            return hljs.highlightAuto(code).value
}}))
//.use(metallic())
.use(permalinks())
.use(layouts({
   engine: 'handlebars',
   partials: 'layouts/partials'
}))
.build(function(err, files) {
   if (err) { throw err; }
});
