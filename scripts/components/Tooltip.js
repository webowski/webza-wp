import { createPopper } from '@popperjs/core';

let tooltipSet = document.querySelectorAll('.Tooltip')

tooltipSet.forEach((tooltip) => {
	let placement = tooltip.dataset.popperPlacement
	let target

	if (!tooltip.dataset.target || tooltip.dataset.target === 'parent') {
		target = tooltip.parentNode
	} else {
		target = document.querySelector(tooltip.dataset.target)
	}

	let instance = createPopper(target, tooltip, {
		placement: placement,
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 8],
				},
			},
			{
				name: 'computeStyles',
				options: {
					adaptive: false,
				},
			},
    	],
	})

	let showEvents = ['mouseenter', 'focus']
	let hideEvents = ['mouseleave', 'blur']

	showEvents.forEach(event => {
		target.addEventListener(event, () => {
			tooltip.setAttribute('data-show', '')
		})
	})

	hideEvents.forEach(event => {
		target.addEventListener(event, () => {
			setTimeout(() => {
				tooltip.removeAttribute('data-show')
			}, 2400)
		})
	})

	// console.log( instance );

	// document.addEventListener('DOMContentLoaded', function() {
	// 	instance.show();
	// })
})
