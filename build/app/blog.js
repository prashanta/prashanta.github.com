var inquirer = require('inquirer');
var moment      = require('moment');
var _      = require('underscore');
var fs = require('fs');


module.exports = blog;

function blog(option){
   var today = moment(new Date()).format('YYYY-MM-DD');
   if(option === "CREATE"){
      var questions = [
         {  type: 'input',
            name: 'title',
            message: 'Enter title',
            validate: function(value){
               return value == ""? "Enter title" : true;
            }
         },
         {  type: 'input',
            name: 'date',
            message: 'Enter publish date (YYYY/MM/DD)',
            default: function () {
               return today;
            }
         }
      ];
      inquirer.prompt(questions).then(function (answers) {
         var folder = __dirname +'/../src/blog/drafts/';
         var file = answers.date + '-' + answers.title;
         var contents = "---\r\n" +
                        "date: " + answers.date + '\r\n' +
                        "layout: post.html" + '\r\n' +
                        "title: " + answers.title + '\r\n' +
                        "---\r\n";

         file = (file.replace(/\s+/g, "-").toLowerCase()) + ".md";
         console.log("Crreate a file,,,,, " + file);
         fs.writeFileSync(folder + file, contents);
      });
   }
   else if(option === "DELETE"){
      var folder = __dirname + '/../src/blog/drafts/';
      var list = fs.readdirSync(folder);
      list = _.reject(list, function(item){
         return item.indexOf('.') == 0;
      })
      var questions = [
         {  type: 'list',
            name: 'file',
            message: 'Select file to delete',
            choices : list
         }
      ];
      inquirer.prompt(questions).then(function (answers) {
         console.log(JSON.stringify(answers, null, '  '));
      });
   }
}
