import { isMobile } from '../helpers/Common'

// =========================
//  Form fields
// ---------------
export const initFormFields = formFields => {

	formFields.forEach( formField => {
		let input = formField.querySelector('.FormInput')
		let label = formField.querySelector('.FormLabel')

		input.addEventListener('focusin', () => {
			formField.classList.add('has-focus')
		})

		input.addEventListener('focusout', () => {
			formField.classList.remove('has-focus')

			if (input.value) {
				formField.classList.add('has-value')
			} else {
				formField.classList.remove('has-value')
			}
		})

	})
}

let formFields = document.body.querySelectorAll('.FormField')

initFormFields(formFields)
