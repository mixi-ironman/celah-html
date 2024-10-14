$(window).on('popstate', function () {
    location.reload(true);
});

var selectedSortby;
var tt = 'Thứ tự';

var filter = new Bizweb.SearchFilter();

if (colId > 0) {
    filter.addValue('collection', 'collections', colId, 'AND');
}
function toggleFilter(e) {
    _toggleFilter(e);
    renderFilterdItems();
    doSearch(1);
}
function _toggleFilterdqdt(e) {
    var $element = $(e);
    var group = 'Khoảng giá';
    var field = 'price_min';
    var operator = 'OR';
    var value = $element.attr('data-value');

    filter.deleteValuedqdt(group, field, value, operator);
    filter.addValue(group, field, value, operator);
    renderFilterdItems();
    doSearch(1);
}

function _toggleFilter(e) {
    var $element = $(e);
    var group = $element.attr('data-group');
    var field = $element.attr('data-field');
    var text = $element.attr('data-text');
    var value = $element.attr('value');
    var operator = $element.attr('data-operator');
    var filterItemId = $element.attr('id');

    if (!$element.is(':checked')) {
        filter.deleteValue(group, field, value, operator);
    } else {
        filter.addValue(group, field, value, operator);
    }

    $(".catalog_filters li[data-handle='" + filterItemId + "']").toggleClass('active');
}

function renderFilterdItems() {
    var $container = $('.filter-container__selected-filter-list ul');
    $container.html('');

    $('.filter-container input[type=checkbox]').each(function (index) {
        if ($(this).is(':checked')) {
            var id = $(this).attr('id');
            var name = $(this).closest('label').text();

            addFilteredItem(name, id);
        }
    });

    if ($('.filter-container input[type=checkbox]:checked').length > 0) $('.filter-container__selected-filter').show();
    else $('.filter-container__selected-filter').hide();
}
function addFilteredItem(name, id) {
    var filteredItemTemplate =
        "<li class='filter-container__selected-filter-item' for='{3}'><a href='javascript:void(0)' onclick=\"{0}\"><i class='fa-tick'></i> {1}</a></li>";
    filteredItemTemplate = filteredItemTemplate.replace('{0}', "removeFilteredItem('" + id + "')");
    filteredItemTemplate = filteredItemTemplate.replace('{1}', name);
    filteredItemTemplate = filteredItemTemplate.replace('{3}', id);
    var $container = $('.filter-container__selected-filter-list ul');
    $container.append(filteredItemTemplate);
}
function removeFilteredItem(id) {
    $('.filter-container #' + id).trigger('click');
}

function doSearch(page, options) {
    if (!options) options = {};
    //NProgress.start();
    $('.aside.aside-mini-products-list.filter').removeClass('active');
    awe_showPopup('.loading');
    filter.search({
        view: selectedViewData,
        page: page,
        sortby: selectedSortby,
        success: function (html) {
            var $html = $(html);
            // Muốn thay thẻ DIV nào khi filter thì viết như này
            var $categoryProducts = $($html[0]);
            $('.category-products').html($categoryProducts.html());
            pushCurrentFilterState({ sortby: selectedSortby, page: page });
            awe_hidePopup('.loading');
            awe_lazyloadImage();
            resizeImage();
            setTimeout(function () {
                Ego.Wishlist.wishlistProduct(3, 5);
            }, 300);
            $('.col-item .thumbs-list .thumbs-list-item img').hover(function () {
                var t = $(this).attr('data-img');
                $(this).parent().siblings().removeClass('active'), $(this).parent().addClass('active');
                var e = $(this).parents('.col-item').find('.product-thumb img');
                e && $(e).attr('src', t);
            });
            $('.add_to_cart').click(function (e) {
                e.preventDefault();
                var $this = $(this);
                var form = $this.parents('form');
                $.ajax({
                    type: 'POST',
                    url: '/cart/add.js',
                    async: false,
                    data: form.serialize(),
                    dataType: 'json',
                    beforeSend: function () {},
                    success: function (line_item) {
                        $('.cart-popup-name')
                            .html(line_item.title)
                            .attr('href', line_item.url, 'title', line_item.title);
                        ajaxCart.load();
                        $('#popup-cart-desktops, .cart-sidebar, .backdrop__body-backdrop___1rvky').addClass('active');
                    },
                    cache: false,
                });
            });
            $('html, body').animate(
                {
                    scrollTop: $('.category-products').offset().top,
                },
                0,
            );
            resortby(selectedSortby);
            if (window.BPR !== undefined) {
                return window.BPR.initDomEls(), window.BPR.loadBadges();
            }
        },
    });
}

