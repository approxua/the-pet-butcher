let $body = $('.body');

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
    navigation: {
        nextEl: '.response .arrows__right',
        prevEl: '.response .arrows__left',
    },
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

$(document).ready(function () {
    showMore();
    animationHeader();
})