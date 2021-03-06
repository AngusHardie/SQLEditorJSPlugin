//
//  MHHandleBarsExporter.m
//  SQLEditorHandlebarsTemplate
//
//  Created by Angus Hardie on 16/06/2015.
//  Copyright (c) 2015 MalcolmHardie Solutions. 
//
//  BSD License Applies

// this a simple export script for SQLEditor (v3 and above)
// www.malcolmhardie.com/sqleditor/

// The SQLEditor app calls init first
// then it calls exportContainer
//
//
// this script generates output using the handlebars templating
// system, but you can do whatever you like in exportContainer


// => currently this happens for every export
// however it is intended that init
// will be called once per exporter
// and then exportContainer will be called multiple times
//


// init method is required
// you should return true if initialization
// was successful
// return false or raise exception if something went wrong 
function init()
{

    //Console.log("init plugin");
   
    SQLEditorJS.evaluate("handlebars-v3.0.3.js");
    
    Handlebars.registerHelper('if_eq', function(a, b, opts) {
                              if(a == b)
                              return opts.fn(this);
                              else
                              return opts.inverse(this);
                              });
    
    Handlebars.registerHelper('listComma', function() {
                              return ",\n"
                              });
    
    
    Handlebars.registerHelper('shouldShowIndexList', function(a, opts) {
                              
                              
                              if((a.primaryKeyList && (a.primaryKeyList.length > 0)) || (a.indexes && (a.indexes.length > 0))) {
                                return opts.fn(this);
                              }
                              });
    
    
    Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
                              lvalue = parseFloat(lvalue);
                              rvalue = parseFloat(rvalue);
                              
                              return {
                              "+": lvalue + rvalue,
                              "-": lvalue - rvalue,
                              "*": lvalue * rvalue,
                              "/": lvalue / rvalue,
                              "%": lvalue % rvalue
                              }[operator];
                              });
    
    definePartials();
    
    //Console.log("js init complete");
    
    
    return true;
    
}


function definePartials()
{
    Handlebars.registerPartial('optionalComma','{{#unless @last}}{{listComma}}{{/unless}}');

    
}




// exportContainer method is passed a json object
// representing the document object tree
// returns a string as output
function exportContainer(jsonContainer)
{
    
    //Console.log("export container");
    
    var source = SQLEditorJS.contentsOfFile("report.template");
    
    

    


    var template = Handlebars.compile(source);
    
    
    var container = JSON.parse(jsonContainer);
    
    
    
    var result = template(container);
    
    return result;
}

