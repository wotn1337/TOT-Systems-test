import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {useState} from "react";


function App() {
	const [searchPreview, setSearchPreview] = useState('')

	return (
		<>
			<Header searchPreview={searchPreview} setSearchPreview={setSearchPreview}/>
			<Main searchPreview={searchPreview} setSearchPreview={setSearchPreview}/>
		</>
	)
}

export default App
