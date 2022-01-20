import { isMobile } from '../helpers/Common'
import { trigger } from '../helpers/Event'
import { slideUp, slideDown, slideToggle } from '../helpers/Slide'
import { showOverlay, hideOverlay } from '../components/Overlay'


// User dropdown
// =======================
let userDropdown = document.body.querySelector('.UserDropdown')

if (userDropdown) {

	let userDropdownBtn = userDropdown.querySelectorAll('.UserDropdown__button, .UserDropdown__close')
	let userDropdownBody = userDropdown.querySelector('.UserDropdown__body')

	userDropdown.addEventListener('open', e => {
		userDropdown.classList.add('is-open')
		if (isMobile) {
			document.body.classList.add('g-noScroll')
		} else {
			showOverlay('header')
		}
	})

	userDropdown.addEventListener('close', e => {
		userDropdown.classList.remove('is-open')
		if (isMobile) {
			document.body.classList.remove('g-noScroll')
		} else {
			hideOverlay('header')
		}
	})

	userDropdownBtn.forEach((element) => {
		element.addEventListener('click', e => {
			if (userDropdown.classList.contains('is-open')) {
				trigger(userDropdown, 'close')
			} else {
				trigger(userDropdown, 'open')
			}
		})
	})

	document.body.addEventListener('click', e => {
		if (
			userDropdown.classList.contains('is-open') &&
			!e.target.closest('.UserDropdown') &&
			!e.target.classList.contains('UserDropdown__button')
		){
			trigger(userDropdown, 'close')
		}
	})
}
