//scroll top
function sTopMain() {
	$(window).scrollTop(0);
}
function popupClose() {
	let popupOpen = document.querySelector('.popup-outer-box.active')
	if (popupOpen) {
		popupOpen.classList.remove('active')
		document.body.classList.remove('popup-open')
	}
}


//js tabs
const tabsNav = document.querySelectorAll('.js-tabs-nav')
const tabsBlocks = document.querySelectorAll('.js-tab-block')
function tabsActiveStart() {
	for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
		if (tabsBlocks[iTab].classList.contains('active')) {
			tabsBlocks[iTab].classList.remove('active')
		}
	}
	for (i = 0; i < tabsNav.length; i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
			if (tabsNavElements[iElements].classList.contains('active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0; j < tabsBlocks.length; j++) {
					if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
						console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
						tabsBlocks[j].classList.add('active')
					}
				}
			}
		}
	}
	
}
for (i = 0; i < tabsNav.length; i++) {
	tabsNav[i].addEventListener('click', function (e) {
		if (e.target.closest('[data-tab]')) {
			let tabsNavElements = this.querySelector('[data-tab].active')
			tabsNavElements ? tabsNavElements.classList.remove('active') : false
			e.target.closest('[data-tab]').classList.add('active')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
}
tabsActiveStart()


//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')
function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	document.body.classList.remove('sort-show')
	document.body.classList.remove('fav-show')
	document.body.classList.remove('cart-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}
function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}
function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}
for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		if (this.closest('.header')) {
			sTopMain();
		}
		if (this.closest('.popup-filter-wrap')) {
			sTopMain();
		}
		popupClose();
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-sort-wrap')) {
				document.body.classList.add('sort-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			if (this.closest('.popup-favorite-wrap')) {
				document.body.classList.add('fav-show')
			}
			if (this.closest('.popup-cart-wrap')) {
				document.body.classList.add('cart-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.querySelector('.button-title').innerHTML = ''
			popupElementButton.querySelector('.button-title').insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.querySelector('.button-title').innerHTML = ''
				popupElementButton.querySelector('.button-title').insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})


//btn tgl
let tglButtons = document.querySelectorAll('.js-btn-tgl')
for (i = 0;i < tglButtons.length;i++) {
	tglButtons[i].addEventListener('click', function(e) {
		this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}


$(document).ready(function(){
	//scroll top
	function sTop() {
		$("html,body").animate({scrollTop:0},0);return false;
	}


	if (!!$('header').offset()) {
		var stickyTop = $('header').offset().top;
		$(window).scroll(function(){
			var windowTop = $(window).scrollTop();
			if ($('.card-box').length > 0) {
				let cardTop = $('.card-box .photos-inner-wrap').outerHeight() - 70
				if (windowTop > cardTop){
					$('.wrap').addClass('header-fixed');
				}
				else {
					$('.wrap').removeClass('header-fixed');
				}
				return false
			}
			if ($('.photo-slider-box').length > 0) {
				let cardTop = $('.photo-slider-box').outerHeight() - 70
				if (windowTop > cardTop){
					$('.wrap').addClass('header-fixed');
				}
				else {
					$('.wrap').removeClass('header-fixed');
				}
				return false
			}
			if (windowTop > 0){
				$('.wrap').addClass('header-fixed');
			}
			else {
				$('.wrap').removeClass('header-fixed');
			}
		});
	}

	//question
	$('.item-tile-question').each(function() {
		if ($(this).find('.btn-popup').hasClass('active')) {
			$(this).find('.popup-content-block').slideDown(200)
		}
	})
	$('.item-tile-question .btn-popup').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next('.popup-content-block').slideUp(200)
		} else {
			$(this).addClass('active').next('.popup-content-block').slideDown(200)
		}
		return false;
	})

	//swipebox
	if (!!$('[data-swipebox]').offset()) {
		$('[data-swipebox').on('click', function() {
			sTop();
		})
		$('[data-swipebox]').swipebox();
	}

	//popups
	let popupCurrent;
	$('.js-popup-open').on('click', function () {
		sTop();
		$('.popup-outer-box').removeClass('active');
		$('body').addClass('popup-open');
		popupCurrent = $(this).attr('data-popup');
		$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
		return false;
	})
	$('.js-popup-close').on('click', function () {
		$('body').removeClass('popup-open');
		$('.popup-outer-box').removeClass('active');
		return false;
	})
	$('.popup-outer-box').on('click', function (event) {
		if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('body').removeClass('popup-open-scroll');
			$('.popup-outer-box').removeClass('active');
			return false;
		}
	})
	
	
	//filter toggle section
	$('.filter-section-wrap.section-close').find('.filter-section-content').hide();
	$('.filter-section-title').on('click', function() {
		if ($(this).parent('.filter-section-wrap').hasClass('section-close')) {
			$(this).parent('.filter-section-wrap').removeClass('section-close').find('.filter-section-content').slideDown(200);
		} else {
			$(this).parent('.filter-section-wrap').addClass('section-close').find('.filter-section-content').slideUp(200);
		}
		return false;
	})

	//catalog-slider-box
	if (!!$('.catalog-slider-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.catalog-slider-box .slider').slick({
				dots: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				touchThreshold: 100,
				variableWidth: false,
				infinite: true,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				autoplay: false,
				autoplaySpeed: 5000,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3,
							prevArrow: false,
							nextArrow: false,
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 2,
							prevArrow: false,
							nextArrow: false,
						}
					},
					{
						breakpoint: 429,
						settings: {
							slidesToShow: 1,
							prevArrow: false,
							nextArrow: false,
						}
					},
				]
			});
		}
		
	}


	//photo-slider-box
	if (!!$('.photo-slider-box').offset()) {
		$('.photo-slider-box .slider').slick({
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			touchThreshold: 100,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: true,
			rows: 1,
			swipeToSlide: true,
			autoplay: true,
			fade: true,
			cssEase: 'linear',
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
						prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
						nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
						dots: false,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						prevArrow: false,
						nextArrow: false,
						dots: true,
					}
				},
			]
		});
		$('.wrap').removeClass('wrap-desktop-header-light')
		$('.wrap').removeClass('wrap-mobile-header-light')
		if ($('.photo-slider-box .slick-active .sl-wrap').hasClass('sl-light-d')) {
			$('.wrap').addClass('wrap-desktop-header-light')
		} else {
			$('.wrap').removeClass('wrap-desktop-header-light')
		}
		if ($('.photo-slider-box .slick-active .sl-wrap').hasClass('sl-light-m')) {
			$('.wrap').addClass('wrap-mobile-header-light')
		} else {
			$('.wrap').removeClass('wrap-mobile-header-light')
		}
		$('.photo-slider-box .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$('.wrap').removeClass('wrap-desktop-header-light')
			$('.wrap').removeClass('wrap-mobile-header-light')
			if ($('.photo-slider-box .slick-active .sl-wrap').hasClass('sl-light-d')) {
				$('.wrap').addClass('wrap-desktop-header-light')
			} else {
				$('.wrap').removeClass('wrap-desktop-header-light')
			}
			if ($('.photo-slider-box .slick-active .sl-wrap').hasClass('sl-light-m')) {
				$('.wrap').addClass('wrap-mobile-header-light')
			} else {
				$('.wrap').removeClass('wrap-mobile-header-light')
			}
		})
		
	}

	//card-box
	if (!!$('.card-box').offset()) {
		$('.card-box .slider').slick({
			dots: false,
			slidesToShow: 2,
			slidesToScroll: 1,
			touchThreshold: 100,
			variableWidth: false,
			infinite: false,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						prevArrow: false,
						nextArrow: false,
						dots: true,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						prevArrow: false,
						nextArrow: false,
						dots: true,
					}
				},
			]
		});
		
	}
});