'use strict'
$(function() {
    const menuItems = $('.menu').find('.menu-item');
    const productsContent= $('.content-wrappers').find('.content');
    const productId = [];

    menuItems.click(function(e) {
        if(!$(this).data('content')) {
            e.preventDefault();
        }
        
        menuItems.removeClass('selected');
        $(this).addClass('selected');

        productsContent.addClass('hidden');
        $("#" + $(this).data('content')).removeClass('hidden');
    }); 

    const  productContentWrapper = $('#coats-container').find('.product-wrapper'),
          getproductHTML = function(productObj) {
            return `<div class="single-product" data-id=${productObj.id}>
                        <div class="single-product-image" data-img=${productObj.imgUrl} style="background-image: url(assets/coats/${productObj.imgUrl})"></div>
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

    for(let i = 0; i < products.coats.length; i++) {
        let productObj = products.coats[i],
            productHMTL = getproductHTML(productObj);
            productContentWrapper.append(productHMTL);

            productId.push(productObj.id);
            console.log(productId);
    }
    
    const singleImage =$('.product-wrapper-overlay').find('.single-product-overlay');
    const overlay = $('.wrapper').find('.overlay');

    productContentWrapper.delegate('.single-product-image', 'click', function(){

        const currentId= $(this).parents('.single-product').data('id');
        const index = productId.indexOf(currentId);

       for(let i = 0; i < products.coats.length; i++){
           let singleProduct = products.coats[i]
           if(productId[index] === singleProduct.id) {

            singleImage.css({backgroundImage: `url(assets/coats/${$(this).data('img')})`});
            // poti sa iti salvezi intr-o constanta $('.details-overlay') si cele care sa repeta si sa executi find sau ce mai ai nevoie pe constantele respective
            $('.details-overlay').find('.product-name').text(singleProduct.name);
            $('.details-overlay').find('.product-price div:first-child').text(singleProduct.currency);
            $('.details-overlay').find('.product-price div:last-child').text(singleProduct.price);
            $('.comp-wrapper').find('.composition div').text(singleProduct.composition);
            $('.comp-wrapper').find('.country div').text(singleProduct.country);
            $('.care').find('div').text(singleProduct.care);
           };
       };
        overlay.fadeIn();
    });

    const menuIconClose = $('.overlay').find('img');
    menuIconClose.click(function(){
        overlay.fadeOut();
    });
});