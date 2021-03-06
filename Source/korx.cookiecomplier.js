/*! © 2012 Korx Limited */
/*
---
name: Korx.CookieComplier

version: 0.1

description: Korx.CookieComplier is an accessible and unobtrusive EU cookie compliance tool.

license: 
  - MIT-style

authors: 
  - Michael Bird <michael.bird@korx.com>

requires:

provides: 
  - Korx.CookieComplier

...
*/
if(!window.Korx){window.Korx={}}Korx.CookieComplier={text:{question:"To ensure you get the best possible experience on our website please consent to us using cookies.",allow:"Allow Cookies",close:"Close"},countries:["BE","BG","CZ","DK","DE","EE","IE","GR","ES","FR","IT","CY","LV","LT","LU","HU","MT","NL","AT","PL","PT","RO","SI","SK","FI","SE","GB"],construct:function(){Korx.CookieComplier.autodetect();Korx.CookieComplier.attach(window)},init:function(c){if(typeof c=="object"){if(typeof c.question=="string"){Korx.CookieComplier.text.question=c.question}if(typeof c.allow=="string"){Korx.CookieComplier.text.allow=c.allow}if(typeof c.close=="string"){Korx.CookieComplier.text.close=c.close}}else{if(typeof c=="string"){Korx.CookieComplier.text.question=c}}var a=document.getElementsByTagName("script");for(var b=0;b<a.length;b++){Korx.CookieComplier.attach(a[b])}Korx.CookieComplier.crumble()},allow:function(){var a=new Date();a.setDate(a.getDate()+730);document.cookie="_allow_cookies=1; expires="+a.toUTCString()},allowed:function(){return(document.cookie.indexOf("_allow_cookies")>=0)},crumble:function(){if(!Korx.CookieComplier.allowed()){var l=document.cookie.split(";");for(var j=0;j<l.length;j++){var e=l[j];var k=e.indexOf("=");var a=(k>-1?e.substr(0,k):e).replace(/^\s+/,"");document.cookie=a+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";var n=window.location.pathname.split("/");if(n.length==0||n[0]!=""){n.unshift("")}for(var b=0;b<n.length;b++){var o="";for(var g=0;g<=b;g++){o+=n[g]+"/"}var m=window.location.hostname.split(".");for(var h=m.length-1;h>=0;h--){var f="";for(var g=h;g<m.length;g++){f+="."+m[g]}document.cookie=a+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path="+o;document.cookie=a+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain="+f;document.cookie=a+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path="+o+"; domain="+f}}}}},attach:function(a){if(typeof a.onload==="function"){var c=a.onload;a.onload=function(d){c(d);Korx.CookieComplier.crumble()}}else{a.onload=Korx.CookieComplier.crumble}if(typeof a.onunload==="function"){var b=a.onunload;a.onunload=function(d){b(d);Korx.CookieComplier.crumble()}}else{a.onunload=Korx.CookieComplier.crumble}},autodetect:function(){var a=document.createElement("script");a.async=true;a.src="http://j.maxmind.com/app/country.js";a.onload=function(d){if(window.geoip_country_code){var f=geoip_country_code();if(typeof f=="string"){var g=true;for(var c=0;c<Korx.CookieComplier.countries.length;c++){if(f==Korx.CookieComplier.countries[c]){g=false}}if(g){Korx.CookieComplier.allow()}}}Korx.CookieComplier.prompt()};var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)},prompt:function(){if(document.body){if(!Korx.CookieComplier.allowed()){var a=document.createElement("div");a.setAttribute("id","korx-cookiecomplier-prompt");var b=document.createElement("div");b.setAttribute("id","korx-cookiecomplier-container");var c=document.createElement("span");c.setAttribute("id","korx-cookiecomplier-question");c.appendChild(document.createTextNode(Korx.CookieComplier.text.question));var d=document.createElement("a");d.setAttribute("id","korx-cookiecomplier-allow");d.setAttribute("href","?_allow_cookies");d.onclick=function(){document.body.removeChild(a);Korx.CookieComplier.allow();return false};d.appendChild(document.createTextNode(Korx.CookieComplier.text.allow));var e=document.createElement("a");e.setAttribute("id","korx-cookiecomplier-close");e.onclick=function(){document.body.removeChild(a)};e.appendChild(document.createTextNode(Korx.CookieComplier.text.close));b.appendChild(c);b.appendChild(d);b.appendChild(e);a.appendChild(b);document.body.appendChild(a)}}}};Korx.CookieComplier.construct();