function sortby(sort) {
    switch (sort) {
        case 'price-asc':
            selectedSortby = 'price_min:asc';
            break;
        case 'price-desc':
            selectedSortby = 'price_min:desc';
            break;
        case 'alpha-asc':
            selectedSortby = 'name:asc';
            break;
        case 'alpha-desc':
            selectedSortby = 'name:desc';
            break;
        case 'created-desc':
            selectedSortby = 'created_on:desc';
            break;
        case 'created-asc':
            selectedSortby = 'created_on:asc';
            break;
        default:
            selectedSortby = '';
            break;
    }

    doSearch(1);
}

function resortby(sort) {
    switch (sort) {
        case 'price_min:asc':
            tt = 'Giá tăng dần';
            break;
        case 'price_min:desc':
            tt = 'Giá giảm dần';
            break;
        case 'name:asc':
            tt = 'Tên A → Z';
            break;
        case 'name:desc':
            tt = 'Tên Z → A';
            break;
        case 'created_on:desc':
            tt = 'Hàng mới nhất';
            break;
        case 'created_on:asc':
            tt = 'Hàng cũ nhất';
            break;
        default:
            tt = 'Mặc định';
            break;
    }
    $('#sort-by > ul > li > span').html(tt).addClass('sor');
}

function _selectSortby(sort) {
    resortby(sort);
    switch (sort) {
        case 'price-asc':
            selectedSortby = 'price_min:asc';
            break;
        case 'price-desc':
            selectedSortby = 'price_min:desc';
            break;
        case 'alpha-asc':
            selectedSortby = 'name:asc';
            break;
        case 'alpha-desc':
            selectedSortby = 'name:desc';
            break;
        case 'created-desc':
            selectedSortby = 'created_on:desc';
            break;
        case 'created-asc':
            selectedSortby = 'created_on:asc';
            break;
        default:
            selectedSortby = sort;
            break;
    }
}

function toggleCheckbox(id) {
    $(id).click();
}

function pushCurrentFilterState(options) {
    if (!options) options = {};
    var url = filter.buildSearchUrl(options);
    var queryString = url.slice(url.indexOf('?'));
    if (selectedViewData == 'data_list') {
        queryString = queryString + '&view=list';
        $('.button-view-mode').removeClass('active');
        $('.button-view-mode.view-mode-list').addClass('active');
    } else {
        queryString = queryString + '&view=grid';
        $('.button-view-mode').removeClass('active');
        $('.button-view-mode.view-mode-grid').addClass('active');
    }

    pushState(queryString);
}

function pushState(url) {
    window.history.pushState(
        {
            turbolinks: true,
            url: url,
        },
        null,
        url,
    );
}
function switchView(view) {
    switch (view) {
        case 'list':
            $('.button-view-mode').removeClass('active');
            $('.button-view-mode.view-mode-list').addClass('active');
            selectedViewData = 'data_list';
            break;
        default:
            $('.button-view-mode').removeClass('active');
            $('.button-view-mode.view-mode-grid').addClass('active');
            selectedViewData = 'data';
            break;
    }
    var url = window.location.href;
    var page = getParameter(url, 'page');
    if (page != '' && page != null) {
        doSearch(page);
    } else {
        doSearch(1);
    }
}

