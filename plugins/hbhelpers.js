var Handlebars  = require('handlebars');
var moment      = require('moment');
module.exports = hbhelpers;

function hbhelpers(){
    return function(opts){
        Handlebars.registerHelper('link', function(path) {
            return '/' + path;
        });

        Handlebars.registerHelper('date', function(date) {
            return moment(date).format('Do MMM YY');
        });
    };
}
