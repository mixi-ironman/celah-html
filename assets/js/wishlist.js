// var Ego = {};
// Ego.General = {
//     init: function () {
//         Ego.Wishlist.init();
//     },
// };
// Ego.Wishlist = {
//     init: function () {
//         this.setWishlistProductLoop();
//         Ego.Wishlist.wishlistProduct();
//     },
//     setWishlistProductLoop: function () {
//         $('body').on('click', '.remove-wishlist', function (e) {
//             Ego.Wishlist.removeWishlist($(this).attr('data-wish'));
//         });
//         $('body').on('click', '.setWishlist', function (e) {
//             //debugger;
//             e.preventDefault();
//             if ($(this).hasClass('active')) {
//                 Ego.Wishlist.removeWishlist($(this).attr('data-wish'));
//                 var InfoText = 'Bạn vừa bỏ sản phẩm ra khỏi mục yêu thích.';
//                 InfoNoti(InfoText);
//             } else {
//                 var phand = [];
//                 var handle = $(this).attr('data-wish');
//                 if (document.cookie.indexOf('ego_wishlist_products') !== -1) {
//                     var las = Cookies.getJSON('ego_wishlist_products');
//                     if ($.inArray(handle, las) === -1) {
//                         phand = [handle];
//                         for (var i = 0; i < las.length; i++) {
//                             phand.push(las[i]);
//                             if (phand.length > 100) {
//                                 break;
//                             }
//                         }
//                         Cookies.set('ego_wishlist_products', phand, {
//                             expires: 15,
//                             sameSite: 'None',
//                             secure: true,
//                         });
//                     }
//                 } else {
//                     // phand = [handle];
//                     // Cookies.set('ego_wishlist_products', phand, {
//                     //     expires: 15,
//                     //     sameSite: 'None',
//                     //     secure: true,
//                     // });
//                 }
//                 Ego.Wishlist.wishlistProduct();
//                 var SuccessText =
//                     "Bạn vừa thêm 1 sản phẩm vào mục yêu thích thành công bấm <a style='color:#2196f3' href='/danh-sach-yeu-thich'>vào đây</a> để tới trang yêu thích";
//                 SuccessNoti(SuccessText);
//             }
//         });
//     },
//     wishlistProduct: function () {
//         if (
//             $('#sidebar-all .sidebar-all-wrap-right[data-type="wishlist"] .sidebar-all-wrap-right-main-list').length > 0
//         ) {
//             if (document.cookie.indexOf('ego_wishlist_products') !== -1) {
//                 $('#sidebar-all .sidebar-all-wrap-right[data-type="wishlist"] .sidebar-all-wrap-right-main-list').html(
//                     '',
//                 );
//                 var last_wishlist_pro_array = Cookies.getJSON('ego_wishlist_products');
//                 Ego.Wishlist.activityWishlist();
//                 var recentview_promises = [];
//                 for (var i = 0; i < 100; i++) {
//                     if (typeof last_wishlist_pro_array[i] == 'string') {
//                         var promise = new Promise(function (resolve, reject) {
//                             $.ajax({
//                                 url: '/products/' + last_wishlist_pro_array[i] + '?view=wish',
//                                 async: false,
//                                 success: function (product) {
//                                     resolve({
//                                         error: false,
//                                         data: product,
//                                     });
//                                 },
//                                 error: function (err) {
//                                     if (err.status === 404) {
//                                         try {
//                                             var u = this.url.split('?')[0].replace('/products/', '');
//                                             resolve({
//                                                 error: true,
//                                                 handle: u,
//                                             });
//                                         } catch (e) {
//                                             resolve({
//                                                 error: false,
//                                                 data: '',
//                                             });
//                                         }
//                                     } else {
//                                         resolve({
//                                             error: false,
//                                             data: '',
//                                         });
//                                     }
//                                 },
//                             });
//                         });
//                         recentview_promises.push(promise);
//                     }
//                 }
//                 Promise.all(recentview_promises).then(function (values) {
//                     if (values.length > 0) {
//                         var x = [];
//                         setTimeout(function () {
//                             $('.headerWishlistCount').html(values.length);
//                         }, 500);
//                         $.each(values, function (i, v) {
//                             if (v.error) {
//                                 x.push(v.handle);
//                             } else {
//                                 $('#sidebar-all .sidebar-all-wrap-right[data-type="wishlist"] .page-wishlist').append(
//                                     v.data,
//                                 );
//                                 $('#sidebar-all .sidebar-all-wrap-right[data-type="wishlist"] .page-wishlist').show();
//                                 awe_lazyloadImage();
//                                 //theme.init(); // gọi lại ajax cart
//                             }
//                             console.log(values.length);
//                         });
//                         if (x.length > 0) {
//                             var new_last_viewed_pro_array = [];
//                             $.each(last_wishlist_pro_array, function (i, v) {
//                                 if ($.inArray(v, x) === -1) {
//                                     new_last_viewed_pro_array.push(v);
//                                 }
//                             });
//                             if (new_last_viewed_pro_array.length > 0) {
//                                 Cookies.set('last_viewed_products', new_last_viewed_pro_array, {
//                                     expires: 180,
//                                     sameSite: 'None',
//                                     secure: true,
//                                 });
//                             }
//                         }
//                     } else {
//                         $('.headerWishlistCount').html('0');
//                         $(
//                             '#sidebar-all .sidebar-all-wrap-right[data-type="wishlist"] .sidebar-all-wrap-right-main-list',
//                         ).append(
//                             '<div class="sidebar-all-wrap-right-main-top-error col-12"><span>Bạn chưa có sản phẩm yêu thích, <a href="/collections/all" style="color: #007bff;">vào đây</a> để thêm thật nhiều sản phẩm vào yêu thích nào. </span></div>',
//                         );
//                     }
//                 });
//             } else {
//                 $(
//                     '#sidebar-all .sidebar-all-wrap-right[data-type="wishlist"] .sidebar-all-wrap-right-main-list',
//                 ).append(
//                     '<div class="sidebar-all-wrap-right-main-top-error col-12"><span>Bạn chưa có sản phẩm yêu thích, <a href="/collections/all" style="color: #007bff;">vào đây</a> để thêm thật nhiều sản phẩm vào yêu thích nào. </span></div>',
//                 );
//             }
//         } else {
//             $('#sidebar-all .sidebar-all-wrap-right[data-type="wishlist"] .sidebar-all-wrap-right-main-list').append(
//                 '<div class="sidebar-all-wrap-right-main-top-error col-12"><span>Bạn chưa có sản phẩm yêu thích, <a href="/collections/all" style="color: #007bff;">vào đây</a> để thêm thật nhiều sản phẩm vào yêu thích nào. </span></div>',
//             );
//         }
//     },
//     activityWishlist: function () {
//         var last_wishlist_pro_array = Cookies.getJSON('ego_wishlist_products');
//         $.each(last_wishlist_pro_array, function (i, v) {
//             $('.setWishlist[data-wish="' + v + '"]')
//                 .html(
//                     '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21C8.38661 17.7733 2 13.7597 2 8.3951C2 5.37384 4.42 3 7.5 3C9.24 3 10.91 3.74441 12 5C13.09 3.74441 14.76 3 16.5 3C19.58 3 22 5.37384 22 8.3951C22 13.751 15.6214 17.7907 12 21Z" fill="#FF835B"/></svg>',
//                 )
//                 .addClass('active')
//                 .attr('title', 'Bỏ yêu thích');
//         });
//     },

