
import express from 'express'

import cors from 'cors'
import compression from 'compression'
import { json } from 'body-parser'

import { entries } from './clients/contentful'


import Main from './dist/main.svelte.js'

const timestamp = Date.now()
const server = express()
server.disable('x-powered-by')
server.enable('trust proxy')

server.use(cors({ origin: true }))
server.use(compression())

server.get('*', json(), async (req, res) => {
  const locale = req.query['locale']
  const content = await entries(req.query['locale'] || 'en-US')
  
  const { head, html, css } = Main.render({
    defaultLocale: locale,
		defaultContent: content,
    defaultPath: req.params['0']
  })

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.send(`<!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="https://images.ctfassets.net/igsltvx7i8jl/4MyTMxMx4QayHycRvCRFZq/c74cf2550f0dec9105563dc3f3a991a6/icon.png">
      
      ${head}

      <style>${css.code}</style>
    </head>
    <body>
      <div id="main">${html}</div>
      <script>
        window.locale = ${locale ? `"${locale}"`: 'undefined'};
      </script>
      <script defer src="/hydrate.${timestamp}.js"></script>

      <style>
        @font-face {
          font-family: 'Inter';
          src: url('https://rsms.me/inter/font-files/Inter-Regular.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Inter';
          src: url('https://rsms.me/inter/font-files/Inter-SemiBold.woff2') format('woff2');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Inter';
          src: url('https://rsms.me/inter/font-files/Inter-Italic.woff2') format('woff2');
          font-weight: normal;
          font-style: italic;
          font-display: swap;
        }
      </style>
      <link rel="stylesheet" href="/hydrate.${timestamp}.css" />

      <script async defer src="https://js.stripe.com/v3/"></script>
      <script async defer src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3.1.237/umd/crate.min.js">
        new Crate({
          server: '578597625188712448',
          channel: '578597625188712450',
          shard: 'https://disweb.deploys.io',
          color: '#27AE60',
          glyph: ['https://images.ctfassets.net/igsltvx7i8jl/31YpHiSCYxX1kchiFs28iZ/e772b04abf43fb00f1a540593316ae5f/comment-discussion.svg', '50%'],
          css: '.button { box-shadow: none; width: 56px; } @media (max-width: 500px) { .button { border-bottom-left-radius: 50%; border-top-right-radius: 50%; } }',
          defer: true
        })
      </script>
      <script>(function(a,b,c){var d=a.history,e=document,f=navigator||{},g=localStorage,
        h=encodeURIComponent,i=d.pushState,k=function(){return Math.random().toString(36)},
        l=function(){return g.cid||(g.cid=k()),g.cid},m=function(r){var s=[];for(var t in r)
        r.hasOwnProperty(t)&&void 0!==r[t]&&s.push(h(t)+"="+h(r[t]));return s.join("&")},
        n=function(r,s,t,u,v,w,x){var z="https://www.google-analytics.com/collect",
        A=m({v:"1",ds:"web",aip:c.anonymizeIp?1:void 0,tid:b,cid:l(),t:r||"pageview",
        sd:c.colorDepth&&screen.colorDepth?screen.colorDepth+"-bits":void 0,dr:e.referrer||
        void 0,dt:e.title,dl:e.location.origin+e.location.pathname+e.location.search,ul:c.language?
        (f.language||"").toLowerCase():void 0,de:c.characterSet?e.characterSet:void 0,
        sr:c.screenSize?(a.screen||{}).width+"x"+(a.screen||{}).height:void 0,vp:c.screenSize&&
        a.visualViewport?(a.visualViewport||{}).width+"x"+(a.visualViewport||{}).height:void 0,
        ec:s||void 0,ea:t||void 0,el:u||void 0,ev:v||void 0,exd:w||void 0,exf:"undefined"!=typeof x&&
        !1==!!x?0:void 0});if(f.sendBeacon)f.sendBeacon(z,A);else{var y=new XMLHttpRequest;
        y.open("POST",z,!0),y.send(A)}};d.pushState=function(r){return"function"==typeof d.onpushstate&&
        d.onpushstate({state:r}),setTimeout(n,c.delay||10),i.apply(d,arguments)},n(),
        a.ma={trackEvent:function o(r,s,t,u){return n("event",r,s,t,u)},
        trackException:function q(r,s){return n("exception",null,null,null,null,r,s)}}})
        (window,"UA-140459737-1",{anonymizeIp:true,colorDepth:true,characterSet:true,screenSize:true,language:true});
      </script>
    </body>
  </html>`)
})

export default server