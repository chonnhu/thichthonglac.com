(function ($) {

/**
 * Terminology:
 *
 *   "Link" means "Everything which is in flag.tpl.php" --and this may contain
 *   much more than the <A> element. On the other hand, when we speak
 *   specifically of the <A> element, we say "element" or "the <A> element".
 */

/**
 * The main behavior to perform AJAX toggling of links.
 */
Drupal.flagLink = function(context) {
  /**
   * Helper function. Updates a link's HTML with a new one.
   *
   * @param element
   *   The <A> element.
   * @return
   *   The new link.
   */
  function updateLink(element, newHtml) {
    var $newLink = $(newHtml);

    // Initially hide the message so we can fade it in.
    $('.flag-message', $newLink).css('display', 'none');

    // Reattach the behavior to the new <A> element. This element
    // is either whithin the wrapper or it is the outer element itself.
    var $nucleus = $newLink.is('a') ? $newLink : $('a.flag', $newLink);
    $nucleus.addClass('flag-processed').click(flagClick);

    // Find the wrapper of the old link.
    var $wrapper = $(element).parents('.flag-wrapper:first');
    if ($wrapper.length == 0) {
      // If no ancestor wrapper was found, or if the 'flag-wrapper' class is
      // attached to the <a> element itself, then take the element itself.
      $wrapper = $(element);
    }
    // Replace the old link with the new one.
    $wrapper.after($newLink).remove();
    Drupal.attachBehaviors($newLink.get(0));

    $('.flag-message', $newLink).fadeIn();
    setTimeout(function(){ $('.flag-message', $newLink).fadeOut() }, 3000);
    return $newLink.get(0);
  }

  /**
   * A click handler that is attached to all <A class="flag"> elements.
   */
  function flagClick() {
    // 'this' won't point to the element when it's inside the ajax closures,
    // so we reference it using a variable.
    var element = this;

    // While waiting for a server response, the wrapper will have a
    // 'flag-waiting' class. Themers are thus able to style the link
    // differently, e.g., by displaying a throbber.
    var $wrapper = $(element).parents('.flag-wrapper');
    if ($wrapper.is('.flag-waiting')) {
      // Guard against double-clicks.
      return false;
    }
    $wrapper.addClass('flag-waiting');

    // Hide any other active messages.
    $('span.flag-message:visible').fadeOut();

    // Send POST request
    $.ajax({
      type: 'POST',
      url: element.href,
      data: { js: true },
      dataType: 'json',
      success: function (data) {
        if (data.status) {
          // Success.
          data.link = $wrapper.get(0);
          $.event.trigger('flagGlobalBeforeLinkUpdate', [data]);
          if (!data.preventDefault) { // A handler may cancel updating the link.
            data.link = updateLink(element, data.newLink);
          }
          $.event.trigger('flagGlobalAfterLinkUpdate', [data]);
        }
        else {
          // Failure.
          alert(data.errorMessage);
          $wrapper.removeClass('flag-waiting');
        }
      },
      error: function (xmlhttp) {
        alert('An HTTP error '+ xmlhttp.status +' occurred.\n'+ element.href);
        $wrapper.removeClass('flag-waiting');
      }
    });
    return false;
  }

  $('a.flag-link-toggle:not(.flag-processed)', context).addClass('flag-processed').click(flagClick);
};

/**
 * Prevent anonymous flagging unless the user has JavaScript enabled.
 */
Drupal.flagAnonymousLinks = function(context) {
  $('a.flag:not(.flag-anonymous-processed)', context).each(function() {
    this.href += (this.href.match(/\?/) ? '&' : '?') + 'has_js=1';
    $(this).addClass('flag-anonymous-processed');
  });
}

String.prototype.flagNameToCSS = function() {
  return this.replace(/_/g, '-');
}

/**
 * A behavior specifically for anonymous users. Update links to the proper state.
 */
Drupal.flagAnonymousLinkTemplates = function(context) {
  // Swap in current links. Cookies are set by PHP's setcookie() upon flagging.

  var templates = Drupal.settings.flag.templates;

  // Build a list of user-flags.
  var userFlags = Drupal.flagCookie('flags');
  if (userFlags) {
    userFlags = userFlags.split('+');
    for (var n in userFlags) {
      var flagInfo = userFlags[n].match(/(\w+)_(\d+)/);
      var flagName = flagInfo[1];
      var contentId = flagInfo[2];
      // User flags always default to off and the JavaScript toggles them on.
      if (templates[flagName + '_' + contentId]) {
        $('.flag-' + flagName.flagNameToCSS() + '-' + contentId, context).after(templates[flagName + '_' + contentId]).remove();
      }
    }
  }

  // Build a list of global flags.
  var globalFlags = document.cookie.match(/flag_global_(\w+)_(\d+)=([01])/g);
  if (globalFlags) {
    for (var n in globalFlags) {
      var flagInfo = globalFlags[n].match(/flag_global_(\w+)_(\d+)=([01])/);
      var flagName = flagInfo[1];
      var contentId = flagInfo[2];
      var flagState = (flagInfo[3] == '1') ? 'flag' : 'unflag';
      // Global flags are tricky, they may or may not be flagged in the page
      // cache. The template always contains the opposite of the current state.
      // So when checking global flag cookies, we need to make sure that we
      // don't swap out the link when it's already in the correct state.
      if (templates[flagName + '_' + contentId]) {
        $('.flag-' + flagName.flagNameToCSS() + '-' + contentId, context).each(function() {
          if ($(this).find('.' + flagState + '-action').size()) {
            $(this).after(templates[flagName + '_' + contentId]).remove();
          }
        });
      }
    }
  }
}

/**
 * Utility function used to set Flag cookies.
 *
 * Note this is a direct copy of the jQuery cookie library.
 * Written by Klaus Hartl.
 */
Drupal.flagCookie = function(name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    // NOTE Needed to parenthesize options.path and options.domain
    // in the following expressions, otherwise they evaluate to undefined
    // in the packed version for some reason...
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

Drupal.behaviors.flagLink = {};
Drupal.behaviors.flagLink.attach = function(context) {
  // For anonymous users with the page cache enabled, swap out links with their
  // current state for the user.
  if (Drupal.settings.flag && Drupal.settings.flag.templates) {
    Drupal.flagAnonymousLinkTemplates(context);
  }

  // For all anonymous users, require JavaScript for flagging to prevent spiders
  // from flagging things inadvertently.
  if (Drupal.settings.flag && Drupal.settings.flag.anonymous) {
    Drupal.flagAnonymousLinks(context);
  }

  // On load, bind the click behavior for all links on the page.
  Drupal.flagLink(context);
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

/*global jQuery: true debug: true Drupal: true window: true */

var ThemeBuilder = ThemeBuilder || {};
ThemeBuilder.styleEditor = ThemeBuilder.styleEditor || {};

/**
 * @class
 */
Drupal.behaviors.themebuilderBarLast = {
  attach: function (context, settings) {
    ThemeBuilder.initializeUI();
  }
};

/**
 * Initializes the initial state of the themebuilder.
 */
ThemeBuilder.initializeUI = function () {
  ThemeBuilder.addThemeEditButton();

  if (jQuery('body').hasClass('themebuilder')) {
    ThemeBuilder.open();
  }
  else {
    ThemeBuilder.close();
  }
};

/**
 * Overrides the "Appearance" toolbar button so that it launches themebuilder.
 */
ThemeBuilder.addThemeEditButton = function () {
  // Strip the 'admin/appearance' href from the "Appearance" toolbar link.
  // We can't use '#' as the href, because if we do, the link will show up
  // as highlighted when the overlay is closed and the hash changes to '#'.
  var $toolbarLink = jQuery('#toolbar-link-admin-appearance').removeAttr('href').css('cursor', 'pointer');

  // @see: function themebuilder_compiler_preprocess_html()
  // The themebuilder is disabled if we're using an admin theme, for example.
  if (!jQuery('body').hasClass('themebuilder-disabled')) {
    // Avoid attaching multiple event listeners.
    $toolbarLink.unbind('click', ThemeBuilder._appearanceButtonCallback);
    $toolbarLink.click(ThemeBuilder._appearanceButtonCallback);
  }
};

/**
 * Determines whether the browser being used is supported by the themebuilder.
 *
 * @return {boolean}
 *   true if the browser is supported; false otherwise.
 */
ThemeBuilder.browserSupported = function () {
  var browserOk = false;
  var browserDetect = new ThemeBuilder.BrowserDetect();
  switch (browserDetect.browser) {
  case 'Mozilla':
  case 'Firefox':
    browserOk = (parseFloat(browserDetect.version) >= 1.9);
    break;

  case 'Explorer':
    browserOk = (parseFloat(browserDetect.version) >= 8.0);
    break;

  case 'Safari':
    browserOk = true;
    break;

  case 'Chrome':
    browserOk = true;
    break;

  default:
  }
  return browserOk;
};

/**
 * Called when the appearance button is clicked.
 */
ThemeBuilder._appearanceButtonCallback = function () {
  // If the themebuilder is open and an overlay is open, 
  // clicking the appearance button will close the overlay
  // instead of acting on the themebuilder
  if (jQuery('body').hasClass('themebuilder') && Drupal.overlay.isOpen) {
    jQuery.bbq.removeState('overlay');
    return false;
  }
  if (ThemeBuilder.browserSupported()) {
    // This is idempotent, so no need to check if themebuilder is
    // open already.
    var bar = ThemeBuilder.Bar.getInstance();
    bar.openThemebuilder();
  }
  else {
    alert("Editing your site's appearance requires one of the following browsers: Firefox version 3.0 or higher, Internet Explorer 8, Safari 4, or Google Chrome 4.");
  }
  return false;
};

/**
 * Opens the themebuilder.  This function causes the shortcuts bar to disappear
 * and opens the themebuilder panel.
 */
ThemeBuilder.open = function () {
  if (jQuery('div.toolbar-shortcuts')) {
    Drupal.toolbar.collapse();
  }

  // Convert any embed tags into placeholder images to not break z-index
  jQuery('embed').each(ThemeBuilder.embedReplace);

  // Make sure the initialization data has been received.
  var app = ThemeBuilder.getApplicationInstance();
  var appData = app.getData();
  if (!appData) {
    app.addApplicationInitializer(ThemeBuilder.open);
    return;
  }
  app.addApplicationInitializer(ThemeBuilder.applicationDataInitialized);
  app.addUpdateListener(ThemeBuilder.applicationDataUpdated);
  var bar = ThemeBuilder.Bar.getInstance();
  bar.show();
  ThemeBuilder.populateUndoStack();
  ThemeBuilder.undoStack.addChangeListener(bar);
  ThemeBuilder.redoStack.addChangeListener(bar);
  bar.stackChanged();
};

/**
 * Closes the themebuilder panel.
 */
ThemeBuilder.close = function () {
  if (Drupal.toolbar) {
    Drupal.toolbar.expand();
  }
  var bar = ThemeBuilder.Bar.getInstance(false);
  if (bar && ThemeBuilder.undoStack) {
    ThemeBuilder.undoStack.removeChangeListener(bar);
    ThemeBuilder.redoStack.addChangeListener(bar);
  }
};

ThemeBuilder.embedReplace = function (index, element) {
  var $ = jQuery;
  var h = $(element).height();
  var w = $(element).width();

  var placeholder = $('<div class="flash-content tb-no-select" title="Flash content not available while Themebuilding"></div>').css({'height': h, 'width': w});

  $(element).replaceWith(placeholder);
};

/**
 * Called when the application data is initialized.
 *
 * @param {Array} data
 *   The initial application data returned from the server.
 */
ThemeBuilder.applicationDataInitialized = function (data) {
  // Trigger any behaviors that the server side code requested to be triggered.
  ThemeBuilder.triggerBehaviors(data);
};

/**
 * Called when the application data has changed.
 *
 * @param {Array} data
 *   The set of application data that changed.
 */
ThemeBuilder.applicationDataUpdated = function (data) {
  // Look for a change to the maintenance mode state and alert the user to save
  // their theme.
  if (data.maintenance_mode === true) {
    alert(Drupal.t('The ThemeBuilder will soon be undergoing a brief maintenance period.  Please save your work and close the ThemeBuilder.'));
  }
  else if (data.maintenance_mode === false) {
    // Probably don't need a message when we come out of maintenance mode.
  }

  // Trigger any behaviors that the server side code requested to be triggered.
  ThemeBuilder.triggerBehaviors(data);
};

/**
 * Triggers behaviors that the server side code requested to be triggered.
 *
 * @param {Array} data
 *   The data returned from the server, either on application initialization or
 *   on application update.
 */
ThemeBuilder.triggerBehaviors = function (data) {
  if (data.hasOwnProperty("behaviors_to_trigger")) {
    for (var behavior_to_trigger in data.behaviors_to_trigger) {
      if (data.behaviors_to_trigger.hasOwnProperty(behavior_to_trigger)) {
        jQuery('#themebuilder-main').trigger(behavior_to_trigger);
      }
    }
  }
};

/**
 * Work around an issue in Drupal's behavior code that causes the attach method to not be called if a previously called attach method encountered an error.
 *
 * Because of a lack of exception handling in behaviors code, it is
 * not guaranteed that all of the behaviors code will actually get
 * executed.  See http://drupal.org/node/990880.
 * Until that issue is resolved, wrap each behavior attach method with
 * a wrapper that catches and ignores any error.
 */
ThemeBuilder.protectAgainstBrokenInitializers = function () {
  for (var behavior in Drupal.behaviors) {
    if (jQuery.isFunction(Drupal.behaviors[behavior].attach)) {
      var attach = Drupal.behaviors[behavior].attach;
      Drupal.behaviors[behavior].attach = ThemeBuilder.errorCatchingWrapper(behavior, attach);
    }
  }
};

/**
 * This wrapper is used to wrap each behavior's attach method to prevent errors encountered during initialization from preventing subsequent initialization code from executing.
 *
 * @param {String} behavior
 *   The name of the behaivor the specified attach function is associated with.
 * @param {Function} attach
 *   The attach method that is to be wrapped with error handling functionality.
 */
ThemeBuilder.errorCatchingWrapper = function (behavior, attach) {
  return function () {
    try {
      return attach.apply(this, arguments);
    }
    catch (e) {
      var message = e.message ? e.message : e;
      ThemeBuilder.Log.gardensWarning('AN-25177 - Error encountered in the JavaScript initialization code', 'Drupal.behaviors.' + behavior + ': ' + message);
      if (ThemeBuilder.isDevelMode()) {
        alert(message);
      }
    }
  };
};

/**
 * Make sure that any errors encountered during initialization do not
 * make it impossible to open the themebuilder.
 */
ThemeBuilder.protectAgainstBrokenInitializers();
;
