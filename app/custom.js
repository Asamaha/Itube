"use strict"
$(document).ready(function() {

  // Change submit button text when AJAX begins/is in progress
  $(document).bind('ajaxStart', function() {
    $("input[type='submit']").attr('value', '...loading');
  })
  // Change submit button text to 'Submit' when AJAX not in progress
  .bind('ajaxStop', function() {
    $("input[type='submit']").attr('value', 'Submit');
  });

  // hack to allow $.getJSON to work in IE
  $.support.cors = true;

 /*
   * Load more videos when the user scrolls to the bottom of the
   * current page. 'Infinite scroll effect'
   */
  $(window).on('scroll', scrollDebounce(function(event) {
    var wintop = $(window).scrollTop(), 
        docHeight = $(document).height(),
        winHeight = $(window).height();
    var scrollTrigger = 0.90;

    if ((wintop / (docHeight - winHeight)) > scrollTrigger) {
      nextPage();
    } 
      
  }, 200));
});