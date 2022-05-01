// General Variables
var document_height = $(document).height();
var window_height = $(window).height();

try {
    var section2_top = $('#best-offers').offset().top;
    var section3_top = $('#about').offset().top;
} catch (error) { }

$(document).ready(function () {

    // Check Login
    var user
    var checked_box = localStorage.getItem('checkbox');

    if (checked_box == 'true') {
        is_logged = true;

        if (localStorage.getItem('username')) {
            user = localStorage.getItem('username');
        } else {
            user = 'Sign Up';
        }

        $('.is-logged').slideDown({
            start: function () {
                $(this).css({
                    'display': 'flex'
                })
            }
        });

    } else {
        is_logged = false;

        user = 'Sign Up';
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('checkbox');

    }
    $('.login').html("<span>" + user + "</span>");

});

/***  On load AND Scroll ***/
$(window).on('scroll load', function () {

    $('.loader').delay(1000).fadeOut(300, function () {

        //Intro Text Animation

        setTimeout(function () {

            $('.slide-text').css({
                'opacity': '1'
            });
            $('.slide-text').css({
                'top': '0'
            });
        }, 500);

        setTimeout(function () {

            $('.tour-banner-text h1').css({
                'opacity': '1'
            });
            $('.tour-banner-text h1').css({
                'top': '0'
            });
        }, 500);

        setTimeout(function () {

            $('.tour-banner-text h2').css({
                'opacity': '1'
            });
            $('.tour-banner-text h2').css({
                'top': '0'
            });
        }, 1000);

    });

    var current_scroll = $(window).scrollTop();

    // Count Animation
    if (current_scroll > section2_top) {
        $('.counter').each(function () {

            $(".counter-up").slideDown({
                start: function () {
                    $(this).css({
                        'display': 'flex'
                    })
                }
            });

            var counter = $(this);
            var count_to = counter.attr('data-count');

            $({
                count_num: counter.text()
            }).animate({
                count_num: count_to
            },
                {
                    duration: 800,
                    easing: 'linear',
                    step: function () {
                        counter.text(Math.floor(this.count_num));
                    },
                    complete: function () {
                        counter.text(this.count_num);
                    }

                });
        });
    }

    //Scroll Menu 

    if (current_scroll > window_height / 5) {
        $('header').addClass('black-header');
    } else {
        $('header').removeClass('black-header');
    }

    //Back To Top Button

    if (current_scroll > window_height / 5) {
        $('.back-to-top').addClass('back-visible');
    } else {
        $('.back-to-top').removeClass('back-visible');
    }

});

//Mobile Menu

$('#hamburger-menu').click(() => {
    $('#hamburger-menu').toggleClass('is-active');
    $('#header').toggleClass('mobile-active');
});

/* End of Load and Scroll */

/***  Intro Slider ***/

var total_slides = $('.intro-slide').length;
var current_slide = 0;

//Functions Change Slide

function change_slide(slide_number) {

    $('.nav-active-button').removeClass('nav-active-button');
    $('.nav-button').eq(slide_number).addClass('nav-active-button');

    if (slide_number > current_slide) {
        $('.intro-slide').eq(current_slide).animate({
            'left': '-100%'
        });

        $('.slide-text h1').stop().slideUp(500, function () {
            $('.slide-text h1').html($('.intro-slide-text').eq(current_slide).html());
            $('.slide-text h1').slideDown(500);
        });

        $('.intro-slide').eq(slide_number).stop().css('left', '100%');
        $('.intro-slide').eq(slide_number).stop().animate({
            'left': '0%'
        });
        current_slide = slide_number;
    }

    if (slide_number < current_slide) {
        $('.intro-slide').eq(current_slide).animate({
            'left': '100%'
        });

        $('.slide-text h1').stop().slideUp(500, function () {
            $('.slide-text h1').html($('.intro-slide-text').eq(current_slide).html());
            $('.slide-text h1').slideDown(500);
        });

        $('.intro-slide').eq(slide_number).stop().css('left', '-100%');
        $('.intro-slide').eq(slide_number).stop().animate({
            'left': '0%'
        });
        current_slide = slide_number;
    }
}

// Auto Slider

