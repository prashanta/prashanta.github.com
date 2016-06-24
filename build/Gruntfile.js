module.exports = function(grunt) {
   grunt.initConfig({
      metalsmith: {
         site: {
            options: {
               metadata: {
                  maintitle: "gemcity",
                  description: ""
               },
               plugins: {
                  'metalsmith-collections': {posts: {
                     pattern: 'posts/*.md',
                     sortBy: 'date',
                     reverse: true
                  }},
                  '../../../plugins/test.js': {},
                  'metalsmith-markdown': {},
                  'metalsmith-permalinks': {},
                  'metalsmith-layouts': {
                     engine: 'handlebars',
                     partials: 'layouts/partials'
                  }l
               }
            },
            clean: false,
            src: 'src',
            dest: 'build'
         }
      }
   });

   // Load the plugin that provides the "uglify" task.
   grunt.loadNpmTasks('grunt-metalsmith');

   // Default task(s).
   grunt.registerTask('default', ['metalsmith']);

};
