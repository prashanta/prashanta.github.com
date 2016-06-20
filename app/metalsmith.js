
var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var metallic    = require('metalsmith-metallic');
var hljs        = require('highlight.js');
var test        = require('../plugins/test');
var Log         = require('log');
var log         = new Log('info');


// create a server
// run metalsmith
// watch for changes - if changes run metalsmith


module.exports = metalsmith;

function metalsmith(){
   Metalsmith(__dirname)
   .metadata({
      maintitle: "prashanta",
      description: "I love moving electrons"
   })
   .source('../src')
   .destination('../build')
   .clean(false)
   .use(test())
   .use(collections({
      posts: {
         pattern: 'blog/posts/*.md',
         sortBy: 'date',
         reverse: true
      },
      drafts: {
         pattern: 'blog/drafts/*.md',
         sortBy: 'date',
         reverse: true
      }
   }))
   .use(markdown({
      highlight: function (code, lang, callback) {
         return hljs.highlightAuto(code).value
   }}))
   //.use(metallic())
   .use(permalinks())
   .use(layouts({
      engine: 'handlebars',
      directory: '../layouts',
      partials: '../layouts/partials'
   }))
   .build(function(err, files) {
      if (err) { throw err; }
   });
   log.info("Metalsmith build .. done");
}
