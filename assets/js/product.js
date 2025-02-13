import { test_module_include } from './main.js';

const greet_yash = test_module_include('test_yash');
console.log(greet_yash + 'ppp');

$(document).ready(function () {
    $('.gallery-top').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        infinite: false,
        // asNavFor: '.gallery-thumbs',
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>",
    });

    $('.gallery-thumbs').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
        // asNavFor: '.gallery-top',
        // focusOnSelect: true,
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>",
    });

    // Xử lý để làm thumbnail "active" khi ảnh chính thay đổi
    $('.gallery-top').on('afterChange', function (event, slick, currentSlide) {
        // Xóa class active khỏi tất cả thumbnail
        $('.gallery-thumbnail-item').removeClass('active');

        // Thêm class active cho thumbnail tương ứng
        $('.slick-slide[data-slick-index="' + currentSlide + '"] .gallery-thumbnail-item').addClass('active');
    });

    // Khi click vào thumbnail, làm ảnh chính thay đổi
    $('.gallery-thumbs .slick-slide').on('click', function () {
        var index = $(this).data('slick-index');
        $('.gallery-top').slick('slickGoTo', index); // Chuyển đến ảnh tương ứng
    });

    // ---------------------------------------------

    // Slider cho blog
    $('.similar-products').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        dots: false,
        autoplay: false,
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    });

    // Kiểm tra và ẩn/hiện các nút mũi tên khi slider thay đổi
    $('.similar-products, .gallery-thumbs').on('afterChange', function (event, slick, currentSlide) {
        var totalSlides = slick.slideCount;
        console.log(slick);

        // Ẩn nút prevArrow nếu đang ở item đầu tiên
        if (currentSlide === 0) {
            $('.slick-prev').hide();
            // $('.slick-prev').prop('disabled', true);
        } else {
            $('.slick-prev').show();
        }

        // Ẩn nút nextArrow nếu đang ở item cuối cùng
        if (currentSlide >= totalSlides - slick.options.slidesToShow) {
            $('.slick-next').hide();
        } else {
            $('.slick-next').show();
        }
    });

    // Kiểm tra lần đầu khi slider được khởi tạo
    $('.similar-products, .gallery-thumbs').on('init', function (event, slick) {
        var totalSlides = slick.slideCount;

        // Ẩn nút prevArrow nếu slider bắt đầu từ item đầu tiên
        if (slick.currentSlide === 0) {
            $('.slick-prev').hide();
        }

        // Ẩn nút nextArrow nếu không đủ item để cuộn
        if (slick.currentSlide >= totalSlides - slick.options.slidesToShow) {
            $('.slick-next').hide();
        }
    });
});

$(document).ready(function () {
    // Kiểm tra nếu màn hình là mobile (dưới 768px)
    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    // Xử lý sự kiện khi người dùng click vào add_to_cart-detail trên màn hình mobile
    $('.add_to_cart-detail').click(function (e) {
        if (isMobile()) {
            // Chỉ chạy nếu màn hình mobile
            e.preventDefault();
            $('.popup-cart-mobile').addClass('active');
            $('.backdrop__body-backdrop___1rvky').addClass('active');
        }
    });

    // Đóng popup khi nhấn vào nút close
    $('.cart_btn-close').click(function (e) {
        if (isMobile()) {
            // Chỉ chạy nếu màn hình mobile
            e.preventDefault();
            $('.popup-cart-mobile').removeClass('active');
            $('.backdrop__body-backdrop___1rvky').removeClass('active');
        }
    });
});
