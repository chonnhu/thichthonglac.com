(function ($) {

/**
 * Drag and drop table rows with field manipulation.
 *
 * Using the drupal_add_tabledrag() function, any table with weights or parent
 * relationships may be made into draggable tables. Columns containing a field
 * may optionally be hidden, providing a better user experience.
 *
 * Created tableDrag instances may be modified with custom behaviors by
 * overriding the .onDrag, .onDrop, .row.onSwap, and .row.onIndent methods.
 * See blocks.js for an example of adding additional functionality to tableDrag.
 */
Drupal.behaviors.tableDrag = {
  attach: function (context, settings) {
    for (var base in settings.tableDrag) {
      $('#' + base, context).once('tabledrag', function () {
        // Create the new tableDrag instance. Save in the Drupal variable
        // to allow other scripts access to the object.
        Drupal.tableDrag[base] = new Drupal.tableDrag(this, settings.tableDrag[base]);
      });
    }
  }
};

/**
 * Constructor for the tableDrag object. Provides table and field manipulation.
 *
 * @param table
 *   DOM object for the table to be made draggable.
 * @param tableSettings
 *   Settings for the table added via drupal_add_dragtable().
 */
Drupal.tableDrag = function (table, tableSettings) {
  var self = this;

  // Required object variables.
  this.table = table;
  this.tableSettings = tableSettings;
  this.dragObject = null; // Used to hold information about a current drag operation.
  this.rowObject = null; // Provides operations for row manipulation.
  this.oldRowElement = null; // Remember the previous element.
  this.oldY = 0; // Used to determine up or down direction from last mouse move.
  this.changed = false; // Whether anything in the entire table has changed.
  this.maxDepth = 0; // Maximum amount of allowed parenting.
  this.rtl = $(this.table).css('direction') == 'rtl' ? -1 : 1; // Direction of the table.

  // Configure the scroll settings.
  this.scrollSettings = { amount: 4, interval: 50, trigger: 70 };
  this.scrollInterval = null;
  this.scrollY = 0;
  this.windowHeight = 0;

  // Check this table's settings to see if there are parent relationships in
  // this table. For efficiency, large sections of code can be skipped if we
  // don't need to track horizontal movement and indentations.
  this.indentEnabled = false;
  for (var group in tableSettings) {
    for (var n in tableSettings[group]) {
      if (tableSettings[group][n].relationship == 'parent') {
        this.indentEnabled = true;
      }
      if (tableSettings[group][n].limit > 0) {
        this.maxDepth = tableSettings[group][n].limit;
      }
    }
  }
  if (this.indentEnabled) {
    this.indentCount = 1; // Total width of indents, set in makeDraggable.
    // Find the width of indentations to measure mouse movements against.
    // Because the table doesn't need to start with any indentations, we
    // manually append 2 indentations in the first draggable row, measure
    // the offset, then remove.
    var indent = Drupal.theme('tableDragIndentation');
    var testRow = $('<tr/>').addClass('draggable').appendTo(table);
    var testCell = $('<td/>').appendTo(testRow).prepend(indent).prepend(indent);
    this.indentAmount = $('.indentation', testCell).get(1).offsetLeft - $('.indentation', testCell).get(0).offsetLeft;
    testRow.remove();
  }

  // Make each applicable row draggable.
  // Match immediate children of the parent element to allow nesting.
  $('> tr.draggable, > tbody > tr.draggable', table).each(function () { self.makeDraggable(this); });

  // Add a link before the table for users to show or hide weight columns.
  $(table).before($('<a href="#" class="tabledrag-toggle-weight"></a>')
    .attr('title', Drupal.t('Re-order rows by numerical weight instead of dragging.'))
    .click(function () {
      if ($.cookie('Drupal.tableDrag.showWeight') == 1) {
        self.hideColumns();
      }
      else {
        self.showColumns();
      }
      return false;
    })
    .wrap('<div class="tabledrag-toggle-weight-wrapper"></div>')
    .parent()
  );

  // Initialize the specified columns (for example, weight or parent columns)
  // to show or hide according to user preference. This aids accessibility
  // so that, e.g., screen reader users can choose to enter weight values and
  // manipulate form elements directly, rather than using drag-and-drop..
  self.initColumns();

  // Add mouse bindings to the document. The self variable is passed along
  // as event handlers do not have direct access to the tableDrag object.
  $(document).bind('mousemove', function (event) { return self.dragRow(event, self); });
  $(document).bind('mouseup', function (event) { return self.dropRow(event, self); });
};

/**
 * Initialize columns containing form elements to be hidden by default,
 * according to the settings for this tableDrag instance.
 *
 * Identify and mark each cell with a CSS class so we can easily toggle
 * show/hide it. Finally, hide columns if user does not have a
 * 'Drupal.tableDrag.showWeight' cookie.
 */
Drupal.tableDrag.prototype.initColumns = function () {
  for (var group in this.tableSettings) {
    // Find the first field in this group.
    for (var d in this.tableSettings[group]) {
      var field = $('.' + this.tableSettings[group][d].target + ':first', this.table);
      if (field.length && this.tableSettings[group][d].hidden) {
        var hidden = this.tableSettings[group][d].hidden;
        var cell = field.closest('td');
        break;
      }
    }

    // Mark the column containing this field so it can be hidden.
    if (hidden && cell[0]) {
      // Add 1 to our indexes. The nth-child selector is 1 based, not 0 based.
      // Match immediate children of the parent element to allow nesting.
      var columnIndex = $('> td', cell.parent()).index(cell.get(0)) + 1;
      $('> thead > tr, > tbody > tr, > tr', this.table).each(function () {
        // Get the columnIndex and adjust for any colspans in this row.
        var index = columnIndex;
        var cells = $(this).children();
        cells.each(function (n) {
          if (n < index && this.colSpan && this.colSpan > 1) {
            index -= this.colSpan - 1;
          }
        });
        if (index > 0) {
          cell = cells.filter(':nth-child(' + index + ')');
          if (cell[0].colSpan && cell[0].colSpan > 1) {
            // If this cell has a colspan, mark it so we can reduce the colspan.
            cell.addClass('tabledrag-has-colspan');
          }
          else {
            // Mark this cell so we can hide it.
            cell.addClass('tabledrag-hide');
          }
        }
      });
    }
  }

  // Now hide cells and reduce colspans unless cookie indicates previous choice.
  // Set a cookie if it is not already present.
  if ($.cookie('Drupal.tableDrag.showWeight') === null) {
    $.cookie('Drupal.tableDrag.showWeight', 0, {
      path: Drupal.settings.basePath,
      // The cookie expires in one year.
      expires: 365
    });
    this.hideColumns();
  }
  // Check cookie value and show/hide weight columns accordingly.
  else {
    if ($.cookie('Drupal.tableDrag.showWeight') == 1) {
      this.showColumns();
    }
    else {
      this.hideColumns();
    }
  }
};

/**
 * Hide the columns containing weight/parent form elements.
 * Undo showColumns().
 */
Drupal.tableDrag.prototype.hideColumns = function () {
  // Hide weight/parent cells and headers.
  $('.tabledrag-hide', 'table.tabledrag-processed').css('display', 'none');
  // Show TableDrag handles.
  $('.tabledrag-handle', 'table.tabledrag-processed').css('display', '');
  // Reduce the colspan of any effected multi-span columns.
  $('.tabledrag-has-colspan', 'table.tabledrag-processed').each(function () {
    this.colSpan = this.colSpan - 1;
  });
  // Change link text.
  $('.tabledrag-toggle-weight').text(Drupal.t('Show row weights'));
  // Change cookie.
  $.cookie('Drupal.tableDrag.showWeight', 0, {
    path: Drupal.settings.basePath,
    // The cookie expires in one year.
    expires: 365
  });
  // Trigger an event to allow other scripts to react to this display change.
  $('table.tabledrag-processed').trigger('columnschange', 'hide');
};

/**
 * Show the columns containing weight/parent form elements
 * Undo hideColumns().
 */
Drupal.tableDrag.prototype.showColumns = function () {
  // Show weight/parent cells and headers.
  $('.tabledrag-hide', 'table.tabledrag-processed').css('display', '');
  // Hide TableDrag handles.
  $('.tabledrag-handle', 'table.tabledrag-processed').css('display', 'none');
  // Increase the colspan for any columns where it was previously reduced.
  $('.tabledrag-has-colspan', 'table.tabledrag-processed').each(function () {
    this.colSpan = this.colSpan + 1;
  });
  // Change link text.
  $('.tabledrag-toggle-weight').text(Drupal.t('Hide row weights'));
  // Change cookie.
  $.cookie('Drupal.tableDrag.showWeight', 1, {
    path: Drupal.settings.basePath,
    // The cookie expires in one year.
    expires: 365
  });
  // Trigger an event to allow other scripts to react to this display change.
  $('table.tabledrag-processed').trigger('columnschange', 'show');
};

/**
 * Find the target used within a particular row and group.
 */
Drupal.tableDrag.prototype.rowSettings = function (group, row) {
  var field = $('.' + group, row);
  for (var delta in this.tableSettings[group]) {
    var targetClass = this.tableSettings[group][delta].target;
    if (field.is('.' + targetClass)) {
      // Return a copy of the row settings.
      var rowSettings = {};
      for (var n in this.tableSettings[group][delta]) {
        rowSettings[n] = this.tableSettings[group][delta][n];
      }
      return rowSettings;
    }
  }
};

/**
 * Take an item and add event handlers to make it become draggable.
 */
Drupal.tableDrag.prototype.makeDraggable = function (item) {
  var self = this;

  // Create the handle.
  var handle = $('<a href="#" class="tabledrag-handle"><div class="handle">&nbsp;</div></a>').attr('title', Drupal.t('Drag to re-order'));
  // Insert the handle after indentations (if any).
  if ($('td:first .indentation:last', item).length) {
    $('td:first .indentation:last', item).after(handle);
    // Update the total width of indentation in this entire table.
    self.indentCount = Math.max($('.indentation', item).length, self.indentCount);
  }
  else {
    $('td:first', item).prepend(handle);
  }

  // Add hover action for the handle.
  handle.hover(function () {
    self.dragObject == null ? $(this).addClass('tabledrag-handle-hover') : null;
  }, function () {
    self.dragObject == null ? $(this).removeClass('tabledrag-handle-hover') : null;
  });

  // Add the mousedown action for the handle.
  handle.mousedown(function (event) {
    // Create a new dragObject recording the event information.
    self.dragObject = {};
    self.dragObject.initMouseOffset = self.getMouseOffset(item, event);
    self.dragObject.initMouseCoords = self.mouseCoords(event);
    if (self.indentEnabled) {
      self.dragObject.indentMousePos = self.dragObject.initMouseCoords;
    }

    // If there's a lingering row object from the keyboard, remove its focus.
    if (self.rowObject) {
      $('a.tabledrag-handle', self.rowObject.element).blur();
    }

    // Create a new rowObject for manipulation of this row.
    self.rowObject = new self.row(item, 'mouse', self.indentEnabled, self.maxDepth, true);

    // Save the position of the table.
    self.table.topY = $(self.table).offset().top;
    self.table.bottomY = self.table.topY + self.table.offsetHeight;

    // Add classes to the handle and row.
    $(this).addClass('tabledrag-handle-hover');
    $(item).addClass('drag');

    // Set the document to use the move cursor during drag.
    $('body').addClass('drag');
    if (self.oldRowElement) {
      $(self.oldRowElement).removeClass('drag-previous');
    }

    // Hack for IE6 that flickers uncontrollably if select lists are moved.
    if (navigator.userAgent.indexOf('MSIE 6.') != -1) {
      $('select', this.table).css('display', 'none');
    }

    // Hack for Konqueror, prevent the blur handler from firing.
    // Konqueror always gives links focus, even after returning false on mousedown.
    self.safeBlur = false;

    // Call optional placeholder function.
    self.onDrag();
    return false;
  });

  // Prevent the anchor tag from jumping us to the top of the page.
  handle.click(function () {
    return false;
  });

  // Similar to the hover event, add a class when the handle is focused.
  handle.focus(function () {
    $(this).addClass('tabledrag-handle-hover');
    self.safeBlur = true;
  });

  // Remove the handle class on blur and fire the same function as a mouseup.
  handle.blur(function (event) {
    $(this).removeClass('tabledrag-handle-hover');
    if (self.rowObject && self.safeBlur) {
      self.dropRow(event, self);
    }
  });

  // Add arrow-key support to the handle.
  handle.keydown(function (event) {
    // If a rowObject doesn't yet exist and this isn't the tab key.
    if (event.keyCode != 9 && !self.rowObject) {
      self.rowObject = new self.row(item, 'keyboard', self.indentEnabled, self.maxDepth, true);
    }

    var keyChange = false;
    switch (event.keyCode) {
      case 37: // Left arrow.
      case 63234: // Safari left arrow.
        keyChange = true;
        self.rowObject.indent(-1 * self.rtl);
        break;
      case 38: // Up arrow.
      case 63232: // Safari up arrow.
        var previousRow = $(self.rowObject.element).prev('tr').get(0);
        while (previousRow && $(previousRow).is(':hidden')) {
          previousRow = $(previousRow).prev('tr').get(0);
        }
        if (previousRow) {
          self.safeBlur = false; // Do not allow the onBlur cleanup.
          self.rowObject.direction = 'up';
          keyChange = true;

          if ($(item).is('.tabledrag-root')) {
            // Swap with the previous top-level row.
            var groupHeight = 0;
            while (previousRow && $('.indentation', previousRow).length) {
              previousRow = $(previousRow).prev('tr').get(0);
              groupHeight += $(previousRow).is(':hidden') ? 0 : previousRow.offsetHeight;
            }
            if (previousRow) {
              self.rowObject.swap('before', previousRow);
              // No need to check for indentation, 0 is the only valid one.
              window.scrollBy(0, -groupHeight);
            }
          }
          else if (self.table.tBodies[0].rows[0] != previousRow || $(previousRow).is('.draggable')) {
            // Swap with the previous row (unless previous row is the first one
            // and undraggable).
            self.rowObject.swap('before', previousRow);
            self.rowObject.interval = null;
            self.rowObject.indent(0);
            window.scrollBy(0, -parseInt(item.offsetHeight, 10));
          }
          handle.get(0).focus(); // Regain focus after the DOM manipulation.
        }
        break;
      case 39: // Right arrow.
      case 63235: // Safari right arrow.
        keyChange = true;
        self.rowObject.indent(1 * self.rtl);
        break;
      case 40: // Down arrow.
      case 63233: // Safari down arrow.
        var nextRow = $(self.rowObject.group).filter(':last').next('tr').get(0);
        while (nextRow && $(nextRow).is(':hidden')) {
          nextRow = $(nextRow).next('tr').get(0);
        }
        if (nextRow) {
          self.safeBlur = false; // Do not allow the onBlur cleanup.
          self.rowObject.direction = 'down';
          keyChange = true;

          if ($(item).is('.tabledrag-root')) {
            // Swap with the next group (necessarily a top-level one).
            var groupHeight = 0;
            var nextGroup = new self.row(nextRow, 'keyboard', self.indentEnabled, self.maxDepth, false);
            if (nextGroup) {
              $(nextGroup.group).each(function () {
                groupHeight += $(this).is(':hidden') ? 0 : this.offsetHeight;
              });
              var nextGroupRow = $(nextGroup.group).filter(':last').get(0);
              self.rowObject.swap('after', nextGroupRow);
              // No need to check for indentation, 0 is the only valid one.
              window.scrollBy(0, parseInt(groupHeight, 10));
            }
          }
          else {
            // Swap with the next row.
            self.rowObject.swap('after', nextRow);
            self.rowObject.interval = null;
            self.rowObject.indent(0);
            window.scrollBy(0, parseInt(item.offsetHeight, 10));
          }
          handle.get(0).focus(); // Regain focus after the DOM manipulation.
        }
        break;
    }

    if (self.rowObject && self.rowObject.changed == true) {
      $(item).addClass('drag');
      if (self.oldRowElement) {
        $(self.oldRowElement).removeClass('drag-previous');
      }
      self.oldRowElement = item;
      self.restripeTable();
      self.onDrag();
    }

    // Returning false if we have an arrow key to prevent scrolling.
    if (keyChange) {
      return false;
    }
  });

  // Compatibility addition, return false on keypress to prevent unwanted scrolling.
  // IE and Safari will suppress scrolling on keydown, but all other browsers
  // need to return false on keypress. http://www.quirksmode.org/js/keys.html
  handle.keypress(function (event) {
    switch (event.keyCode) {
      case 37: // Left arrow.
      case 38: // Up arrow.
      case 39: // Right arrow.
      case 40: // Down arrow.
        return false;
    }
  });
};

/**
 * Mousemove event handler, bound to document.
 */
Drupal.tableDrag.prototype.dragRow = function (event, self) {
  if (self.dragObject) {
    self.currentMouseCoords = self.mouseCoords(event);

    var y = self.currentMouseCoords.y - self.dragObject.initMouseOffset.y;
    var x = self.currentMouseCoords.x - self.dragObject.initMouseOffset.x;

    // Check for row swapping and vertical scrolling.
    if (y != self.oldY) {
      self.rowObject.direction = y > self.oldY ? 'down' : 'up';
      self.oldY = y; // Update the old value.

      // Check if the window should be scrolled (and how fast).
      var scrollAmount = self.checkScroll(self.currentMouseCoords.y);
      // Stop any current scrolling.
      clearInterval(self.scrollInterval);
      // Continue scrolling if the mouse has moved in the scroll direction.
      if (scrollAmount > 0 && self.rowObject.direction == 'down' || scrollAmount < 0 && self.rowObject.direction == 'up') {
        self.setScroll(scrollAmount);
      }

      // If we have a valid target, perform the swap and restripe the table.
      var currentRow = self.findDropTargetRow(x, y);
      if (currentRow) {
        if (self.rowObject.direction == 'down') {
          self.rowObject.swap('after', currentRow, self);
        }
        else {
          self.rowObject.swap('before', currentRow, self);
        }
        self.restripeTable();
      }
    }

    // Similar to row swapping, handle indentations.
    if (self.indentEnabled) {
      var xDiff = self.currentMouseCoords.x - self.dragObject.indentMousePos.x;
      // Set the number of indentations the mouse has been moved left or right.
      var indentDiff = Math.round(xDiff / self.indentAmount * self.rtl);
      // Indent the row with our estimated diff, which may be further
      // restricted according to the rows around this row.
      var indentChange = self.rowObject.indent(indentDiff);
      // Update table and mouse indentations.
      self.dragObject.indentMousePos.x += self.indentAmount * indentChange * self.rtl;
      self.indentCount = Math.max(self.indentCount, self.rowObject.indents);
    }

    return false;
  }
};

/**
 * Mouseup event handler, bound to document.
 * Blur event handler, bound to drag handle for keyboard support.
 */
Drupal.tableDrag.prototype.dropRow = function (event, self) {
  // Drop row functionality shared between mouseup and blur events.
  if (self.rowObject != null) {
    var droppedRow = self.rowObject.element;
    // The row is already in the right place so we just release it.
    if (self.rowObject.changed == true) {
      // Update the fields in the dropped row.
      self.updateFields(droppedRow);

      // If a setting exists for affecting the entire group, update all the
      // fields in the entire dragged group.
      for (var group in self.tableSettings) {
        var rowSettings = self.rowSettings(group, droppedRow);
        if (rowSettings.relationship == 'group') {
          for (var n in self.rowObject.children) {
            self.updateField(self.rowObject.children[n], group);
          }
        }
      }

      self.rowObject.markChanged();
      if (self.changed == false) {
        $(Drupal.theme('tableDragChangedWarning')).insertBefore(self.table).hide().fadeIn('slow');
        self.changed = true;
      }
    }

    if (self.indentEnabled) {
      self.rowObject.removeIndentClasses();
    }
    if (self.oldRowElement) {
      $(self.oldRowElement).removeClass('drag-previous');
    }
    $(droppedRow).removeClass('drag').addClass('drag-previous');
    self.oldRowElement = droppedRow;
    self.onDrop();
    self.rowObject = null;
  }

  // Functionality specific only to mouseup event.
  if (self.dragObject != null) {
    $('.tabledrag-handle', droppedRow).removeClass('tabledrag-handle-hover');

    self.dragObject = null;
    $('body').removeClass('drag');
    clearInterval(self.scrollInterval);

    // Hack for IE6 that flickers uncontrollably if select lists are moved.
    if (navigator.userAgent.indexOf('MSIE 6.') != -1) {
      $('select', this.table).css('display', 'block');
    }
  }
};

/**
 * Get the mouse coordinates from the event (allowing for browser differences).
 */
Drupal.tableDrag.prototype.mouseCoords = function (event) {
  if (event.pageX || event.pageY) {
    return { x: event.pageX, y: event.pageY };
  }
  return {
    x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: event.clientY + document.body.scrollTop  - document.body.clientTop
  };
};

/**
 * Given a target element and a mouse event, get the mouse offset from that
 * element. To do this we need the element's position and the mouse position.
 */
Drupal.tableDrag.prototype.getMouseOffset = function (target, event) {
  var docPos   = $(target).offset();
  var mousePos = this.mouseCoords(event);
  return { x: mousePos.x - docPos.left, y: mousePos.y - docPos.top };
};

/**
 * Find the row the mouse is currently over. This row is then taken and swapped
 * with the one being dragged.
 *
 * @param x
 *   The x coordinate of the mouse on the page (not the screen).
 * @param y
 *   The y coordinate of the mouse on the page (not the screen).
 */
Drupal.tableDrag.prototype.findDropTargetRow = function (x, y) {
  var rows = $(this.table.tBodies[0].rows).not(':hidden');
  for (var n = 0; n < rows.length; n++) {
    var row = rows[n];
    var indentDiff = 0;
    var rowY = $(row).offset().top;
    // Because Safari does not report offsetHeight on table rows, but does on
    // table cells, grab the firstChild of the row and use that instead.
    // http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari.
    if (row.offsetHeight == 0) {
      var rowHeight = parseInt(row.firstChild.offsetHeight, 10) / 2;
    }
    // Other browsers.
    else {
      var rowHeight = parseInt(row.offsetHeight, 10) / 2;
    }

    // Because we always insert before, we need to offset the height a bit.
    if ((y > (rowY - rowHeight)) && (y < (rowY + rowHeight))) {
      if (this.indentEnabled) {
        // Check that this row is not a child of the row being dragged.
        for (var n in this.rowObject.group) {
          if (this.rowObject.group[n] == row) {
            return null;
          }
        }
      }
      else {
        // Do not allow a row to be swapped with itself.
        if (row == this.rowObject.element) {
          return null;
        }
      }

      // Check that swapping with this row is allowed.
      if (!this.rowObject.isValidSwap(row)) {
        return null;
      }

      // We may have found the row the mouse just passed over, but it doesn't
      // take into account hidden rows. Skip backwards until we find a draggable
      // row.
      while ($(row).is(':hidden') && $(row).prev('tr').is(':hidden')) {
        row = $(row).prev('tr').get(0);
      }
      return row;
    }
  }
  return null;
};

/**
 * After the row is dropped, update the table fields according to the settings
 * set for this table.
 *
 * @param changedRow
 *   DOM object for the row that was just dropped.
 */
Drupal.tableDrag.prototype.updateFields = function (changedRow) {
  for (var group in this.tableSettings) {
    // Each group may have a different setting for relationship, so we find
    // the source rows for each separately.
    this.updateField(changedRow, group);
  }
};

/**
 * After the row is dropped, update a single table field according to specific
 * settings.
 *
 * @param changedRow
 *   DOM object for the row that was just dropped.
 * @param group
 *   The settings group on which field updates will occur.
 */
Drupal.tableDrag.prototype.updateField = function (changedRow, group) {
  var rowSettings = this.rowSettings(group, changedRow);

  // Set the row as its own target.
  if (rowSettings.relationship == 'self' || rowSettings.relationship == 'group') {
    var sourceRow = changedRow;
  }
  // Siblings are easy, check previous and next rows.
  else if (rowSettings.relationship == 'sibling') {
    var previousRow = $(changedRow).prev('tr').get(0);
    var nextRow = $(changedRow).next('tr').get(0);
    var sourceRow = changedRow;
    if ($(previousRow).is('.draggable') && $('.' + group, previousRow).length) {
      if (this.indentEnabled) {
        if ($('.indentations', previousRow).length == $('.indentations', changedRow)) {
          sourceRow = previousRow;
        }
      }
      else {
        sourceRow = previousRow;
      }
    }
    else if ($(nextRow).is('.draggable') && $('.' + group, nextRow).length) {
      if (this.indentEnabled) {
        if ($('.indentations', nextRow).length == $('.indentations', changedRow)) {
          sourceRow = nextRow;
        }
      }
      else {
        sourceRow = nextRow;
      }
    }
  }
  // Parents, look up the tree until we find a field not in this group.
  // Go up as many parents as indentations in the changed row.
  else if (rowSettings.relationship == 'parent') {
    var previousRow = $(changedRow).prev('tr');
    while (previousRow.length && $('.indentation', previousRow).length >= this.rowObject.indents) {
      previousRow = previousRow.prev('tr');
    }
    // If we found a row.
    if (previousRow.length) {
      sourceRow = previousRow[0];
    }
    // Otherwise we went all the way to the left of the table without finding
    // a parent, meaning this item has been placed at the root level.
    else {
      // Use the first row in the table as source, because it's guaranteed to
      // be at the root level. Find the first item, then compare this row
      // against it as a sibling.
      sourceRow = $(this.table).find('tr.draggable:first').get(0);
      if (sourceRow == this.rowObject.element) {
        sourceRow = $(this.rowObject.group[this.rowObject.group.length - 1]).next('tr.draggable').get(0);
      }
      var useSibling = true;
    }
  }

  // Because we may have moved the row from one category to another,
  // take a look at our sibling and borrow its sources and targets.
  this.copyDragClasses(sourceRow, changedRow, group);
  rowSettings = this.rowSettings(group, changedRow);

  // In the case that we're looking for a parent, but the row is at the top
  // of the tree, copy our sibling's values.
  if (useSibling) {
    rowSettings.relationship = 'sibling';
    rowSettings.source = rowSettings.target;
  }

  var targetClass = '.' + rowSettings.target;
  var targetElement = $(targetClass, changedRow).get(0);

  // Check if a target element exists in this row.
  if (targetElement) {
    var sourceClass = '.' + rowSettings.source;
    var sourceElement = $(sourceClass, sourceRow).get(0);
    switch (rowSettings.action) {
      case 'depth':
        // Get the depth of the target row.
        targetElement.value = $('.indentation', $(sourceElement).closest('tr')).length;
        break;
      case 'match':
        // Update the value.
        targetElement.value = sourceElement.value;
        break;
      case 'order':
        var siblings = this.rowObject.findSiblings(rowSettings);
        if ($(targetElement).is('select')) {
          // Get a list of acceptable values.
          var values = [];
          $('option', targetElement).each(function () {
            values.push(this.value);
          });
          var maxVal = values[values.length - 1];
          // Populate the values in the siblings.
          $(targetClass, siblings).each(function () {
            // If there are more items than possible values, assign the maximum value to the row.
            if (values.length > 0) {
              this.value = values.shift();
            }
            else {
              this.value = maxVal;
            }
          });
        }
        else {
          // Assume a numeric input field.
          var weight = parseInt($(targetClass, siblings[0]).val(), 10) || 0;
          $(targetClass, siblings).each(function () {
            this.value = weight;
            weight++;
          });
        }
        break;
    }
  }
};

/**
 * Copy all special tableDrag classes from one row's form elements to a
 * different one, removing any special classes that the destination row
 * may have had.
 */
Drupal.tableDrag.prototype.copyDragClasses = function (sourceRow, targetRow, group) {
  var sourceElement = $('.' + group, sourceRow);
  var targetElement = $('.' + group, targetRow);
  if (sourceElement.length && targetElement.length) {
    targetElement[0].className = sourceElement[0].className;
  }
};

Drupal.tableDrag.prototype.checkScroll = function (cursorY) {
  var de  = document.documentElement;
  var b  = document.body;

  var windowHeight = this.windowHeight = window.innerHeight || (de.clientHeight && de.clientWidth != 0 ? de.clientHeight : b.offsetHeight);
  var scrollY = this.scrollY = (document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY));
  var trigger = this.scrollSettings.trigger;
  var delta = 0;

  // Return a scroll speed relative to the edge of the screen.
  if (cursorY - scrollY > windowHeight - trigger) {
    delta = trigger / (windowHeight + scrollY - cursorY);
    delta = (delta > 0 && delta < trigger) ? delta : trigger;
    return delta * this.scrollSettings.amount;
  }
  else if (cursorY - scrollY < trigger) {
    delta = trigger / (cursorY - scrollY);
    delta = (delta > 0 && delta < trigger) ? delta : trigger;
    return -delta * this.scrollSettings.amount;
  }
};

Drupal.tableDrag.prototype.setScroll = function (scrollAmount) {
  var self = this;

  this.scrollInterval = setInterval(function () {
    // Update the scroll values stored in the object.
    self.checkScroll(self.currentMouseCoords.y);
    var aboveTable = self.scrollY > self.table.topY;
    var belowTable = self.scrollY + self.windowHeight < self.table.bottomY;
    if (scrollAmount > 0 && belowTable || scrollAmount < 0 && aboveTable) {
      window.scrollBy(0, scrollAmount);
    }
  }, this.scrollSettings.interval);
};

Drupal.tableDrag.prototype.restripeTable = function () {
  // :even and :odd are reversed because jQuery counts from 0 and
  // we count from 1, so we're out of sync.
  // Match immediate children of the parent element to allow nesting.
  $('> tbody > tr.draggable:visible, > tr.draggable:visible', this.table)
    .removeClass('odd even')
    .filter(':odd').addClass('even').end()
    .filter(':even').addClass('odd');
};

/**
 * Stub function. Allows a custom handler when a row begins dragging.
 */
Drupal.tableDrag.prototype.onDrag = function () {
  return null;
};

/**
 * Stub function. Allows a custom handler when a row is dropped.
 */
Drupal.tableDrag.prototype.onDrop = function () {
  return null;
};

/**
 * Constructor to make a new object to manipulate a table row.
 *
 * @param tableRow
 *   The DOM element for the table row we will be manipulating.
 * @param method
 *   The method in which this row is being moved. Either 'keyboard' or 'mouse'.
 * @param indentEnabled
 *   Whether the containing table uses indentations. Used for optimizations.
 * @param maxDepth
 *   The maximum amount of indentations this row may contain.
 * @param addClasses
 *   Whether we want to add classes to this row to indicate child relationships.
 */
Drupal.tableDrag.prototype.row = function (tableRow, method, indentEnabled, maxDepth, addClasses) {
  this.element = tableRow;
  this.method = method;
  this.group = [tableRow];
  this.groupDepth = $('.indentation', tableRow).length;
  this.changed = false;
  this.table = $(tableRow).closest('table').get(0);
  this.indentEnabled = indentEnabled;
  this.maxDepth = maxDepth;
  this.direction = ''; // Direction the row is being moved.

  if (this.indentEnabled) {
    this.indents = $('.indentation', tableRow).length;
    this.children = this.findChildren(addClasses);
    this.group = $.merge(this.group, this.children);
    // Find the depth of this entire group.
    for (var n = 0; n < this.group.length; n++) {
      this.groupDepth = Math.max($('.indentation', this.group[n]).length, this.groupDepth);
    }
  }
};

/**
 * Find all children of rowObject by indentation.
 *
 * @param addClasses
 *   Whether we want to add classes to this row to indicate child relationships.
 */
Drupal.tableDrag.prototype.row.prototype.findChildren = function (addClasses) {
  var parentIndentation = this.indents;
  var currentRow = $(this.element, this.table).next('tr.draggable');
  var rows = [];
  var child = 0;
  while (currentRow.length) {
    var rowIndentation = $('.indentation', currentRow).length;
    // A greater indentation indicates this is a child.
    if (rowIndentation > parentIndentation) {
      child++;
      rows.push(currentRow[0]);
      if (addClasses) {
        $('.indentation', currentRow).each(function (indentNum) {
          if (child == 1 && (indentNum == parentIndentation)) {
            $(this).addClass('tree-child-first');
          }
          if (indentNum == parentIndentation) {
            $(this).addClass('tree-child');
          }
          else if (indentNum > parentIndentation) {
            $(this).addClass('tree-child-horizontal');
          }
        });
      }
    }
    else {
      break;
    }
    currentRow = currentRow.next('tr.draggable');
  }
  if (addClasses && rows.length) {
    $('.indentation:nth-child(' + (parentIndentation + 1) + ')', rows[rows.length - 1]).addClass('tree-child-last');
  }
  return rows;
};

/**
 * Ensure that two rows are allowed to be swapped.
 *
 * @param row
 *   DOM object for the row being considered for swapping.
 */
Drupal.tableDrag.prototype.row.prototype.isValidSwap = function (row) {
  if (this.indentEnabled) {
    var prevRow, nextRow;
    if (this.direction == 'down') {
      prevRow = row;
      nextRow = $(row).next('tr').get(0);
    }
    else {
      prevRow = $(row).prev('tr').get(0);
      nextRow = row;
    }
    this.interval = this.validIndentInterval(prevRow, nextRow);

    // We have an invalid swap if the valid indentations interval is empty.
    if (this.interval.min > this.interval.max) {
      return false;
    }
  }

  // Do not let an un-draggable first row have anything put before it.
  if (this.table.tBodies[0].rows[0] == row && $(row).is(':not(.draggable)')) {
    return false;
  }

  return true;
};

/**
 * Perform the swap between two rows.
 *
 * @param position
 *   Whether the swap will occur 'before' or 'after' the given row.
 * @param row
 *   DOM element what will be swapped with the row group.
 */
Drupal.tableDrag.prototype.row.prototype.swap = function (position, row) {
  Drupal.detachBehaviors(this.group, Drupal.settings, 'move');
  $(row)[position](this.group);
  Drupal.attachBehaviors(this.group, Drupal.settings);
  this.changed = true;
  this.onSwap(row);
};

/**
 * Determine the valid indentations interval for the row at a given position
 * in the table.
 *
 * @param prevRow
 *   DOM object for the row before the tested position
 *   (or null for first position in the table).
 * @param nextRow
 *   DOM object for the row after the tested position
 *   (or null for last position in the table).
 */
Drupal.tableDrag.prototype.row.prototype.validIndentInterval = function (prevRow, nextRow) {
  var minIndent, maxIndent;

  // Minimum indentation:
  // Do not orphan the next row.
  minIndent = nextRow ? $('.indentation', nextRow).length : 0;

  // Maximum indentation:
  if (!prevRow || $(prevRow).is(':not(.draggable)') || $(this.element).is('.tabledrag-root')) {
    // Do not indent:
    // - the first row in the table,
    // - rows dragged below a non-draggable row,
    // - 'root' rows.
    maxIndent = 0;
  }
  else {
    // Do not go deeper than as a child of the previous row.
    maxIndent = $('.indentation', prevRow).length + ($(prevRow).is('.tabledrag-leaf') ? 0 : 1);
    // Limit by the maximum allowed depth for the table.
    if (this.maxDepth) {
      maxIndent = Math.min(maxIndent, this.maxDepth - (this.groupDepth - this.indents));
    }
  }

  return { 'min': minIndent, 'max': maxIndent };
};

/**
 * Indent a row within the legal bounds of the table.
 *
 * @param indentDiff
 *   The number of additional indentations proposed for the row (can be
 *   positive or negative). This number will be adjusted to nearest valid
 *   indentation level for the row.
 */
Drupal.tableDrag.prototype.row.prototype.indent = function (indentDiff) {
  // Determine the valid indentations interval if not available yet.
  if (!this.interval) {
    var prevRow = $(this.element).prev('tr').get(0);
    var nextRow = $(this.group).filter(':last').next('tr').get(0);
    this.interval = this.validIndentInterval(prevRow, nextRow);
  }

  // Adjust to the nearest valid indentation.
  var indent = this.indents + indentDiff;
  indent = Math.max(indent, this.interval.min);
  indent = Math.min(indent, this.interval.max);
  indentDiff = indent - this.indents;

  for (var n = 1; n <= Math.abs(indentDiff); n++) {
    // Add or remove indentations.
    if (indentDiff < 0) {
      $('.indentation:first', this.group).remove();
      this.indents--;
    }
    else {
      $('td:first', this.group).prepend(Drupal.theme('tableDragIndentation'));
      this.indents++;
    }
  }
  if (indentDiff) {
    // Update indentation for this row.
    this.changed = true;
    this.groupDepth += indentDiff;
    this.onIndent();
  }

  return indentDiff;
};

/**
 * Find all siblings for a row, either according to its subgroup or indentation.
 * Note that the passed-in row is included in the list of siblings.
 *
 * @param settings
 *   The field settings we're using to identify what constitutes a sibling.
 */
Drupal.tableDrag.prototype.row.prototype.findSiblings = function (rowSettings) {
  var siblings = [];
  var directions = ['prev', 'next'];
  var rowIndentation = this.indents;
  for (var d = 0; d < directions.length; d++) {
    var checkRow = $(this.element)[directions[d]]();
    while (checkRow.length) {
      // Check that the sibling contains a similar target field.
      if ($('.' + rowSettings.target, checkRow)) {
        // Either add immediately if this is a flat table, or check to ensure
        // that this row has the same level of indentation.
        if (this.indentEnabled) {
          var checkRowIndentation = $('.indentation', checkRow).length;
        }

        if (!(this.indentEnabled) || (checkRowIndentation == rowIndentation)) {
          siblings.push(checkRow[0]);
        }
        else if (checkRowIndentation < rowIndentation) {
          // No need to keep looking for siblings when we get to a parent.
          break;
        }
      }
      else {
        break;
      }
      checkRow = $(checkRow)[directions[d]]();
    }
    // Since siblings are added in reverse order for previous, reverse the
    // completed list of previous siblings. Add the current row and continue.
    if (directions[d] == 'prev') {
      siblings.reverse();
      siblings.push(this.element);
    }
  }
  return siblings;
};

/**
 * Remove indentation helper classes from the current row group.
 */
Drupal.tableDrag.prototype.row.prototype.removeIndentClasses = function () {
  for (var n in this.children) {
    $('.indentation', this.children[n])
      .removeClass('tree-child')
      .removeClass('tree-child-first')
      .removeClass('tree-child-last')
      .removeClass('tree-child-horizontal');
  }
};

/**
 * Add an asterisk or other marker to the changed row.
 */
Drupal.tableDrag.prototype.row.prototype.markChanged = function () {
  var marker = Drupal.theme('tableDragChangedMarker');
  var cell = $('td:first', this.element);
  if ($('span.tabledrag-changed', cell).length == 0) {
    cell.append(marker);
  }
};

/**
 * Stub function. Allows a custom handler when a row is indented.
 */
Drupal.tableDrag.prototype.row.prototype.onIndent = function () {
  return null;
};

/**
 * Stub function. Allows a custom handler when a row is swapped.
 */
Drupal.tableDrag.prototype.row.prototype.onSwap = function (swappedRow) {
  return null;
};

Drupal.theme.prototype.tableDragChangedMarker = function () {
  return '<span class="warning tabledrag-changed">*</span>';
};

Drupal.theme.prototype.tableDragIndentation = function () {
  return '<div class="indentation">&nbsp;</div>';
};

Drupal.theme.prototype.tableDragChangedWarning = function () {
  return '<div class="tabledrag-changed-warning messages warning">' + Drupal.theme('tableDragChangedMarker') + ' ' + Drupal.t('Changes made in this table will not be saved until the form is submitted.') + '</div>';
};

})(jQuery);
;
Drupal.locale = { 'strings': {"":{"An AJAX HTTP error occurred.":"C\u00f3 l\u1ed7i AJAX HTTP.","HTTP Result Code: !status":"K\u1ebft qu\u1ea3 m\u00e3 HTTP: !status","An AJAX HTTP request terminated abnormally.":"Y\u00eau c\u1ea7u AJAX HTTP k\u1ebft th\u00fac b\u1ea5t th\u01b0\u1eddng.","Debugging information follows.":"R\u00e0 l\u1ed7i theo th\u00f4ng tin sau.","Path: !uri":"\u0110\u01b0\u1eddng d\u1eabn: !uri","StatusText: !statusText":"StatusText: !statusText","ResponseText: !responseText":"ResponseTextt: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Loading":"\u0110ang n\u1ea1p","(active tab)":"(tab ho\u1ea1t \u0111\u1ed9ng)","Hide":"\u1ea8n","Show":"Hi\u1ec7n","Re-order rows by numerical weight instead of dragging.":"S\u1eafp x\u1ebfp l\u1ea1i danh m\u1ee5c theo \u0111\u1ed9 n\u1eb7ng thay v\u00ec k\u00e9o ch\u00fang.","Show row weights":"Hi\u1ec7n tr\u1ecdng s\u1ed1 h\u00e0ng","Hide row weights":"\u1ea8n tr\u1ecdng s\u1ed1 h\u00e0ng","Drag to re-order":"K\u00e9o \u0111\u1ec3 s\u1eafp x\u1ebfp l\u1ea1i","Changes made in this table will not be saved until the form is submitted.":"C\u00e1c thay \u0111\u1ed5i \u0111\u01b0\u1ee3c th\u1ef1c hi\u1ec7n trong b\u1ea3ng n\u00e0y s\u1ebd kh\u00f4ng \u0111\u01b0\u1ee3c l\u01b0u cho \u0111\u1ebfn khi bi\u1ec3u m\u1eabu \u0111\u01b0\u1ee3c \u0111\u1ec7 tr\u00ecnh.","Preview":"Xem tr\u01b0\u1edbc","Enabled":"B\u1eadt","Not enabled":"Kh\u00f4ng b\u1eadt","@title dialog":"H\u1ed9p tho\u1ea1i @title","Please wait...":"Vui l\u00f2ng \u0111\u1ee3i...","delete":"xo\u00e1","Select all rows in this table":"Ch\u1ecdn t\u1ea5t c\u1ea3 c\u00e1c d\u00f2ng trong b\u1ea3ng n\u00e0y","Deselect all rows in this table":"B\u1ecf ch\u1ecdn t\u1ea5t c\u1ea3 c\u00e1c d\u00f2ng trong b\u1ea3ng n\u00e0y","Edit":"S\u1eeda","Configure":"C\u1ea5u h\u00ecnh","Hide shortcuts":"\u1ea8n li\u00ean k\u1ebft nhanh","OK":"OK","Cancel":"H\u1ee7y b\u1ecf","Show shortcuts":"Hi\u1ec7n li\u00ean k\u1ebft nhanh","Delete":"X\u00f3a","none":"kh\u00f4ng c\u00f3","Not in menu":"Kh\u00f4ng c\u00f3 trong tr\u00ecnh \u0111\u01a1n","Not in book":"Kh\u00f4ng n\u1eb1m trong s\u00e1ch","New book":"S\u00e1ch m\u1edbi","New revision":"Phi\u00ean b\u1ea3n m\u1edbi","No revision":"Kh\u00f4ng c\u00f3 phi\u00ean b\u1ea3n n\u00e0o","By @name on @date":"B\u1edfi @name v\u00e0o l\u00fac @date","By @name":"@name vi\u1ebft","Not published":"Ch\u01b0a c\u00f4ng b\u1ed1","@number comments per page":"@number l\u1eddi b\u00ecnh m\u1ed7i trang","No alias":"Ch\u01b0a c\u00f3 \u0111\u01b0\u1eddng d\u1eabn \u1ea3o","Autocomplete popup":"B\u1eadt l\u00ean t\u1ef1 ho\u00e0n t\u1ea5t","Searching for matches...":"T\u00ecm kh\u1edbp...","view":"xem","Add":"Th\u00eam","Requires a title":"Ph\u1ea7n ti\u00eau \u0111\u1ec1 l\u00e0 b\u1eaft bu\u1ed9c","Don\u0027t display post information":"Hi\u1ec3n th\u1ecb tho\u1ea1i th\u00f4ng tin ch\u1eef","Hide summary":"\u1ea8n t\u00f3m t\u1eaft","Edit summary":"S\u1eeda t\u00f3m t\u1eaft","Yes":"C\u00f3","No":"Kh\u00f4ng","This permission is inherited from the authenticated user role.":"Quy\u1ec1n n\u00e0y \u0111\u01b0\u1ee3c k\u1ebf th\u1eeba t\u1eeb vai tr\u00f2 ng\u01b0\u1eddi d\u00f9ng \u0111\u00e3 x\u00e1c th\u1ef1c."}} };;
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
 * Attaches sticky table headers.
 */
