var btn = $("#home .over-lay .slide-nav-btn");
var btnActive = "slide-nav-btn-active";
var slideNav = $("#home .over-lay .slide-nav");
var slideNavActive = "slide-nav-active";
var slideUl = $("#home .over-lay .slide-nav ul");

btn.click(function () {
    $(this).toggleClass(btnActive);
    slideNav.toggleClass(slideNavActive);
});
slideUl.css("top", (slideNav.height() - slideUl.height()) / 2);
//jQuery to collapse the navbar on scroll
$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
})

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});