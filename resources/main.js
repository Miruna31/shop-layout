'use strict'
$(function() {
    const menuItems = $('.menu').find('.menu-item');
    let categories = menuItems.data('product');
    const productContentWrapper = $('#products-container').find('.product-wrapper'),
          getproductHTML = function(index, productObj) {
            return `<div class="single-product">
                        <div class="single-product-image" data-index=${index} data-product=${categories} data-id=${productObj.id} data-img=${productObj.imgUrl} style="background-image: url(assets/${productObj.imgUrl})">
                        </div>
                        <div class="details">
                            <div class="product-name" data-name= ${productObj.name}>${productObj.name}</div>
                            <div class="product-price">
                                <div>${productObj.currency}</div>
                                 <div>${productObj.price}</div>
                            </div>
                        </div>
                    </div>
                `;
          };

        function addProduct(categories) {
        for (let i = 0; i < products[categories].length; i++) {
            let productObj = products[categories][i],
            productHTML = getproductHTML(i, productObj);
            productContentWrapper.append(productHTML);
        }
    }

    addProduct(menuItems.data('product'));

    menuItems.click(function(e) {
    if(!$(this).data('product')) {
        e.preventDefault();
    }
    
        menuItems.removeClass('selected');
        $(this).addClass('selected');

        let categories = $(this).data('product');
        console.log(categories);
        productContentWrapper.empty();
        addProduct(categories);

        productContentWrapper.data('selected-category', categories);
    });

    const singleImage =$('.product-wrapper-overlay').find('.single-product-overlay');
    const overlay = $('.wrapper').find('.overlay');

    productContentWrapper.delegate('.single-product-image', 'click', function(){
        let index = $(this).data('index');
        let id =$(this).data('id');
        let categories = productContentWrapper.data('selected-category');
        let productIndex = products[categories][index];

        console.log(categories);
        console.log(id);
        console.log(productIndex)

        const overlayDetails = $('.details-overlay');
        singleImage.css({backgroundImage: `url(assets/${$(this).data('img')})`});
        overlayDetails.find('.product-name').text(productIndex.name);
        overlayDetails.find('.product-price div:first-child').text(productIndex.currency);
        overlayDetails.find('.product-price div:last-child').text(productIndex.price);
        overlayDetails.find('.composition div').text(productIndex.composition);
        overlayDetails.find('.country div').text(productIndex.country);
        overlayDetails.find('.care div').text(productIndex.care);
        overlay.fadeIn();

        productContentWrapper.data('id', id);
    });

    const menuIconClose = $('.overlay').find('img');
    menuIconClose.click(function(){
        overlay.fadeOut();
    });

    let favoritesAdded = [];
    const favoritesTotal = $('.favorites-number'),
          favoritesContentWrapper = $('.favorites-content-wrapper'),
          favoritesProducts =  favoritesContentWrapper.find('.favorites-products'),
          favoritesProductIcon = $('.favorite-btn'),
          favoritesHeaderIcon = $('.favorites-icon-wrapper'),
          removeFavoritesBtn = $('#removeFavoritesBtn');

    favoritesProductIcon.click(function() {
    const id = productContentWrapper.data('id');
    setTimeout(function() {
        favoritesProductIcon.addClass('selected');

        setTimeout(function() {
            favoritesProductIcon.removeClass('selected');
        }, 2000);
    }, 0);
    console.log(id);

    if(jQuery.inArray(id, favoritesAdded) === -1) {
        favoritesAdded.push(id);
    } else {
        favoritesAdded.splice(favoritesAdded.indexOf(id), 1);
    }

    console.log(favoritesAdded);

    if(favoritesAdded.length > 0) {
        favoritesTotal.text(favoritesAdded.length);
        favoritesTotal.show();
    } else {
        favoritesTotal.hide();
    }
});

    favoritesHeaderIcon.click(function(e) {
        e.preventDefault();
        if(favoritesAdded.length > 0) {
            productContentWrapper.hide(function() {
                favoritesAdded.forEach(function(item) {
                    let categories = productContentWrapper.data('selected-category');
                    for(let i = 0; i < products[categories].length; i++) {
                        let productObj = products[categories][i];
                        if(item === productObj.id) {
                            let productHMTL = getproductHTML(i, productObj);
                            favoritesProducts.html(productHMTL);
                        }
                    }
                });
                favoritesContentWrapper.show();
            });
        }
        menuItems.click(function(){
            productContentWrapper.show();
            favoritesContentWrapper.hide();
        });
        cartContentWrapper.hide();
    });

    removeFavoritesBtn.click(function() {
        favoritesAdded = [];
        console.log('favoritesAdded in removeFavoritesBtn: ', favoritesAdded);
        favoritesProducts.text('No products have been added to favorites yet.');
        $(this).hide();
        favoritesTotal.hide();
    });


    let inCartAdded = [];
    const inCartTotal = $('.in-cart-number'),
          cartContentWrapper = $('.cart-content-wrapper'),
          cartProducts =  cartContentWrapper.find('.cart-products'),
          cartProductIcon = $('.add'),
          cartHeaderIcon = $('.cart-icon-wrapper'),
          removeCartBtn = $('#removeCartBtn');

    cartProductIcon.click(function() {
    const id = productContentWrapper.data('id');
    setTimeout(function() {
        cartProductIcon.text('Product Added');

        setTimeout(function() {
            cartProductIcon.text('Add to Cart');
        }, 2000);
    }, 0);
    console.log(id);
    console.log(id);

    if(jQuery.inArray(id, inCartAdded) === -1) {
        inCartAdded.push(id);
    } else {
        inCartAdded.splice(inCartAdded.indexOf(id), 1);
    }

    console.log(inCartAdded);

    if(inCartAdded.length > 0) {
        inCartTotal.text(inCartAdded.length);
        inCartTotal.show();
    } else {
        inCartTotal.hide();
    }
});

    cartHeaderIcon.click(function(e) {
        e.preventDefault();
        if(inCartAdded.length > 0) {
            productContentWrapper.hide(function() {
                inCartAdded.forEach(function(item) {
                    let categories = productContentWrapper.data('selected-category');
                    for(let i = 0; i < products[categories].length; i++) {
                        let productObj = products[categories][i];
                        if(item === productObj.id) {
                            let productHMTL = getproductHTML(i, productObj);
                            cartProducts.html(productHMTL);
                        }
                    }
                });
                cartContentWrapper.show();
            });
        }
        menuItems.click(function(){
            productContentWrapper.show();
            cartContentWrapper.hide();
        });
        favoritesContentWrapper.hide();
    });

    removeCartBtn.click(function() {
        inCartAdded = [];
        console.log('cartAdded in removeCartBtn: ', inCartAdded);
        cartProducts.text('No products have been added to the cart yet.');
        $(this).hide();
        inCartTotal.hide();
    });
});