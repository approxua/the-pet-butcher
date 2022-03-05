let $body = $('body');

const productSwiper = new Swiper('.products', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.products .arrows__right',
        prevEl: '.products .arrows__left',
    },
});

const responseSwiper = new Swiper('.response__slider-wrap', {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 16,
    centeredSlides: true,
    navigation: {
        nextEl: '.response .arrows__right',
        prevEl: '.response .arrows__left',
    },
    breakpoints: {
        1280: {
            slidesPerView: 3,
            loop: false,
            centeredSlides: false
        }
    }
});

function getBodyClass() {
    if ($body.hasClass('body--fixed')) {
        return false
    }
}

function animationHeader() {
    const header = $('.header');
    const headerHeight = header.outerHeight();
    var $currentScroll = 0;

    if (getBodyClass()) return false

    $(window).on('scroll', function () {
        let $nextScroll = $(this).scrollTop();

        if ($nextScroll >= headerHeight && $nextScroll > $currentScroll) {
            header.slideUp(150)
        } else {
            header.slideDown(150)
        }

        $currentScroll = $nextScroll;
    })
}

function showMore() {
    $('.premium__show-more').on('click', function () {
        $('.premium__text').toggleClass('is-active');
        let text = ($(this).html() === 'Learn more') ? 'Learn less' : 'Learn more';
        $(this).html(text);
    })
}

function showMobmenu() {
    let burger = $('.header__burger');
    let nav = $('.header__nav');
    let shadow = $('.shadow');
    burger.on('click', function () {
        nav.addClass('header__nav--opened');
        shadow.addClass('shadow--opened');
        $body.addClass('body--fixed');
    })

    shadow.on('click', function () {
        nav.removeClass('header__nav--opened');
        shadow.removeClass('shadow--opened');
        $body.removeClass('body--fixed');
    })
}

$(document).ready(function () {
    showMore();
    animationHeader();
    showMobmenu();
})