Drupal.locale = { 'strings': {"":{"An AJAX HTTP error occurred.":"C\u00f3 l\u1ed7i AJAX HTTP.","HTTP Result Code: !status":"K\u1ebft qu\u1ea3 m\u00e3 HTTP: !status","An AJAX HTTP request terminated abnormally.":"Y\u00eau c\u1ea7u AJAX HTTP k\u1ebft th\u00fac b\u1ea5t th\u01b0\u1eddng.","Debugging information follows.":"R\u00e0 l\u1ed7i theo th\u00f4ng tin sau.","Path: !uri":"\u0110\u01b0\u1eddng d\u1eabn: !uri","StatusText: !statusText":"StatusText: !statusText","ResponseText: !responseText":"ResponseTextt: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Loading":"\u0110ang n\u1ea1p","(active tab)":"(tab ho\u1ea1t \u0111\u1ed9ng)","Hide":"\u1ea8n","Show":"Hi\u1ec7n","Re-order rows by numerical weight instead of dragging.":"S\u1eafp x\u1ebfp l\u1ea1i danh m\u1ee5c theo \u0111\u1ed9 n\u1eb7ng thay v\u00ec k\u00e9o ch\u00fang.","Show row weights":"Hi\u1ec7n tr\u1ecdng s\u1ed1 h\u00e0ng","Hide row weights":"\u1ea8n tr\u1ecdng s\u1ed1 h\u00e0ng","Drag to re-order":"K\u00e9o \u0111\u1ec3 s\u1eafp x\u1ebfp l\u1ea1i","Changes made in this table will not be saved until the form is submitted.":"C\u00e1c thay \u0111\u1ed5i \u0111\u01b0\u1ee3c th\u1ef1c hi\u1ec7n trong b\u1ea3ng n\u00e0y s\u1ebd kh\u00f4ng \u0111\u01b0\u1ee3c l\u01b0u cho \u0111\u1ebfn khi bi\u1ec3u m\u1eabu \u0111\u01b0\u1ee3c \u0111\u1ec7 tr\u00ecnh.","Preview":"Xem tr\u01b0\u1edbc","@title dialog":"H\u1ed9p tho\u1ea1i @title","Select all rows in this table":"Ch\u1ecdn t\u1ea5t c\u1ea3 c\u00e1c d\u00f2ng trong b\u1ea3ng n\u00e0y","Deselect all rows in this table":"B\u1ecf ch\u1ecdn t\u1ea5t c\u1ea3 c\u00e1c d\u00f2ng trong b\u1ea3ng n\u00e0y","Edit":"S\u1eeda","Configure":"C\u1ea5u h\u00ecnh","Hide shortcuts":"\u1ea8n li\u00ean k\u1ebft nhanh","OK":"OK","Cancel":"H\u1ee7y b\u1ecf","Show shortcuts":"Hi\u1ec7n li\u00ean k\u1ebft nhanh","Not published":"Ch\u01b0a c\u00f4ng b\u1ed1","@number comments per page":"@number l\u1eddi b\u00ecnh m\u1ed7i trang","Customize dashboard":"S\u1eeda c\u1ea5u h\u00ecnh kh\u1ed1i","Requires a title":"Ph\u1ea7n ti\u00eau \u0111\u1ec1 l\u00e0 b\u1eaft bu\u1ed9c","Don\u0027t display post information":"Hi\u1ec3n th\u1ecb tho\u1ea1i th\u00f4ng tin ch\u1eef","Done":"Xong","Not restricted":"Kh\u00f4ng h\u1ea1n ch\u1ebf","Restricted to certain pages":"H\u1ea1n ch\u1ebf \u0111\u1ed1i v\u1edbi m\u1ed9t s\u1ed1 trang","Not customizable":"Ng\u01b0\u1eddi d\u00f9ng kh\u00f4ng \u0111\u01b0\u1ee3c ph\u00e9p t\u00f9y ch\u1ec9nh","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"C\u00e1c thay \u0111\u1ed5i \u0111\u1ed1i v\u1edbi c\u00e1c kh\u1ed1i n\u1ed9i dung n\u00e0y s\u1ebd ch\u01b0a \u0111\u01b0\u1ee3c l\u01b0u cho \u0111\u1ebfn khi n\u00fat \u003Cem\u003EL\u01b0u c\u00e1c kh\u1ed1i n\u1ed9i dung\u003C\/em\u003E \u0111\u01b0\u1ee3c nh\u1ea5p.","The block cannot be placed in this region.":"Kh\u00f4ng th\u1ec3 \u0111\u01b0a kh\u1ed1i n\u00e0y v\u00e0o v\u00f9ng n\u00e0y."}} };;
/*!
	Colorbox v1.4.37 - 2014-02-11
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=Z+o),n&&(r.style.cssText=n),e(r)}function n(){return i.innerHeight?i.innerHeight:e(i).height()}function r(e){var t=k.length,i=(j+e)%t;return 0>i?t+i:i}function h(e,t){return Math.round((/%/.test(e)?("x"===t?E.width():n())/100:1)*parseInt(e,10))}function s(e,t){return e.photo||e.photoRegex.test(t)}function l(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function a(e){"contains"in g[0]&&!g[0].contains(e.target)&&(e.stopPropagation(),g.focus())}function d(){var t,i=e.data(N,Y);null==i?(B=e.extend({},X),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},i);for(t in B)e.isFunction(B[t])&&"on"!==t.slice(0,2)&&(B[t]=B[t].call(N));B.rel=B.rel||N.rel||e(N).data("rel")||"nofollow",B.href=B.href||e(N).attr("href"),B.title=B.title||N.title,"string"==typeof B.href&&(B.href=e.trim(B.href))}function c(i,o){e(t).trigger(i),st.triggerHandler(i),e.isFunction(o)&&o.call(N)}function u(i){q||(N=i,d(),k=e(N),j=0,"nofollow"!==B.rel&&(k=e("."+et).filter(function(){var t,i=e.data(this,Y);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===B.rel}),j=k.index(N),-1===j&&(k=k.add(N),j=k.length-1)),w.css({opacity:parseFloat(B.opacity),cursor:B.overlayClose?"pointer":"auto",visibility:"visible"}).show(),J&&g.add(w).removeClass(J),B.className&&g.add(w).addClass(B.className),J=B.className,B.closeButton?K.html(B.close).appendTo(x):K.appendTo("<div/>"),U||(U=$=!0,g.css({visibility:"hidden",display:"block"}),H=o(lt,"LoadedContent","width:0; height:0; overflow:hidden"),x.css({width:"",height:""}).append(H),O=y.height()+C.height()+x.outerHeight(!0)-x.height(),_=b.width()+T.width()+x.outerWidth(!0)-x.width(),D=H.outerHeight(!0),A=H.outerWidth(!0),B.w=h(B.initialWidth,"x"),B.h=h(B.initialHeight,"y"),H.css({width:"",height:B.h}),Q.position(),c(tt,B.onOpen),P.add(L).hide(),g.focus(),B.trapFocus&&t.addEventListener&&(t.addEventListener("focus",a,!0),st.one(rt,function(){t.removeEventListener("focus",a,!0)})),B.returnFocus&&st.one(rt,function(){e(N).focus()})),m())}function f(){!g&&t.body&&(V=!1,E=e(i),g=o(lt).attr({id:Y,"class":e.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),w=o(lt,"Overlay").hide(),W=e([o(lt,"LoadingOverlay")[0],o(lt,"LoadingGraphic")[0]]),v=o(lt,"Wrapper"),x=o(lt,"Content").append(L=o(lt,"Title"),S=o(lt,"Current"),I=e('<button type="button"/>').attr({id:Z+"Previous"}),R=e('<button type="button"/>').attr({id:Z+"Next"}),M=o("button","Slideshow"),W),K=e('<button type="button"/>').attr({id:Z+"Close"}),v.append(o(lt).append(o(lt,"TopLeft"),y=o(lt,"TopCenter"),o(lt,"TopRight")),o(lt,!1,"clear:left").append(b=o(lt,"MiddleLeft"),x,T=o(lt,"MiddleRight")),o(lt,!1,"clear:left").append(o(lt,"BottomLeft"),C=o(lt,"BottomCenter"),o(lt,"BottomRight"))).find("div div").css({"float":"left"}),F=o(lt,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),P=R.add(I).add(S).add(M),e(t.body).append(w,g.append(v,F)))}function p(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||e.ctrlKey||(e.preventDefault(),u(this))}return g?(V||(V=!0,R.click(function(){Q.next()}),I.click(function(){Q.prev()}),K.click(function(){Q.close()}),w.click(function(){B.overlayClose&&Q.close()}),e(t).bind("keydown."+Z,function(e){var t=e.keyCode;U&&B.escKey&&27===t&&(e.preventDefault(),Q.close()),U&&B.arrowKey&&k[1]&&!e.altKey&&(37===t?(e.preventDefault(),I.click()):39===t&&(e.preventDefault(),R.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+Z,"."+et,i):e("."+et).live("click."+Z,i)),!0):!1}function m(){var n,r,a,u=Q.prep,f=++at;$=!0,z=!1,N=k[j],d(),c(ht),c(it,B.onLoad),B.h=B.height?h(B.height,"y")-D-O:B.innerHeight&&h(B.innerHeight,"y"),B.w=B.width?h(B.width,"x")-A-_:B.innerWidth&&h(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=h(B.maxWidth,"x")-A-_,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=h(B.maxHeight,"y")-D-O,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,G=setTimeout(function(){W.show()},100),B.inline?(a=o(lt).hide().insertBefore(e(n)[0]),st.one(ht,function(){a.replaceWith(H.children())}),u(e(n))):B.iframe?u(" "):B.html?u(B.html):s(B,n)?(n=l(B,n),z=t.createElement("img"),e(z).addClass(Z+"Photo").bind("error",function(){B.title=!1,u(o(lt,"Error").html(B.imgError))}).one("load",function(){var t;f===at&&(e.each(["alt","longdesc","aria-describedby"],function(t,i){var o=e(N).attr(i)||e(N).attr("data-"+i);o&&z.setAttribute(i,o)}),B.retinaImage&&i.devicePixelRatio>1&&(z.height=z.height/i.devicePixelRatio,z.width=z.width/i.devicePixelRatio),B.scalePhotos&&(r=function(){z.height-=z.height*t,z.width-=z.width*t},B.mw&&z.width>B.mw&&(t=(z.width-B.mw)/z.width,r()),B.mh&&z.height>B.mh&&(t=(z.height-B.mh)/z.height,r())),B.h&&(z.style.marginTop=Math.max(B.mh-z.height,0)/2+"px"),k[1]&&(B.loop||k[j+1])&&(z.style.cursor="pointer",z.onclick=function(){Q.next()}),z.style.width=z.width+"px",z.style.height=z.height+"px",setTimeout(function(){u(z)},1))}),setTimeout(function(){z.src=n},1)):n&&F.load(n,B.data,function(t,i){f===at&&u("error"===i?o(lt,"Error").html(B.xhrError):e(this).contents())})}var w,g,v,x,y,b,T,C,k,E,H,F,W,L,S,M,R,I,K,P,B,O,_,D,A,N,j,z,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1},Y="colorbox",Z="cbox",et=Z+"Element",tt=Z+"_open",it=Z+"_load",ot=Z+"_complete",nt=Z+"_cleanup",rt=Z+"_closed",ht=Z+"_purge",st=e("<a/>"),lt="div",at=0,dt={},ct=function(){function e(){clearTimeout(h)}function t(){(B.loop||k[j+1])&&(e(),h=setTimeout(Q.next,B.slideshowSpeed))}function i(){M.html(B.slideshowStop).unbind(l).one(l,o),st.bind(ot,t).bind(it,e),g.removeClass(s+"off").addClass(s+"on")}function o(){e(),st.unbind(ot,t).unbind(it,e),M.html(B.slideshowStart).unbind(l).one(l,function(){Q.next(),i()}),g.removeClass(s+"on").addClass(s+"off")}function n(){r=!1,M.hide(),e(),st.unbind(ot,t).unbind(it,e),g.removeClass(s+"off "+s+"on")}var r,h,s=Z+"Slideshow_",l="click."+Z;return function(){r?B.slideshow||(st.unbind(nt,n),n()):B.slideshow&&k[1]&&(r=!0,st.one(nt,n),B.slideshowAuto?i():o(),M.show())}}();e.colorbox||(e(f),Q=e.fn[Y]=e[Y]=function(t,i){var o=this;if(t=t||{},f(),p()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,Y,e.extend({},e.data(this,Y)||X,t))}).addClass(et),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&u(o[0])}return o},Q.position=function(t,i){function o(){y[0].style.width=C[0].style.width=x[0].style.width=parseInt(g[0].style.width,10)-_+"px",x[0].style.height=b[0].style.height=T[0].style.height=parseInt(g[0].style.height,10)-O+"px"}var r,s,l,a=0,d=0,c=g.offset();if(E.unbind("resize."+Z),g.css({top:-9e4,left:-9e4}),s=E.scrollTop(),l=E.scrollLeft(),B.fixed?(c.top-=s,c.left-=l,g.css({position:"fixed"})):(a=s,d=l,g.css({position:"absolute"})),d+=B.right!==!1?Math.max(E.width()-B.w-A-_-h(B.right,"x"),0):B.left!==!1?h(B.left,"x"):Math.round(Math.max(E.width()-B.w-A-_,0)/2),a+=B.bottom!==!1?Math.max(n()-B.h-D-O-h(B.bottom,"y"),0):B.top!==!1?h(B.top,"y"):Math.round(Math.max(n()-B.h-D-O,0)/2),g.css({top:c.top,left:c.left,visibility:"visible"}),v[0].style.width=v[0].style.height="9999px",r={width:B.w+A+_,height:B.h+D+O,top:a,left:d},t){var u=0;e.each(r,function(e){return r[e]!==dt[e]?(u=t,void 0):void 0}),t=u}dt=r,t||g.css(r),g.dequeue().animate(r,{duration:t||0,complete:function(){o(),$=!1,v[0].style.width=B.w+A+_+"px",v[0].style.height=B.h+D+O+"px",B.reposition&&setTimeout(function(){E.bind("resize."+Z,function(){Q.position()})},1),e.isFunction(i)&&i()},step:o})},Q.resize=function(e){var t;U&&(e=e||{},e.width&&(B.w=h(e.width,"x")-A-_),e.innerWidth&&(B.w=h(e.innerWidth,"x")),H.css({width:B.w}),e.height&&(B.h=h(e.height,"y")-D-O),e.innerHeight&&(B.h=h(e.innerHeight,"y")),e.innerHeight||e.height||(t=H.scrollTop(),H.css({height:"auto"}),B.h=H.height()),H.css({height:B.h}),t&&H.scrollTop(t),Q.position("none"===B.transition?0:B.speed))},Q.prep=function(i){function n(){return B.w=B.w||H.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function h(){return B.h=B.h||H.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(U){var a,d="none"===B.transition?0:B.speed;H.empty().remove(),H=o(lt,"LoadedContent").append(i),H.hide().appendTo(F.show()).css({width:n(),overflow:B.scrolling?"auto":"hidden"}).css({height:h()}).prependTo(x),F.hide(),e(z).css({"float":"none"}),a=function(){function i(){e.support.opacity===!1&&g[0].style.removeAttribute("filter")}var n,h,a=k.length,u="frameBorder",f="allowTransparency";U&&(h=function(){clearTimeout(G),W.hide(),c(ot,B.onComplete)},L.html(B.title).add(H).show(),a>1?("string"==typeof B.current&&S.html(B.current.replace("{current}",j+1).replace("{total}",a)).show(),R[B.loop||a-1>j?"show":"hide"]().html(B.next),I[B.loop||j?"show":"hide"]().html(B.previous),ct(),B.preloading&&e.each([r(-1),r(1)],function(){var i,o,n=k[this],r=e.data(n,Y);r&&r.href?(i=r.href,e.isFunction(i)&&(i=i.call(n))):i=e(n).attr("href"),i&&s(r,i)&&(i=l(r,i),o=t.createElement("img"),o.src=i)})):P.hide(),B.iframe?(n=o("iframe")[0],u in n&&(n[u]=0),f in n&&(n[f]="true"),B.scrolling||(n.scrolling="no"),e(n).attr({src:B.href,name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",h).appendTo(H),st.one(ht,function(){n.src="//about:blank"}),B.fastIframe&&e(n).trigger("load")):h(),"fade"===B.transition?g.fadeTo(d,1,i):i())},"fade"===B.transition?g.fadeTo(d,0,function(){Q.position(0,a)}):Q.position(d,a)}},Q.next=function(){!$&&k[1]&&(B.loop||k[j+1])&&(j=r(1),u(k[j]))},Q.prev=function(){!$&&k[1]&&(B.loop||j)&&(j=r(-1),u(k[j]))},Q.close=function(){U&&!q&&(q=!0,U=!1,c(nt,B.onCleanup),E.unbind("."+Z),w.fadeTo(B.fadeOut||0,0),g.stop().fadeTo(B.fadeOut||0,0,function(){g.add(w).css({opacity:1,cursor:"auto"}).hide(),c(ht),H.empty().remove(),setTimeout(function(){q=!1,c(rt,B.onClosed)},1)}))},Q.remove=function(){g&&(g.stop(),e.colorbox.close(),g.stop().remove(),w.remove(),q=!1,g=null,e("."+et).removeData(Y).removeClass(et),e(t).unbind("click."+Z))},Q.element=function(){return e(N)},Q.settings=X)})(jQuery,document,window);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $('.colorbox', context)
      .once('init-colorbox')
      .colorbox(settings.colorbox);
  }
};

{
  $(document).bind('cbox_complete', function () {
    Drupal.attachBehaviors('#cboxLoadedContent');
  });
}

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxInline = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $.urlParam = function(name, url){
      if (name == 'fragment') {
        var results = new RegExp('(#[^&#]*)').exec(url);
      }
      else {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
      }
      if (!results) { return ''; }
      return results[1] || '';
    };
    $('.colorbox-inline', context).once('init-colorbox-inline').colorbox({
      transition:settings.colorbox.transition,
      speed:settings.colorbox.speed,
      opacity:settings.colorbox.opacity,
      slideshow:settings.colorbox.slideshow,
      slideshowAuto:settings.colorbox.slideshowAuto,
      slideshowSpeed:settings.colorbox.slideshowSpeed,
      slideshowStart:settings.colorbox.slideshowStart,
      slideshowStop:settings.colorbox.slideshowStop,
      current:settings.colorbox.current,
      previous:settings.colorbox.previous,
      next:settings.colorbox.next,
      close:settings.colorbox.close,
      overlayClose:settings.colorbox.overlayClose,
      maxWidth:settings.colorbox.maxWidth,
      maxHeight:settings.colorbox.maxHeight,
      innerWidth:function(){
        return $.urlParam('width', $(this).attr('href'));
      },
      innerHeight:function(){
        return $.urlParam('height', $(this).attr('href'));
      },
      title:function(){
        return decodeURIComponent($.urlParam('title', $(this).attr('href')));
      },
      iframe:function(){
        return $.urlParam('iframe', $(this).attr('href'));
      },
      inline:function(){
        return $.urlParam('inline', $(this).attr('href'));
      },
      href:function(){
        return $.urlParam('fragment', $(this).attr('href'));
      }
    });
  }
};

})(jQuery);
;
/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
 browser: true */

/*global jQuery: true debug: true Drupal: true window: true */


var ThemeBuilder = ThemeBuilder || {};

/**
 * The Bar class is the interface through which the themebuilder is added to
 * the page.  It exposes application level functionality, such as save,
 * publish, export.  It also provides APIs for the rest of the application to
 * interact with the themebuilder user interface.
 *
 * @class
 *
 * This class implements the singleton design pattern.
 */
ThemeBuilder.Bar = ThemeBuilder.initClass();

/**
 * This static method is the only way an instance of the Bar class should be
 * retrieved.  It ensures only one instance of the Bar class exists.
 *
 * @static
 *
 * @param {boolean} createIfNeeded
 *   (Optional) Indicates whether the instance should be created if it doesn't
 *   already exist.  Defaults to true.
 *
 * @return {ThemeBuilder.Bar}
 *   The instance of the ThemeBuilder.Bar class.  If no instance currently
 *   exists, one will be created as a result of calling this method.
 */
ThemeBuilder.Bar.getInstance = function (createIfNeeded) {
  createIfNeeded = createIfNeeded === undefined ? true : createIfNeeded;
  if (!ThemeBuilder.Bar._instance && createIfNeeded) {
    ThemeBuilder.Bar._instance = new ThemeBuilder.Bar();
  }
  return (ThemeBuilder.Bar._instance);
};

/**
 * The constructor of the Bar class.
 */
ThemeBuilder.Bar.prototype.initialize = function () {
  if (ThemeBuilder.Bar._instance) {
    throw "ThemeBuilder.Bar is a singleton that has already been instantiated.";
  }
  this.changed = false;
  this._dialogs = {};
  this.saving = false;
  this.links = {};
  this.showing = false;
  this.loader = null;
  if (ThemeBuilder.undoButtons) {
    ThemeBuilder.undoButtons.addStatusChangedListener(this);
  }
  this._attachEventHandlers();
  this._tabLoadRequests = [];
  this.listeners = [];
};

/**
 * Attaches event handlers to the buttons.  This must be called or the buttons
 * won't do anything.
 *
 * @private
 */
ThemeBuilder.Bar.prototype._attachEventHandlers = function () {
  var $ = jQuery;
  // Before attaching event handlers, make sure the elements exist.
  var selectors = ['#themebuilder-wrapper .export',
    '#themebuilder-wrapper #save',
    '#themebuilder-wrapper #save-as',
    '#themebuilder-wrapper #publish',
    '#themebuilder-mini-button',
    '#themebuilder-exit-button'];
  for (var index = 0; index < selectors.length; index++) {
    var selector = selectors[index];
    if (selector.indexOf('#themebuilder') === 0) {
      if ($(selector).length === 0) {
        // The element does not exist on the page yet.  Wait for the element
        // to appear before adding event listeners.
        setTimeout(ThemeBuilder.bindIgnoreCallerArgs(this, this._attachEventHandlers), 150);
        return;
      }
    }
  }
  // The elements exist.  Attach the event handlers.
  $('#themebuilder-wrapper').click(ThemeBuilder.bind(this, this.quarantineEvents));
  $('#themebuilder-wrapper .export').click(ThemeBuilder.bind(this, this.exportTheme));
  $('#themebuilder-wrapper #save').click(ThemeBuilder.bind(this, this.saveHandler));
  $('#themebuilder-wrapper #save-as').click(ThemeBuilder.bind(this, this.saveas));
  $('#themebuilder-wrapper #publish').click(ThemeBuilder.bind(this, this.publishHandler));
  $('#themebuilder-mini-button').click(ThemeBuilder.bind(this, this.toggleMinimize));
  $('#themebuilder-exit-button').click(ThemeBuilder.bindIgnoreCallerArgs(this, this.exit, true));
  $('#themebuilder-main').bind('save', ThemeBuilder.bind(this, this._saveCallback));
  $('#themebuilder-main').bind('modified', ThemeBuilder.bind(this, this.indicateThemeModified));
};

/**
 * Keypress event handler, to correctly handle the Enter key in save dialogs.
 *
 * @private
 *
 * @param {event} event
 *   The keypress event.
 * @param {string} dialogName
 *   The name of the save dialog.
 */
ThemeBuilder.Bar.prototype._handleKeyPress = function (event, dialogName) {
  if ((event.which && event.which === 13) || (event.keyCode && event.keyCode === 13)) {
    // This only works because the OK button appears first in the markup.
    this.getDialog(dialogName).siblings('.ui-dialog-buttonpane').find('button:first').click();
    return ThemeBuilder.util.stopEvent(event);
  }
};

/**
 * Displays an indicator over the current page to indicate the themebuilder is
 * busy.
 */
ThemeBuilder.Bar.prototype.showWaitIndicator = function () {
  var $ = jQuery;
  // Show the throbber to indicate it's loading.
  $('<div class="themebuilder-loader"></div>').
    appendTo($('body'));
};

/**
 * Removes the busy indicator.
 */
ThemeBuilder.Bar.prototype.hideWaitIndicator = function () {
  var $ = jQuery;
  $('.themebuilder-loader').remove();
};

/**
 * Called when the user clicks the button to enter the themebuilder.  This
 * method causes the themebuilder to open.
 */
ThemeBuilder.Bar.prototype.openThemebuilder = function () {
  if (this.showing && !this.forceReload) {
    return;
  }
  // Don't open Themebuilder if the overlay is open.
  if (Drupal.overlay && (Drupal.overlay.isOpen || Drupal.overlay.isOpening)) {
    Drupal.overlay.close();
  }
  var ic = new ThemeBuilder.StartInteraction();
  ic.start();
};
/**
 * Reloads the page.
 */
ThemeBuilder.Bar.prototype.reloadPage = function (data) {
  var $ = jQuery;

  // If there was an error, then stop.
  if (data && data.error) {
    alert(data.error);
    this.hideWaitIndicator();
    return;
  }

  // Reload, which is required even if there are no changes to the
  // theme to make sure the gears work after the themebuilder is
  // closed.
  parent.location.reload(true);
};

/**
 * Displays the themebuilder user interface and performs any necessary
 * initialization.
 */
ThemeBuilder.Bar.prototype.show = function () {
  if (this.showing) {
    return;
  }
  var $ = jQuery;
  this.showing = true;
  this.trackWindowSize();

  // Disable the undo and redo buttons until the themebuilder is fully started.
  var statusKey;
  if (ThemeBuilder.undoButtons) {
    statusKey = ThemeBuilder.undoButtons.disable();
  }

  $('#themebuilder-wrapper').show();
  $('body').addClass('themebuilder');
  $('#themebuilder-main').tabs(
    {select: ThemeBuilder.bind(this, this.tabSelected)}
  );
  this._initializeCurrentTab();

  if (!Drupal.settings.themebuilderSaved) {
    $('#themebuilder-save #save').addClass('disabled');
  }
  var state = this.getSavedState();
  $('#themebuilder-main').tabs('select', '#' + state.tabId);
  this.getTabObject(state.tabId).show();

  this._createVeil();

  // Allow the undo and redo buttons to be used now that the themebuilder is
  // ready.
  if (statusKey) {
    ThemeBuilder.undoButtons.clear(statusKey);
  }
  statusKey = undefined;

  $('#themebuilder-theme-name .theme-name').truncate({addtitle: true});
  this.showInitialAlert();
};

/**
 * Called when the application init data is available.
 *
 * @param {Object} data
 *   The Application init data.
 */
ThemeBuilder.Bar.initializeUserInterface = function (data) {
  var $ = jQuery;
  ThemeBuilder.Bar.showInitialMessage(data);
  var bar = ThemeBuilder.Bar.getInstance();
  bar.setChanged(Drupal.settings.themebuilderIsModified);
  bar.buildThemeUpdateLink();
  if (!bar.userMayPublish()) {
    bar.hidePublishButton();
  }
};

/**
 * Hides the Publish button as soon as it is available in the DOM.
 */
ThemeBuilder.Bar.prototype.hidePublishButton = function () {
  var $button = jQuery('#themebuilder-wrapper #publish');
  if ($button.length === 0) {
    setTimeout(ThemeBuilder.bindIgnoreCallerArgs(this, this.hidePublishButton), 150);
    return;
  }

  // The publish button now exists in the DOM, so it can be hidden.
  $button.hide();
};

/**
 * Sets up the update theme indicator according to whether an update is
 * available or not.
 */
ThemeBuilder.Bar.prototype.buildThemeUpdateLink = function () {
  var data = ThemeBuilder.getApplicationInstance().getData(),
  $ = jQuery,
  alertImage = $();
  if (Drupal.settings.themebuilderAlertImage) {
    alertImage = $('<img>', {
      src: Drupal.settings.themebuilderAlertImage
    })
    .addClass('tb-alert-icon');
  }
  // Build the theme update link and append it to the #themebuilder-wrapper.
  // Someday we'll have templates for these things.
  $('<div>', {
    id: 'themebuilder-theme-update',
    // The empty object is necessary to make the div element render.
    html: $('<div>', {})
    .append(alertImage)
    .append($('<span>', {
        text: Drupal.t('New theme update')
      })
      .addClass('tb-label')
    )
    .append($('<span>', {
        text: Drupal.t('Preview')
      })
      .addClass('tb-link')
      .click(ThemeBuilder.bind(this, this.updateTheme))
    )
    .addClass('tb-update-available-wrapper')
  })
  .addClass((data.theme_update_available) ? '' : 'tb-disabled')
  .prependTo('#themebuilder-wrapper');
};

/**
 * Causes window resizes to be detected, and resizes the themebuilder panel
 * accordingly.
 */
ThemeBuilder.Bar.prototype.trackWindowSize = function () {
  var $ = jQuery;
  $(window).resize(ThemeBuilder.bind(this, this.windowSizeChanged));
  this.windowSizeChanged();
};

/**
 * When the window size changes, reset the max-width property of the
 * themebuilder.  Certain properties applied to the body tag will have an
 * effect on the layout of the themebuilder.  These include padding and
 * margin.  Because they change the size of the actual window, this type of
 * CSS "leakage" could not be fixed by the css insulator or iframe alone.
 *
 * @param {Event} event
 *   The window resize event.
 */
ThemeBuilder.Bar.prototype.windowSizeChanged = function (event) {
  var $ = jQuery;
  var win = window;
  if (event && event.currentTarget) {
    win = event.currentTarget;
  }
  $('#themebuilder-wrapper').css('max-width', $(win).width());
};

/**
 * Returns tab info for the specified tab.  The tab can be specified by id
 * (ex: themebuilder-layout) or name (ex: layout).  If the tabName is not
 * provided, the info for the currently selected theme will be used.
 *
 * @param tabName
 *   The name of the tab to provide info for.  If not provided, the current
 *   tab will be used.
 *
 * @return {Array}
 *   An array of information about the specified tab.  This includes the name,
 *   title, weight, link, and id.
 */
ThemeBuilder.Bar.prototype.getTabInfo = function (tabName) {
  var tabId, name, state, tabInfo;
  if (!tabName) {
    state = this.getSavedState();
    tabId = state.tabId;
    name = tabId.replace(/^themebuilder-/, '');
  }
  else {
    name = tabName.replace(/^[#]?themebuilder-/, '');
    tabId = 'themebuilder-' + name;
  }
  // Note (jbeach): This might not be the right place to do the following
  // fallback to a default tab. I'm not wild about calling saveState in a get.
  //
  // The saved state might differ from the available toolbar items if the user's
  // access privileges to this tab have been revoked since they last had the
  // ThemeBuilder open. If the tab is in the toolbarItems, we can proceed.
  if (name in Drupal.settings.toolbarItems) {
    tabInfo = ThemeBuilder.clone(Drupal.settings.toolbarItems[name]);
    tabInfo.id = tabId;
  }
  // Otherwise, get the first tab and return that as the current tab.
  else {
    tabInfo = ThemeBuilder.clone(this.getDefaultState());
    tabInfo.id = 'themebuilder-' + tabInfo.name;
    this.saveState(tabInfo.id);
  }
  return tabInfo;
};

/**
 * Returns the object that manages the tab with the specified id.
 *
 * The tab manager has the following methods:
 *   show - called when the tab is selected by the user.
 *   hide - called when the user traverses away from the tab.
 *
 * @param {String} id
 *   The id associated with the tab.
 *
 * @return {Object}
 *   The object that manages the tab associated with the id.  An exception is
 *   thrown if the id is unknown.
 */
ThemeBuilder.Bar.prototype.getTabObject = function (id) {
  switch (id) {
  case 'themebuilder-brand':
    return ThemeBuilder.brandEditor;
  case 'themebuilder-advanced':
    return ThemeBuilder.AdvancedTab.getInstance();
  case 'themebuilder-layout':
    return ThemeBuilder.LayoutEditor.getInstance();
  case 'themebuilder-style':
    return ThemeBuilder.styleEditor;
  case 'themebuilder-themes':
    return ThemeBuilder.themeSelector;
  default:
    throw Drupal.t('ThemeBuilder.Bar.getTabObject: unknown tab %id', {'%id': id});
  }
};

/**
 * Called when a major tab in the themebuilder is selected.  This method is
 * responsible for sending messages to the currently open tab and the tab
 * being opened so the tabs can do necessary cleanup before the UI is updated.
 *
 * @param {Event} event
 *   The tabselect event.
 * @param {Object} ui
 *   The jQuery object associated with changing tabs.  This object holds
 *   information about the tab being selected.
 *
 * @return {boolean}
 *   True if the tab selection should be honored; false if the tab selection
 *   should be aborted.
 */
ThemeBuilder.Bar.prototype.tabSelected = function (event, ui) {
  var currentTabInfo = this.getTabInfo();
  var newTabInfo = this.getTabInfo(ui.tab.hash);

  if (currentTabInfo.id !== newTabInfo.id) {
    // Only hide the current tab if we selected a different tab.
    var current = this.getTabObject(currentTabInfo.id);
    if (current.hide() === false) {
      return false;
    }
  }
  this._initializeTab(newTabInfo.name);
  var panel = this.getTabObject(newTabInfo.id);
  if (panel.show() === false) {
    return false;
  }
  for (var i = 0; i < this.listeners.length; i++) {
    if (this.listeners[i].selectorChanged) {
      this.listeners[i].handleTabSwitch(panel);
    }
  }

  return true;
};

/**
 * Saves the current state of the UI.
 *
 * The state include the current tab id, and can contain other
 * information as needed.  This method determines whether it is
 * necessary to save the state to avoid sending unnecessary requests
 * to the server.
 *
 * @param {String} tabId
 *   The element id of the currently selected tab.
 * @param {Object} otherInfo
 *   Any other information that should be saved with the state.
 * @param {Function} successCallback
 *   The callback that should be invoked upon success.
 * @param {Function} failureCallback
 *   The callback that should be invoken upon failure.
 */
ThemeBuilder.Bar.prototype.saveState = function (tabId, otherInfo, successCallback, failureCallback) {
  var originalState = this.getSavedState();
  // Avoid superfluous requests to the server.
  if (originalState && originalState.tabId === tabId &&
      !otherInfo &&
      !successCallback) {
    return;
  }

  // Send the request.
  var state = {
    tabId: tabId,
    info: otherInfo
  };
  ThemeBuilder.postBack('themebuilder-save-state', {state: JSON.stringify(state)}, successCallback, failureCallback);
  Drupal.settings.toolbarState = state;
};

/**
 * Returns the currently saved state.
 *
 * The saved state can be in one of two forms - the older form is a
 * simple string containing the tab id, the newer form is an object
 * that contains the tab id as a field.  This method reads both and
 * returns the newer object form.  This will ease the update
 * transition.
 *
 * @return {Object}
 *   An object containing the saved state, including a field name
 *   'tabId' that contains the id of the active tab.
 */
ThemeBuilder.Bar.prototype.getSavedState = function () {
  var state;
  state = Drupal.settings.toolbarState;
  if (!state) {
    throw new Error('Drupal.settings.toolbarState is not set.');
  }
  if (!state.tabId) {
    try {
      state = jQuery.parseJSON(Drupal.settings.toolbarState);
    } catch (e) {
      if (typeof(state) === 'string') {
	// The state is a string, not an object.  Originally the state
	// was a string that only contained the id of the tab element.
	// Create a new structure with that info.
        state = {
          tabId: state,
          info: {}
        };
      }
    }
    // Only parse this info once.
    Drupal.settings.toolbarState = state;
  }

  if (state.tabId[0] === '#') {
    state.tabId = state.tabId.slice(1);
    Drupal.settings.toolbarState = state;
  }
  return state;
};

/**
 *
 */
ThemeBuilder.Bar.prototype.getDefaultState = function () {
  var state, items, tab;
  items = Drupal.settings.toolbarItems;
  if (items && items.length === 0) {
    throw new Error('Drupal.settings.toolbarItems does not contain any items.');
  }
  else {
    // Get the first tab in the list. The tabs are keyed by tab name.
    tabInfo: for (tab in items) {
      if (items.hasOwnProperty(tab)) {
        state = items[tab];
        break tabInfo;
      }
    }
  }
  return state;
};

/**
 * Initializes the tab associated with the specified name.  This method loads
 * all of the javascript assocaited with the tab.
 *
 * @private
 *
 * @param {String} name
 *   The name of the tab to initialize.  This will be used to construct the
 *   element id associated with the tab.
 */
ThemeBuilder.Bar.prototype._initializeTab = function (name) {
  var obj = this.getTabInfo(name);
  if (this._tabLoadRequests[obj.id] === true) {
    // The tab contents have already been requested.
    this.saveState(obj.id);
    return;
  }
  var $ = jQuery;
  this.links[obj.name] = obj.link;
  var panel = $('#' + obj.id);
  if (obj.link) {
    ThemeBuilder.load(panel, obj.link, {}, ThemeBuilder.bind(this, this.tabResourcesLoaded, obj, name, panel), '', false);
  }
  // Allow modules to define tabs with no server-side markup.
  else {
    this.tabResourcesLoaded('', 'success', obj, name, panel);
  }

  // Remember that we requested the tab contents.
  this._tabLoadRequests[obj.id] = true;
};

/**
 * Called when the tab resources are loaded.  This method is responsible for
 * initializing the tabs as soon as the tab is loaded.
 *
 * @param {String} markup
 *   The markup resulting from loading the tab.
 * @param {String} status
 *   Indicates whether the load succeeded.  Should be "success".
 * @param {Object} obj
 *   Provides information about the tab.
 * @param {String} name
 *   The name of the tab.
 * @param {jQuery Object} panel
 *   The object representing the panel associated with the tab.
 */
ThemeBuilder.Bar.prototype.tabResourcesLoaded = function (markup, status, obj, name, panel) {
  if (status !== 'success') {
    // The load failed.  Allow the load to occur again.
    delete this._tabLoadRequests[obj.id];
  }
  else {
    // The tab load succeeded.  Remember which tab we are on.
    this.saveState(obj.id);
  }
  var $ = jQuery;
  var tabObject = this.getTabObject(obj.id);
  if (tabObject && tabObject.init) {
    tabObject.init();
  }
  if (tabObject && tabObject.loaded) {
    tabObject.loaded();
  }
  if (!panel.is('.ui-tabs-hide')) {
    if (this.loader) {
      this.loader.hide();
    }
    this.hideWaitIndicator();
    panel.show();
  }
};

/**
 * Causes the currently selected tab to be initialized.  If the tabs are being
 * lazy loaded, this is the only tab initialization that needs to be done.
 *
 * @private
 */
ThemeBuilder.Bar.prototype._initializeCurrentTab = function () {
  var currentTabInfo = this.getTabInfo();
  this._initializeTab(currentTabInfo.name);
};


ThemeBuilder.Bar.prototype.addBarListener = function (listener) {
  this.listeners.push(listener);
};

/**
 * Sets the change status of the theme being edited.  This causes the user
 * interface to reflect the current state of modification.
 *
 * @param {boolean} isChanged
 *   True if the theme has been modified since the last save; false otherwise.
 */
ThemeBuilder.Bar.prototype.setChanged = function (isChanged) {
  var $ = jQuery;
  if (isChanged === null) {
    isChanged = true;
  }
  this.changed = isChanged;

  if (this.changed) {
    // Enable the Save button, if the user has permission to use it.
    if (this.userMaySave()) {
      $('#themebuilder-save #save').removeClass('disabled');
    }
    $('#themebuilder-main').trigger('modified');
    this.indicateThemeModified();
  }
  else {
    $('#themebuilder-save #save').addClass('disabled');
    this.clearModifiedFlag();
  }
};

/**
 * Determines whether the user has permission to publish themes.
 */
ThemeBuilder.Bar.prototype.userMayPublish = function () {
  var data = ThemeBuilder.getApplicationInstance().getData();
  if (data.user_permissions && data.user_permissions.publish_theme) {
    return true;
  }
};


/**
 * Determines whether the user has permission to save a given theme.
 *
 * @param {String} themeName
 *   The name of the theme to be saved. Defaults to the current theme.
 */
ThemeBuilder.Bar.prototype.userMaySave = function (themeName) {
  var theme = (themeName ? ThemeBuilder.Theme.getTheme(themeName) : theme = ThemeBuilder.Theme.getSelectedTheme());

  // Determine whether the active theme is the published theme.
  if (theme.isPublished()) {
    // If so, saving would affect the published theme. Make sure the user has
    // publish theme permissions.
    return this.userMayPublish();
  }
  // If the theme being saved is not the published theme, any user may save it.
  return true;
};

/**
 * Called when a request is sent that changes status of the undo and redo
 * buttons.  This method is responsible for disabling the buttons accordingly
 * to prevent the user from causing the client and server to get out of sync.
 *
 * @param {boolean} status
 *   If true, the status is going from an empty undo/redo stack to a non-empty
 *   stack.  false indicates the opposite.
 *
 */
ThemeBuilder.Bar.prototype.undoStatusChanged = function (status) {
  if (status) {
    this.enableButtons();
  }
  else {
    this.disableButtons();
  }
  this.stackChanged();
};

/**
 * Called when the undo stack state has changed.  This function is responsible
 * for enabling and disabling the undo and redo buttons.
 *
 * @param stack object
 *   The stack that changed state.
 */
ThemeBuilder.Bar.prototype.stackChanged = function (stack) {
  if (!ThemeBuilder.undoButtons) {
    return;
  }
  var undoStatus = ThemeBuilder.undoButtons.getStatus();
  var $ = jQuery;
  if (!stack || stack === ThemeBuilder.undoStack) {
    var undoSize = ThemeBuilder.undoStack.size();
    if (undoSize <= 0 || undoStatus !== true) {
      $('.themebuilder-undo-button').addClass('undo-disabled')
        .unbind('click');
    }
    else {
      $('.themebuilder-undo-button.undo-disabled').removeClass('undo-disabled')
      .bind('click', ThemeBuilder.undo);
    }
  }
  if (!stack || stack === ThemeBuilder.redoStack) {
    var redoSize = ThemeBuilder.redoStack.size();
    if (redoSize <= 0 || !undoStatus) {
      $('.themebuilder-redo-button').addClass('undo-disabled')
      .unbind('click');
    }
    else {
      $('.themebuilder-redo-button.undo-disabled').removeClass('undo-disabled')
      .bind('click', ThemeBuilder.redo);
    }
  }
};

/**
 * Handler for the Save button.
 */
ThemeBuilder.Bar.prototype.saveHandler = function (event) {
  event.preventDefault();
  var $link = jQuery(event.currentTarget);
  if ($link.hasClass('disabled')) {
    // For users without save permissions, display a dialog letting them know
    // why they're not allowed to save.
    if (!this.userMaySave()) {
      var saveas = confirm(Drupal.t('Saving this theme would change the published (live) theme. Do you wish to save your work as a new theme?'));
      if (saveas) {
        this.saveas();
      }
    }
    return;
  }
  this.save();
};

/**
 * Causes the theme currently being edited to be saved.  This should only be
 * called if there is a theme system name to which the theme should be saved.
 * Otherwise, the user should provide a theme name.  That can be done with the
 * saveas method.
 */
ThemeBuilder.Bar.prototype.save = function () {
  if (!Drupal.settings.themebuilderSaved) {
    this.saveas();
    return;
  }

  var selectedTheme = ThemeBuilder.Theme.getSelectedTheme();
  if (selectedTheme.isPublished()) {
    var saveAnyway = confirm(Drupal.t('Clicking OK will change your published (live) theme. Do you want to continue?'));
    if (saveAnyway !== true) {
      this.saveas();
      return;
    }
  }

  this.disableThemebuilder();
  ThemeBuilder.postBack('themebuilder-save', {},
    ThemeBuilder.bind(this, this._themeSaved),
    ThemeBuilder.bind(this, this._themeSaveFailed));
  this.themeChangeNotification();
};

/**
 * Called when the theme has been saved.
 *
 * @private
 *
 * @param {Object} data
 *   The information returned from the server as a result of the theme being
 *   saved.
 */
ThemeBuilder.Bar.prototype._themeSaved = function (data) {
  var $ = jQuery;
  try {
    $('#themebuilder-main').trigger('save', data);

    // A theme created as part of the 'save as' process should take over the
    // applied state.
    var app = ThemeBuilder.getApplicationInstance();
    app.updateData({
      bar_saved_theme: ThemeBuilder.Theme.getTheme(data.system_name)
    });
  }
  catch (e) {
  }
  this.enableThemebuilder();
};

/**
 * Called when the the save fails.  This provides an opportunity to recover
 * and allow the user to continue without losing their work.
 *
 * @param {Object} data
 *   The data returned from the failed request.
 */
ThemeBuilder.Bar.prototype._themeSaveFailed = function (data) {
  ThemeBuilder.handleError(data, data.type, 'recoverableError');
  this.enableThemebuilder();
};

/**
 * Causes a dialog box to appear that asks the user for a theme name, and then
 * saves the theme.
 */
ThemeBuilder.Bar.prototype.saveas = function (event) {
  if (event) {
    event.preventDefault();
  }

  this.processSaveDialog('themebuilderSaveDialog', false, 'themebuilder-save', ThemeBuilder.bind(this, this._saveDialogCallback, false));
};

/**
 * Called when the user clicks the export link, and causes the theme to be
 * exported.
 */
ThemeBuilder.Bar.prototype.exportTheme = function () {
  this.processSaveDialog('themebuilderExportDialog', false, 'themebuilder-export', ThemeBuilder.bind(this, this._themeExported));
};

/**
 * Called when the user clicks the "Update available" link.
 */
ThemeBuilder.Bar.prototype.updateTheme = function () {
  if (confirm(Drupal.t("There is an update available for your site's theme which contains new features or bug fixes.\nClick OK to preview this update."))) {
    this.showWaitIndicator();
    this.disableThemebuilder();
    // Force the screen to refresh after the update.
    this.forceReload = true;
    ThemeBuilder.postBack('themebuilder-update-theme', {},
      ThemeBuilder.bind(this, this.reloadPage));
  }
};

/**
 * This method is called after the theme is exported.
 *
 * @private
 *
 * @param {Object} data
 *   The information returned from the server as a result of the theme being
 *   exported.
 */
ThemeBuilder.Bar.prototype._themeExported = function (data) {
  this.setStatus(Drupal.t('%theme_name was successfully exported.', {'%theme_name': data.name}));
  window.location = data.export_download_url;
  this.enableThemebuilder();
};

/**
 * Handler for the publish button.
 */
ThemeBuilder.Bar.prototype.publishHandler = function (event) {
  if (event) {
    event.preventDefault();
  }
  var $link = jQuery(event.currentTarget);
  if ($link.hasClass('disabled')) {
    return;
  }
  this.publish();
};

/**
 * Causes the theme to be published.  If the there is no associated system
 * name for the theme to save to, a dialog will appear asking the user for a
 * theme name.
 */
ThemeBuilder.Bar.prototype.publish = function () {
  if (!Drupal.settings.themebuilderSaved) {
    // Only need to save before publishing if the theme has never been saved
    // before and doesn't have a name.  Publishing the theme causes the draft
    // theme to be copied (same as the save functionality).
    this.processSaveDialog('themebuilderPublishDialog', true, 'themebuilder-save', ThemeBuilder.bind(this, this._saveDialogCallback));
  }
  else {
    // Publish the theme.
    this.disableThemebuilder();

    // Publish is really expensive because it rebuilds the theme
    // cache.  Avoid doing that if we are really just saving to the
    // published theme.  Save is way more efficient.
    var appData = ThemeBuilder.getApplicationInstance().getData();
    var publish = appData.selectedTheme !== appData.published_theme;
    ThemeBuilder.postBack('themebuilder-save', {publish: publish},
      ThemeBuilder.bind(this, this._publishCallback));
    this.themeChangeNotification();
  }
};

/**
 * This callback is invoked from the save dialog and used to cause the actual
 * save to occur.
 *
 * @private
 *
 * @param {Object} data
 *   The information entered into the save dialog by the user.
 * @param {String} status
 *   The status indicator.  "success" indicates the call was successful.
 * @param {boolean} publish
 *   If true, the saved theme will be published.
 */
ThemeBuilder.Bar.prototype._saveDialogCallback = function (data, status, publish) {
  // If the server informed us that this theme name already exists, prompt
  // for overwrite.
  if (data.themeExists) {
    var overwrite = confirm("A theme with that name already exists. Would you like to overwrite it?");
    if (overwrite) {
      var saveArguments = {
        'name': data.themeName,
        'overwrite': true
      };
      if (true === data.publish) {
        saveArguments.publish = data.publish;
      }
      this.disableThemebuilder();
      ThemeBuilder.postBack('themebuilder-save', saveArguments,
        ThemeBuilder.bind(this, this._saveDialogCallback, publish), ThemeBuilder.bind(this, this._themeSaveFailed));
      this.themeChangeNotification();
    }
    else {
      this.enableThemebuilder();
    }
  }
  // If the server disallowed the save (because an unprivileged user is trying
  // to overwrite the live theme), tell the user why their save failed.
  else if (data.overwriteDisallowed) {
    window.alert(Drupal.t('"@name" is the live theme and cannot be overwritten.', {"@name": data.themeName}));
    this.enableThemebuilder();
  }
  else {
    if (true === publish) {
      this._publishCallback(data);
    }
    else {
      this._themeSaved(data);
      this.themeChangeNotification();
    }
  }
};

/**
 * This callback is invoked after the theme has been published.  This method
 * causes the UI to reflect the current theme name and updates application
 * data to match the new published theme.
 *
 * @private
 *
 * @param {Object} data
 *   The data that is passed from the server upon publishing the theme.
 */
ThemeBuilder.Bar.prototype._publishCallback = function (data) {
  this.setChanged(false);
  this.setStatus(Drupal.t('%theme_name is now live.', {'%theme_name': data.name}));
  this.setInfo(data.name, data.time);

  var app = ThemeBuilder.getApplicationInstance();

  // This fetch of the app data and setting the published and selected themes
  // to the system_name is necessary for setVisibilityText to work. It's voodoo
  // in my [jbeach] opinion, but it works right now, so we'll go with it.
  var appData = app.getData();
  appData.published_theme = appData.selectedTheme = data.system_name;

  // Trigger an app data update
  app.updateData({
    bar_published_theme: ThemeBuilder.Theme.getTheme(data.system_name)
  });

  // Update the cached theme data to reflect the change.
  this.updateThemeData(data);

  // We updated the active theme, so reset the message
  ThemeBuilder.Bar.getInstance().setVisibilityText();
  this.enableThemebuilder();
};

/**
 * Updates the cached theme data.  This should be called any time the
 * theme has changed (save, publish).
 *
 * @param {Object} data
 *   The data associated with a save or publish response.
 */
ThemeBuilder.Bar.prototype.updateThemeData = function (data) {
  var theme = ThemeBuilder.Theme.getTheme(data.system_name);
  if (theme) {
    theme.update(data);
  }
  else {
    theme = new ThemeBuilder.Theme(data);
    theme.addTheme();
  }
  var appData = ThemeBuilder.getApplicationInstance().getData();
  appData.selectedTheme = theme.getSystemName();
};

/**
 * Called after the theme is saved.
 *
 * @private
 *
 * @param {DomElement} element
 *   The element from which the callback was triggered.
 * @param {Object} data
 *   The data associated with the save call.
 */
ThemeBuilder.Bar.prototype._saveCallback = function (element, data) {
  // Disable the "save" button until the theme is modified again.
  Drupal.settings.themebuilderSaved = true;
  var $ = jQuery;
  $('#themebuilder-save #save').addClass('disabled');

  // Update the theme name data
  this.setChanged(false);
  this.setInfo(data.name, data.time);

  if (data.name) {
    Drupal.settings.themeLabel = data.name;
  }
  if (true === data.publish) {
    this.setStatus(Drupal.t('%theme_name was successfully published.', {'%theme_name': data.name}));
  }
  else if (true === data.save_as) {
    // The user clicked "Save as"
    this.setStatus(Drupal.t('%theme_name was successfully copied and saved.', {'%theme_name': data.name}));
  } else {
    // The user clicked "Save"
    this.setStatus(Drupal.t('%theme_name was successfully saved.', {'%theme_name': data.name}));
  }

  // Fix the cached theme data.
  this.updateThemeData(data);
  this.enableThemebuilder();
};

/**
 * Displays and processes a standard ThemeBuilder save dialog.
 *
 * @param {string} dialogName
 *   The name for the dialog (e.g. themebuilderSaveDialog). It should have a
 *   corresponding item in the Drupal.settings object containing the HTML
 *   for the main part of the dialog form (e.g.
 *   Drupal.settings.themebuilderSaveDialog). The HTML needs to contain the
 *   'name' field (i.e. the id for the field must be "edit-name"). Buttons for
 *   "OK" and "Cancel" will be automatically added to the form.
 * @param {boolean} publish
 *   If true, the theme will be published after the save.
 * @param postbackPath
 *   The path to post results to when the "OK" button is clicked; this will be
 *   passed to ThemeBuilder.postBack as the path parameter.
 * @param callback
 *   The callback function to which the results of the POST request will be
 *   passed after the "OK" button is clicked. This will be passed to
 *   ThemeBuilder.postBack as the success_callback parameter.
 */
ThemeBuilder.Bar.prototype.processSaveDialog = function (dialogName, publish, postbackPath, callback) {
  var $ = jQuery;
  var $dialog = this.getDialog(dialogName);
  if ($dialog) {
    $dialog.dialog('open');
  }
  else {
    var dialogForm = Drupal.settings[dialogName];
    $dialog = $(dialogForm).appendTo('body').dialog({
      bgiframe: true,
      autoOpen: true,
      dialogClass: 'themebuilder-dialog',
      modal: true,
      overlay: {
        backgroundColor: '#000',
        opacity: 0.5
      },
      position: 'center',
      width: 335,
      buttons: {
        'OK': ThemeBuilder.bind(this, this._saveDialogOkButtonPressed, dialogName, postbackPath, publish, callback),
        'Cancel': ThemeBuilder.bind(this, this._saveDialogCancelButtonPressed, dialogName)
      },
      close: ThemeBuilder.bindIgnoreCallerArgs(this, this._saveDialogClose, dialogName),
      open: ThemeBuilder.bind(this, this._saveDialogOpen)
    });
    $dialog.find('form').keypress(ThemeBuilder.bind(this, this._handleKeyPress, dialogName));
    // Prevent users from naming a theme with a string longer than 25 characters
    // This addresses https://backlog.acquia.com/browse/AN-26333
    this._enableLiveInputLimit('#themebuilder-bar-save-form #edit-name');
    var input = '#themebuilder-bar-save-form #edit-name';
    this._limitInput(input);
    $(input).bind('paste', ThemeBuilder.bind(this, this._limitInput));

    this.setDialog(dialogName, $dialog);
  }
  // Put the cursor on the form
  $dialog.find('input:first').focus();
};

/**
 * Retrieve a reference to a jQuery UI Dialog.
 *
 * @param {string} dialogName
 *   The name of the dialog.
 *
 * @return {jQuery}
 *   The jQuery object containing the dialog.
 */
ThemeBuilder.Bar.prototype.getDialog = function (dialogName) {
  return this._dialogs[dialogName] || false;
};

/**
 * Save a reference to a jQuery UI Dialog.
 *
 * @param {string} dialogName
 *   The name of the dialog.
 * @param {jQuery} $dialog
 *   The jQuery object containing the dialog.
 *
 * @return {jQuery}
 *   The jQuery object containing the dialog.
 */
ThemeBuilder.Bar.prototype.setDialog = function (dialogName, $dialog) {
  this._dialogs[dialogName] = $dialog;
  return this._dialogs[dialogName];
};

/**
 * Called when the user presses the Ok button in the save dialog.  This method
 * causes the associated post to occur and closes the dialog.
 *
 * @private
 *
 * @param {DomEvent} event
 *   The event associated with the button press.
 * @param postbackPath
 *   The path to post results to when the "OK" button is clicked; this will be
 *   passed to ThemeBuilder.postBack as the path parameter.
 * @param {boolean} publish
 *   If true, the theme will be published after the save.
 * @param callback
 *   The callback function to which the results of the POST request will be
 *   passed after the "OK" button is clicked. This will be passed to
 *   ThemeBuilder.postBack as the success_callback parameter.
 */
ThemeBuilder.Bar.prototype._saveDialogOkButtonPressed = function (event, dialogName, postbackPath, publish, callback) {
  var $ = jQuery;
  var $dialog = this.getDialog(dialogName);
  var $nameField = $('.name:first', $dialog);
  // Validate the theme name field.
  if (!$nameField.val()) {
    if (!$nameField.hasClass("ui-state-error")) {
      $nameField.addClass("ui-state-error");
      $nameField.before("<div class='error-message'>" + Drupal.t("Please enter a theme name.") + "</div>");
    }
  }
  else {
    this.disableThemebuilder();
    var saveArguments = {'name': $nameField.val()};
    if (true === publish) {
      saveArguments.publish = publish;
    }
    ThemeBuilder.postBack(postbackPath, saveArguments, callback, ThemeBuilder.bind(this, this._themeSaveFailed));
    $dialog.dialog('close');
  }
};

/**
 * Called when the user presses the Cancel button in the save dialog.  This
 * method causes the dialog to be closed.
 *
 * @private
 */
ThemeBuilder.Bar.prototype._saveDialogCancelButtonPressed = function (event, dialogName) {
  var $ = jQuery;
  this.getDialog(dialogName).dialog('close');
};

/**
 * Called when the save dialog is opened.
 *
 * @private
 */
ThemeBuilder.Bar.prototype._saveDialogOpen = function () {
  this.maximize();
};

/**
 * Called when the save dialog is closed.
 *
 * @private
 */
ThemeBuilder.Bar.prototype._saveDialogClose = function (dialogName) {
  var $ = jQuery;
  var $dialog = this.getDialog(dialogName);
  // Clear the theme name field.
  $('input', $dialog).val("");
  // Clear any error messages.
  $('.name:first', $dialog).removeClass("ui-state-error");
  $('div.error-message', $dialog).remove();
};

/**
 * Exits themebuilder with an optional user confirmation.
 *
 * @param {boolean} confirm
 *   (Optional) If true, the user is prompted to confirm before exiting the
 *   themebuilder; otherwise the themebuilder exits with no prompt.
 * @param {String} destination
 *   (Optional) The URI to which the browser should be redirected after exit.
 */
ThemeBuilder.Bar.prototype.exit = function (confirm, destination) {
  if (confirm === true && !this.exitConfirm()) {
    return;
  }

  var $ = jQuery;

  // If the themebuilder is in the process of polling the server, stop it now,
  // so that we don't get any weird errors from contacting the server in one
  // thread while the themebuilder is in the process of being closed in
  // another.
  ThemeBuilder.getApplicationInstance().forcePollingToStop();

  this.showWaitIndicator();
  this.disableThemebuilder();
  ThemeBuilder.postBack('themebuilder-exit', {}, ThemeBuilder.bind(this, this._exited, destination));
};

/**
 * This method is called after the themebuilder has exited.  It is responsible
 * for reloading the page after exit to ensure that the correct theme is being
 * used.
 *
 * @private
 *
 * @param {String}
 *   (Optional) The URI to which the browser should be redirected.
 */
ThemeBuilder.Bar.prototype._exited = function (destination) {
  var $ = jQuery;
  $('body').removeClass('themebuilder');

  // Make sure to remove the themebuilder elements so automated tests
  // fail when trying to use the themebuilder after it is closed.
  $('#themebuilder-wrapper').remove();

  // Force reload so that any CSS changes get to the browser.
  if (destination && typeof destination !== "object") {
    parent.location.assign(destination);
  }
  this.reloadPage();
};

/**
 * Prompts the user with a message before the themebuilder exits.
 *
 * @param {String} message
 *   The message that should be displayed to the user.  If no message is
 *   provided, a default message will be used instead.
 */
ThemeBuilder.Bar.prototype.exitConfirm = function (message) {
  if (!message) {
    message = 'You have unsaved changes. Discard?';
  }
  if (this.changed === false || confirm(Drupal.t(message))) {
    return true;
  }
  this.enableThemebuilder();
  return false;
};

/**
 * Sets the data in the info bar.  The info bar indicates the name of the
 * theme and the last time the theme was saved.
 *
 * @param {String} name
 *   The name of the theme currently being edited.
 */
ThemeBuilder.Bar.prototype.setInfo = function (name) {
  var $ = jQuery;
  $('#themebuilder-wrapper .theme-name')
    .html(Drupal.checkPlain(name))
    .truncate({addtitle: true});
  this.setVisibilityText();
};

/**
 * Sets the text that indicates the theme visibility based on the currently published theme and whether the draft is dirty or not.
 */
ThemeBuilder.Bar.prototype.setVisibilityText = function () {
  var $ = jQuery;
  var message;
  var selectedTheme = ThemeBuilder.Theme.getSelectedTheme();
  if (selectedTheme) {
    if (selectedTheme.isPublished() && !this.changed) {
      message = Drupal.t('(Live - everyone can see this)');
    }
    else {
      message = Drupal.t('(Draft - only you can see this)');
    }
    $('#themebuilder-theme-name .theme-visibility').text(message);
  }
};

/**
 * Sets the message of the status bar in the themebuilder.  The status bar
 * appears when there is a new message to display and then hides itself after
 * some period of time.
 *
 * @param {String} message
 *   The message to display.
 * @param {String} type
 *   The type of message, either 'info' or 'warning'.  This parameter is
 *   optional, and if omitted the message will be displayed as an 'info' type.
 */
ThemeBuilder.Bar.prototype.setStatus = function (message, type) {
  var $ = jQuery;
  // If the status bar is still visible, don't allow it to be hidden by the
  // existing timeout
  if (this._statusTimeout) {
    clearTimeout(this._statusTimeout);
    delete this._statusTimeout;
  }

  if (!type) {
    type = 'info';
  }
  $('#themebuilder-status .themebuilder-status-icon').removeClass('info').removeClass('warning').addClass(type);

  // Estimate the required width...  Pull out the tags before counting
  // characters.
  var width = this._guesstimateStatusMessageWidth(message);
  $('#themebuilder-status .themebuilder-status-message').html(message);
  $('#themebuilder-status')
    .width(width + 'px')
    .fadeTo(1000, 0.8);
  // After 10 seconds close the status tab automatically.
  this._statusTimeout = setTimeout(ThemeBuilder.bind(this, this.hideStatus), 10000);
};

/**
 * Estimates the width that the status message should be set to.
 *
 * The status message is centered in a div that is not in the normal
 * document flow.  This actually presents something of a challenge
 * because we want the text to dictate the width of the element, and
 * the width of the element to be used to center the element in the
 * window.  Since it is not in flow, we have to set the width of the
 * element, and thus we have to do a bit of ridiculous estimation to
 * make this feature match the design.
 *
 * This method works by figuring out how many characters are in the
 * actual message (by stripping out any tags) and then using a
 * multiplier of the character count.  Since a variable-width font is
 * being used, special attention is paid to space characters to try to
 * achieve a reasonable estimate.
 *
 * @private
 * @param {String} message
 *   The message markup.
 * @return {int}
 *   The estimated width.
 */
ThemeBuilder.Bar.prototype._guesstimateStatusMessageWidth = function (message) {
  var elementPadding = 47;
  var avgCharWidth = 8;
  var narrowCharOffset = -2.5;
  var wideCharOffset = 3;
  var strippedMessage = message.replace(/<[^>]*>/g, '');
  var narrowCount = strippedMessage.length - strippedMessage.replace(/[ il1]/g, '').length;
  var wideCount = strippedMessage.length - strippedMessage.replace(/[mwMW]/g, '').length;
  var width = (strippedMessage.length * avgCharWidth) + (narrowCount * narrowCharOffset) + (wideCount * wideCharOffset) + elementPadding;
  return width;
};

/**
 * Causes the info bar to indicate the theme has been modified.
 */
ThemeBuilder.Bar.prototype.indicateThemeModified = function () {
  var $ = jQuery;
  var $modified = $('#themebuilder-wrapper .theme-modified');
  if ($modified.length === 0) {
    $('<span class="theme-modified"> *</span>').insertBefore('#themebuilder-wrapper .theme-name');
  }
  this.setVisibilityText();
};

/**
 * Clears the flag that indicates the theme is dirty.
 */
ThemeBuilder.Bar.prototype.clearModifiedFlag = function () {
  var $ = jQuery;
  $('#themebuilder-wrapper .theme-modified').remove();
};

/**
 * Causes the themebuilder status bar to disappear.  This is usually invoked
 * by a timeout that is set when the status bar is displayed.
 */
ThemeBuilder.Bar.prototype.hideStatus = function () {
  var $ = jQuery;
  if (this._statusTimeout) {
    clearTimeout(this._statusTimeout);
    delete this._statusTimeout;
  }
  $('#themebuilder-status').fadeOut(1000);
};

/**
 * Causes the themebuilder to be minimized.
 */
ThemeBuilder.Bar.prototype.minimize = function () {
  var $ = jQuery;
  $('#themebuilder-wrapper').addClass('minimized');
};

/**
 * Causes the themebuilder to be maximized.
 */
ThemeBuilder.Bar.prototype.maximize = function () {
  var $ = jQuery;
  $('#themebuilder-wrapper').removeClass('minimized');
};

/**
 * Causes the themebuilder to toggle from maximized to minimized or from
 * minimized to maximized depending on the current state.
 */
ThemeBuilder.Bar.prototype.toggleMinimize = function () {
  var $ = jQuery;
  $('#themebuilder-wrapper').toggleClass('minimized');
};

/**
 * Prevents clicks on ThemeBuilder elements from propagating outside the ThemeBuilder.
 * Because we assign a click handler to the <body> in ElementPicker.js, we need to prevent
 * certain events that modify the Selector from also triggering _clickItem in ElementPicker.js
 */
ThemeBuilder.Bar.prototype.quarantineEvents = function (event) {
  event.stopPropagation();
};

/**
 * If warranted, this function displays the status message when the
 * themebuilder is initially loaded.  This is useful when a status generating
 * event is performed just before or during a page load, not providing time
 * for the user to view the message before it would be refreshed.  This is
 * accomplished by setting an array containing 'message' and 'type' fields
 * into $_SESSION['init_message'].
 *
 * @static
 *
 * @param {Object} data
 *   The application initialization data.
 */
ThemeBuilder.Bar.showInitialMessage = function (data) {
  if (data && data.initMessage) {
    ThemeBuilder.Bar.getInstance().setStatus(data.initMessage.message, data.initMessage.type);
  }
};

/**
 * If an alert has been passed to the javascript client, display it now.
 *
 * @param {Object} data
 *   Optional parameter tha provides the application initialization data.  If
 *   not provided this method will retrieve the data from the Application
 *   instance.
 */
ThemeBuilder.Bar.prototype.showInitialAlert = function (data) {
  if (!data) {
    data = ThemeBuilder.getApplicationInstance().getData();
  }

  if (data && data.initAlert) {
    alert(data.initAlert);
  }
};

/**
 * Creates an element that serves as a veil that blocks all input into the
 * themebuilder.  This is useful for controling the rate of requests the users
 * can submit using the themebuilder.
 */
ThemeBuilder.Bar.prototype._createVeil = function () {
  var $ = jQuery;
  var veil = $('<div id="themebuilder-veil"></div>').appendTo('#themebuilder-wrapper');
};

/**
 * Applies a limit to the length of the input text
 *
 * @private
 * @param {Event} event
 *   The event that this function handles
 * @param {HTML Object} field
 *   A DOM field.
 *
 * Prevent users from naming a theme with a string longer than 25 characters
 * This addresses https://backlog.acquia.com/browse/AN-26333
 *
 * This function trims the string down to 25 characters if it is longer than 25 characters.
 */
ThemeBuilder.Bar.prototype._limitInput = function (field) {
  var $ = jQuery;
  var max = 25;
  // If this method is called by an event, field will be an event
  field = (field.target) ? field.target : field;
  var $field = $(field);
  if ($field.length > 0) {
    // Trim the text down to max if it exceeds
    // The delay is necessary to allow time for the paste action to complete
    setTimeout(ThemeBuilder.bindIgnoreCallerArgs(this, this._trimField, $field, max), 200);
  }
};

/**
 * Applies the NobleCount plugin to the supplied field
 *
 * @private
 * @param {HTML Object} field
 *   A DOM field.
 *
 * Prevent users from naming a theme with a string longer than 25 characters
 * This addresses https://backlog.acquia.com/browse/AN-26333
 */
ThemeBuilder.Bar.prototype._enableLiveInputLimit = function (field) {
  var $ = jQuery;
  var max = 25;
  var $field = $(field);
  if ($field.length > 0) {
    // Add the NobleCount input limiter
    // This must be given the ID #char-count-save because the save
    // dialog isn't destroyed after it's dismissed. So the id #char-count
    // would conflict with other char-counting fields on the page.
    $('<span>', {
      id: 'char-count-save'
    }).insertAfter($field);
    $field.NobleCount('#char-count-save', {
      max_chars: max,
      block_negative: true
    });
  }
};

/**
 * Trims a field's value down to the max
 *
 * @private
 * @param {jQuery Object} $field
 *   The HTML field to be trimmed.
 * @param {int} max
 *   The maximum number of characters allowed in this field.
 */
ThemeBuilder.Bar.prototype._trimField = function ($field, max) {
  var value = $field.val();
  if (value.length > max) {
    $field.val(value.substr(0, max));
  }
  // Keydown is called to kick the NobleCounter plugin to refresh
  $field.keydown();
};

/**
 * Disables the themebuilder by displaying the veil which absorbs all input.
 */
ThemeBuilder.Bar.prototype.disableThemebuilder = function () {
  var $ = jQuery;
  $('#themebuilder-veil').addClass('show');
  this.showWaitIndicator();
};

/**
 * Enables the themebuilder by removing the veil.
 */
ThemeBuilder.Bar.prototype.enableThemebuilder = function () {
  var $ = jQuery;
  $('#themebuilder-veil').removeClass('show');
  this.hideWaitIndicator();
};

/**
 * Causes the buttons at the top of the themebuilder to be enabled.
 */
ThemeBuilder.Bar.prototype.enableButtons = function () {
  var $ = jQuery;
  $('#themebuilder-control-veil').removeClass('on');

};

/**
 * Causes the buttons at the top of the themebuilder to be disabled.
 *
 * This is important for reducing the possibility of race conditions
 * in which a commit that takes a bit too long allows the user to save
 * the theme when the theme is incomplete, thus losing css
 * customizations.
 */
ThemeBuilder.Bar.prototype.disableButtons = function () {
  var $ = jQuery;
  $('#themebuilder-control-veil').addClass('on');
};

/**
 * Make an asynchronous request to the site about a theme change.
 *
 * When a theme is saved or published then the factory needs notification so it
 * can pick up the changes. To avoid doing this 3rd party request during the
 * user pageload, this asyncronous Javascript call will start it.
 */
ThemeBuilder.Bar.prototype.themeChangeNotification = function () {
  ThemeBuilder.getBack('themebuilder-change-notification');
};

/**
 * Adds the toolbar to the page.
 *
 * @static
 */
ThemeBuilder.Bar.attachToolbar = function () {
  // This keeps the themebuilder from dying whenever Drupal.attachBehaviors is called.
  if (ThemeBuilder.Bar.attachToolbar.attached !== undefined) {
    return;
  }
  ThemeBuilder.Bar.attachToolbar.attached = true;

  ThemeBuilder.getApplicationInstance();
  //Always add the toolbar
  jQuery('body').append(Drupal.settings.toolbarHtml);
  jQuery('#themebuilder-wrapper:not(.themebuilder-keep)').hide();
};

/**
 * This Drupal behavior causes the themebuilder toolbar to be attached to the
 * page.
 */
Drupal.behaviors.themebuilderBar = {
  attach: ThemeBuilder.Bar.attachToolbar
};
;
/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
 browser: true */

/*global ThemeBuilder: true debug: true window: true*/


/**
 * This class parses the userAgent string to determine which browser is being
 * used.  This class was written because the browser support in jquery is
 * deprecated and has a bug in which some installations of IE8 report
 * compatibility with IE8 and IE6, and the version from jquery's browser
 * object is 6 rather than 8.
 *
 * Further, this object gives us the ability to apply the detection to a
 * specified userAgent string rather than getting it from the browser.  This
 * will help support browsers that we don't even have access to by verifying
 * the user agent string is parsed and taken apart correctly.
 * @class
 */
ThemeBuilder.BrowserDetect = ThemeBuilder.initClass();

/**
 * Instantiates a new instance of the BrowserDetect class with the specified
 * string.  If no string is specified, the navigator.userAgent will be used
 * instead.
 *
 * After instantiation, the caller can look at the browser, version, and OS
 * fields to determine the browser specifics.
 *
 * @param {String} userAgent
 *   (Optional) The user agent string to apply detection to.
 */
ThemeBuilder.BrowserDetect.prototype.initialize = function (userAgent) {
  this.userAgent = userAgent || navigator.userAgent;
  this._populateData();
  this.browser = this._searchString(this.dataBrowser) || "An unknown browser";
  this.version = this._searchVersion(this.userAgent) ||
    this._searchVersion(navigator.appVersion) || "an unknown version";
  this.OS = this._searchString(this.dataOS) || "an unknown OS";
};

ThemeBuilder.BrowserDetect.prototype._searchString = function (data) {
  for (var i = 0; i < data.length; i++)	{
    var dataString = data[i].string;
    var dataProp = data[i].prop;
    this.versionSearchString = data[i].versionSearch || data[i].identity;
    if (dataString) {
      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
    }
    else if (dataProp) {
      return data[i].identity;
    }
  }
};
  
ThemeBuilder.BrowserDetect.prototype._searchVersion = function (dataString) {
  var version = null;
  var index = dataString.indexOf(this.versionSearchString);
  if (index > -1) {
    version = parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    if (isNaN(version)) {
      version = null;
    }
  }
  return version;
};

ThemeBuilder.BrowserDetect.prototype._populateData = function () {
  this.dataBrowser = [
    {
      string: this.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {
      string: this.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      string: this.userAgent,
      prop: window.opera,
      identity: "Opera"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: this.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    { // for newer Netscapes (6+)
      string: this.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: this.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: this.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    { // for older Netscapes (4-)
      string: this.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ];
  this.dataOS = [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
      string: this.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod"
    },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ];
};
;
/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
 browser: true */

/*global jQuery: true Drupal: true ThemeBuilder: true*/
"use strict";

/**
 * The StartInteraction is an interaction that is responsible for opening the themebuilder.
 * 
 * This act is complicated by several factors including error
 * conditions that cause the open to fail, existing themebuilder
 * sessions in other webnodes, and theme corruption that might require
 * the intervention of the theme elves.
 * @class
 * @extends ThemeBuilder.InteractionController
 */
ThemeBuilder.StartInteraction = ThemeBuilder.initClass();
ThemeBuilder.StartInteraction.prototype = new ThemeBuilder.InteractionController();

ThemeBuilder.StartInteraction._lock = false;

/**
 * Constructor for the StartInteraction.
 * 
 * @param {Object} callbacks
 *   The set of callbacks that will be called upon the completion of this interaction.
 */
ThemeBuilder.StartInteraction.prototype.initialize = function (callbacks) {
  this.setInteractionTable({
    begin: 'prepareUIForOpen',
    userNotified: 'verifyWebnode',

    webnodeConfirmed: 'setCookie',
    cookieSet: 'startThemeBuilder',
    cookieNotSet: 'exitWithMessage',

    failedToGetWebnode: 'setGenericExitMessage',

    themeBuilderStarted: 'reloadPage', // This constitutes the end of this interaction.

    // The themebuilder session is open in another browser.
    editSessionInProgress: 'showTakeOverSessionConfirmation',
    takeoverAccepted: 'takeoverSession',
    takeoverCanceled: 'openCanceled',

    // Exceptions:
    openFailed: 'handleOpenFailure',
    errorOnOpen: 'invokeThemeElves',
    themeElfSuccess: 'startThemeBuilder',
    themeElfFailure: 'setGenericExitMessage',

    // Cancel the open request.
    openCanceled: 'cancelOpen',
    exitMessageSet: 'exitWithMessage',
    exitMessageDismissed: 'cancelOpen'
  });
  this.setCallbacks(callbacks);

  // Create the redirects.
  this.openCanceled = this.makeEventCallback('openCanceled');
  this.errorOnOpen = this.makeEventCallback('errorOnOpen');

  this.errorMap = ['error', 'errorName', 'errorType'];
};

/**
 * Prepares the user interface for opening the themebuilder.
 * 
 * This includes displaying a spinner to indicate the application has
 * accepted the user's request and is working.
 * 
 * If this interaction has been locked, the interaction will stop
 * immediately with no further action taken.  The lock indicates the
 * themebuilder open is already in progress, and prevents the user
 * from being able to cause multiple start processes simultaneously.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.prepareUIForOpen = function (data) {
  var $ = jQuery;
  if (this.isLocked()) {
    // The user is in the middle of opening the themebuilder.  Ignore the request.
    return;
  }
  this.setLock(true);
  var bar = ThemeBuilder.Bar.getInstance();
  bar.showWaitIndicator();
  Drupal.toolbar.collapse();

  // The themebuilder start options provide a mechanism for taking
  // over a themebuilder session.  By default this option is not set
  // so the user will be prompted before a session is taken.
  if (!data) {
    data = {startOptions: {}};
  }
  data.elfInvocations = 0;
  this.event(data, 'userNotified');
};

/**
 * Verifies the webnode that will be used to connect to the themebuilder.
 * 
 * If the webnode provided when the page was loaded is too old, this
 * method will request the webnode from the server.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.verifyWebnode = function (data) {
  // Check that we have a current server name for a cookie.  If not, request
  // one via ajax.  Set the cookie before opening the ThemeBuilder.
  var info = Drupal.settings.themebuilderServer;
  var d = new Date();
  var time = Math.floor(d.getTime() / 1000);
  if (info && info.webnode && time <= info.time) {
    // Set the webnode into the data.
    data.server = info;
    this.event(data, 'webnodeConfirmed');
  }
  else {
    // Request the webnode from the server.
    var map = [
      'server', 'type'
    ];
    ThemeBuilder.postBack('themebuilder-get-server', {}, ThemeBuilder.bind(this, this.event, map, data, 'webnodeConfirmed'), ThemeBuilder.bind(this, this.event, this.errorMap, data, 'failedToGetWebnode'));
  }
};

/**
 * Establishes a cookie that causes all requests to go to the webnode specified
 * in the parameter and causes a themebuilder edit session to open.
 * 
 * The open is accomplished by sending a request to the server, and
 * upon success the page must be reloaded.
 *
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.setCookie = function (data) {
  var $ = jQuery;
  var webnode = data.server.webnode;
  var bar = ThemeBuilder.Bar.getInstance();

  // Note: Do not set the expires to 0.  That is the default, but this
  // results in the cookie not being set in IE.
  $.cookie('ah_app_server', data.server.webnode, {path: '/'});

  // Verify that the cookie exists.  Note that if the cookie was set
  // incorrectly, the problem is not always detectable via JavaScript,
  // but we can at least try knowing that we can't totally trust the
  // results.
  if ($.cookie('ah_app_server') === data.server.webnode) {
    this.event(data, 'cookieSet');
  }
  else {
    data.userMessage = Drupal.t("The ThemeBuilder cannot be started, possibly because your browser's privacy settings are too strict.");
    this.event(data, 'cookieNotSet');
  }
};

/**
 * Opens the themebuilder.
 * 
 * The open is accomplished by sending a request to the server, and
 * upon success the page must be reloaded.
 *
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.startThemeBuilder = function (data) {
  var map = ['start', 'type'];
  ThemeBuilder.postBack('themebuilder-start', data.startOptions,
    ThemeBuilder.bind(this, this.event, map, data, 'themeBuilderStarted'), ThemeBuilder.bind(this, this.event, this.errorMap, data, 'openFailed'));
};

/**
 * Causes the page to refresh.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.reloadPage = function (data) {
  // Reload, which is required even if there are no changes to the
  // theme to make sure the gears work after the themebuilder is
  // closed.
  this.setLock(false);
  parent.location.reload(true);
};

/**
 * Handles any error condition returned from the server.
 * 
 * This method is responsible for inspecting the error and putting
 * this controller into the appropriate state to deal with the
 * problem.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.handleOpenFailure = function (data) {
  if (data.errorName === 'ThemeBuilderEditInProgressException') {
    this.event(data, 'editSessionInProgress');
    this.setLock(false);
  }
  if (data.errorName === 'error') {
    this.event(data, 'errorOnOpen');
  }
  this._clearError(data);
};

/**
 * Shows a confirmation dialog to take over the session.
 * 
 * If an existing TB editing session is underway in another browser and a user
 * tries to enter edit mode, this will fire.  If the user accepts, we will re-try
 * to start the session, this time forcing it to take precedence.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.showTakeOverSessionConfirmation = function (data) {
  var $ = jQuery;
  var message = Drupal.t('An active draft exists from a previous session.  Click Cancel if you do not want to edit the appearance in this browser, otherwise click OK to take over the draft in this window.');

  // This markup will be displayed in the dialog.
  var inputId = 'active-draft-exists';
  var $html = $('<div>').append(
    $('<img>', {
      src: Drupal.settings.themebuilderAlertImage
    }).addClass('alert-icon'),
    $('<span>', {
      html: message
    })
  );
  var dialog = new ThemeBuilder.ui.Dialog($('body'),
    {
      html: $html,
      buttons: [
        {
          label: Drupal.t('OK'),
          action: this.makeEventCallback('takeoverAccepted', data)
        },
        {
          label: Drupal.t('Cancel'),
          action: this.makeEventCallback('takeoverCanceled', data)
        }
      ],
      // The default action, which is invoked if the user hits Esc or
      // the 'x' in the dialog.
      defaultAction: this.makeEventCallback('takeoverCanceled', data)
    }
  );
};

/**
 * Causes the existing themebuilder session to be taken over.
 * 
 * This allows the user to get into the themebuilder even if they
 * already have a session open in a different browser.  The other
 * session in the other browser will be closed as a result.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.takeoverSession = function (data) {
  data.startOptions = {'take_over_session': true};
  this.startThemeBuilder(data);
};

/**
 * Invoked when the themebuilder open is canceled.
 * 
 * This could be due to error conditons or because the user chose 'Cancel' when the message about an existing themebuilder session appears.
 * 
 * This method is responsible for cleaning up the UI such that the
 * user can continue interacting with the site and click the
 * Appearance button again if desired.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.cancelOpen = function (data) {
  var bar = ThemeBuilder.Bar.getInstance();
  bar.hideWaitIndicator();
  Drupal.toolbar.expand();
  this.setLock(false);
};

/**
 * Causes the theme elves to be invoked.
 * 
 * The theme elves are server-side code that detect and correct
 * problems in themes that may prevent the themebuilder from opening.
 * If there is an error that prevents the user from starting the
 * themebuilder, it is a good idea to give the theme elves a chance to
 * fix it and try again.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.invokeThemeElves = function (data) {
  data.elfInvocations++;
  if (data.elfInvocations > 2) {
    // Be careful not to invoke the elves an infinite number of times.
    // It takes a substantial amount of time to run them and it is
    // very unlikely to be useful running them more than twice.
    this.event(data, 'themeElfFailure');
    return;
  }
  var map = ['recovery', 'type'];
  ThemeBuilder.postBack('themebuilder-fix-themes', {}, ThemeBuilder.bind(this, this.event, map, data, 'themeElfSuccess'), ThemeBuilder.bind(this, this.event, this.errorMap, 'themeElfFailure'));
};

/**
 * This method displays a dialog that indicates to the user that the themebuilder was unable to start.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.setGenericExitMessage = function (data) {
  if (Drupal.settings.gardensMisc.isSMB) {
    data.userMessage = Drupal.t('An error has occurred. Please let us know what you tried to do in the <a target="_blank" href="http://www.drupalgardens.com/forums">Drupal Gardens forums</a>, and we will look into it.');
  }
  else {
    data.userMessage = Drupal.t('An error has occurred. Please contact support to let us know what you tried to do and we will look into it.');
  }
  this.event(data, 'exitMessageSet');
};

/**
 * Retrieves the state of the lock.
 *
 * @return {boolean}
 *   true if the lock is set; false otherwise.
 */
ThemeBuilder.StartInteraction.prototype.isLocked = function () {
  return ThemeBuilder.StartInteraction._lock;
};

/**
 * Sets the state of the start lock.
 * 
 * @param {boolean} isLocked
 *   If true, the lock will be set; otherwise the lock will be cleared.
 */
ThemeBuilder.StartInteraction.prototype.setLock = function (isLocked) {
  ThemeBuilder.StartInteraction._lock = isLocked === true;
};

/**
 * Displays a dialog that presents a message stored in data.userMessage.
 * 
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype.exitWithMessage = function (data) {
  var $ = jQuery;
  var dialog = new ThemeBuilder.ui.Dialog($('body'), {
    html: $('<span>').html(data.userMessage),
    buttons: [
      {
        label: Drupal.t('OK'),
        action: this.makeEventCallback('exitMessageDismissed', data)
      }
    ]
  });
};

/**
 * Clears the error from the specified data object.
 * 
 * When an error occurs, there are fields that are added to the data
 * object that must be cleared so the error won't be detected
 * erroneously on subsequent requests.  This method clears those
 * fields so the interaction can continue.
 * 
 * @private
 * @param {Object} data
 *   The data object that is passed in to every state in the
 *   interaction.  This data object collects information from the
 *   system state and the user's choices and facilitates moving the
 *   application into the opened state.
 */
ThemeBuilder.StartInteraction.prototype._clearError = function (data) {
  delete data.error;
  delete data.errorName;
  delete data.errorType;
};
;
/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
 browser: true */

/*global window : true jQuery: true Drupal: true ThemeBuilder: true*/

ThemeBuilder = ThemeBuilder || {};

/**
 * ThemeBuilder.ui is a namespace for all User Interface wrappers that augment
 * the basic functionality of ThemeBuilder components.
 * It includes UI widgets such as Sliders, Tabs and Carousels
 * @namespace
 */
ThemeBuilder.ui = ThemeBuilder.ui || {};

/**
 * The dialog wraps a message in a jquery ui dialog with hooks for the OK and Cancel button callbacks
 * @class
 */
ThemeBuilder.ui.Dialog = ThemeBuilder.initClass();

/**
 * The constructor of the Dialog class.
 *
 * @param {DomElement} element
 *   The element is a pointer to the jQuery object that will be wrapped in the
 *   dialog.
 * @param {Object} options
 *   Options for the dialog. May contain the following optional properties:
 *   - text: Text for the message displayed in the dialog. HTML or plain text
 *     can be passed in. Defaults to 'Continue?'.
 *   - actionButton: Text displayed in the action button. Defaults to 'OK'.
 *   - cancelButton: Text displayed in the cancellation button. Defaults to
 *     'Cancel'.
 * @param {Object} callbacks
 *   Button callback functions for the dialog. May contain the following
 *   optional properties (if either of these are not set, the dialog will
 *   simply be closed when the corresponding button is clicked):
 *   - action: Callback to invoke when the action button is clicked.
 *   - cancel: Callback to invoke when the cancellation button is clicked.
 * @return {Boolean}
 *   Returns true if the dialog initializes.
 */
ThemeBuilder.ui.Dialog.prototype.initialize = function (element, options) {

  // This UI element depends on jQuery Dialog
  if (!jQuery.isFunction(jQuery().dialog)) {
    return false;
  }

  if (!options.buttons) {
    return false;
  }

  var $ = jQuery;
  this._$element = (element) ? element : $('body');
  this._$dialog = null;
  this._buttons = options.buttons;
  this._html = options.html;
  this._type = 'Dialog';
  if (options.defaultAction) {
    this._default = options.defaultAction;
  }
  else if (options.buttons.length === 1) {
    // If there is only one option, use that as the default.
    this._default = options.buttons[0].action;
  }
  // Build the DOM element
  this._build();

  return true;
};

ThemeBuilder.ui.Dialog.prototype._build = function () {
  var $ = jQuery;
  var $wrapper = $('<div>', {
    id: "themebuilder-confirmation-dialog",
    html: this._html
  }).addClass('message');
  var buttons = {};
  for (var i = 0; i < this._buttons.length; i++) {
    buttons[this._buttons[i].label] = ThemeBuilder.bind(this, this._respond, this._buttons[i].action);
  }
  $wrapper.appendTo(this._$element);
  var dialogOptions = {
    bgiframe: true,
    autoOpen: true,
    dialogClass: 'themebuilder-dialog tb',
    modal: true,
    overlay: {
      backgroundColor: '#000',
      opacity: 0.5
    },
    position: 'center',
    width: 335,
    buttons: buttons
  };
  if (this._default) {
    dialogOptions.beforeclose = this._default;
  }
  this._$dialog = $wrapper.dialog(dialogOptions);
};

/**
 * Destroys the dialog DOM element
 */
ThemeBuilder.ui.Dialog.prototype._close = function () {
  this._$dialog.remove();
};

/**
 * Returns the form data to the interaction control that instantiated this dialog
 *
 * @param {Event} event
 *   The dialog button click event
 * @param {function} action
 *   The callback associated with the button, defined by the instantiating
 *   interaction control.
 */
ThemeBuilder.ui.Dialog.prototype._respond = function (event, action) {
  var $ = jQuery,
      data = {},
      $form = $(event.target).closest('.ui-dialog').find('.ui-dialog-content');
  // Scrape all of the form data out of the dialog and store as key/value pairs
  // Input elements
  $(':input', $form).each(function (index, item) {
    var $this = $(this),
        name = $this.attr('name');
    if (name) {
      data[name] = $this.val();
    }
  });
  this._close();
  action(data);
};

/**
 * Returns a jQuery pointer to this object
 *
 * @return {object}
 *   Returns null if the carousel has no pointer.
 */
ThemeBuilder.ui.Dialog.prototype.getPointer = function () {
  if (this._$dialog) {
    return this._$dialog;
  }
  else {
    return null;
  }
};

/**
 * Utility function to remove 'px' from calculated values.  The function assumes that
 * that unit 'value' is pixels.
 *
 * @param {String} value
 *   The String containing the CSS value that includes px.
 * @return {int}
 *   Value stripped of 'px' and casted as a number or NaN if 'px' is not found in the string.
 */
ThemeBuilder.ui.Dialog.prototype._stripPX = function (value) {
  var index = value.indexOf('px');
  if (index === -1) {
    return NaN;
  }
  else {
    return Number(value.substring(0, index));
  }
};
;
/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
 browser: true */

/*global jQuery: true debug: true window: true*/
/*
 * Turns a list of links into a contextual flyout menu.
 * The menu is associated with an element on the page.
 * 
 * Author: Acquia, @jessebeach
 * Website: http://acquia.com, http://qemist.us
 *
 * items = {
 *  [
 *    {
 *      label: string,
 *      href: string (optional),
 *      itemClasses: array (optional),
 *      linkClasses: array (optional),
 *      linkWrapper: string (default: <a>, optional)
 *    }
 *  ]
 *  ...
 * }
 *
 */
(function ($) {

  // replace 'pluginName' with the name of your plugin
  $.fn.flyoutList = function (options) {

    // debug(this);

    // build main options before element iteration
    var opts = $.extend({}, $.fn.flyoutList.defaults, options);

    // iterate over matched elements
    return this.each(function () {
      var $this = $(this);
      // build element specific options. Uses the Metadata plugin if available
      // @see http://docs.jquery.com/Plugins/Metadata/metadata
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      // implementations
      
      if (o.items) {
        var $flyoutList = $.fn.flyoutList.buildFlyoutList(o.items).prependTo($this);
      
        var $context = o.context ? $(o.context) : $this;
        $context.css({
          position: 'relative'
        })
        .addClass('flyout-list-context');
      
        // Place the dotted outline just outside the context element
        $.fn.flyoutList.buildContextOutline($context);
      }
    });
  };
    
  // plugin defaults
  $.fn.flyoutList.defaults = {};

  // private functions definition
  $.fn.flyoutList.buildFlyoutList = function (items) {
    var $list = $('<ul>').addClass('flyout-list clearfix');
    var len = items.length;
    for (var i = 0; i < len; i++) {
      var itemClasses = ['item-' + i];
      if (items[i].itemClasses) {
        $.merge(itemClasses, items[i].itemClasses);
      }
      var linkClasses = ['action', $.fn.flyoutList.makeSafeClass('action-' + items[i].label)];
      if (items[i].linkClasses) {
        $.merge(linkClasses, items[i].linkClasses);
      }
      var linkWrapper = (items[i].linkWrapper) ? '<' + items[i].linkWrapper + '>' : '<a>';
      var linkProperties = {};
      if (items[i].label) {
        linkProperties.text = items[i].label;
      }
      else {
        linkProperties.text = "missing label";
      }
      if (items[i].href) {
        linkProperties.href = items[i].href;
      }
      
      $list.append($('<li>', {
        html: $(linkWrapper, linkProperties).addClass(linkClasses.join(' '))
      }).addClass(itemClasses.join(' ')));
    }
    return $list;
  };
  
  $.fn.flyoutList.makeSafeClass = function (s) {
    var className = s.toString().replace(new RegExp("[^a-zA-Z0-9_-]", 'g'), "-").toLowerCase();
    return className;
  };
  
  $.fn.flyoutList.buildContextOutline = function ($context) {
    $('<div>').addClass('flyout-list-outline top').prependTo($context);
    $('<div>').addClass('flyout-list-outline right').prependTo($context);
    $('<div>').addClass('flyout-list-outline bottom').prependTo($context);
    $('<div>').addClass('flyout-list-outline left').prependTo($context);
  };

  // private function for debugging
  function debug() {
    var $this = $(this);
    if (window.console && window.console.log) {
      window.console.log('selection count: ' + $this.size());
    }
  }

}(jQuery));;
(function ($) {
  // Plugins should not declare more than one namespace in the $.fn object.
  // So we declare methods in a methods array
    var methods = {
      init : function (options) {
        // build main options before element iteration
        var o = mergeOptions(options);
        // iterate over matched elements
        return this.each(function () {
          // implementations
          var visible = (!$(this).hasClass('smart-hidden'));
          if (visible) {
            hide(this, o);
          }
          else {
            show(this, o);
          }
        });
      },
      show : function (options) {
        // build main options before element iteration
        var o = mergeOptions(options);
        // iterate over matched elements
        return this.each(function () {
          show(this, o);
        });
      },
      hide : function (options) {
        // build main options before element iteration
        var o = mergeOptions(options);
        // iterate over matched elements
        return this.each(function () {
          hide(this, o);
        });
      }
    };

    // replace 'smartToggle' with the name of your plugin
    $.fn.smartToggle = function (method) {
  
      // debug(this);
      
      // Method calling logic
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, arguments);
      } else {
        $.error('Method ' +  method + ' does not exist on jQuery.smartToggle');
      }
    };
    
    // plugin defaults
    $.fn.smartToggle.defaults = {
      vClass: "smart-visible",
      hClass: "smart-hidden",
      speed: 750
    };
    
    // private functions definition
    function mergeOptions (options) {
      return $.extend({}, $.fn.smartToggle.defaults, options);
    }
    function show (element, options) {
      var $this = $(element);
      $this.hide(0).removeClass('smart-hidden').fadeIn(options.speed);
    }
    function hide (element, options) {
      var $this = $(element);
      $this.fadeOut(options.speed).addClass('smart-hidden').show(0);
    }
  
    // private function for debugging
    function debug() {
      var $this = $(this);
      if (window.console && window.console.log) {
        window.console.log('selection count: ' + $this.size());
      }
    }
  }
)(jQuery);;
(function(h){function j(c,a,d,b,e,f,h){var i,g;h?(i=d===0?"":a.slice(-d),g=a.slice(-b)):(i=a.slice(0,d),g=a.slice(0,b));if(e.html(g+f).width()<e.html(i+f).width())return b;g=parseInt((d+b)/2,10);i=h?a.slice(-g):a.slice(0,g);e.html(i+f);if(e.width()===c)return g;e.width()>c?b=g-1:d=g+1;return j(c,a,d,b,e,f,h)}h.fn.truncate=function(c){c=h.extend({width:"auto",token:"&hellip;",center:!1,addclass:!1,addtitle:!1},c);return this.each(function(){var a=h(this),d={fontFamily:a.css("fontFamily"),fontSize:a.css("fontSize"),
fontStyle:a.css("fontStyle"),fontWeight:a.css("fontWeight"),"font-variant":a.css("font-variant"),"text-indent":a.css("text-indent"),"text-transform":a.css("text-transform"),"letter-spacing":a.css("letter-spacing"),"word-spacing":a.css("word-spacing"),display:"none"},b=a.text();d=h("<span/>").css(d).html(b).appendTo("body");var e=d.width(),f=!isNaN(parseFloat(c.width))&&isFinite(c.width)?c.width:a.width();e>f&&(d.text(""),c.center?(f=parseInt(f/2,10)+1,e=b.slice(0,j(f,b,0,b.length,d,c.token,!1))+c.token+
b.slice(-1*j(f,b,0,b.length,d,"",!0))):e=b.slice(0,j(f,b,0,b.length,d,c.token,!1))+c.token,c.addclass&&a.addClass(c.addclass),c.addtitle&&a.attr("title",b),a.html(e));d.remove()})}})(jQuery);;
/* jQuery.NobleCount v 1.0 http://tpgblog.com/noblecount/
compiled by http://yui.2clics.net/ */
(function(c){c.fn.NobleCount=function(i,h){var j;var g=false;if(typeof i=="string"){j=c.extend({},c.fn.NobleCount.settings,h);if(typeof h!="undefined"){g=((typeof h.max_chars=="number")?true:false)}return this.each(function(){var k=c(this);f(k,i,j,g)})}return this};c.fn.NobleCount.settings={on_negative:null,on_positive:null,on_update:null,max_chars:140,block_negative:false,cloak:false,in_dom:false};function f(g,m,n,h){var l=n.max_chars;var j=c(m);if(!h){var k=j.text();var i=(/^[1-9]\d*$/).test(k);if(i){l=k}}b(g,j,n,l,true);c(g).keydown(function(o){b(g,j,n,l,false);if(a(o,g,n,l)==false){return false}});c(g).keyup(function(o){b(g,j,n,l,false);if(a(o,g,n,l)==false){return false}})}function a(k,g,l,j){if(l.block_negative){var h=k.which;var i;if(typeof document.selection!="undefined"){i=(document.selection.createRange().text.length>0)}else{i=(g[0].selectionStart!=g[0].selectionEnd)}if((!((e(g,j)<1)&&(h>47||h==32||h==0||h==13)&&!k.ctrlKey&&!k.altKey&&!i))==false){return false}}return true}function e(g,h){return h-(c(g).val()).length}function b(g,i,l,j,h){var k=e(g,j);if(k<0){d(l.on_negative,l.on_positive,g,i,l,k)}else{d(l.on_positive,l.on_negative,g,i,l,k)}if(l.cloak){if(l.in_dom){i.attr("data-noblecount",k)}}else{i.text(k)}if(!h&&jQuery.isFunction(l.on_update)){l.on_update(g,i,l,k)}}function d(i,g,h,j,l,k){if(i!=null){if(typeof i=="string"){j.addClass(i)}else{if(jQuery.isFunction(i)){i(h,j,l,k)}}}if(g!=null){if(typeof g=="string"){j.removeClass(g)}}}})(jQuery);;
/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 0.11.4
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2012, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator === undefined ?  " " : $l.wordSeparator;
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}(jQuery));
;
Drupal.behaviors.timeago = {
  attach: function (context) {
    jQuery('abbr.timeago, span.timeago, time.timeago', context).timeago();
  }
};

/**
 * This allows translating string suffixes through Drupal. Some languages
 * (Arabic, Polish, Russian, Ukranian, etc.) have different suffixes depending
 * on the numbers used; see the note on Translation in the README.txt for how
 * to override the translations for these languages.
 */
jQuery.timeago.settings.strings = {
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: Drupal.t("ago"),
  suffixFromNow: Drupal.t("from now"),
  seconds: Drupal.t("a moment"), // default is "less than a minute"
  minute: Drupal.t("about a minute"),
  minutes: Drupal.t("%d minutes"),
  hour: Drupal.t("about an hour"),
  hours: Drupal.t("about %d hours"),
  day: Drupal.t("a day"),
  days: Drupal.t("%d days"),
  month: Drupal.t("about a month"),
  months: Drupal.t("%d months"),
  year: Drupal.t("about a year"),
  years: Drupal.t("%d years")
};
// Allow timestamps in the future. https://drupal.org/node/1696742
jQuery.timeago.settings.allowFuture = true;
;
// $Id: extlink.js,v 1.8 2010/05/26 01:25:56 quicksketch Exp $
(function ($) {

Drupal.extlink = Drupal.extlink || {};

Drupal.extlink.attach = function (context, settings) {
  // Strip the host name down, removing ports, subdomains, or www.
  var pattern = /^(([^\/:]+?\.)*)([^\.:]{4,})((\.[a-z]{1,4})*)(:[0-9]{1,5})?$/;
  var host = window.location.host.replace(pattern, '$3$4');
  var subdomain = window.location.host.replace(pattern, '$1');

  // Determine what subdomains are considered internal.
  var subdomains;
  if (settings.extlink.extSubdomains) {
    subdomains = "([^/]*\\.)?";
  }
  else if (subdomain == 'www.' || subdomain == '') {
    subdomains = "(www\\.)?";
  }
  else {
    subdomains = subdomain.replace(".", "\\.");
  }

  // Build regular expressions that define an internal link.
  var internal_link = new RegExp("^https?://" + subdomains + host, "i");

  // Extra internal link matching.
  var extInclude = false;
  if (settings.extlink.extInclude) {
    extInclude = new RegExp(settings.extlink.extInclude.replace(/\\/, '\\'));
  }

  // Extra external link matching.
  var extExclude = false;
  if (settings.extlink.extExclude) {
    extExclude = new RegExp(settings.extlink.extExclude.replace(/\\/, '\\'));
  }

  // Find all links which are NOT internal and begin with http (as opposed
  // to ftp://, javascript:, etc. other kinds of links.
  // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
  // available in jQuery 1.0 (Drupal 5 default).
  var external_links = new Array();
  var mailto_links = new Array();
  var potential_links = $("a:not(." + settings.extlink.extClass + ", ." + settings.extlink.mailtoClass + "), area:not(." + settings.extlink.extClass + ", ." + settings.extlink.mailtoClass + ")", context);
  var length = potential_links.length;
  var i, link;
  for (i = 0; i < length; i++) {
    // The link in this case is a native Link object, which means the host has
    // already been appended by the browser, even for local links.
    link = potential_links[i];
    try {
      var url = link.href.toLowerCase();
      if (url.indexOf('http') == 0 && (!url.match(internal_link) || (extInclude && url.match(extInclude))) && !(extExclude && url.match(extExclude))) {
        external_links.push(link);
      }
      // Do not include area tags with begin with mailto: (this prohibits
      // icons from being added to image-maps).
      else if (this.tagName != 'AREA' && url.indexOf('mailto:') == 0) {
        mailto_links.push(link);
      }
    }
    // IE7 throws errors often when dealing with irregular links, such as:
    // <a href="node/10"></a> Empty tags.
    // <a href="http://user:pass@example.com">example</a> User:pass syntax.
    catch (error) {
      return false;
    }
  }
  if (settings.extlink.extClass) {
    Drupal.extlink.applyClassAndSpan(external_links, settings.extlink.extClass);
  }

  if (settings.extlink.mailtoClass) {
    Drupal.extlink.applyClassAndSpan(mailto_links, settings.extlink.mailtoClass);
  }

  if (settings.extlink.extTarget) {
    // Apply the target attribute to all links.
    $(external_links).attr('target', settings.extlink.extTarget);
  }

  if (settings.extlink.extAlert) {
    // Add pop-up click-through dialog.
    $(external_links).click(function(e) {
      return confirm(settings.extlink.extAlertText);
    });
  }

  // Work around for Internet Explorer box model problems.
  if (($.support && !($.support.boxModel === undefined) && !$.support.boxModel) || ($.browser.msie && parseInt($.browser.version) <= 7)) {
    $('span.ext, span.mailto').css('display', 'inline-block');
  }
};

/**
 * Apply a class and a trailing <span> to all links not containing images.
 *
 * @param links
 *   An array of DOM elements representing the links.
 * @param class_name
 *   The class to apply to the links.
 */
Drupal.extlink.applyClassAndSpan = function (links, class_name) {
  var $links_to_process;
  if (parseFloat($().jquery) < 1.2) {
    $links_to_process = $(links).not('[img]');
  }
  else {
    var links_with_images = $(links).find('img').parents('a');
    $links_to_process = $(links).not(links_with_images);
  }
  $links_to_process.addClass(class_name);
  var i;
  var length = $links_to_process.length;
  for (i = 0; i < length; i++) {
    var $link = $($links_to_process[i]);
    if ($link.css('display') == 'inline') {
      $link.after('<span class=' + class_name + '></span>');
    }
  }
};

Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
Drupal.behaviors.extlink.attach = function (context, settings) {
  // Backwards compatibility, for the benefit of modules overriding extlink
  // functionality by defining an "extlinkAttach" global function.
  if (typeof extlinkAttach === 'function') {
    extlinkAttach(context);
  }
  else {
    Drupal.extlink.attach(context, settings);
  }
};

})(jQuery);
;
