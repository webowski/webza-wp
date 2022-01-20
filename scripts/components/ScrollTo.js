let headerHeight = document.querySelector('.Header').offsetHeight
let scrollOffset = headerHeight
let shift = 20

initScrollTo()

export function initScrollTo() {
	let links = document.querySelectorAll('.do-scrollTo, .ArticleIndex a[href^="#"]')
	links.forEach( each => {
		each.onclick = scrollAnchors
	})
}

function scrollAnchors(e, respond = null) {
	e.preventDefault()
	let distanceToTop = el => {
		return Math.floor(el.getBoundingClientRect().top)
	}
	let targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href')

	let targetAnchor = document.querySelector(targetID)
	if (!targetAnchor) return

	let originalTop = -scrollOffset - shift + distanceToTop(targetAnchor)

	window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' })

	let checkIfDone = setInterval( () => {
		let atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
		if (distanceToTop(targetAnchor) === scrollOffset || atBottom) {
			// targetAnchor.tabIndex = '-1'
			// targetAnchor.focus()
			window.history.pushState('', '', targetID)
			clearInterval(checkIfDone)
		}
	}, 100)
}
