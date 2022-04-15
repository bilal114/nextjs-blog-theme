/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
const HTMLWebpackPlugin = require('html-webpack-plugin');

const Positions = {
  headEnd: 'headEnd',
  headStart: 'headStart',
};

function giveHTMLSnippetInjectorPlugin(snippet, position = Positions.headEnd) {
  class InjectedScriptPlugin {
    apply(compiler) {
      compiler.hooks.compilation.tap('InjectedScriptPlugin', (compilation) => {
        HTMLWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('InjectedScriptPlugin', (htmlPluginData, cb) => {
          switch (position) {
            case Positions.headEnd: {
              const replacer = '</head>';
              htmlPluginData.html = htmlPluginData.html.replace(replacer, `${snippet}${replacer}`);
              break;
            }
            case Positions.headStart: {
              // eslint-disable-next-line no-useless-escape
              const replacer = /(<head>[\s\n]*?<meta[\s]*?charset="utf-8"[\s]*?[\/]?>)/gi;
              const replaced = '<head><meta charset="utf-8">';
              htmlPluginData.html = htmlPluginData.html.replace(replacer, `${replaced}${snippet}`);
              break;
            }
            default: {
              cb(new Error('Invalid Script Position'));
            }
          }
          cb(null, htmlPluginData);
        });
      });
    }
  }

  return new InjectedScriptPlugin();
}

const Snippets = {
  injectEnv(env) {
    return `<script>
        window.__NODE_CONFIG_ENV = '${env}';
        dataLayer = [];
    </script>`;
  },
  gtm(id) {
    return `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');</script>`;
  },
  mixpanel(id) {
    return `<script type="text/javascript">!function(e,t){if(!t.__SV){var n,o,a=window;try{var r,p,i,c=a.location,l=c.hash;r=function(e,t){return(p=e.match(RegExp(t+"=([^&]*)")))?p[1]:null},l&&r(l,"state")&&("mpeditor"===(i=JSON.parse(decodeURIComponent(r(l,"state")))).action&&(a.sessionStorage.setItem("_mpcehash",l),history.replaceState(i.desiredHash||"",e.title,c.pathname+c.search)))}catch(e){}window.mixpanel=t,t._i=[],t.init=function(e,a,r){function p(e,t){var n=t.split(".");2==n.length&&(e=e[n[0]],t=n[1]),e[t]=function(){e.push([t].concat(Array.prototype.slice.call(arguments,0)))}}var i=t;for(void 0!==r?i=t[r]=[]:r="mixpanel",i.people=i.people||[],i.toString=function(e){var t="mixpanel";return"mixpanel"!==r&&(t+="."+r),e||(t+=" (stub)"),t},i.people.toString=function(){return i.toString(1)+".people (stub)"},n="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" "),o=0;o<n.length;o++)p(i,n[o]);var c="set set_once union unset remove delete".split(" ");i.get_group=function(){function e(e){t[e]=function(){call2_args=arguments,call2=[e].concat(Array.prototype.slice.call(call2_args,0)),i.push([n,call2])}}for(var t={},n=["get_group"].concat(Array.prototype.slice.call(arguments,0)),o=0;o<c.length;o++)e(c[o]);return t},t._i.push([e,a,r])};var s=new RegExp("/^///");t.__SV=1.2,(a=e.createElement("script")).type="text/javascript",a.async=!0,a.src="undefined"!=typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(s)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js",(r=e.getElementsByTagName("script")[0]).parentNode.insertBefore(a,r)}}(document,window.mixpanel||[]);mixpanel.init('${id}');</script>`;
  },
  hotjar(id) {
    return `<script type="text/javascript">(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${id},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');</script>`;
  },
  intercom(id) {
    return `<script type="text/javascript">(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${id}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();</script>`;
  },
  segment(id) {
    return `<script>
    !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="${id}";analytics.SNIPPET_VERSION="4.13.2";
    analytics.load("${id}");
    analytics.page();
    }}();
  </script>`;
  },
  pixel(id) {
    return `<script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${id}');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1"
    /></noscript>`;
  },
};

module.exports = { giveScriptInjectorPlugin: giveHTMLSnippetInjectorPlugin, Snippets, Positions };
