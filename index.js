const Koa = require('koa')
var Router = require('koa-router')
const json = require('koa-json')
const cors = require('@koa/cors');
const serve = require('koa-better-serve')
const send = require('koa-send');
const views = require('koa-views');
const Handlebars = require('handlebars');
// const koaBetterBody = require('koa-better-body')
const koaBody = require('koa-body')
const translationAPI = require ('./translate.js')

const app = new Koa();
var router = new Router();
var appData = {
 "translationSource" : " ",
 "translationResults" : " ",
 "SourceLanguage": ""
}

const config = {
  "port": 3000 
}

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaBody())
  .use(json())
  .use(cors())
  .use(serve('./public'))
  

router.get ('api','/api/:text', async (ctx,next) => { 
  console.log ("API Call redirecting")
  // ctx.send('/index.html');
  // ctx.params.text
  ctx.body = await pageGenerator ();


} )

  router.get ('translate','/translate/:text', async (ctx,next) => {

    // let text = "Por favor"
    appData.translationSource = decodeURIComponent((ctx.params.text + '').replace(/\+/g, '%20')); 
    
    let content = JSON.stringify ([{'Text' : appData.translationSource}]);
    // await translationAPI.Translate(content)
    // await translationAPICall (content)
    // console.log ("First call")
    
    let newText =  await translationAPI.Translate(content)
    // newText.then ((data) => {
    //   console.log ("Resolved Promise")
    //   // console.log (data[0].translations[0].text)
    //   appData.translationResults = data[0].translations[0].text
    //   console.log ("Response")
      
    // })
    // console.log ('Lower call')
    appData.translationResults = newText[0].translations[0].text
    appData.SourceLanguage=newText[0].detectedLanguage.language
    console.log (newText[0])
    // console.log (appData.translationResults);
    // ctx.body = {
    //   "Source" : appData.translationSource,
    //   "Translation": appData.translationResults,
    //   "Source language":  appData.SourceLanguage}
    // console.log (Object.values(param));

    ctx.body = await pageGenerator ()
  
  })

router.get('/translate/public/img/(.*)', async ctx => {
  serve('./public/img')
  // ctx.body ="Test"
});  

app.use( async (ctx,next) => {
  console.log ("Second call")
  // ctx.res = `Hello`
  // ctx.res = appData.translationResults;
  // ctx.body = appData.translationResults;
  // console.log (ctx.body);
});

// async function translationAPICall (content) {
//   return new Promise ( (reject,resolve) => {
//     try {
//       console.log ("In translationAPICall")
//     let newText =  translationAPI.Translate(content)
//     newText.then ((data) => {
//       console.log ("Resolved Promise")
//       // console.log (data[0].translations[0].text)
//       appData.translationResults = data[0].translations[0].text
//       console.log ("Response")
//       resolve ()
//     })
//   }
//   catch (err) {
//     console.log (err);
//     reject (err);
    
//   }
//   })
// }

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
 
    // var data = appData;
    var result = template(appData);
    resolve (result)
    }

    catch (error) {
      reject (error)

    }

  } )


}

app.listen(config.port, () => console.log(`TranslationApp listening on port ${config.port}`))