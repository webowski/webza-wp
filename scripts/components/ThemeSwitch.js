
document.addEventListener('DOMContentLoaded', function() {

	let themeSwitch = document.querySelector('.ThemeSwitch')

	if (themeSwitch) {
		const currentTheme = localStorage.getItem('theme')
		let checkbox = themeSwitch.querySelector('input')

		if (currentTheme) {
			document.documentElement.setAttribute('data-theme', currentTheme)

			if (currentTheme === 'dark') {
				themeSwitch.classList.add('is-switched')
				checkbox.checked = true
			}
		}

		themeSwitch.addEventListener('click', e => {
			// e.preventDefault()
			console.log( themeSwitch );

			if (themeSwitch.classList.contains('is-switched')) {
				document.documentElement.setAttribute('data-theme', 'light')
				localStorage.setItem('theme', 'light')
				themeSwitch.classList.remove('is-switched')
				checkbox.checked = false
			} else {
				document.documentElement.setAttribute('data-theme', 'dark')
				localStorage.setItem('theme', 'dark')
				themeSwitch.classList.add('is-switched')
				checkbox.checked = true
			}
		}, false)
	}
})
