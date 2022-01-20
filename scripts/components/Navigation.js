import { query, queryAll, isMobile } from '../helpers/Common'
import { trigger } from '../helpers/Event'
import { slideUp, slideDown, slideToggle } from '../helpers/Slide'
import { showOverlay, hideOverlay } from '../components/Overlay'


// Main menu
// =======================
let mainMenu = query('.MainMenu')

mainMenu.addEventListener('mouseenter', e => {
	showOverlay('header')
})

mainMenu.addEventListener('mouseleave', e => {
	hideOverlay('header')
})


// NavMobileOpener
// ========================
let navMobile = query('.NavMobile')

if (navMobile) {
	let navMobileOpener = query('.NavMobileOpener')

	navMobile.addEventListener('open', (e) => {
		navMobileOpener.classList.add('is-open')
		navMobile.classList.add('is-open')
		document.body.classList.add('g-noScroll')
	})

	navMobile.addEventListener('close', (e) => {
		navMobileOpener.classList.remove('is-open')
		navMobile.classList.remove('is-open')
		document.body.classList.remove('g-noScroll')
	})

	navMobileOpener.addEventListener('click', e => {
		if (navMobile.classList.contains('is-open')) {
			trigger(navMobile, 'close')
		} else {
			trigger(navMobile, 'open')
		}
	})

	// event outer click
	document.body.addEventListener('click', e => {
		if (
			navMobile.classList.contains('is-open') &&
			!e.target.closest('.NavMobile') &&
			!e.target.closest('.NavMobileOpener') &&
			!e.target.classList.contains('NavMobileOpener')
		){
			trigger(navMobile, 'close')
		}
	})
}


// Mobile Menu
// ===============================
let menuItemsLinks = queryAll('.g-mobile .MainMenu--mobile .MainMenu__itemLink')

menuItemsLinks.forEach( menuItemLink => {
	let menuItem = menuItemLink.closest('.MainMenu__item')
	let submenu = query('.MainMenu__submenu', menuItem)

	menuItem.addEventListener('open', (e) => {
		menuItem.classList.add('is-open')
		submenu.classList.add('is-open')
	})

	menuItem.addEventListener('close', (e) => {
		menuItem.classList.remove('is-open')
		submenu.classList.remove('is-open')
	})

	menuItemLink.addEventListener('click', e => {
		e.preventDefault()

		if (menuItem.classList.contains('is-open')) {
			slideUp(submenu, 200, () => {
				trigger(menuItem, 'close')
			})
		} else {
			trigger(menuItem, 'open')
			slideDown(submenu, 200)
		}
	})

})




// import { trigger } from '../helpers/Event'

// let $menuItems = document.querySelectorAll('.NavMain__item.-dropdown')
// let $menuItemsLinks = document.querySelectorAll('.NavMain__item.-dropdown > a')

// $menuItemsLinks.forEach( $menuItemLink => {
// 	let $menuItem = $menuItemLink.closest('li')
// 	let $closeButton = $menuItem.querySelector('.do-closeMenu')

// 	$menuItem.addEventListener('open', (e) => {
// 		$menuItem.classList.add('is-open')
// 		closeRestItems($menuItem)
// 	})

// 	$menuItem.addEventListener('close', (e) => {
// 		$menuItem.classList.remove('is-open')
// 	})

// 	if ($closeButton) {
// 		$closeButton.addEventListener('click', (e) => {
// 			$menuItem.classList.remove('is-open')
// 		})
// 	}

// 	$menuItemLink.addEventListener('click', e => {
// 		e.preventDefault()

// 		if ($menuItem.classList.contains('is-open')) {
// 			// slideUp($submenu, 200, () => {
// 				trigger($menuItem, 'close')
// 			// })
// 		} else {
// 			trigger($menuItem, 'open')
// 			// slideDown($submenu, 200)
// 		}
// 	})

// })

// function closeRestItems($element) {
// 	$menuItems.forEach($menuItem => {
// 		if ($menuItem !== $element ) {
// 			trigger($menuItem, 'close')
// 		}
// 	})
// }

// // event outer click
// document.addEventListener('mousedown', e => {
// 	if (
// 		!e.target.closest('.NavMain__items')
// 	){
// 		$menuItems.forEach($menuItem => {
// 			trigger($menuItem, 'close')
// 		})
// 	}
// })
