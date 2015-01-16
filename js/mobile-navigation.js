;(function ($, window, document) {
  'use strict';

  /**
   * Boolean that indicates whether an CSS transition is happening
   * Don't touch this yourself
   *
   * @var {boolean}
   */
  var _isAnimating = false;

  /**
   * Mobile Navigation setup
   * @class
   */
  function MobileNavigation () {
    // All CSS selectors or DOM elements to various elements
    // Gets passed to $() so valid values are whatever is valid there
    this.selectors = {
      toggle: '.js-mobile-navigation-toggle',
      navigation: '.js-mobile-navigation',
      container: document.body,
      close: '.js-mobile-navigation-close',
      previous: '.js-mobile-navigation-previous',
      next: '.js-mobile-navigation-next'
    };

    // Classes that get manipulated through this JS module
    this.classes = {
      show: 'show-mobile-navigation'
    };

    // Go!
    this.init().bind();
  }

  /**
   * Cache elements
   */
  MobileNavigation.prototype.init = function () {
    this.$toggle = $(this.selectors.toggle);
    this.$navigation = $(this.selectors.navigation);
    this.$container = $(this.selectors.container);

    return this;
  };

  /**
   * Bind click handlers
   */
  MobileNavigation.prototype.bind = function () {
    var _this = this;

    this.$toggle.on('click', function (e) {
      e.preventDefault();
      if (_this.$container.hasClass(_this.classes.show)) {
        _this.close();
      } else {
        _this.open();
      }
    });

    this.$container.on('click', this.selectors.close, function (e) {
      e.preventDefault();
      _this.close();
    });

    this.$navigation
      .on('click', 'a[href^="#"]', function (e) {
        var level = parseInt($(this).attr('href').substring(1), 10);

        if (!isNaN(level) && level > 0) {
          e.preventDefault();
          _this.$container.attr('data-mobile-navigation-level', level);
        }
      })
      .on('click', this.selectors.previous, $.proxy(this.previous, this))
      .on('click', this.selectors.next, $.proxy(this.next, this));

    return this;
  };


  /**
   * Open mobile navigation
   */
  MobileNavigation.prototype.open = function () {
    this.$container.addClass(this.classes.show);
  };


  /**
   * Close mobile navigation
   */
  MobileNavigation.prototype.close = function () {
    var _this = this;

    // When closed, remove any sublevel state
    this.$container.on('webkitTransitionEnd transitionend', function () {
      _this.$container.removeAttr('data-mobile-navigation-level');
    });

    this.$container.removeClass(this.classes.show);
  };

  /**
   * Go to a certain sublevel
   *
   * @param {int} level
   */
  MobileNavigation.prototype.go = function (level) {
    var level = parseInt(level, 10);

    if (!isNaN(level) && level > 0) {
      this.$container.attr('data-mobile-navigation-level', level);

      // Block multiple clicks
      _isAnimating = true;

      this.$navigation.on('webkitTransitionEnd transitionend', function () {
        _isAnimating = false;
      });
    }
  };

  /**
   * Go to the next sublevel
   */
  MobileNavigation.prototype.next = function () {
    if (_isAnimating) { return false; }

    var level = parseInt(this.$container.attr('data-mobile-navigation-level'), 10);
    this.go(level + 1);
  };

  /**
   * Go to the previous sublevel
   */
  MobileNavigation.prototype.previous = function () {
    if (_isAnimating) { return false; }

    var level = parseInt(this.$container.attr('data-mobile-navigation-level'), 10);
    this.go(level - 1);
  };

  // Expose globally
  window.MobileNavigation = MobileNavigation;

}(jQuery, window, document));
