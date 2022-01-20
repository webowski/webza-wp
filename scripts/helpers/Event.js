// Events helpers
// ========================

// Custom events
let customEvents = {
	open: new Event('open'),
	close: new Event('close'),
}

// element - DOM Element
// event - String
export const trigger = (element, event) => {
	element.dispatchEvent(customEvents[event])
}
