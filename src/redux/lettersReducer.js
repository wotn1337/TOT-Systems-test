const READ_LETTER = 'letters/READ_LETTER'
const DELETE_LETTER = 'letters/DELETE_LETTER'
const ADD_TAG = 'letters/ADD_TAG'

const initState = {
	letters: {
		0: {
			author: 'Артём Белов',
			preview: 'Тестовое задание для TOT Systems',
			date: new Date(),
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			id: 0,
			read: false,
			tags: []
		},
		1: {
			author: 'Franklin Sampson',
			preview: '1323232323232323',
			date: new Date(),
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			id: 1,
			read: false,
			tags: []
		},
		2: {
			"id": 2,
			"author": "Meghan Anthony",
			"preview": "Lorem ipsum dolor sit amet",
			"content": "Anim labore consequat minim et. Aute laborum id aliquip enim est et aute et enim aliquip mollit sunt ea. Cupidatat Lorem laboris et minim ipsum eu exercitation officia proident irure. Veniam consectetur anim officia et ipsum magna aliqua culpa irure occaecat est magna. Ad nisi ipsum ea ullamco nisi adipisicing et aute ipsum.\r\n",
			"date": new Date(),
			read: false,
			tags: []
		},
		3: {
			"id": 3,
			"author": "Agnes Lancaster",
			"preview": "Какая-то тема сообщения",
			"content": "Duis minim aute nostrud aliquip id. Labore Lorem adipisicing adipisicing amet ipsum. Ut culpa culpa commodo officia deserunt ut ipsum. Ut sint eu cupidatat tempor minim dolor culpa mollit incididunt magna.\r\n",
			"date": new Date(),
			read: false,
			tags: []
		},
		4: {
			"id": 4,
			"author": "Stella Reyes",
			"preview": "__0101010__",
			"content": "Qui esse esse nulla quis. Culpa elit ea tempor labore voluptate mollit ullamco commodo. Ea nulla pariatur adipisicing pariatur dolor ullamco. Sint ullamco labore eu tempor aliqua magna reprehenderit qui enim.\r\n",
			"date": new Date(),
			read: false,
			tags: []
		},
		5: {
			"id": 5,
			"author": "Rachael Lawson",
			"preview": "english",
			"content": "Sunt veniam laboris labore deserunt ipsum aute aute dolore ea ullamco commodo eu elit proident. Esse est ad amet occaecat id irure pariatur id. Culpa amet velit adipisicing nisi mollit sunt incididunt officia eu pariatur.\r\n",
			"date": new Date(),
			read: false,
			tags: []
		},
		6: {
			"id": 6,
			"author": "Angela Woodward",
			"preview": "Тест_1",
			"content": "Culpa ut adipisicing nulla eiusmod deserunt fugiat occaecat ullamco aute adipisicing deserunt aliqua excepteur. Culpa aliquip non sint veniam deserunt enim dolore aute reprehenderit non elit ut commodo consequat. Minim excepteur sunt ea consectetur ut cillum id. Ullamco aliqua adipisicing enim tempor ut anim consequat enim consectetur dolor proident. Sunt do laborum incididunt labore incididunt dolore officia ut ex labore minim sint reprehenderit. Fugiat ea minim enim ex enim do cupidatat ut irure esse amet velit. Proident fugiat reprehenderit ex consectetur commodo.\r\n",
			"date": new Date(),
			read: false,
			tags: []
		}
	}
}

const lettersReducer = (state = initState, action) => {
	switch (action.type) {
		case READ_LETTER:
			return {
				...state,
				letters: {
					...state.letters,
					[action.id]: {
						...state.letters[action.id],
						read: true
					}
				}
			}

		case DELETE_LETTER:
			const newLetters = {...state.letters}
			delete newLetters[action.id]
			return {
				...state,
				letters: newLetters
			}

		case ADD_TAG:
			return {
				...state,
				letters: {
					...state.letters,
					[action.letterId]: {
						...state.letters[action.letterId],
						tags: [...state.letters[action.letterId].tags, action.tag]
					}
				}
			}

		default:
			return state
	}
}

export const readLetter = (id) => ({type: READ_LETTER, id})
export const deleteLetter = (id) => ({type: DELETE_LETTER, id})
export const addTag = (tag, letterId) => ({type: ADD_TAG, tag, letterId})


export default lettersReducer