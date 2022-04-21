import {v1 as uuid} from 'uuid'

const CREATE_NEW_FOLDER = 'folders/CREATE_NEW_FOLDER'
const DELETE_FOLDER = 'folders/DELETE_FOLDER'
const UPDATE_FOLDER = 'folders/UPDATE_FOLDER'
const MOVE_LETTERS = 'folders/MOVE_LETTERS'
const DELETE_LETTER = 'folders/DELETE_LETTER'

const initState = {
	folders: {
		inbox: {
			name: 'Входящие',
			lettersIds: [0, 4]
		},
		sent: {
			name: 'Отправленные',
			lettersIds: [1]
		},
		draft: {
			name: 'Черновики',
			lettersIds: [5, 6]
		},
		deleted: {
			name: 'Корзина',
			lettersIds: []
		},
		spam: {
			name: 'Спам',
			lettersIds: [2, 3]
		},
		all: {
			name: 'Вся почта',
			lettersIds: [0, 1, 2, 3, 4, 5, 6]
		}
	}
}

const foldersReducer = (state = initState, action) => {
	switch (action.type) {
		case CREATE_NEW_FOLDER:
			const id = uuid()
			return {
				...state,
				folders: {
					...state.folders,
					[id]: {
						id,
						name: action.name,
						lettersIds: [],
						custom: true
					}
				}
			}

		case DELETE_FOLDER:
			const newFolders = {...state.folders}
			delete newFolders[action.id]
			return {
				...state,
				folders: newFolders
			}

		case UPDATE_FOLDER:
			const folder = {...state.folders[action.id]}

			return {
				...state,
				folders: {
					...state.folders,
					[action.id]: {
						...folder,
						name: action.name
					}
				}
			}

		case MOVE_LETTERS:
			return {
				...state,
				folders: {
					...state.folders,
					[action.from]: {
						...state.folders[action.from],
						lettersIds: state.folders[action.from].lettersIds.filter(id => !action.lettersIds.includes(id))
					},
					[action.to]: {
						...state.folders[action.to],
						lettersIds: [...state.folders[action.to].lettersIds, ...action.lettersIds]
					}
				}
			}

		case DELETE_LETTER: {
			const newFolders = {...state.folders}
			for (const folder in newFolders) {
				newFolders[folder] = {
					...newFolders[folder],
					lettersIds: newFolders[folder].lettersIds.filter(id => id !== action.id)
				}
			}

			return {
				...state,
				folders: newFolders
			}
		}

		default:
			return state
	}
}

export const createNewFolder = (name) => ({type: CREATE_NEW_FOLDER, name})
export const deleteFolder = (id) => ({type: DELETE_FOLDER, id})
export const updateFolder = (id, name) => ({type: UPDATE_FOLDER, id, name})
export const moveLetters = (lettersIds, from, to) => ({type: MOVE_LETTERS, from, to, lettersIds})
export const deleteLetterFromFolders = (id) => ({type: DELETE_LETTER, id})

export default foldersReducer