Drupal.behaviors.tableHeader = {
  attach: function (context, settings) {
    if (!$.support.positionFixed) {
      return;
    }

    $('table.sticky-enabled', context).once('tableheader', function () {
      $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
    });
  }
};

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.
 */
Drupal.tableHeader = function (table) {
  var self = this;

  this.originalTable = $(table);
  this.originalHeader = $(table).children('thead');
  this.originalHeaderCells = this.originalHeader.find('> tr > th');
  this.displayWeight = null;

  // React to columns change to avoid making checks in the scroll callback.
  this.originalTable.bind('columnschange', function (e, display) {
    // This will force header size to be calculated on scroll.
    self.widthCalculated = (self.displayWeight !== null && self.displayWeight === display);
    self.displayWeight = display;
  });

  // Clone the table header so it inherits original jQuery properties. Hide
  // the table to avoid a flash of the header clone upon page load.
  this.stickyTable = $('<table class="sticky-header"/>')
    .insertBefore(this.originalTable)
    .css({ position: 'fixed', top: '0px' });
  this.stickyHeader = this.originalHeader.clone(true)
    .hide()
    .appendTo(this.stickyTable);
  this.stickyHeaderCells = this.stickyHeader.find('> tr > th');

  this.originalTable.addClass('sticky-table');
  $(window)
    .bind('scroll.drupal-tableheader', $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    .bind('resize.drupal-tableheader', { calculateWidth: true }, $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    // Make sure the anchor being scrolled into view is not hidden beneath the
    // sticky table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceAnchor.drupal-tableheader', function () {
      window.scrollBy(0, -self.stickyTable.outerHeight());
    })
    // Make sure the element being focused is not hidden beneath the sticky
    // table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceFocus.drupal-tableheader', function (event) {
      if (self.stickyVisible && event.clientY < (self.stickyOffsetTop + self.stickyTable.outerHeight()) && event.$target.closest('sticky-header').length === 0) {
        window.scrollBy(0, -self.stickyTable.outerHeight());
      }
    })
    .triggerHandler('resize.drupal-tableheader');

  // We hid the header to avoid it showing up erroneously on page load;
  // we need to unhide it now so that it will show up when expected.
  this.stickyHeader.show();
};

