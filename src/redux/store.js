import {combineReducers, createStore} from "redux";
import foldersReducer from "./foldersReducer";
import lettersReducer from "./lettersReducer";


const reducers = combineReducers({
	foldersState: foldersReducer,
	lettersState: lettersReducer
});

const store = createStore(reducers)

export default store;