Drupal.locale = { 'strings': {"":{"An AJAX HTTP error occurred.":"C\u00f3 l\u1ed7i AJAX HTTP.","HTTP Result Code: !status":"K\u1ebft qu\u1ea3 m\u00e3 HTTP: !status","An AJAX HTTP request terminated abnormally.":"Y\u00eau c\u1ea7u AJAX HTTP k\u1ebft th\u00fac b\u1ea5t th\u01b0\u1eddng.","Debugging information follows.":"R\u00e0 l\u1ed7i theo th\u00f4ng tin sau.","Path: !uri":"\u0110\u01b0\u1eddng d\u1eabn: !uri","StatusText: !statusText":"StatusText: !statusText","ResponseText: !responseText":"ResponseTextt: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Loading":"\u0110ang n\u1ea1p","(active tab)":"(tab ho\u1ea1t \u0111\u1ed9ng)","Hide":"\u1ea8n","Show":"Hi\u1ec7n","Re-order rows by numerical weight instead of dragging.":"S\u1eafp x\u1ebfp l\u1ea1i danh m\u1ee5c theo \u0111\u1ed9 n\u1eb7ng thay v\u00ec k\u00e9o ch\u00fang.","Show row weights":"Hi\u1ec7n tr\u1ecdng s\u1ed1 h\u00e0ng","Hide row weights":"\u1ea8n tr\u1ecdng s\u1ed1 h\u00e0ng","Drag to re-order":"K\u00e9o \u0111\u1ec3 s\u1eafp x\u1ebfp l\u1ea1i","Changes made in this table will not be saved until the form is submitted.":"C\u00e1c thay \u0111\u1ed5i \u0111\u01b0\u1ee3c th\u1ef1c hi\u1ec7n trong b\u1ea3ng n\u00e0y s\u1ebd kh\u00f4ng \u0111\u01b0\u1ee3c l\u01b0u cho \u0111\u1ebfn khi bi\u1ec3u m\u1eabu \u0111\u01b0\u1ee3c \u0111\u1ec7 tr\u00ecnh.","Preview":"Xem tr\u01b0\u1edbc","@title dialog":"H\u1ed9p tho\u1ea1i @title","Please wait...":"Vui l\u00f2ng \u0111\u1ee3i...","delete":"xo\u00e1","Select all rows in this table":"Ch\u1ecdn t\u1ea5t c\u1ea3 c\u00e1c d\u00f2ng trong b\u1ea3ng n\u00e0y","Deselect all rows in this table":"B\u1ecf ch\u1ecdn t\u1ea5t c\u1ea3 c\u00e1c d\u00f2ng trong b\u1ea3ng n\u00e0y","Edit":"S\u1eeda","Configure":"C\u1ea5u h\u00ecnh","Hide shortcuts":"\u1ea8n li\u00ean k\u1ebft nhanh","OK":"OK","Cancel":"H\u1ee7y b\u1ecf","Show shortcuts":"Hi\u1ec7n li\u00ean k\u1ebft nhanh","Delete":"X\u00f3a","none":"kh\u00f4ng c\u00f3","Not in menu":"Kh\u00f4ng c\u00f3 trong tr\u00ecnh \u0111\u01a1n","Not in book":"Kh\u00f4ng n\u1eb1m trong s\u00e1ch","New book":"S\u00e1ch m\u1edbi","New revision":"Phi\u00ean b\u1ea3n m\u1edbi","No revision":"Kh\u00f4ng c\u00f3 phi\u00ean b\u1ea3n n\u00e0o","By @name on @date":"B\u1edfi @name v\u00e0o l\u00fac @date","By @name":"@name vi\u1ebft","Not published":"Ch\u01b0a c\u00f4ng b\u1ed1","@number comments per page":"@number l\u1eddi b\u00ecnh m\u1ed7i trang","No alias":"Ch\u01b0a c\u00f3 \u0111\u01b0\u1eddng d\u1eabn \u1ea3o","Autocomplete popup":"B\u1eadt l\u00ean t\u1ef1 ho\u00e0n t\u1ea5t","Searching for matches...":"T\u00ecm kh\u1edbp...","view":"xem","Hide summary":"\u1ea8n t\u00f3m t\u1eaft","Edit summary":"S\u1eeda t\u00f3m t\u1eaft","Yes":"C\u00f3","No":"Kh\u00f4ng","This permission is inherited from the authenticated user role.":"Quy\u1ec1n n\u00e0y \u0111\u01b0\u1ee3c k\u1ebf th\u1eeba t\u1eeb vai tr\u00f2 ng\u01b0\u1eddi d\u00f9ng \u0111\u00e3 x\u00e1c th\u1ef1c."}} };;
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
(function ($) {

$(document).bind('cbox_complete', function () {
  if ($.isFunction($.colorbox) && $.isFunction($.colorbox.resize)) {
    $.colorbox.resize();
  }
});

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
