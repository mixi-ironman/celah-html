// slick carousel
$(document).ready(function () {
    // Slider chính
    $('.slider-list').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>",
    });

    // Slider hiển thị nhiều item
    $('.slick-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });

    // Slider cho blog
    $('.slick-blogs').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: false,
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });
});

//show tab common
function showTab(event, tabSelector, contentSelector) {
    // Lấy các phần tử tab và content tương ứng
    var tabItem = $(tabSelector);
    var panes = $(contentSelector);

    // Xóa class 'active' ở tất cả các tab và nội dung
    tabItem.removeClass('active');
    panes.removeClass('active');

    // Thêm class 'active' cho tab được click và content tương ứng
    var clickedTab = $(event.currentTarget); // = $(this)
    clickedTab.addClass('active');

    var index = tabItem.index(clickedTab);
    panes.eq(index).addClass('active');
}

// Đăng ký sự kiện click cho các tab
$(document).on('click', '.tab_project .li-tab', function (event) {
    showTab(event, '.tab_project .li-tab', '.content-tab .tab-item');
});

$(document).on('click', '.nav-tab .tab-link', function (event) {
    showTab(event, '.nav-tab .tab-link', '.tab-container .tab-item');
});
