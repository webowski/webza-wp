import { query, queryAll } from '../helpers/Common'


// Overlay
// =======================
var siteOverlay = query('.SiteOverlay')
var headerOverlay = query('.SiteHeader__overlay')

export function showOverlay(overlay) {
	if (overlay == 'header') overlay = headerOverlay
	else overlay = siteOverlay

	return overlay.classList.add('is-shown')
}

export function hideOverlay(overlay) {
	if (overlay == 'header') overlay = headerOverlay
	else overlay = siteOverlay

	return overlay.classList.remove('is-shown')
}
