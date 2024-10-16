function showTabContent(tabName) {
    // Ẩn tất cả các tab content
    var tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(function (content) {
        content.style.display = 'none';
    });

    // Hiện tab content tương ứng
    document.getElementById('content-' + tabName).style.display = 'block';

    // Cập nhật class active cho các liên kết
    var links = document.querySelectorAll('.title-info');
    links.forEach(function (link) {
        link.classList.remove('active');
    });
    document.querySelector('[data-content="' + tabName + '"]').classList.add('active');
}

// Hiển thị nội dung tab mặc định khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
    showTabContent('info');
});

function toggleModal(modalSelector, backdropSelector, action) {
    if (action === 'show') {
        $(modalSelector).css('display', 'block');
        $(backdropSelector).addClass('active');
    } else if (action === 'hide') {
        $(modalSelector).css('display', 'none');
        $(backdropSelector).removeClass('active');
    }
}

// Sử dụng cho nút mở modal
$('.btn-add_addr').click(function () {
    toggleModal('#add_address', '.backdrop__body-backdrop___1rvky', 'show');
});

// Sử dụng cho nút mở modal
$('.btn-edit_addr').click(function () {
    toggleModal('#edit_address_27333349', '.backdrop__body-backdrop___1rvky', 'show');
});

// Sử dụng cho việc đóng modal khi nhấp vào backdrop
$('.backdrop__body-backdrop___1rvky,.btn-close_pop-addr').click(function () {
    toggleModal('.modal_address.modal', '.backdrop__body-backdrop___1rvky', 'hide');
});
