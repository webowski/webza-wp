// querySelector shortcodes
// =========================

export const query = (selector, parent) => {
	return (parent ? parent : document.body).querySelector(selector)
}

export const queryAll = (selector, parent) => {
	return (parent ? parent : document.body).querySelectorAll(selector)
}


// Detect device
// =========================
export const isMobile = !!(query('.g-mobile'))
