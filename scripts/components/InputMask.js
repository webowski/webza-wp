import Cleave from 'cleave.js'


let phoneCodes = [
	{
		code: '380',
		country: 'ua',
		blocks: [ 0, 3, 2, 3, 4],
	}, {
		code: '7',
		country: 'ru',
		blocks: [ 0, 1, 3, 3, 4],
	}, {
		code: '375',
		country: 'by',
		blocks: [ 0, 3, 2, 3, 4],
	}, {
		code: '1',
		country: 'us',
		blocks: [ 0, 1, 3, 3, 4],
	}
]

let inputMaskSet = document.querySelectorAll('input.do-inputmask')

inputMaskSet.forEach((inputMask) => {

	let cleave = new Cleave('.do-inputmask', {
		delimiters: ["+", " (", ") ", " ", "-"],
		blocks: [ 0, 3, 2, 3, 4],
		numericOnly: true,
		backspace: true,
		delimiterLazyShow: true,
		noImmediatePrefix: true,
		onValueChanged: (input) => {
			// console.log( cleave.properties.blocks );
			let matched = false;

			phoneCodes.forEach((phoneCode) => {
				let digitsMatched = 0;
				for (let i = 1; i <= phoneCode.code.length; i++) {
					// console.log( 'raw' + i, input.target.rawValue[i - 1], ' code' + i, phoneCode.code[i-1]);
					if (input.target.rawValue[i-1] != phoneCode.code[i-1]) {
						// console.log( typeof input.target.rawValue );
						break;
					} else {
						// console.log( typeof input.target.rawValue );
						digitsMatched++
					}
				}

				// console.log( 'digitsMatched', digitsMatched, 'length', phoneCode.code.length);

				if (phoneCode.code.length == digitsMatched) {
					// console.log( phoneCode.country );
					matched = true;
					return cleave.properties.blocks = phoneCode.blocks
				}
			})

			if (!matched) cleave.properties.blocks = [ 0, 3, 3, 3, 4]
		}
	});	
})
