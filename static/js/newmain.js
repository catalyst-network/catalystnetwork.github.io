"use strict";


$(document).ready(function () {
  
	
	document.getElementById('submitMessage').addEventListener('submit', submitMessage);
  function processResponse(response) {
    if (response.status === 200) {
      output =
        `
      <div class="alert alert-success" role="alert">
        Thanks, ${document.getElementById('name').value}! We'll be in touch soon!
      </div>        
      `;
      document.getElementById('output').innerHTML = output;
    } else {
      output =
        `
      <div class="alert alert-danger" role="alert">
        Oh no! Something went wrong :(
      </div>        
      `;
      document.getElementById('output').innerHTML = output;
    }
  }

  function submitMessage(e) {
    e.preventDefault();
    let name = document.getElementById('first-name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('description').value;
    fetch('https://catalystcontactform.azurewebsites.net/api/SendGrid1', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      })
      .then((res) => processResponse(res))
  }


  var burger = document.querySelector('.header__mobile');
  var header = document.querySelector('.header');
  var menu = document.querySelector('.header__menu');

  burger.onclick = function () {
    header.classList.toggle('menu-opened');
    menu.classList.toggle('opened');
    document.body.classList.toggle('load');
  };


  if ($(window).scrollTop() > 45) {
    $('.header').addClass('sticky');
  }
  
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $('.header').addClass("sticky");
    } else {
      $('.header').removeClass("sticky");
    }
  });
  
  if ($(window).width() > "1200") {
    $(window).on('scroll touchmove', function (event) {
      var curPos = $(this).scrollTop() + 170;
  
      $(".wrap").each(function () {
        var top = $(this).offset().top;
        var bottom = top + $(this).outerHeight();
        if (curPos > top && curPos < bottom) {
          $(".menu__list").find('a').removeClass('is-active');
          $(".menu__list").find('a[href="index.html#' + $(this).attr('id') + '"]').addClass('is-active');
        }
      });
    });
  }
  
  var indent = 0;
  $(window).width() < "1200" ? indent = 50 : indent = 40;
  
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    event.stopPropagation();
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - indent
        }, 1000, function () {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          }
        });
      }
    }
    if ($(window).width() < "1200") {
      $(".header__mobile-item").removeClass("active");
      $('.header__menu').toggleClass("opened");
      $('.header').toggleClass('menu-opened');
      $('body').removeClass('load');
    }
  });

  var margin = 50;

  var maxHeight = 0;
  var maxHeightOdd = 0;
  var scrollDistance = 400;

  var itemWidth = 200;

  var itemMargin = 0;
  var timelineWidth = 0;

  var backupHTML = $('.js-timeline').html();

  var timelineInit = function timelineInit() {
    $('.js-event').each(function (i) {
      var elementHeight = $(this).outerHeight();

      if (i % 2 === 0) {
        if (maxHeight < elementHeight) {
          maxHeight = elementHeight;
        }
      } else {
        if (maxHeightOdd < elementHeight) {
          maxHeightOdd = elementHeight;
        }
      }
    });
    $('.js-timeline-wrapper').css('height', parseInt(maxHeight + maxHeightOdd + 2 * margin + 2) + 'px');
    $('.js-timeline').css('margin-top', '-' + $('.js-timeline').height() / 2 + 'px');

    timelineWidth = parseInt($('.js-event').length) * (itemWidth / 2);
    $('.js-timeline').css('width', timelineWidth + 'px');
    $('.js-line').css('width', parseInt($('.js-event').length) * (itemWidth * 2) + 'px');

    $('.js-timeline-wrapper').animate({
      scrollLeft: timelineWidth
    }, 200, function () {
      timelineArrowCheck();
    });
  };

  var timelineInitMobile = function timelineInitMobile() {
    scrollDistance = itemWidth + itemMargin;
    $('.js-timeline-wrapper .js-line, .js-timeline').css('width', '100%');
    $('.js-timeline-next, .js-timeline-prev').removeClass('deactivated');
    $('.js-timeline:not(.slick-initialized)').slick({
      nextArrow: $('.js-timeline-next'),
      prevArrow: $('.js-timeline-prev'),
      centerMode: true,
      centerPadding: '0px',
      slide: '.js-event',
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: false,
      adaptiveHeight: true,
      initialSlide: parseInt($('.js-timeline .js-event').length) - 1
    });
  };

  var timelineArrowCheck = function timelineArrowCheck() {
    if ($(window).width() < 720) {
      return;
    }
    var maxDistance = parseInt(timelineWidth);
    if ($(window).width() >= 720 && $(window).width() < 1200) {
      maxDistance = parseInt(timelineWidth / 4);
    }
    if ($(window).width() >= 1200 && $(window).width() <= 1920) {
      maxDistance = parseInt(timelineWidth / 12);
    }

    if ($('.js-timeline-wrapper').scrollLeft() == 0) {
      $('.js-timeline-next').removeClass('deactivated');
      $('.js-timeline-prev').addClass('deactivated');
    } else if ($('.js-timeline-wrapper').scrollLeft() >= maxDistance) {
      $('.js-timeline-prev').removeClass('deactivated');
      $('.js-timeline-next').addClass('deactivated');
    } else {
      $('.js-timeline-next, .js-timeline-prev').removeClass('deactivated');
    }
  };

  if ($(window).width() < 720) {
    timelineInitMobile();
  } else {
    timelineInit();
  }

  $('.js-timeline-next').click(function () {
    $('.js-timeline-wrapper').stop().animate({
      scrollLeft: $('.js-timeline-wrapper').scrollLeft() + scrollDistance
    }, 200, function () {
      timelineArrowCheck();
      return false;
    });
    return false;
  });

  $('.js-timeline-prev').click(function () {
    $('.js-timeline-wrapper').stop().animate({
      scrollLeft: $('.js-timeline-wrapper').scrollLeft() - scrollDistance
    }, 200, function () {
      timelineArrowCheck();
      return false;
    });
    return false;
  });

  function loopPrev() {
    $('.js-timeline-wrapper').stop().animate({
      scrollLeft: '-=400'
    }, 200, 'linear', loopPrev);
  }
  function loopNext() {
    $('.js-timeline-wrapper').stop().animate({
      scrollLeft: '+=400'
    }, 200, 'linear', loopNext);
  }

  $('.js-timeline-prev').hover(function () {
    $('.js-timeline-wrapper').stop().animate({
      scrollLeft: '-=600'
    }, 2100, 'linear', loopPrev);
    return false;
  }, function () {
    $('.js-timeline-wrapper').stop();
    timelineArrowCheck();
  });

  $('.js-timeline-next').hover(function () {
    $('.js-timeline-wrapper').stop().animate({
      scrollLeft: '+=600'
    }, 2500, 'linear', loopNext);
    return false;
  }, function () {
    $('.js-timeline-wrapper').stop();
    timelineArrowCheck();
  });

  $(window).resize(function () {
    var maxDistance = parseInt($('.js-timeline').width() - $('.js-timeline-wrapper').width());
    var windowWidth = $(window).width();

    if (maxDistance > $('.js-timeline-wrapper').scrollLeft()) {
      $('.js-timeline-next').removeClass('deactivated');
    } else {
      $('.js-timeline-next').addClass('deactivated');
    }

    if (windowWidth < 720) {
      timelineInitMobile();
      $('#end').addClass('hidden');
      $('#start').removeClass('hidden');
    } else {
      scrollDistance = 400;
      $('.js-timeline.slick-initialized').slick('unslick');
      $('.js-timeline').html(backupHTML);
      timelineInit();
      timelineArrowCheck();
    }

    return false;
  });

  $('body').on('afterChange', '.js-timeline.slick-initialized', function (slick, currentSlide) {
    if (currentSlide.currentSlide === 0) {
      $('#end').removeClass('hidden');
      $('#start').addClass('hidden');
    } else if (currentSlide.currentSlide === parseInt($('.js-timeline .js-event').length) - 1) {
      $('#start').removeClass('hidden');
      $('#end').addClass('hidden');
    } else {
      $('#start').removeClass('hidden');
      $('#end').removeClass('hidden');
    }
  });

  if ($(window).scrollTop() > "400") {
    $("#parallax-bg-1, #parallax-bg-2").hide();
  }

  if ($(window).width() >= 1200) {
    $(window).scroll(function (e) {
      var scrolled = $(window).scrollTop();      

      var targetBlock = $('#internet').position().top;
      if (scrolled > targetBlock) {
        $(".mission__img").addClass("animate");
      }
    });
  }
  

  $(".js-more").on("click", function (e) {
    var parent = $(this).parent();
    $(".team__block").not(parent).removeClass("is-active");
    parent.toggleClass("is-active");
    $(".team__text").not(parent.find(".team__text")).removeClass("is-active");
    $(this).parent().find(".team__text").toggleClass("is-active");
  });

  $("body").mouseup(function (e) {
    if ($(e.target).closest($(".js-more, .team__text")).length) return;
    $(".team__text").removeClass("is-active");
    $(".team__block").removeClass("is-active");
  });


  $.validator.addMethod("emailMethod", function (value, element) {
    var isEmail = this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
    return isEmail;
  });

  $("input[type='email']").bind("keyup", function () {
    $(this).val($(this).val().replace(/[^A-Za-z0-9\s\d\-\.\,\@\#\$\%\^\&\*\(\)\_\+\!\~]/i, ""));
  });

  $('.js-text').on('keypress', function () {
    var that = this;
    setTimeout(function () {
      var res = /[^A-Za-z�-��-��\s\-\.\,]/g.exec(that.value);
      that.value = that.value.replace(res, '');
    }, "0");
  });

  function openPopup(element) {
    $(".form-popup").trigger("reset");
    $("body").addClass("is-bloked");
    var el = $(element);
    $('.js-ajax-popup').fadeIn().append(el);
    $(el).fadeIn();
    $(".wrapper-with-mask").addClass("is-active");

    $(".wrapper-with-mask").mouseup(function (e) {
      var subject = $(".popup__unit");
      if ($(e.target).closest(subject).length) return;
      $(this).removeClass("is-active");
      $("body").removeClass("is-bloked");
    });

    $(".js-close-popup").on("click", function (event) {
      event.preventDefault();
      $(".popup").fadeOut();
      $(".wrapper-with-mask").removeClass("is-active");
      $("body").removeClass("is-bloked");
    });
  }

  function answerHandler(result, form) {
    if (typeof result.message != "undefined") {
      form.find('label[data-name="nonfield"]').html(result.message);
    }

    if (typeof result === "string") {
      $(".js-ajax-popup").html(result);
      openPopup(".js-ajax-popup");
      $(document).trigger("dom-bind", $(".js-ajax-popup"));
    }

    if (typeof result.redirect_url != "undefined") {
      var redirect = function redirect(x) {
        window.location = result.redirect_url;
      };

      if (typeof result.message != "undefined") {
        setTimeout(redirect, "500");
      } else {
        redirect();
      }
    }
  }

  $(document).on("dom-bind", function (e, context) {
    $(context).find(".form-popup").each(function () {
      var $th = $(this);
      var rules = JSON.parse($th.attr("data-rules") || "{}");

      $th.validate({
        rules: rules,
        normalizer: function normalizer(value) {
          return $.trim(value);
        },
        submitHandler: function submitHandler(form) {
          var validator = this;
          var $form = $(form);

          $.ajax({
            method: $form.attr("method"),
            url: $form.attr("action"),
            data: $form.serializeArray(),
            success: function success(result) {
              answerHandler(result, $form);
            },

            error: function error(result) {
              var errors = result.responseJSON.errors;
              if (errors.non_field_errors != undefined) {
                $form.find('label[data-name="nonfield"]').html(errors.non_field_errors);
              } else {
                for (field in errors) {
                  errors[field] = errors[field].join(", ");
                }
              }
              validator.showErrors(errors);
            }
          });
        }
      });
    });

    $(context).find(".js-link-ajax-popup").each(function () {
      var $th = $(this);

      $th.on("click", function (e) {
        e.preventDefault();
        $.ajax({
          method: "GET",
          url: $th.data("href"),
          success: function success(result) {
            answerHandler(result);
          },
          error: function error(result) {}
        });
      });
    });
  });

  $(function () {
    $(document).trigger("dom-bind", document);
  });

  AOS.init({
    disable: 'mobile',
    offset: 300,
    easing: 'ease-in-sine',
    once: true
  });


});


window.initMap = initMap;

function initMap() {
  var uluru = $('#map').data("position");
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: uluru,
                styles: [{
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#a8afbf"}]
                }, {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{"visibility": "on"}, {"color": "#373d48"}, {"weight": 2}, {"gamma": "1"}]
                }, {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [{"visibility": "off"}]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{"weight": 0.6}, {"color": "#4c576f"}, {"gamma": "0"}]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "geometry.fill",
                    "stylers": [{"saturation": "50"}]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{"color": "#172E3E"}, {"gamma": "1"}, {"weight": "10"}]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{"color": "#4c576f"}]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{"color": "#172E3E"}]
                }, {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{"color": "#0C2332"}, {"lightness": "0"}]
                }, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{"color": "#4c576f"}]
                }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#223949"}]}]
    });
    var icon = './../static/images/marker.png';
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      icon: icon
    });

    var content = document.getElementById('infowindow');
    var infowindow = new google.maps.InfoWindow({
      content: content,
      maxWidth: 300
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
      content.style.display = "block";
    });

    google.maps.event.addListener(map, 'click', function () {
      infowindow.close();
    });
}


window.onload = function () {

  $(".preloader").fadeOut();

  function getOffsetSum(elem) {
    var top = 0;
    var left = 0;

    while (elem) {
      top = top + parseInt(elem.offsetTop);
      left = left + parseInt(elem.offsetLeft);
      elem = elem.offsetParent;
    }

    return {
      top: top,
      left: left
    };
  }
  function animateSvg() {
    var zero = 0;
    var svg = Array.from(document.getElementsByClassName("network__img"));
    if (zero < svg.length) {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      var parent = svg[0].parentElement;
      var elemScroll = getOffsetSum(parent).top;
      var scrollLimit = 500;
      var delayArg = 3000;
      if (scrolled + scrollLimit > elemScroll) {
        svg.forEach(function (el, index) {
          el.classList.add('is-animating-svg');
          setTimeout(function () {
            el.classList.add('is-animated-svg');
          }, delayArg);
        });
      }
    }
  }
  animateSvg();
  window.onscroll = function () {
    animateSvg();
  };
};

