'use strict';

// let fs = require ('fs');
let https = require ('https');
// const util = require('util');
var log = require('fancy-log');


let subscriptionKey = '796d3d6265a64667a2bc1902c4975bbc';

let host = 'api.cognitive.microsofttranslator.com';
let path = '/translate?api-version=3.0';

let target = 'en';

// let params = '?to=' + target;
let params = `&to=${target}`;

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let json = JSON.stringify(JSON.parse(body), null, 4);
        log(json);
        resolve (json)
       
    });
    response.on ('error', function (e) {
        log.error ('Error: ' + e.message);
        reject (e.message)
    });
    
};

let get_guid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

let Translate = function (content) {
return new Promise(function(resolve, reject) {
    let body = '';
    log (`Translating`)
    let request_params = {
        method : 'POST',
        hostname : host,
        path : path + params,
        headers : {
            'Content-Type' : 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
            'X-ClientTraceId' : get_guid (),
        }
    };

    let req = https.request (request_params, function (response) {
            response.on ('data', function (d) {
            body += d;
        });
        response.on ('end', function () {
            let json = JSON.stringify(JSON.parse(body), null, 4);
            let json3 = JSON.parse(body)
              
            // console.log(json);
            // console.log("***********************");
            // console.log(`json3[0]`);
            // console.log("***********************");
            resolve (json3)
            // resolve (json3[0].translations[0].text)
        
        });
        response.on ('error', function (e) {
            log.error ('Error: ' + e.message);
            reject (e.message)
        });


    });
    // console.log (`Content ${content}`);
    req.write (content);
    // console.log (response_handler);
    req.end ();
})}

// let content = JSON.stringify ([{'Text' : text}]);

// Translate(content)

module.exports.Translate = Translate;

