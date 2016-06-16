var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var test  = require('./plugins/test');

Metalsmith(__dirname)
  .metadata({
    title: "prashanta.xyz",
    description: "I love moving electrons!"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(test())
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });