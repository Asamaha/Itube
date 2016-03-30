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
    /*
   * Scroll event calls the nextPage function for every scroll
   * detected within the designated vertical space. This results
   * in many AJAX calls within a very short amount of time. Use
   * this function as a wrapper to the scroll event handler to
   * prevent this behavior.
   */
  function scrollDebounce(func, interval) {
    var lastcall = -1;
    return function() {
      clearTimeout(lastcall);
      var args = arguments;
      var self = this;
      lastcall = setTimeout(function() {
        func.apply(self, args);
      }, interval);
    };
  }
   /*
   * Handler for form submit event. 
   */
  $(function() {
    $("#search-youtube").submit(function( event ) {
      event.preventDefault();   // don't refresh the page

      // push the form area to the top of the page
      $("div.start-middle").removeClass("start-middle").addClass("go-high");

      // clear out any old results
      $("#search-results").html('');

      var searchTerm = $("#search-query").val();
      getResults(searchTerm);
    });
  });


});
