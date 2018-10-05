const Koa = require('koa')
var Router = require('koa-router')
const json = require('koa-json')
const cors = require('@koa/cors');
const serve = require('koa-better-serve')
var http = require('http');
var https = require('https');
var fs = require('fs');
var enforceHttps = require('koa-sslify');
var log = require('fancy-log');
// const send = require('koa-send');
// const views = require('koa-views');
const Handlebars = require('handlebars');
// const koaBetterBody = require('koa-better-body')
const koaBody = require('koa-body')
const translationAPI = require ('./translate.js')
const Iog = require('iog');
// var fs = require('fs');
// var enforceHttps = require('koa-sslify');
 

const app = new Koa();
var router = new Router();
const logger = new Iog('my-module-name');
var appData = {
 "translationSource" : " ",
 "translationResults" : " ",
 "SourceLanguage": ""
}

const config = {
  "httpPort": 3010,
  "httpsPort": 1025 
}

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaBody())
  .use(json())
  .use(cors())
  .use(serve('./public'))
  .use(enforceHttps());
  // .use(enforceHttps({
    // trustProtoHeader: true
  // }));
  

router.get ('api','/api/:text', async (ctx,next) => { 
  ctx.body = await pageGenerator ();


} )

  router.get ('translate','/translate/:text', async (ctx,next) => {
    try {log (`Request received`)
  
    appData.translationSource = decodeURIComponent((ctx.params.text + '').replace(/\+/g, '%20')); 
    
    let content = JSON.stringify ([{'Text' : appData.translationSource}]);
    
    let newText =  await translationAPI.Translate(content)
    appData.translationResults = newText[0].translations[0].text
    appData.SourceLanguage=newText[0].detectedLanguage.language
    // console.log (newText[0])
    
    ctx.body = await pageGenerator ()
    log (`Information sent`)
    }
    catch (error) {
      log.error (error)
    }
  })

// router.get('/translate/public/img/(.*)', async ctx => {
//   serve('./public/img')
// });  

async function pageGenerator () {

  return new Promise ( (resolve, reject) => {

    try {
      var source = `<!DOCTYPE html>
      <html>
      <head>
        <!-- <meta charset="utf-8" /> -->
        <!--[if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script><![endif]-->
        <title>Yale New Haven Health Auto-Translate</title>
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <link href="../css/style.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">	
        <script>
        </script>
      </head>
      
      <body>
      
      <div class="wrapper">
      
        <header class="header">
          <img id="hl" src="../img/translate.png" height="60%" width=auto>	
          <strong id="title"> Auto-Translate</strong> 
        </header><!-- .header-->
      
        <div class="middle">
      
          <div class="container">
            <main class="content">
              <strong></strong>
            </main><!-- .content -->
          </div>
      
          <aside class="left-sidebar">
            <strong><h3>Source:</h3></strong> {{translationSource}}
          </aside><!-- .left-sidebar -->
      
          <aside class="right-sidebar">
            <strong><h3>Translation:</h3></strong> {{translationResults}} </aside><!-- .right-sidebar -->
      
        </div><!-- .middle-->
        <h5 id="discl"> This is computer generated translation. Please use only for as a reference   </h5>
      </div><!-- .wrapper -->
      
      <footer class="footer">
          <img src="../img/YNHHSLogo.png" height=auto width="20%">
        </footer> <!-- .footer -->
      
      </body>
      
      </html>`;
    var template = Handlebars.compile(source);
 
    var result = template(appData);
    resolve (result)
    }

    catch (error) {
      reject (error)

    }

  } )


}

var options = {
  key: fs.readFileSync('cert/server.key'),
  cert: fs.readFileSync('cert/server.crt')
}

// app.listen(config.port, () => console.log(`TranslationApp listening on port ${config.port}`))

http.createServer(app.callback()).listen(config.httpPort);
https.createServer(options, app.callback()).listen(config.httpsPort);
let msgServ = `  Translate application listening on the following ports:
- HTTP : ${config.httpPort}
- HTTPS: ${config.httpsPort}`

// logger.write(msgServ);
log (msgServ)

