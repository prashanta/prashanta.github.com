/**
* Expose `plugin`.
*/
var Handlebars  = require('handlebars');
var moment      = require('moment');
module.exports = plugin;

/**
* A Metalsmith plugin to hide any files marked as `draft`.
*
* @return {Function}
*/

function plugin(){
    return function(opts){
        Handlebars.registerHelper('link', function(path) {
            return '/' + path;
        });

        Handlebars.registerHelper('date', function(date) {
            return moment(date).format('Do MMM YY');
        });
    };
}