function selectFilterByCurrentQuery() {
    var isFilter = false;
    var url = window.location.href;
    var queryString = decodeURI(window.location.search);
    var filters = queryString.match(/\(.*?\)/g);

    if (queryString) {
        isFilter = true;
    }
    if (filters && filters.length > 0) {
        filters.forEach(function (item) {
            item = item.replace(/\(\(/g, '(');
            if (item.lastIndexOf('>') >= 0) {
                var mStart1 = item.lastIndexOf('(>');
                var mStart2 = item.lastIndexOf(' AND');
                var mStart = item.slice(mStart1 + 2, mStart2);
                var mStop1 = item.lastIndexOf('<');
                var mStop2 = item.lastIndexOf(')');
                var mStop = item.slice(mStop1 + 1, mStop2);

                $('#start input').val(
                    Bizweb.formatMoney(Number(mStart) + 1, '{{amount_no_decimals_with_comma_separator}}₫'),
                );
                $('#stop input').val(
                    Bizweb.formatMoney(Number(mStop) - 1, '{{amount_no_decimals_with_comma_separator}}₫'),
                );

                var maxx = 10000000 / 10;
                var slider = $('#slider');

                $('.filter-value').attr('data-value', item);

                var $element = $('.filter-value');
                var group = 'Khoảng giá';
                var field = 'price_min';
                var operator = 'OR';
                var value = item;

                filter.deleteValuedqdt(group, field, value, operator);
                filter.addValue(group, field, value, operator);
                renderFilterdItems();
                doSearch(1);
            } else {
                var element = $(".aside-item input[value='" + item + "']");

                element.attr('checked', 'checked');
                _toggleFilter(element);
            }
        });

        isFilter = true;
    }

    var sortOrder = getParameter(url, 'sortby');
    if (sortOrder) {
        _selectSortby(sortOrder);
    }
    var page = getParameter(url, 'page');
    if (isFilter) {
        doSearch(page);
        renderFilterdItems();
    }
}
var maxx = 10000000 / 10;
var slider = $('#slider');
if (slider) {
    slider.slider({
        min: '0',
        max: maxx,
        range: true,
        values: [0, 10000000],
        slide: function (event, ui) {
            if (ui.values[0] >= ui.values[1]) {
                if (ui.handle == $('#slider a')[0]) {
                    $('#slider').slider('values', 1, ui.value);
                    ui.values[0] = ui.value;
                    ui.values[1] = ui.value;
                } else {
                    $('#slider').slider('values', 0, ui.value);
                    ui.values[0] = ui.value;
                    ui.values[1] = ui.value;
                }
            }

            var uimax = ui.values[1] + 1;

            if (ui.values[0] > 0) {
                var v1 = Bizweb.formatMoney(ui.values[0], '{{amount_no_decimals_with_comma_separator}}₫');
            } else {
                var v1 = ui.values[0];
            }
            var v2 = Bizweb.formatMoney(ui.values[1] + 1, '{{amount_no_decimals_with_comma_separator}}₫');

            $('#start input').val(v1);
            $('#stop input').val(v2);
            var uimin = ui.values[0] - 1;
            var uimax = ui.values[1] + 2;
            $('#filter-value').attr('data-value', '(>' + uimin + ' AND <' + uimax + ')');
        },
    });
    $(document).on('change', '#start', function (e) {
        var val = parseInt($('#start input').val()) - 1;
        var val2 = parseInt($('#stop input').val()) + 1;

        $('#slider').slider('values', 0, parseInt(val));
        $('#filter-value').attr('data-value', '(>' + val + ' AND <' + val2 + ')');
    });
    $(document).on('change', '#stop', function (e) {
        var val = parseInt($('#start input').val()) - 1;
        var val2 = parseInt($('#stop input').val()) + 1;

        $('#slider').slider('values', 1, parseInt(val2));
        $('#filter-value').attr('data-value', '(>' + val + ' AND <' + val2 + ')');
    });
}
function getParameter(url, name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

$('.filter-item--check-box input').change(function (e) {
    var $this = $(this);
    toggleFilter($this);
});
$('a#filter-value').click(function (e) {
    var $this = $(this);
    _toggleFilterdqdt($this);
});
$('.dosearch').click(function (e) {
    var $data = $(this).attr('data-onclick');
    doSearch($data);
});
$('.awe_sortby').on('click', function (e) {
    var $data = $(this).attr('data-onclick');
    sortby($data);
});
function filterItemInList(object) {
    q = object.val().toLowerCase();
    object.parent().next().find('li').show();
    if (q.length > 0) {
        object
            .parent()
            .next()
            .find('li')
            .each(function () {
                if ($(this).find('label').attr('for').indexOf(q) == -1) $(this).hide();
            });
    }
}

/*Sắp xếp trang collection*/
$('#sort-by .ul_col li span').click(function (e) {
    $('.content_ul').css('display', 'block');
    e.preventDefault();
});
$('#sort-by .ul_col .content_ul li').click(function (e) {
    $('.content_ul').css('display', 'none');
    e.preventDefault();
});

/*hh*/
$(document).ready(function () {
    $(window).on('popstate', function () {
        location.reload(true);
    });
    selectFilterByCurrentQuery();
    $('.filter-container .aside-item').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('.filter-container .aside-item.active').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('#show-admin-bar').click(function (e) {
        $('.aside.aside-mini-products-list.filter').toggleClass('active');
    });
    $('.filter-container__selected-filter-header-title').click(function (e) {
        $('.aside.aside-mini-products-list.filter').toggleClass('active');
    });

    var wDWss = $(window).width();
    if (wDWss < 1199) {
        $('.aside-filter .aside-hidden-mobile .aside-item .aside-title').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.parents('.aside-filter .aside-hidden-mobile .aside-item').find('.aside-content').stop().slideToggle();
            $(this).toggleClass('active');
            return false;
        });
    }

    $('.open-filters').click(function (e) {
        e.stopPropagation();
        $(this).toggleClass('openf');
        $('.left-content').toggleClass('openf');
        $('.backdrop__body-backdrop___1rvky').toggleClass('active');
    });

    $('.filter-group li.filter-item label, .backdrop__body-backdrop___1rvky').click(function () {
        $('.left-content').removeClass('openf');
        $('.open-filters').removeClass('openf');
        $('.backdrop__body-backdrop___1rvky').removeClass('active');
    });
});
