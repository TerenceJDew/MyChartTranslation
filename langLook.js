'use strict';

// let fs = require ('fs');
// let https = require ('https');
const util = require('util');
var log = require('fancy-log');

const Lang = [
    {
      Language: 'Arabic',
      Code: 'ar'
    },
    {
      Language: 'Bangla',
      Code: 'bn'
    },
    {
      Language: 'Bosnian (Latin)',
      Code: 'bs'
    },
    {
      Language: 'Bulgarian',
      Code: 'bg'
    },
    {
      Language: 'Chinese Simplified',
      Code: 'zh-Hans'
    },
    {
      Language: 'Croatian',
      Code: 'hr'
    },
    {
      Language: 'Czech',
      Code: 'cs'
    },
    {
      Language: 'Danish',
      Code: 'da'
    },
    {
      Language: 'Dutch',
      Code: 'nl'
    },
    {
      Language: 'English',
      Code: 'en'
    },
    {
      Language: 'Estonian',
      Code: 'et'
    },
    {
      Language: 'Finnish',
      Code: 'fi'
    },
    {
      Language: 'French',
      Code: 'fr'
    },
    {
      Language: 'German',
      Code: 'de'
    },
    {
      Language: 'Greek',
      Code: 'el'
    },
    {
      Language: 'Hebrew',
      Code: 'he'
    },
    {
      Language: 'Hindi',
      Code: 'hi'
    },
    {
      Language: 'Hungarian',
      Code: 'hu'
    },
    {
      Language: 'Icelandic',
      Code: 'is'
    },
    {
      Language: 'Indonesian',
      Code: 'id'
    },
    {
      Language: 'Italian',
      Code: 'it'
    },
    {
      Language: 'Japanese',
      Code: 'ja'
    },
    {
      Language: 'Kiswahili',
      Code: 'sw'
    },
    {
      Language: 'Korean',
      Code: 'ko'
    },
    {
      Language: 'Latvian',
      Code: 'lv'
    },
    {
      Language: 'Lithuanian',
      Code: 'lt'
    },
    {
      Language: 'Malagasy',
      Code: 'mg'
    },
    {
      Language: 'Norwegian',
      Code: 'nb'
    },
    {
      Language: 'Polish',
      Code: 'pl'
    },
    {
      Language: 'Portuguese',
      Code: 'pt'
    },
    {
      Language: 'Romanian',
      Code: 'ro'
    },
    {
      Language: 'Russian',
      Code: 'ru'
    },
    {
      Language: 'Samoan',
      Code: 'sm'
    },
    {
      Language: 'Serbian (Latin)',
      Code: 'sr-Latn'
    },
    {
      Language: 'Slovak',
      Code: 'sk'
    },
    {
      Language: 'Slovenian',
      Code: 'sl'
    },
    {
      Language: 'Spanish',
      Code: 'es'
    },
    {
      Language: 'Swedish',
      Code: 'sv'
    },
    {
      Language: 'Thai',
      Code: 'th'
    },
    {
      Language: 'Turkish',
      Code: 'tr'
    },
    {
      Language: 'Ukrainian',
      Code: 'uk'
    },
    {
      Language: 'Vietnamese',
      Code: 'vi'
    },
    {
      Language: 'Welsh',
      Code: 'cy'
    }
    
  ]

// let search = Lang.find(obj => obj.Code == 'ja');
// log (search);
// log (search.Language);


let langLook = function (content) {

    return new Promise(function(resolve, reject) {

        log (`Matching ${content} language code`);
        let langSearch= Lang.find(obj => obj.Code == content);
        log (`Language found ${langSearch.Language}`)
        resolve (langSearch.Language)

    })


}
module.exports.langLook = langLook;