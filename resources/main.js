'use strict'
$(function() {
    const menuItems = $('.menu').find('.menu-item');
    let categories = menuItems.data('product');
    const productContentWrapper = $('#products-container').find('.product-wrapper'),
          getproductHTML = function(index, productObj) {
            return `<div class="single-product">
                        <div class="single-product-image" data-index=${index} data-product=${categories} data-id=${productObj.id} data-img=${productObj.imgUrl} style="background-image: url(assets/${productObj.imgUrl})"></div>
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
        // switch(categories){
        //     case 'coats':
        //             console.log(categories);
        //             productContentWrapper.empty();
        //             addProduct(categories);
        //         break;
        //     case 'dresses':
        //             console.log(categories);
        //             productContentWrapper.empty();
        //             addProduct(categories);
        //         break;
        //     case 'jersey':
        //             console.log(categories);
        //             productContentWrapper.empty();
        //             addProduct(categories);
        //         break;
        //     case 'pants':
        //             console.log(categories);
        //             productContentWrapper.empty();
        //             addProduct(categories);
        //         break;
        // };

        // daca incercam sa extragem ce este comun aici, observam ca tot. practic variabila ta categories este legatura cu array-ul de care ai nevoie din products la click pe menu-item-ul respectiv si prin urmare nu ai nevoie de switch, acest switch se intampla de facpt automat pentru ca ai folosit acelasi nume de proprietate in data-products
        console.log(categories);
        productContentWrapper.empty();
        addProduct(categories);

        productContentWrapper.data('selected-category', categories);
    });

    const singleImage =$('.product-wrapper-overlay').find('.single-product-overlay');
    const overlay = $('.wrapper').find('.overlay');

    productContentWrapper.delegate('.single-product-image', 'click', function(){
        let index = $(this).data('index');
        let categories = productContentWrapper.data('selected-category');
        let productIndex = products[categories][index];

        //  cateogories l-ai salvat global pe randul 4 si drept urmare este mereu "coats", primul menu-item, practic
        // cand selectezi un menu-item trebuie sa iti si salvezi selectia asta undeva ca sa o poti recupera mai tarziu pentru context; pe randul 67 eu am salvat pe productContentWrapper
        console.log(categories);
        console.log(productIndex)
        // console.log($(this).data());

        const overlayDetails = $('.details-overlay');
        singleImage.css({backgroundImage: `url(assets/${$(this).data('img')})`});
        overlayDetails.find('.product-name').text(productIndex.name);
        overlayDetails.find('.product-price div:first-child').text(productIndex.currency);
        overlayDetails.find('.product-price div:last-child').text(productIndex.price);
        overlayDetails.find('.composition div').text(productIndex.composition);
        overlayDetails.find('.country div').text(productIndex.country);
        overlayDetails.find('.care div').text(productIndex.care);
        overlay.fadeIn();
    });

    const menuIconClose = $('.overlay').find('img');
    menuIconClose.click(function(){
        overlay.fadeOut();
    });

});