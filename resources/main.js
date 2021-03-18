'use strict'
$(function() {
    const menuItems = $('.menu').find('.menu-item');
    const productsContent= $('.content-wrappers').find('.content');

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
                        <div class="single-product-image" style="background-image: url(assets/coats/${productObj.imgUrl})"></div>
                        <div class="details">
                            <div class="product-name">${productObj.name}</div>
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
    }
    
    const contentWrapper = $('.overlay').find('.overlay-content-wrapper');
    const overlay = $('.wrapper').find('.overlay');

    productContentWrapper.delegate('.single-product-image', 'click', function(){

        // getproductoverlayHTML = function(productObj) {
        //     return `<div class="single-product-image" style="background-image: url(assets/coats/${productObj.imgUrl})"></div>
        //                 <div class="single-product" data-id=${productObj.id}>
        //                     <div class="details">
        //                 <div class="product-name">${productObj.name}</div>
        //                 <div class="product-price">
        //                 <div>${productObj.currency}</div>
        //                 <div>${productObj.price}</div>
        //                 </div>
        //                 <div class="sizes"> Your sizes
        //                     <div>S</div>
        //                     <div>M</div>
        //                     <div>L</div>
        //                     <div>XL</div>
        //                 </div>

        //                 <div class="categories-wrapper">
        //                     <div>Details</div>
        //                     <div>Order</div>
        //                     <div>Payment</div>
        //                 </div>

        //                 <div class="comp-wrapper">
        //                     <div class="composition">Compositon
        //                         <div>${productObj.composition}</div>
        //                     </div>
        //                     <div class="country">Country
        //                         <div>${productObj.country}</div>
        //                     </div>
        //                 </div>

        //                 <div class="care">Care
        //                     <div>${productObj.care}</div>
        //                 </div>

        //                 <button>Add to cart</button>
        //             </div>
        //         </div>
        //     </div>
        // `;
        //   };
        overlay.fadeIn();
    });

    const menuIconClose = $('.overlay').find('img');
    menuIconClose.click(function(){
        overlay.addClass('hidden');
    });


});