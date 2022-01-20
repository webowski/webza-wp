export const getHeight = (element) => {
	let height = element.scrollHeight + 'px'
	return height
}

export const isElementReached = (el, offsetY) {
	let top = el.offsetTop
	let height = el.offsetHeight
	let bottom = top + height
	let offsetY = offsetY || 0
	let pointY = window.pageYOffset + offsetY

	while(el.offsetParent) {
		el = el.offsetParent
		top += el.offsetTop
	}

	return top < pointY && bottom > pointY
}
