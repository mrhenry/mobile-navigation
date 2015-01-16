# Mobile navigation setup

Tested in the wild :tiger:

## Setup

### HTML

Copy from `index.html` in this repo or from below:

```html
  <div class="mod-site-container">
    <div class="site-container__fixed">
      <!-- Native app like header on mobile, whatever you want it to be on desktop -->
      <a href="#" class="site-container__mobile-navigation-toggle js-mobile-navigation-toggle">&#9776;</a>
    </div>
    <div class="site-container__scrollable">
      <!-- Your site content -->
    </div>
  </div>
  <div class="mod-mobile-navigation js-mobile-navigation">
    <div class="mobile-navigation__level">
      <!-- Even if you use only one level, don't forget to wrap it inside a .mobile-navigation__level for vertical scrolling inside your navigation -->
      <!-- Linking to multiple levels is easy, set #:level as the href or use .js-mobile-navigation-next / .js-mobile-navigation-previous -->
      <!-- Also don't use more levels than specified in your SCSS settings because things might get nasty -->
    </div>
  </div>
```

### SCSS

Don't forget to `@import '_mobile-navigation'`.

Override these settings if wanted:

```scss
// Width of the navigation when it's open.
// @type Number | Map
$mobile-navigation-width: 270px !default;

// Levels of subnavigation. Can't be less than one. Go crazy
// @type Number
$mobile-navigation-levels: 1 !default;

// Breakpoint that decides the mobile navigation shouldn't show anymore
// @type Number
$mobile-navigation-breakpoint: 768px !default;

// Animation time
// @type Number
$mobile-navigation-animation-time: 440ms !default;

// Animation easing function
// @type String
$mobile-navigation-animation-easing: ease-in-out !default;

// Height of the native UI like scrolling header
// @type Number
$mobile-navigation-fixed-height: 50px !default;
```

Cool thing is `$mobile-navigation-width` can take a map to specify multiple widths on multiple breakpoints (`min-width`). The key is the breakpoint width, value is the navigation width.

```scss
$mobile-navigation-width: (
  0px: 270px,
  568px: 518px
)
```

### JS

`MobileNavigation` is exposed globally, so when using the default classes (for now, you should) a simple `var mn = new MobileNavigation();` should do.

## Installation

We're on bower, install `mobile-navigation` :smiley_cat:
