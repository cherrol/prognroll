/* PrognRoll | https://mburakerman.github.io/prognroll/ | @mburakerman | License: MIT */
(function ($) {
  $.fn.prognroll = function (options) {

    var settings = $.extend({
      height: 5, // progress bar height
      color: "#50bcb6", // progress bar background color
      custom: false // if you make it true, you can add your custom div and see it's scroll progress on the page
    }, options);

    var progressBar = $("<span>", {
      class: "prognroll-bar",
    });

    return this.each(function (i, el) {
      if ($(this).data("prognroll")) {
        return false;
      }
      $(this).data("prognroll", true);

      $("body").prepend(progressBar).end().find(".prognroll-bar").not(":first").remove();

      $(".prognroll-bar").css({
        position: "fixed",
        top: 0,
        left: 0,
        width: 0,
        height: settings.height,
        backgroundColor: settings.color,
        zIndex: 2147483647
      });

      var globals = {
        "windowScrollTop": $(window).scrollTop(),
        "windowOuterHeight": $(window).outerHeight(),
        "bodyHeight": $(document).height()
      }

      function bindWindowScroll() {
        $(window).scroll(function (e) {
          e.preventDefault();
          globals.windowScrollTop = $(window).scrollTop();
          globals.windowOuterHeight = $(window).outerHeight();
          globals.bodyHeight = $(document).height();

          var total = (globals.windowScrollTop / (globals.bodyHeight - globals.windowOuterHeight)) * 100;
          $(".prognroll-bar").css("width", total + "%");
        });
      }

      if (settings.custom === false) {
        bindWindowScroll();
      } else {
        // if el has no max-height set
        if ($(this).css("max-height") == "none") {
          bindWindowScroll();
        } else {
          $(this).scroll(function (e) {
            e.preventDefault();
            var customScrollTop = $(this).scrollTop();
            var customOuterHeight = $(this).outerHeight();
            var customScrollHeight = $(this).prop("scrollHeight");

            var total = (customScrollTop / (customScrollHeight - customOuterHeight)) * 100;
            $(".prognroll-bar").css("width", total + "%");
          });
        }
      }

      // get scroll position on on page load 
      var total = (globals.windowScrollTop / (globals.bodyHeight - globals.windowOuterHeight)) * 100;
      $(".prognroll-bar").css("width", total + "%");
    });
  };
})(jQuery);