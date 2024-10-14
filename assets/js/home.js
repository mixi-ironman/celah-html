// slick carrousel
$(document).ready(function () {
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

    $('.slick-slider').slick({
        slidesToShow: 3, // Số lượng item hiển thị
        slidesToScroll: 1, // Số lượng item sẽ scroll mỗi lần
        infinite: true, // Vòng lặp
        dots: true, // Hiển thị dấu chấm điều hướng
        arrows: false, // Hiển thị mũi tên điều hướng
        autoplay: true, // Tự động chạy
        autoplaySpeed: 3000, // Thời gian giữa các lần chuyển slide
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

$('.slick-blogs').slick({
    slidesToShow: 3, // Số lượng item hiển thị
    slidesToScroll: 1, // Số lượng item sẽ scroll mỗi lần
    infinite: true, // Vòng lặp
    dots: true, // Hiển thị dấu chấm điều hướng
    arrows: false, // Hiển thị mũi tên điều hướng
    autoplay: false, // Tự động chạy
    autoplaySpeed: 3000, // Thời gian giữa các lần chuyển slide
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
