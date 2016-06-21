
var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var metallic    = require('metalsmith-metallic');
var hljs        = require('highlight.js');
var hbhelpers   = require('../plugins/hbhelpers');
var Log         = require('log');
var log         = new Log('info');



// create a server
// run metalsmith
// watch for changes - if changes run metalsmith


module.exports = metalsmith;

function metalsmith(publish){
   var config = require('../config');
   var col = {
      posts: {
         pattern: 'blog/posts/*.md',
         sortBy: 'date',
         reverse: true
      }
   };
   var doClean = true;

   if(!publish){
      doClean = false;
      col.drafts = {
         pattern: 'blog/drafts/*.md',
         sortBy: 'date',
         reverse: true
      }
   }

   Metalsmith(__dirname)
   .metadata({
      maintitle: config.siteTitle,
      description: config.siteTagLine
   })
   .source('../src')
   .destination('../build')
   .clean(doClean)
   .use(hbhelpers())
   .use(collections(col))
   .use(markdown({
      highlight: function (code) {
         return hljs.highlightAuto(code).value
      }
   }))
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