function auto_slider() {
    if (current_slide < total_slides - 1) {
        var next_slide = current_slide + 1;
    } else {
        var next_slide = 0;
    }
    change_slide(next_slide);
}
var slide_interval = setInterval(auto_slider, 5000);

//Slider navigation buttons
$('.nav-button').click(function () {

    var next_slide = $(this).index();
    change_slide(next_slide);

});

//Arrow Left
$('#intro-arrow-left').click(function () {

    if (current_slide > 0) {
        var next_slide = current_slide - 1;
    } else {
        var next_slide = total_slides - 1;
    }
    change_slide(next_slide);

});

// Arrow Right
$('#intro-arrow-right').click(function () {

    if (current_slide < total_slides - 1) {
        var next_slide = current_slide + 1;
    } else {
        var next_slide = 0;
    }
    change_slide(next_slide);

});

/***  Page Interactions ***/

//Login / Sign Up

//close login

$('.login').click(function () {

    $('#login-section').fadeIn({
        duration: 200,
        start: function () {
            $(this).css({
                'display': 'flex'
            })
        }
    });

});

$('.close-login').click(function () {

    $('#login-section').fadeOut(200);

});

//Login Form

var is_logged = false;

$('.login-form').submit(function (e) {

    e.preventDefault();

    var username = $('.username').val();
    var email = $('.email').val();
    var checkbox = $('.checkbox').prop('checked');

    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('checkbox', checkbox);

    $('.login').html(username);

    $('.login-form-container').slideUp(300);
    $('.login-conclusion').slideDown(300);

});

// Login Conclusion Button

$('.login-conclusion button').click(function () {

    $('#login-section').fadeOut(200, function () {
        $('.login-conclusion').slideUp();
        $('.login-form-container').slideDown();
        $('.is-logged').slideDown({
            start: function () {
                $(this).css({
                    'display': 'flex'
                })
            }
        });
    });

    is_logged = true;

});

//LogOut

$('#sign-out').click(function (e) {

    e.preventDefault();

    $('#login-section').fadeOut(200);

    user = 'Sign Up';
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('checkbox');

    $('.login').html(user);

    $('.is-logged').slideUp();

    is_logged = false;

});

// Tour Item 

$('.tour-box').click(function () {

    $('.item-name').html($(this).find('h3:first-child').html());
    $('.item-desc').html($(this).find('p').html());
    $('.item-price').html($(this).find('h3:nth-child(2)').html());

    var src = $(this).find('img').attr('src');

    $('.item-image').attr('src', src);

    $('.item-conclusion').slideUp();
    $('.item-description').slideDown();

    $('#tour-item-container').fadeIn({
        duration: 300,
        start: function () {
            $(this).css({
                'display': 'flex'
            })
        }
    });

});

$('.close-item').click(function () {

    $('#tour-item-container').fadeOut(300);
    setTimeout(function () {

        $('.item-conclusion').slideUp(300);
        $('.item-description').delay(300).slideDown(300);

    });

});

$('#item-button').click(function (e) {
    e.preventDefault();

    if (is_logged == true) {

        $('.item-description').slideUp(300);
        $('.item-conclusion').delay(300).slideDown(300);

    } else {
        alert('You need to Sign Up first to make any purchase');
    }

});

// Search / Tour Filter

$("#search").on('keyup', function () {
    var matcher = new RegExp($(this).val(), 'gi');
    $('.tour-box').hide().not(function () {
        return !matcher.test($(this).find('.main-text h3, .main-text p').text())
    }).show();
});

// Input Range Slider
var output = document.querySelector("#volume");

function outputUpdate(vol) {
    output.value = '$ ' + vol;

    output.style.left = (vol / 100) - 20 + 'px';

    $('.tour-box').hide().filter(function () {
        var price = parseInt($(this).data("price"), 10);
        return price <= vol;
    }).show();

}

//Category Filter

$('.tour-category').click(function () {

    var target = $(this).attr('data-category');

    if (target != 'all') {
        $('.tour-box').hide();
        $('.tour-box[data-category="' + target + '"]').show();
    } else {
        $('.tour-box').show();
    }

    $('.active-category').removeClass('active-category');
    $(this).addClass('active-category');

});
