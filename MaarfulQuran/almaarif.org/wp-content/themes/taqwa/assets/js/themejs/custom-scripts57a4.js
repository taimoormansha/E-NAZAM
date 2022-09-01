jQuery(document).ready(function($){
  'use strict';
  
  //===== about pulse =====//
  $(".pulse").hover(function() {
    $(this).removeClass("pulse");
  }, function() {
    $(this).addClass("pulse");
  });


  //===== Header Search =====//
  $('.srch-btn').on('click', function () {
    $('.header-search').addClass('active');
    return false;
  });
  $('.srch-cls-btn').on('click', function () {
    $('.header-search').removeClass('active');
    return false;
  });


  //===== Responsive Header =====//
  $('.rspn-mnu-btn').on('click', function () {
    $('.rsnp-mnu').addClass('slidein');
    return false;
  });
  $('.rspn-mnu-cls').on('click', function () {
    $('.rsnp-mnu').removeClass('slidein');
    return false;
  });
  $('.rsnp-mnu li.menu-item-has-children > a').on('click', function () {
    $(this).parent().siblings().children('ul').slideUp();
    $(this).parent().siblings().removeClass('active');
    $(this).parent().children('ul').slideToggle();
    $(this).parent().toggleClass('active');
    return false;
  });

  //===== Scrollbar =====//
  if ($('.rsnp-mnu').length > 0) {
    var ps = new PerfectScrollbar('.rsnp-mnu');
  }

  //===== LightBox =====//
  if ($.isFunction($.fn.fancybox)) {
    $('[data-fancybox],[data-fancybox="gallery"]').fancybox({});
  }
  
	if ($.isFunction($.fn.fancybox)) {
		$(".fancybox")
		 .attr('rel', 'gallery')
		 .fancybox({
		  type: "iframe",
		  beforeShow: function () {
		   }
		 });
	}
	
	if ($('.facts-count').length > 0) {
		$('.facts-count').counterUp({
			delay: 2,
			time: 350
		});
	}

  //===== Select =====//
  if ($.isFunction($.fn.selectpicker)) {
	  if ($('select').length > 0) {
		$('select').selectpicker();
	  }
  }

  //===== TouchSpin =====//
  if ($.isFunction($.fn.TouchSpin)) {
    $('.quantity > input').TouchSpin();
  }

  //===== Owl Carousel =====//
  if ($.isFunction($.fn.owlCarousel)) {

    //=== Donation Carousel ===//
    $(window).load(function() {
        $('.dnt-car').owlCarousel({
          //autoplay: true,
          smartSpeed: 3000,
          loop: true,
          items: 1,
          dots: false,
          slideSpeed: 1000,
          autoplayHoverPause: true,
          nav: true,
          margin: 0,
          navText: [
          "<i class='fa fa-angle-left'></i>",
          "<i class='fa fa-angle-right'></i>"
          ],
        });
    });
	
	//=== Featured Area Carousel ===//
	$(window).load(function() {
		$('.featured-area').owlCarousel({
		  autoplay: true,
		  smartSpeed: 2000,
		  loop: true,
		  items: 1,
		  dots: false,
		  slideSpeed: 15000,
		  autoplayHoverPause: true,
		  nav: false,
		  margin: 0,
		  animateIn: 'fadeIn',
		  animateOut: 'fadeOut',
		  navText: [
		  "<i class='fa fa-angle-up'></i>",
		  "<i class='fa fa-angle-down'></i>"
		  ]
		});
	});

    //=== Testimonials Carousel ===//
	$(window).load(function() {
		$('.testi-car').owlCarousel({
		  autoplay: true,
		  smartSpeed: 3000,
		  loop: true,
		  items: 3,
		  dots: false,
		  slideSpeed: 2000,
		  autoplayHoverPause: true,
		  nav: true,
		  margin: 30,
		  navText: [
		  "<i class='fa fa-angle-left'></i>",
		  "<i class='fa fa-angle-right'></i>"
		  ],
		  responsive:{
			0:{items: 1,nav: false},
			481:{items: 1,margin: 30},
			771:{items: 2,margin: 30},
			981:{items: 3,margin: 30},
			1025:{items: 3,margin: 30},
			1200:{items: 3}
		  }
		});
    });

    //=== Latest Carousel ===//
	$(window).load(function() {
		$('.ltst-car').owlCarousel({
		  //autoplay: true,
		  smartSpeed: 3000,
		  loop: true,
		  items: 1,
		  dots: false,
		  slideSpeed: 2000,
		  autoplayHoverPause: true,
		  nav: true,
		  margin: 0,
		  animateIn: 'fadeIn',
		  animateOut: 'fadeOut',
		  navText: [
		  "<i class='fa fa-angle-left'></i>",
		  "<i class='fa fa-angle-right'></i>"
		  ],
		});
	 });
  }

});//===== Document Ready Ends =====//


jQuery(window).on('load',function() {
  'use strict';
  jQuery(".preloader").fadeOut("slow");
});//===== Window onLoad Ends =====//