/**
 * Event handler: recalculates position of the sticky table header.
 *
 * @param event
 *   Event being triggered.
 */
Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader = function (event) {
  var self = this;
  var calculateWidth = event.data && event.data.calculateWidth;

  // Reset top position of sticky table headers to the current top offset.
  this.stickyOffsetTop = Drupal.settings.tableHeaderOffset ? eval(Drupal.settings.tableHeaderOffset + '()') : 0;
  this.stickyTable.css('top', this.stickyOffsetTop + 'px');

  // Save positioning data.
  var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (calculateWidth || this.viewHeight !== viewHeight) {
    this.viewHeight = viewHeight;
    this.vPosition = this.originalTable.offset().top - 4 - this.stickyOffsetTop;
    this.hPosition = this.originalTable.offset().left;
    this.vLength = this.originalTable[0].clientHeight - 100;
    calculateWidth = true;
  }

  // Track horizontal positioning relative to the viewport and set visibility.
  var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
  var vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - this.vPosition;
  this.stickyVisible = vOffset > 0 && vOffset < this.vLength;
  this.stickyTable.css({ left: (-hScroll + this.hPosition) + 'px', visibility: this.stickyVisible ? 'visible' : 'hidden' });

  // Only perform expensive calculations if the sticky header is actually
  // visible or when forced.
  if (this.stickyVisible && (calculateWidth || !this.widthCalculated)) {
    this.widthCalculated = true;
    var $that = null;
    var $stickyCell = null;
    var display = null;
    var cellWidth = null;
    // Resize header and its cell widths.
    // Only apply width to visible table cells. This prevents the header from
    // displaying incorrectly when the sticky header is no longer visible.
    for (var i = 0, il = this.originalHeaderCells.length; i < il; i += 1) {
      $that = $(this.originalHeaderCells[i]);
      $stickyCell = this.stickyHeaderCells.eq($that.index());
      display = $that.css('display');
      if (display !== 'none') {
        cellWidth = $that.css('width');
        // Exception for IE7.
        if (cellWidth === 'auto') {
          cellWidth = $that[0].clientWidth + 'px';
        }
        $stickyCell.css({'width': cellWidth, 'display': display});
      }
      else {
        $stickyCell.css('display', 'none');
      }
    }
    this.stickyTable.css('width', this.originalTable.outerWidth());
  }
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
      $('body.page-admin-structure-views table#ctools-export-ui-list-items').once('gardens-features-views-list-filter', function () {
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
        $('.item-list .pager a').not('a.load-more').once('views-ajax-scroll').click(function () {
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
