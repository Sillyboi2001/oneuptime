// @ts-expect-error ts-migrate(7022) FIXME: '_gaq' implicitly has type 'any' because it does n... Remove this comment to see the full error message
window.readConfig||(window.readConfig=function(e){function t(e: $TSFixMe){return String(e).replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x2F;/g,"https://stripe.com/").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");}var n=/^[\],:{}\s]*$/,r=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,i=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,s=/(?:^|:|,)(?:\s*\[)+/g,o=document.getElementById(e);if(!o)return null;var u=t((o.textContent||o.innerHTML).replace(/^\s+|\s+$/gm,""));if(n.test(u.replace(r,"@").replace(i,"]").replace(s,"")))return window.JSON&&window.JSON.parse?window.JSON.parse(u):(new Function("return "+u))()});var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-12675062-1"]),_gaq.push(["_setDomainName",".stripe.com"]),_gaq.push(["_trackPageview",document.location.pathname+document.location.search+document.location.hash]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="../../../stats.g.doubleclick.net/dc.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();var google_conversion_id=1008370075,google_custom_params=window.google_tag_params,google_remarketing_only=!0,mpconfig=readConfig("mixpanel_config");(function(e,t){if(!t.__SV){var n,r,i,s;window.mixpanel=t,n=e.createElement("script"),n.type="text/javascript",n.async=!0,n.src="../../../cdn.mxpnl.com/libs/mixpanel-2.2.min.js",r=e.getElementsByTagName("script")[0],r.parentNode.insertBefore(n,r),t._i=[],t.init=function(e: $TSFixMe,n: $TSFixMe,r: $TSFixMe){function o(e: $TSFixMe,t: $TSFixMe){var n=t.split(".");2==n.length&&(e=e[n[0]],t=n[1]),e[t]=function(){e.push([t].concat(Array.prototype.slice.call(arguments,0)))}}var u=t;"undefined"!=typeof r?u=t[r]=[]:r="mixpanel",u.people=u.people||[],u.toString=function(e: $TSFixMe){var t="mixpanel";return"mixpanel"!==r&&(t+="."+r),e||(t+=" (stub)"),t},u.people.toString=function(){return u.toString(1)+".people (stub)"},i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(s=0;s<i.length;s++)o(u,i[s]);t._i.push([e,n,r])},t.__SV=1.2}})(document,[]),mixpanel.init(mpconfig.identifier),mpconfig.disable?mixpanel.disable():(mixpanel.register({merchant:mpconfig.register}),mixpanel.identify(mpconfig.identify),mixpanel.people.set({$email:mpconfig.person}),mixpanel.name_tag(mpconfig.name));var analyticsconfig=readConfig("analytics_config"),Analytics={};Analytics.track=function(e: $TSFixMe,t: $TSFixMe){mixpanel.track(e,t);var n=function(e: $TSFixMe){var t,n,r,i,s,o,u;n=document.cookie.split("; ");for(o=0,u=n.length;o<u;o++){t=n[o],r=t.indexOf("="),i=decodeURIComponent(t.substr(0,r)),s=decodeURIComponent(t.substr(r+1));if(i===e)return s}return null};try{analyticsconfig.merchant?stripeEvent(e,{merchant:analyticsconfig.merchant,user:analyticsconfig.user,cid:n("cid"),data:t}):stripeEvent(e,{cid:n("cid"),data:t})}catch(r){}},Analytics.page=function(e: $TSFixMe){page=window.location.pathname+window.location.search+window.location.hash,page!=="/dashboard"&&page!=="/test/dashboard"&&mixpanel.track(e+".viewed",{page:page})};