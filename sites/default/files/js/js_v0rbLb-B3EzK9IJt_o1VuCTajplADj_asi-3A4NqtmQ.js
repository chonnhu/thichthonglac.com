Drupal.locale = { 'strings': {"":{"Preview":"Xem tr\u01b0\u1edbc","delete":"xo\u00e1","Cancel":"H\u1ee7y b\u1ecf","Delete":"X\u00f3a","none":"kh\u00f4ng c\u00f3","view":"xem","Yes":"C\u00f3","No":"Kh\u00f4ng","This permission is inherited from the authenticated user role.":"Quy\u1ec1n n\u00e0y \u0111\u01b0\u1ee3c k\u1ebf th\u1eeba t\u1eeb vai tr\u00f2 ng\u01b0\u1eddi d\u00f9ng \u0111\u00e3 x\u00e1c th\u1ef1c."}} };;
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
 * Attach the machine-readable name form element behavior.
 */
Drupal.behaviors.machineName = {
  /**
   * Attaches the behavior.
   *
   * @param settings.machineName
   *   A list of elements to process, keyed by the HTML ID of the form element
   *   containing the human-readable value. Each element is an object defining
   *   the following properties:
   *   - target: The HTML ID of the machine name form element.
   *   - suffix: The HTML ID of a container to show the machine name preview in
   *     (usually a field suffix after the human-readable name form element).
   *   - label: The label to show for the machine name preview.
   *   - replace_pattern: A regular expression (without modifiers) matching
   *     disallowed characters in the machine name; e.g., '[^a-z0-9]+'.
   *   - replace: A character to replace disallowed characters with; e.g., '_'
   *     or '-'.
   *   - standalone: Whether the preview should stay in its own element rather
   *     than the suffix of the source element.
   *   - field_prefix: The #field_prefix of the form element.
   *   - field_suffix: The #field_suffix of the form element.
   */
  attach: function (context, settings) {
    var self = this;
    for (var i in settings.machineName) {
      if (settings.machineName.hasOwnProperty(i)) {
        (function (source_id, options) {
          var $source = $(source_id, context).addClass('machine-name-source');
          var $target = $(options.target, context).addClass('machine-name-target');
          var $suffix = $(options.suffix, context);
          var $wrapper = $target.closest('.form-item');
          // All elements have to exist.
          if (!$source.length || !$target.length || !$suffix.length || !$wrapper.length) {
            return;
          }
          // Skip processing upon a form validation error on the machine name.
          if ($target.hasClass('error')) {
            return;
          }
          // Figure out the maximum length for the machine name.
          options.maxlength = $target.attr('maxlength');
          // Hide the form item container of the machine name form element.
          $wrapper.hide();
          // Determine the initial machine name value. Unless the machine name form
          // element is disabled or not empty, the initial default value is based on
          // the human-readable form element value.
          if ($target.is(':disabled') || $target.val() != '') {
            var machine = $target.val();
          }
          else {
            var machine = self.transliterate($source.val(), options);
          }
          // Append the machine name preview to the source field.
          var $preview = $('<span class="machine-name-value">' + options.field_prefix + Drupal.checkPlain(machine) + options.field_suffix + '</span>');
          $suffix.empty();
          if (options.label) {
            $suffix.append(' ').append('<span class="machine-name-label">' + options.label + ':</span>');
          }
          $suffix.append(' ').append($preview);

          // If the machine name cannot be edited, stop further processing.
          if ($target.is(':disabled')) {
            return;
          }

          // If it is editable, append an edit link.
          var $link = $('<span class="admin-link"><a href="#">' + Drupal.t('Edit') + '</a></span>')
            .click(function () {
              $wrapper.show();
              $target.focus();
              $suffix.hide();
              $source.unbind('.machineName');
              return false;
            });
          $suffix.append(' ').append($link);

          // Preview the machine name in realtime when the human-readable name
          // changes, but only if there is no machine name yet; i.e., only upon
          // initial creation, not when editing.
          if ($target.val() == '') {
            $source.bind('keyup.machineName change.machineName input.machineName', function () {
              machine = self.transliterate($(this).val(), options);
              // Set the machine name to the transliterated value.
              if (machine != '') {
                if (machine != options.replace) {
                  $target.val(machine);
                  $preview.html(options.field_prefix + Drupal.checkPlain(machine) + options.field_suffix);
                }
                $suffix.show();
              }
              else {
                $suffix.hide();
                $target.val(machine);
                $preview.empty();
              }
            });
            // Initialize machine name preview.
            $source.keyup();
          }
        }(i, settings.machineName[i]));
      }
    }
  },

  /**
   * Transliterate a human-readable name to a machine name.
   *
   * @param source
   *   A string to transliterate.
   * @param settings
   *   The machine name settings for the corresponding field, containing:
   *   - replace_pattern: A regular expression (without modifiers) matching
   *     disallowed characters in the machine name; e.g., '[^a-z0-9]+'.
   *   - replace: A character to replace disallowed characters with; e.g., '_'
   *     or '-'.
   *   - maxlength: The maximum length of the machine name.
   *
   * @return
   *   The transliterated source string.
   */
  transliterate: function (source, settings) {
    var rx = new RegExp(settings.replace_pattern, 'g');
    return source.toLowerCase().replace(rx, settings.replace).substr(0, settings.maxlength);
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;

(function ($) {

Drupal.behaviors.commentFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.comment-node-settings-form', context).drupalSetSummary(function (context) {
      return Drupal.checkPlain($('.form-item-comment input:checked', context).next('label').text());
    });

    // Provide the summary for the node type form.
    $('fieldset.comment-node-type-settings-form', context).drupalSetSummary(function(context) {
      var vals = [];

      // Default comment setting.
      vals.push($(".form-item-comment select option:selected", context).text());

      // Threading.
      var threading = $(".form-item-comment-default-mode input:checked", context).next('label').text();
      if (threading) {
        vals.push(threading);
      }

      // Comments per page.
      var number = $(".form-item-comment-default-per-page select option:selected", context).val();
      vals.push(Drupal.t('@number comments per page', {'@number': number}));

      return Drupal.checkPlain(vals.join(', '));
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.menuChangeParentItems = {
  attach: function (context, settings) {
    $('fieldset#edit-menu input').each(function () {
      $(this).change(function () {
        // Update list of available parent menu items.
        Drupal.menu_update_parent_list();
      });
    });
  }
};

/**
 * Function to set the options of the menu parent item dropdown.
 */
Drupal.menu_update_parent_list = function () {
  var values = [];

  $('input:checked', $('fieldset#edit-menu')).each(function () {
    // Get the names of all checked menus.
    values.push(Drupal.checkPlain($.trim($(this).val())));
  });

  var url = Drupal.settings.basePath + 'admin/structure/menu/parents';
  $.ajax({
    url: location.protocol + '//' + location.host + url,
    type: 'POST',
    data: {'menus[]' : values},
    dataType: 'json',
    success: function (options) {
      // Save key of last selected element.
      var selected = $('fieldset#edit-menu #edit-menu-parent :selected').val();
      // Remove all exisiting options from dropdown.
      $('fieldset#edit-menu #edit-menu-parent').children().remove();
      // Add new options to dropdown.
      jQuery.each(options, function(index, value) {
        $('fieldset#edit-menu #edit-menu-parent').append(
          $('<option ' + (index == selected ? ' selected="selected"' : '') + '></option>').val(index).text(value)
        );
      });
    }
  });
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.contentTypes = {
  attach: function (context) {
    // Provide the vertical tab summaries.
    $('fieldset#edit-submission', context).drupalSetSummary(function(context) {
      var vals = [];
      vals.push(Drupal.checkPlain($('#edit-title-label', context).val()) || Drupal.t('Requires a title'));
      return vals.join(', ');
    });
    $('fieldset#edit-workflow', context).drupalSetSummary(function(context) {
      var vals = [];
      $("input[name^='node_options']:checked", context).parent().each(function() {
        vals.push(Drupal.checkPlain($(this).text()));
      });
      if (!$('#edit-node-options-status', context).is(':checked')) {
        vals.unshift(Drupal.t('Not published'));
      }
      return vals.join(', ');
    });
    $('fieldset#edit-display', context).drupalSetSummary(function(context) {
      var vals = [];
      $('input:checked', context).next('label').each(function() {
        vals.push(Drupal.checkPlain($(this).text()));
      });
      if (!$('#edit-node-submitted', context).is(':checked')) {
        vals.unshift(Drupal.t("Don't display post information"));
      }
      return vals.join(', ');
    });
  }
};

})(jQuery);
;
(function ($) {

// Makes sure that strings support the trim() method from ECMAScript 5.
if (typeof String.prototype.trim != 'function') { // detect native implementation
  String.prototype.trim = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  };
}

Drupal.behaviors.gardensMiscComment = {
  attach: function (context) {
    // Overrides the summary handler from comment-node-form.js.
    $('fieldset.comment-node-type-settings-form', context).drupalSetSummary(function (context) {
      var vals = [];

      // Default comment setting.
      vals.push($("label", $(".form-item-comment input[type=radio][name=comment]:checked", context).parent()).text().trim());

      // Threading.
      var threading = $(".form-item-comment-default-mode input:checked", context).next('label').text();
      if (threading) {
        vals.push(threading);
      }

      // Comments per page.
      var number = $(".form-item-comment-default-per-page input", context).val();
      vals.push(Drupal.t('@number comments per page', {'@number': number}));

      return Drupal.checkPlain(vals.join(', '));
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.toolbar = Drupal.toolbar || {};

/**
 * Attach toggling behavior and notify the overlay of the toolbar.
 */
Drupal.behaviors.toolbar = {
  attach: function(context) {

    // Set the initial state of the toolbar.
    $('#toolbar', context).once('toolbar', Drupal.toolbar.init);

    // Toggling toolbar drawer.
    $('#toolbar a.toggle', context).once('toolbar-toggle').click(function(e) {
      Drupal.toolbar.toggle();
      // Allow resize event handlers to recalculate sizes/positions.
      $(window).triggerHandler('resize');
      return false;
    });
  }
};

/**
 * Retrieve last saved cookie settings and set up the initial toolbar state.
 */
Drupal.toolbar.init = function() {
  // Retrieve the collapsed status from a stored cookie.
  var collapsed = $.cookie('Drupal.toolbar.collapsed');

  // Expand or collapse the toolbar based on the cookie value.
  if (collapsed == 1) {
    Drupal.toolbar.collapse();
  }
  else {
    Drupal.toolbar.expand();
  }
};

/**
 * Collapse the toolbar.
 */
Drupal.toolbar.collapse = function() {
  var toggle_text = Drupal.t('Show shortcuts');
  $('#toolbar div.toolbar-drawer').addClass('collapsed');
  $('#toolbar a.toggle')
    .removeClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').removeClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    1,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Expand the toolbar.
 */
Drupal.toolbar.expand = function() {
  var toggle_text = Drupal.t('Hide shortcuts');
  $('#toolbar div.toolbar-drawer').removeClass('collapsed');
  $('#toolbar a.toggle')
    .addClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').addClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    0,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Toggle the toolbar.
 */
Drupal.toolbar.toggle = function() {
  if ($('#toolbar div.toolbar-drawer').hasClass('collapsed')) {
    Drupal.toolbar.expand();
  }
  else {
    Drupal.toolbar.collapse();
  }
};

Drupal.toolbar.height = function() {
  var $toolbar = $('#toolbar');
  var height = $toolbar.outerHeight();
  // In modern browsers (including IE9), when box-shadow is defined, use the
  // normal height.
  var cssBoxShadowValue = $toolbar.css('box-shadow');
  var boxShadow = (typeof cssBoxShadowValue !== 'undefined' && cssBoxShadowValue !== 'none');
  // In IE8 and below, we use the shadow filter to apply box-shadow styles to
  // the toolbar. It adds some extra height that we need to remove.
  if (!boxShadow && /DXImageTransform\.Microsoft\.Shadow/.test($toolbar.css('filter'))) {
    height -= $toolbar[0].filters.item("DXImageTransform.Microsoft.Shadow").strength;
  }
  return height;
};

})(jQuery);
;
/* Based on overlay-parent.js,v 1.22 2010/01/14 04:06:54 webchick */

(function ($) {

// Only act if overlay is found and we are supposed to show OpenID in overlays.
if (!Drupal.overlay) {
  return;
}

/**
 * Event handler: opens or closes the overlay based on the current URL fragment.
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: hashchange
 *   - event.currentTarget: document
 *
 * Overrides the same method from overlay-parent.js
 */
Drupal.overlay.eventhandlerOperateByURLFragment = function (event) {
  // If we changed the hash to reflect an internal redirect in the overlay,
  // its location has already been changed, so don't do anything.
  if ($.data(window.location, window.location.href) === 'redirect') {
    $.data(window.location, window.location.href, null);
    return;
  }

  // Get the overlay URL from the current URL fragment.
  var state = $.bbq.getState('overlay');
  if (state) {
    // Append render variable, so the server side can choose the right
    // rendering and add child frame code to the page if needed.
    var url = $.param.querystring(Drupal.settings.basePath + state, { render: 'overlay' });

    this.open(url);
    this.resetActiveClass(this.getPath(Drupal.settings.basePath + state));

    // This is the code section that extends the original overlay javascript
    // function.
    var isFactory = (state.indexOf('acsf-openid-factory/') > -1);
    if (isFactory) {
      // Ok, now we can tell the parent window we're ready.
      // @todo revisit this to use the overlay API more properly.
      $(this.inactiveFrame).addClass('overlay-active');
    }
  }
  // If there is no overlay URL in the fragment and the overlay is (still)
  // open, close the overlay.
  else if (this.isOpen && !this.isClosing) {
    this.close();
    this.resetActiveClass(this.getPath(window.location));
  }
};

})(jQuery);
;
(function($) {

Drupal.behaviors.gardensHelp = {
  attach: function(context) {
          Drupal.gardensHelp.init(context);
  }
};

Drupal.gardensHelp = Drupal.gardensHelp || {};

Drupal.gardensHelp.init = function(context) {
  // Move help area to inside the toolbar, so the toolbar resizes with it.
  var helpHeader = $('#help-header').html();
  $('#help-header').remove();
  $('#toolbar').prepend('<div id="help-header" style="display: none;">' + helpHeader + '</div>');

  // Bind our click handler to the help item.
  $('#toolbar-user .help a', context).bind('click', Drupal.gardensHelp.open);

  // Bind search submission handler to search form.
  $('#gardens-help-search-form').bind('submit', Drupal.gardensHelp.searchSubmit);

  // Bind links in the help header so that they will open a single new window
  $('#help-header a').bind('click', Drupal.gardensHelp.helpClick);
};

Drupal.gardensHelp.open = function() {
  $("#help-header").slideToggle("slow", Drupal.gardensHelp.positionOverlay);
  $("#toolbar-user .help").toggleClass("help-active");
  // Blur the link so that the :active suedo-class doesn't cause it to have the grey background
  $("#toolbar-user .help a").blur();
  return false;
};

Drupal.gardensHelp.positionOverlay = function() {
  // As the toolbar is an overlay displaced region, overlay should be
  // notified of it's height change to adapt its position.
  $('body').css('paddingTop', Drupal.toolbar.height());
  $(window).triggerHandler('resize.overlay-event');

  // Porting the fix for IE and the slideToggle from the Gardener
  var wrapper = $(this).parent();
  if (wrapper.css('zoom') != 1) {
    wrapper.css('zoom', 1);
  } else {
    wrapper.css('zoom', '');
  }
}

Drupal.gardensHelp.searchSubmit = function(event) {
  // This method needs to work the same way as the link click handler so that it doesn't create an additional window
  event.preventDefault();
  if (Drupal.gardensHelp.helpWindow) {
          Drupal.gardensHelp.helpWindow.close();
  }
  // The Gardener will read the URL arguments and take care of the lack of a POST submition
  Drupal.gardensHelp.helpWindow = window.open(Drupal.settings.gardenerHelpSearchURL + '/search/apachesolr_search/' + $('#gardens-help-search-query').val(), 'gardens_help');

}

Drupal.gardensHelp.helpClick = function (event) {
  // Stop normal link behavior
  event.preventDefault();

  // If there has already been a window created by the help drop down, close it.  Creating a new window will put focus on that window.
  if (Drupal.gardensHelp.helpWindow) {
    Drupal.gardensHelp.helpWindow.close();
  }
  Drupal.gardensHelp.helpWindow = window.open($(event.target).attr('href'), 'gardens_help');
};

})(jQuery);
;
/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
 browser: true */

/*global jQuery: true Drupal: true window: true ThemeBuilder: true */

(function ($) {

  /**
   * Override for the extlink module.
   *
   * ThemeBuilder requires the <a> and <span> tags for external links to have
   * different classes, so they can be targeted separately.
   */
  Drupal.extlink = Drupal.extlink || {};

  Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};

  Drupal.behaviors.extlink.attach = function (context, settings) {
    // Add "-link" to the end of the class name that's applied to both <a> and
    // <span> tags. We will remove it later before applying it to <span> tags.
    if (Drupal.settings.extlink && Drupal.settings.extlink.extClass) {
      Drupal.settings.extlink.extClass = Drupal.settings.extlink.extClass + '-link';
    }
    if ($.isFunction(Drupal.extlink.attach)) {
      Drupal.extlink.attach(context, settings);
    }
  };

  /**
   * Overrides method from the extlink module.
   *
   * Change the class name for the <span> that comes after external links,
   * so that it's "ext", not "ext-link".
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
    // If we've added "-link" to the end of the class name, remove it for
    // <span> tags. We want "-link" only at the end of the link class.
    var span_class = class_name.replace(/-link$/, '');
    for (i = 0; i < length; i++) {
      var $link = $($links_to_process[i]);
      if ($link.css('display') === 'inline') {
        $link.after('<span class=' + span_class + '></span>');
      }
    }
  };

  /**
   * Stop the rotation in the Rotating Banner when the ThemeBuilder is open
   */
  Drupal.behaviors.RotatingBannerInThemeBuilder = {
    attach: function (context) {
      if ($('body').hasClass('themebuilder')) {
        $('.rb-slides').each(function () {
          if ($(this).cycle) {
            $(this).cycle('stop');
          }
        });
      }
    }
  };

  /**
   * Activate Superfish Pulldown menus
   */
  Drupal.behaviors.GardensFeaturesPulldownMenus = {
    attach: function (context, settings) {
      Drupal.behaviors.GardensFeaturesPulldownMenus.settings = {
        appearance: {
          gutter: 10,
          push: 2,
          overlapOffset: 1.4545
        }
      };

      if (settings) {
        $.extend(Drupal.behaviors.GardensFeaturesPulldownMenus.settings, settings);
      }

      if ($().superfish) {
        $('.content > .menu', '#page .stack-navigation').once('pulldown', function () {
          var ghi = Drupal.settings.gardens_hoverintent || {enabled: true, sensitivity: 2, interval: 300, timeout: 500};
          $(this).superfish({
            hoverClass: 'menu-dropdown-hover',
            delay: 150,
            dropShadows: false,
            speed: 300,
            autoArrows: true,
            onBeforeShow: Drupal.behaviors.GardensFeaturesPulldownMenus.adjustPulldown,
            disableHI: !ghi.enabled,
            HISensitivity: ghi.sensitivity,
            HIInterval: ghi.interval,
            HITimeout: ghi.timeout
          });
        }).addClass('pulldown');
      }
    }
  };

  /**
   * This function is run to adjust the placement of a pulldown.
   *
   * @param {DomElement} this
   *   The pulldown (ul) that is currently being shown.
   */
  Drupal.behaviors.GardensFeaturesPulldownMenus.adjustPulldown = function () {
    $(this).css({display: 'block', visibility: 'hidden'});
    Drupal.behaviors.GardensFeaturesPulldownMenus.adjustPulldownPlacement($(this));
    $(this).css({display: 'none', visibility: 'visible'});
  };

  /**
   * Progressively increases the width of the pulldown by 33% until
   * the height of each item is less than the line height
   *
   * @param {DomElement} pulldown
   *   The pulldown (ul) to be positioned
   * @param {DomElement} item
   *   The anchor tag of an item in the list
   * @param {int} lineHeight
   *   The line height of the item's anchor tag. This is passed in
   *   because it does not need to be calculated more than once
   * @param {int} safety
   *   A counter to prevent recursive errors. The width of the pulldown
   *   will be adjusted at most 5 times currently.
   */
  Drupal.behaviors.GardensFeaturesPulldownMenus.adjustPulldownWidth = function (pulldown, item, lineHeight, safety) {
    var width = pulldown.width();
    var height = item.height();
    var wrapped = ((height - lineHeight) > 2) ? true : false; // Provide a little give with a 2 pixel fudge factor for IE7
    if (wrapped && (safety < 5)) {
      pulldown.animate({
          width: width * 1.2
        },
        {
          duration: 0,
          queue: true,
          complete: function () {
            safety += 1;
            Drupal.behaviors.GardensFeaturesPulldownMenus.adjustPulldownWidth(pulldown, item, lineHeight, safety);
          }
        }
      );
    }
  };

  /**
   * Moves a pulldown left or right, according to its alignment, after its
   * parent's width has been adjusted
   *
   * @param {DomElement} pulldown
   *   The pulldown (ul) to be positioned
   */
  Drupal.behaviors.GardensFeaturesPulldownMenus.adjustPulldownPlacement = function (element) {
    var pulldown = {};
    pulldown.el = element;
    var isRTL = ($('html').attr('dir') === 'rtl');

    // Wipe out any previous positioning
    pulldown.el.removeAttr('style');

    // Get the depth of the sub menu
    // 0 is first tier sub menu
    // 1 is second tier sub menu, etc
    var depth = pulldown.el.parentsUntil('.pulldown-processed').filter('.menu').length;
    pulldown.parent = {};
    pulldown.parent.el = element.prev('a');
    pulldown.parent.css = {
      lineHeight: Drupal.behaviors.GardensFeaturesPulldownMenus._stripPX(pulldown.parent.el.css('line-height')),
      padding: {
        top: Drupal.behaviors.GardensFeaturesPulldownMenus._stripPX(pulldown.parent.el.css('padding-top'))
      },
      margin: {
        top: Drupal.behaviors.GardensFeaturesPulldownMenus._stripPX(pulldown.parent.el.css('margin-top'))
      }
    };
    // Only consider pulldowns, not the main menu items
    // Basic placement without edge detection
    var root = {};
    root.el = pulldown.el.parents('.pulldown-processed li .menu');
    if (root.el && (root.el.length > 0)) {
      pulldown.el.css({
        left: root.el.width()
      });
    }
    // Get the viewport and scroll information
    var viewport = {};
    viewport.width = $(window).width(); // Width of the visible viewport
    viewport.height = $(window).height(); // Height of the visible viewport
    viewport.scroll = {};
    viewport.scroll.top = $(window).scrollTop();
    pulldown.pos = pulldown.el.position();
    // pushDir corresponds to the RTL setting
    var pushDir = (isRTL) ? 'right' : 'left';
    // handDir corresponds to which edge of the screen the menus might collide with. It is the opposite
    // of pushDir.
    var hangDir = (pushDir === 'right') ? 'left' : 'right';
    // Move the pulldown back to its origin if we moved it because of edge correction previously
    var prevCorrection = Drupal.behaviors.GardensFeaturesPulldownMenus._stripPX(pulldown.el.css(pushDir));
    if (prevCorrection < 0) {
      pulldown.el.css[pushDir] = pulldown.pos[pushDir] = 0;
    }
    // Now check for edge collision
    pulldown.offset = pulldown.el.offset();
    if (pulldown.offset) {
      pulldown.width = pulldown.el.outerWidth(false);
      pulldown.height = pulldown.el.outerHeight(false);
      pulldown.edge = {};
      pulldown.edge.left = pulldown.offset.left;
      pulldown.edge.right = pulldown.offset.left + pulldown.width;
      pulldown.edge.bottom = pulldown.offset.top + pulldown.height;
      pulldown.hang = {};
      pulldown.hang.left = pulldown.edge.left;
      pulldown.hang.right = viewport.width - pulldown.edge.right;
      pulldown.hang.bottom = (viewport.height + viewport.scroll.top) - pulldown.edge.bottom  - Drupal.behaviors.GardensFeaturesPulldownMenus.settings.appearance.gutter;
      pulldown.hang.bottomModified = 1;
      pulldown.correction = {};
      pulldown.correction.left = pulldown.pos.left + pulldown.hang.right - Drupal.behaviors.GardensFeaturesPulldownMenus.settings.appearance.gutter;
      pulldown.correction.right = (depth > 0) ?
        pulldown.hang.left + pulldown.width - Drupal.behaviors.GardensFeaturesPulldownMenus.settings.appearance.gutter :
        pulldown.hang.left - Drupal.behaviors.GardensFeaturesPulldownMenus.settings.appearance.gutter;

      // Move the pulldown back onto the screen
      if (pulldown.hang[hangDir] <= 0) {
        var leftVal = (pushDir === 'left') ? pulldown.correction.left : 'auto';
        var rightVal = (pushDir === 'right') ? pulldown.correction.right : 'auto';
        pulldown.el.css(
          {
            'left': leftVal,
            'right': rightVal
          }
        );
        // Push the pulldown down half a line height if it is a sub-sub menu so that sub menu items aren't completely occluded.
        if (depth > 0) {
          var top = (((pulldown.parent.css.lineHeight) / Drupal.behaviors.GardensFeaturesPulldownMenus.settings.appearance.overlapOffset) + (pulldown.parent.css.padding.top) + (pulldown.parent.css.margin.top));
          pulldown.el.css('top', top);
          pulldown.hang.bottomModified = pulldown.hang.bottom - top;
        }
      }
      // Move the pulldown up if it hangs off the bottom
      if (pulldown.hang.bottom <= 0 || pulldown.hang.bottomModified <= 0) {
        pulldown.el.css('top', (pulldown.pos.top + pulldown.hang.bottom));
      }
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
  Drupal.behaviors.GardensFeaturesPulldownMenus._stripPX = function (value) {
    if (value) {
      var index = value.indexOf('px');
      if (index === -1) {
        return NaN;
      }
      else {
        return Number(value.substring(0, index));
      }
    }
    else {
      return NaN;
    }
  };

  /**
   * Add a "Show/Hide disabled views" toggle link to the Views list on
   * admin/structure/views, similar to the "Show/Hide row weights" link on
   * tabledrag tables.
   */
  Drupal.behaviors.GardensFeaturesViewsListFilter = {
    attach: function (context, settings) {
      $('body.page-admin-structure-views table.#ctools-export-ui-list-items').once('gardens-features-views-list-filter', function () {
        var $table = $(this);

        // Remove any prior links created (for when table gets replaced by AJAX)
        $('.gardens-features-toggle-disabled-wrapper').remove();

        // Create the toggle link, initialized to reflect that all rows are
        // currently shown.
        var $link = $('<a href="#" class="gardens-features-toggle-disabled gardens-features-toggle-disabled-show"></a>')
          .text(Drupal.t('Hide disabled views'))
          .click(function () {
            if ($(this).hasClass('gardens-features-toggle-disabled-show')) {
              $(this).removeClass('gardens-features-toggle-disabled-show');
              $(this).addClass('gardens-features-toggle-disabled-hide');
              $('.ctools-export-ui-disabled', $table).hide();
              if ($('tbody tr', $table).length === $('.ctools-export-ui-disabled', $table).length) {
                $('tbody', $table).prepend('<tr class="gardens-features-toggle-disabled-empty odd"><td colspan="5">' + Drupal.t('No enabled views found.') + '</td></tr>');
              }
              $.cookie('Drupal.GardensFeaturesViewsListFilter.showDisabled', 0, {path: Drupal.settings.basePath, expires: 365});
              $(this).text(Drupal.t('Show disabled views'));
            }
            else {
              $(this).removeClass('gardens-features-toggle-disabled-hide');
              $(this).addClass('gardens-features-toggle-disabled-show');
              $('.ctools-export-ui-disabled', $table).show();
              $('.gardens-features-toggle-disabled-empty', $table).remove();
              $.cookie('Drupal.GardensFeaturesViewsListFilter.showDisabled', 1, {path: Drupal.settings.basePath, expires: 365});
              $(this).text(Drupal.t('Hide disabled views'));
            }
            return false;
          });

        // Add it before the table.
        $table.before($link.wrap('<div class="gardens-features-toggle-disabled-wrapper"></div>').parent());

        // Unless there's a cookie for disabled views to be shown, "click" the
        // link in order to hide them.
        if ($.cookie('Drupal.GardensFeaturesViewsListFilter.showDisabled') !== '1') {
          $link.click();
        }

        // If the filter form is also active, remove the widget to filter by
        // enabled/disabled status, to not conflict with the toggle link.
        $('#ctools-export-ui-list-form .form-item-disabled').hide();
      });
    }
  };

  /**
   * Open all links to Drupal Gardens "Learn More" pages in a new window.
   */
  Drupal.behaviors.GardensFeaturesLearnMoreLinks = {
    attach: function (context, settings) {
      $('a[href^="http://www.drupalgardens.com/learnmore/"]', context).attr('target', '_blank');
    }
  };


  /**
   * Scroll to top of AJAX view on pager click.
   */
  Drupal.behaviors.viewsAjaxScroll = {
    attach: function (context, settings) {
      if (typeof Drupal.settings.views !== 'undefined' &&
          typeof Drupal.settings.views.ajax_path !== 'undefined' &&
          typeof Drupal.behaviors.ViewsLoadMore === 'undefined') {
        // make sure we have AJAX, but not load_more
        $('.item-list .pager a').not('a.load-more').once('views-ajax-scroll').click(function ()
        {
          var outer = $(this).parents('.view');
          if ($(outer).parents('.pane').length) {
            // if there is surrounding pane, scroll to top of it
            outer = $(outer).parents('.pane');
          }
          else if ($(outer).parents('.block').length) {
            // if there is surrounding block, scroll top top of it
            outer = $(outer).parents('.block');
          }
          var viewtop = outer.offset().top - $('#toolbar').outerHeight();
          $('html, body').animate({scrollTop: viewtop}, 'slow', 'linear');
        });
      }
    }
  };

  /**
   * Add dialog behavior to /user links for anonymous users.
   */
  Drupal.behaviors.gardensUserDialog = {};
  Drupal.behaviors.gardensUserDialog.attach = function (context, settings) {
    var useCapture = settings.janrainCapture && settings.janrainCapture.enforce;
    if (settings.gardensFeatures && settings.gardensFeatures.userIsAnonymous && settings.gardensFeatures.dialogUserEnabled && !useCapture) {
      // Modify all /user links so that they appear in a popup dialog.
      var links = $('a[href^="/user"]').once('user-dialog');
      var length = links.length;
      if (links.length === 0) {
        return;
      }
      var i, link, intab;
      for (i = 0; i < length; i++) {
        link = links[i];
        // Is the link in a tab (e.g. on the user login register or password pages)
        intab = $(link).parents().filter('ul.tabs');
        // Only act on the following types of links:
        // /user, /user/login, /user/register, /user/password
        // Ignore links that were already set up correctly on the server side.
        if (link.href.indexOf('nojs') === -1 && link.href.indexOf('ajax') === -1) {
          if (link.href.match(/\/user$/)) {
            if(intab.length == 0) {
              link.href = '/user/login/ajax';
            }
            else {
              link.href = '/user/login/nojs';
            }
            $(link).addClass('use-ajax use-dialog');
          }
          else if (link.href.match(/\/user\/(login|register|password)$/)) {
            if(intab.length == 0) {
                    link.href = link.href.replace(/\/user\/(login|register|password)/, '/user/$1/ajax');
            }
            else {
              link.href = link.href.replace(/\/user\/(login|register|password)/, '/user/$1/nojs');
            }
            $(link).addClass('use-ajax use-dialog');
          }
        }
      }
      // The AJAX and dialog behaviors have already run; rerun them to pick up
      // newly ajaxified links.
      Drupal.behaviors.AJAX.attach(context, settings);
      Drupal.behaviors.dialog.attach(context, settings);
    }
  };

  // Disable the lazyloader: http://drupal.org/node/665128#comment-5301192
  if (typeof(Drupal.ajax) !== 'undefined') {
    Drupal.ajax.prototype.commands.xlazyloader = function () {};
  }
}(jQuery));
;
