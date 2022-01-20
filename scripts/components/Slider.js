import Swiper, { Navigation, Pagination, Thumbs } from 'swiper'

Swiper.use([Navigation, Pagination, Thumbs]);

let $sliders = document.querySelectorAll('.Slider')

function init($slider) {
	let $container = $slider.querySelector(':scope > .swiper-container')
	let $pagination = $slider.querySelector(':scope > .swiper-pagination')
	let $buttonPrev = $slider.querySelector(':scope > .swiper-button-prev') || $container.querySelector(':scope > .swiper-button-prev')
	let $buttonNext = $slider.querySelector(':scope > .swiper-button-next') || $container.querySelector(':scope > .swiper-button-next')
	let areaHover = $slider.dataset.areaHover || false

	let slidesPerView = $slider.dataset.slides
	if (slidesPerView != 'auto') {
		slidesPerView = parseInt($slider.dataset.slides) || 1
	}

	let options = {
		direction: 'horizontal',
		speed: parseInt($slider.dataset.speed) || 300,
		loop: $slider.dataset.loop || false,
		slidesPerGroup: 1,
		slidesPerView: slidesPerView,
		freeMode: $slider.dataset.freeMode || false,
		spaceBetween: parseInt($slider.dataset.spaceBetween) || 0,
		centeredSlides: $slider.dataset.centered || false,
		centerInsufficientSlides: $slider.dataset.centerInsufficient || false,
		watchSlidesProgress: true,
		watchSlidesVisibility: true,
		// autoHeight:
		pagination: {
			el: $pagination,
			clickable: true,
		},
		navigation: {
			prevEl: $buttonPrev,
			nextEl: $buttonNext,
		},
		on: {
			init: () => {
				// $slider.addClass('is-ready')
				if (window.lazyLoadInstance) {
					window.lazyLoadInstance.update();
				}
			},
			paginationRender(swiper) {
				if (areaHover) {
					initBulletsHover(swiper)
				}
			},
			slideChangeTransitionStart() {
				if (window.lazyLoadInstance) {
					setTimeout(() => {
						window.lazyLoadInstance.update();
					}, 15);
				}
			},
			slideChangeTransitionEnd() {
				if (window.lazyLoadInstance) {
					window.lazyLoadInstance.update();
				}
			},
		},
	}

	function initBulletsHover(swiper) {
		let $bullets = swiper.pagination.bullets
		let $pagination = swiper.pagination.el
		let $container = swiper.el

		// $container.addEventListener('mousemove', e => {
		// 	bulletHover(e.clientX)

		// 	$bullets.forEach($bullet => {
		// 		// http://jsfiddle.net/hm6Js/7/
		// 		// let leftX = $bullet
		// 		// let rightX = $bullet
		// 		console.dir($bullet)
		// 	})

		// 	// if (clientX >= leftX && clientY <= rightX ) {
		// 	// 		$bullet.click()
		// 	// }
		// })

		$bullets.forEach($bullet => {
			$bullet.addEventListener('mouseover', e => {
				$bullet.click()
			})
		})
	}

	// function bulletHover(x) {
	// 	console.log(x)
	// }

	let instance = new Swiper($container, options)

	return instance;
}


// Instances
let slidersInstances = []

$sliders.forEach(($slider, i) => {
	slidersInstances[i] = init($slider)
})

window.sliders = slidersInstances


// Thumbs
slidersInstances.forEach(sliderInstance => {
	let $container = sliderInstance.el
	let $slider = $container.parentNode

	if ($slider.dataset.thumbs) {

		let $thumbsContainer = document.querySelector($slider.dataset.thumbs)
		let $swiperContainer = $thumbsContainer.querySelector('.swiper-container')
		let $staticThumbs = $thumbsContainer.querySelectorAll('.Picture.-thumb')

		// if thumbs are slider
		if ($swiperContainer) {

			let thumbsSwiper = document.querySelector($slider.dataset.thumbs + ' .swiper-container').swiper
			sliderInstance.thumbs.swiper = thumbsSwiper
			sliderInstance.thumbs.init()
			thumbsSwiper.slides[0].classList.add('swiper-slide-thumb-active')

		} else if ($staticThumbs.length) {
			// if thumbs are static

			$staticThumbs[0].classList.add('is-selected')

			$staticThumbs.forEach(($thumb, index) => {
				$thumb.addEventListener('click', e => {
					sliderInstance.slideTo(index + 1)
				})
			})

			sliderInstance.on('realIndexChange', (swiper) => {
				let $targetThumb = $staticThumbs[swiper.realIndex]
				removeRestsClass($staticThumbs, $targetThumb, 'is-selected')
				$targetThumb.classList.add('is-selected')
			})
		}

	}
})

function removeRestsClass($elements, $exception, className) {
	$elements.forEach($element => {
		if ($element !== $exception) {
			$element.classList.remove(className);
		}
	})
}

export default init
