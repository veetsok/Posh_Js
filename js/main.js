$(document).ready(() => {

// Pop Up
    $('.action').click(() => {
        $('#call-popup').css('display', 'flex');
    });

    $('#call-cancel, #call-popup').click((e) => {
        if (e.target.id === 'call-popup' || e.target.id === 'call-popup-block' || e.target.id === 'call-cancel')
            $('#call-popup').hide();
    });
// Выпадающий список
    const selectContent = $('.form-content');
    const selectSingle = document.querySelector('#form-select');
    const selectSingle_title = selectSingle.querySelector('.form-title');
    const selectSingle_labels = selectSingle.querySelectorAll('.form-label');

// Toggle menu
    selectSingle_title.addEventListener('click', () => {
        selectContent.css('display', 'flex');
        if ('active' === selectSingle.getAttribute('data-state')) {
            selectSingle.setAttribute('data-state', '');

        } else {
            selectSingle.setAttribute('data-state', 'active');
        }
    });

// Close when click to option
    for (let i = 0; i < selectSingle_labels.length; i++) {
        selectSingle_labels[i].addEventListener('click', (evt) => {
            selectSingle_title.textContent = evt.target.textContent;
            selectSingle.setAttribute('data-state', '');
            selectContent.css('display', 'none');
        });
    }


    $('#call-popup-button > button').click(() => {
        let number = $('.phone');

        if (number.val()) {
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: '&phone=' + number.val(),
                success: () => {
                    $('#call-popup-sent').show();
                    $('#call-popup-sent').css('display', 'block');
                    $('#call-popup-block-content').hide();
                },
                error: () => {
                    $('#call-popup-block-content').hide();
                    alert('Ошибка бронирования. Свяжитесь, пожалуйста по номеру телефона')
                }
            });
        } else {
            $('#call-popup-error').show();
        }
    });


    $('#burger').click(() => {
        $('#header').toggleClass('menu-open');
    });

    $('#main #header-container #menu ul li, #menu-open-svg, #main #header-container #menu').click(() => {
        $('#header').removeClass('menu-open');
    });


    $(function () {
        $("#phone, .phone").mask("+380(999) 999-99-99");
    });

    $('#submit').click(function () {
        $('.error-input').hide();

        let name = $('.form-input');
        let email = $('#e-mail');
        let phone = $('#phone');

        let marginBottom = $('#main #order-content-list')

        let order = $('#order-content-list-block');
        let orderSuccess = $('#form-success');
        name.css('border-color', 'rgb(185, 145, 80)');
        email.css('border-color', 'rgb(185, 145, 80)');
        phone.css('border-color', 'rgb(185, 145, 80)');
        let hasError = false;

        if (!name.val()) {
            name.siblings('.error-input').show();
            name.css('border-color', 'red');
            hasError = true;

        }
        if (!email.val()) {
            email.siblings('.error-input').show();
            email.css('border-color', 'red');
            hasError = true;
        }
        if (!phone.val()) {
            phone.siblings('.error-input').show();
            phone.css('border-color', 'red');
            hasError = true;
        }

        if (!hasError) {

            $.ajax({
                method: "POST",
                url: 'https://itlogia.ru/test/checkout',
                data: {name: name.val(), address: email.val(), phone: phone.val()}
            })
                .done(function (message) {
                    console.log(message);
                    if (message.success) {
                        order.css('display', 'none');
                        orderSuccess.css('display', 'flex');
                        marginBottom.css('margin-bottom', '260px');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                    }
                });
        }
    });

    $(window).on('load resize', function () {
        if ($(window).width() < 767) {
            $('#teachers-blocks:not(.slick-initialized)').slick({
                centerMode: true,
                dots: true,
                infinite: true,
                speed: 100,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
                responsive: [
                    {
                        breakpoint: 500,
                        settings: {
                            centerMode: true,
                            dots: true,
                            infinite: true,
                            speed: 100,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },{
                        breakpoint: 350,
                        settings: {
                            slide: '.teacher-content',
                            centerPadding:'10%',
                            centerMode: true,
                            dots: true,
                            infinite: true,
                            speed: 100,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                ]
            });
        } else {
            $("#teachers-blocks.slick-initialized").slick("unslick");
        }
        if ($(window).width() < 767) {
            $('#achievements-blocks:not(.slick-initialized)').slick({
                dots: true,
                infinite: true,
                arrows: false,
                speed: 100,
                centerPadding: '60px',
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 667,
                        settings: {
                            dots: true,
                            infinite: true,
                            speed: 100,
                            centerPadding: '50px',
                            centerMode: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            dots: true,
                            infinite: true,
                            speed: 100,
                            centerPadding: '0',
                            centerMode: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                ]
            });
        } else {
            $("#achievements-blocks.slick-initialized").slick("unslick");
        }

    });

    let description = $('.price-content-block-description');
    let block = $('.price-content-block');
    let LiHidden = $('.li-hidden');
    let Short = $('.price-content-block-short');

    description.click(function (event) {
        block.css('height', '765px');
        description.hide();
        LiHidden.css('display', 'block');
        Short.css('display', 'block');
    });

    Short.click(function () {
        block.css('height', '466px');
        description.show();
        LiHidden.css('display', 'none');
        Short.css('display', 'none');
    });

    var $status = $('.pagingInfo');
    var $slickElement = $('#reviews-blocks');

    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text(i + '/' + slick.slideCount);
    });

    $slickElement.slick({
        infinite: true,
        speed: 100,
        slidesToShow: 3,
        slidesToScroll: 1,
        // slide: '.reviews-block',
        // // variableWidth: true,
        // // autoplay: true,
        // slidesToShow: 3,
        // slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1120,
                settings: {
                    slide: '.reviews-block',
                    variableWidth: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: false,
                    centerPadding: '10px',
                    centerMode: true
                }
            }, {
                breakpoint: 930,
                settings: {
                    slide: '.reviews-block',
                    variableWidth: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    centerPadding: '0px',
                    centerMode: true
                }
            }, {
                breakpoint: 768,
                settings: {
                    slide: '.reviews-block',
                    dots:true,
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0%',
                    centerMode: true
                }
            }, {
                breakpoint: 365,
                settings: {
                    slide: '.reviews-block',
                    dots:true,
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0%',
                    centerMode: true
                }
            },
        ]
    });


});