//     removeWishlist: function (handle) {
//         var phand = [];

//         $('a[data-wish="' + handle + '"]')
//             .html(
//                 '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C11.6604 4.60884 11.2646 4.26729 10.8278 3.9824C9.86267 3.35284 8.69792 3 7.5 3C4.42 3 2 5.37384 2 8.3951C2 9.46861 2.25574 10.488 2.69383 11.4578C4.0526 14.4686 7.16576 17.0093 9.8455 19.1963C10.617 19.8259 11.3526 20.4262 12 21C12.6474 20.4262 13.383 19.8259 14.1545 19.1963C16.8342 17.0093 19.9473 14.4687 21.3061 11.458C21.7442 10.4881 22 9.46866 22 8.3951C22 5.37384 19.58 3 16.5 3C15.3021 3 14.1373 3.35284 13.1722 3.9824C12.7354 4.26729 12.3396 4.60884 12 5ZM12 18.3699C12.3228 18.1024 12.6527 17.8326 12.9822 17.5633C13.2612 17.3351 13.5399 17.1073 13.8136 16.8813C14.9091 15.9769 15.9814 15.058 16.9309 14.095C18.106 12.9033 18.9793 11.7563 19.4879 10.6242C19.8233 9.8767 20 9.13633 20 8.3951C20 6.51455 18.5119 5 16.5 5C15.3116 5 14.2025 5.51373 13.5103 6.31111L12 8.05084L10.4897 6.31111C9.79748 5.51373 8.68843 5 7.5 5C5.48808 5 4 6.51455 4 8.3951C4 9.13633 4.17674 9.8767 4.51214 10.6242C5.02069 11.7563 5.89402 12.9033 7.06909 14.095C8.01864 15.058 9.09095 15.9769 10.1864 16.8813C10.4601 17.1073 10.7388 17.3351 11.0178 17.5633C11.3473 17.8326 11.6772 18.1024 12 18.3699Z" fill="#333333"/></svg>',
//             )
//             .removeClass('active')
//             .attr('title', 'Thêm vào yêu thích');
//         if (document.cookie.indexOf('ego_wishlist_products') !== -1) {
//             var las = Cookies.getJSON('ego_wishlist_products');
//             var flagIndex = $.inArray(handle, las);
//             las.splice(flagIndex, 1);
//             Cookies.set('ego_wishlist_products', las, {
//                 expires: 15,
//                 sameSite: 'None',
//                 secure: true,
//             });
//         } else {
//             phand = [handle];
//             Cookies.set('ego_wishlist_products', phand, {
//                 expires: 15,
//                 sameSite: 'None',
//                 secure: true,
//             });
//         }
//         Ego.Wishlist.wishlistProduct(3, 5);
//     },
// };

// Ego.Wishlist.init();
