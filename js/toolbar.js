(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.PreventBodyPadding = {
    attach: function attach(context) {
      // Force body to think toolbar is always vertical without overriding Core toolbar JS.
      $('body').css('padding-top', '0').removeClass('toolbar-horizontal').addClass('toolbar-vertical');
      // Use a mutation observer so we can keep the toolbar but stop it from adding unwanted extra padding.
      var target = document.querySelector('body');
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          $('body').css('padding-top', '0').removeClass('toolbar-horizontal').addClass('toolbar-vertical');
        });
      });
      var config = {attributes: true, attributeFilter: ['style', 'class']};
      observer.observe(target, config);
    }
  };

  Drupal.behaviors.toggleAdminToolbar = {
    attach: function attach(context) {
      var target = document.getElementById('toolbar-item-administration-tray');
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if ($(mutation.target).hasClass('is-active')) {
            $('#creditdue-admin-nav').addClass('is-active');
          }
          else {
            $('#creditdue-admin-nav').removeClass('is-active');
          }
        });
      });
      var config = {attributes: true, attributeFilter: ['style', 'class']};
      observer.observe(target, config);
    }
  };

  Drupal.behaviors.mobileSidebarPosition = {
    attach: function attach(context) {
      var $adminSidebar = $('#creditdue-admin-nav');
      function adjustSidebarOnScroll() {
        if ($(window).width() <= 575) {
          if ($(document).scrollTop() > 29) {
            $adminSidebar.css('top', '0px');
          }
          else {
            var scrollpos = 29 - $(document).scrollTop();
            $adminSidebar.css('top', scrollpos + 'px');
          }
        }
      }
      adjustSidebarOnScroll();
      $(window).scroll(function () {
        adjustSidebarOnScroll();
      });
    }
  };
})(jQuery, Drupal);
