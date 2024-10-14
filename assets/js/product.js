$(document).ready(function () {
    $('.gallery-top').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        fade: true,
        infinite: true,
        asNavFor: '.gallery-thumbs',
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>",
    });

    $('.gallery-thumbs').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.gallery-top',
        dots: false,
        infinite: true,
        arrows: true,
        focusOnSelect: true,
    });

    $('.gallery-top').on('afterChange', function (event, slick, currentSlide) {
        // Xóa border khỏi tất cả các ảnh trong thumbnail
        $('.gallery-thumbs .slick-slide img').css('border', 'none');

        // Thêm border vào ảnh trong thumbnail tương ứng
        $('.gallery-thumbs .slick-slide[data-slick-index="' + currentSlide + '"] img').css('border', '2px solid red'); // Thay đổi màu và độ dày của border theo ý muốn
    });

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
});
