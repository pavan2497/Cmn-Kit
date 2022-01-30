
$(document).ready(function () {
  /*** Header fixed ***/
  $(window).scroll(function () {
    var scrollPixel = $(window).scrollTop();
    if (scrollPixel < 100) {
      $("header").removeClass("headerFix");
    } else {
      $("header").addClass("headerFix");
    }
  });

  wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 20,
    mobile: true,
    live: true
  })
  wow.init();
  headerResize();
  funSelectScroll();
  headerDropdown();
  menuBorder();

  $("img.svg").each(function() {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(
      imgURL,
      function(data) {
        var $svg = $(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        if (
          !$svg.attr("viewBox") &&
          $svg.attr("height") &&
          $svg.attr("width")
        ) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }
        $img.replaceWith($svg);
      },
      "xml"
    );
  });



  $(".with-submenu .menu > .menu-item-has-children > a").append("<span></span>");
  $(function () {
    $('.with-submenu .menu > .menu-item-has-children > a > span').on('click', function (e) {
      e.preventDefault();
      if ($(window).width() < 767.9) {
        $(this).parent('a').next('ul').slideToggle();
        $(this).toggleClass('active');
        $(this).parent('a').toggleClass('active');
        $(this).parents('.ft-menu').siblings('div').find('span').removeClass('active');
        $(this).parents('.ft-menu').siblings('div').find('a').removeClass('active');
        $(this).parents('.ft-menu').siblings('div').find('ul li ul').slideUp();
      }
    });
  })

  setTimeout(function () { $(".btm-bdr").toggleClass("animate"); }, 2000);

  $('.cmn-select select').on('select2:open', function () {
    funSelectScroll();
  });

  $(document).on('keydown', '.select2-search__field', function () {
    funSelectScroll();
  });

  /* Header search */
  $("#header_search").click(function () {
    setTimeout(function () {
      $('#searchModal').addClass('new');
    }, 800);
    setTimeout(function () {
      $('#searchModal').addClass('formScale');
    }, 200);
  });
  $('#searchModal').on('hidden.bs.modal', function (e) {
    $('#searchModal').removeClass('new');
    $('#searchModal').removeClass('formScale');
  })
});

function headerResize() {
  var screen_width = $(window).width();
  if (screen_width < 991.9) {
    $('.navbar-toggler').off('click');
    $('.navbar-toggler').off('click');
    $('.navbar-toggler').on('click', function () {
      $('header').toggleClass('navbar-bg');
      $('.navbar-toggler').attr('aria-expanded', 'true');
    });
    $(".share-event-wrap").insertAfter($("#speaker-wrap"));
  }
  else {
    $('.navbar-toggler').attr('aria-expanded', 'false');
    $(".share-event-wrap").insertAfter($(".cmn-editor"));
  }
}
/* Header dropdown */
function headerDropdown() {
  var screen_width = $(window).width();
  if (screen_width < 991.9) {
    $("header .menu-item-has-children a").click(function (event) {
      event.preventDefault();
      $(this).parent().toggleClass("active");
      $(this).next().slideToggle();
    });
  }
}
/**  Select2 Custom Scrollbar **/
function funSelectScroll() {
  $('.select2-dropdown .select2-results__options').mCustomScrollbar('destroy');
  setTimeout(function () {
    $('.select2-dropdown .select2-results__options').mCustomScrollbar({
      axis: 'y',
      scrollbarPosition: 'inside',
      advanced: {
        updateOnContentResize: true,
      },
    });
  }, 8);
}
/** Menu class */
function menuBorder() {
  if ($("#divNavbar .menu > li > a span").length < 1) {
    $("#divNavbar .menu > li > a").wrapInner("<span></span>");
  }
}
/**  Select2 Custom ini **/
$("#select2drop").select2({
  placeholder: "Select",
  width: '100%',
});
/** Select2 With Custom Scrollbar ***/
$(window).resize(function () {
  headerResize();
  headerDropdown();
});
