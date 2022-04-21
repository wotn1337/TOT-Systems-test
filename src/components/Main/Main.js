import React from 'react'
import s from './Main.module.css'
import Navbar from "../Navbar/Navbar";
import Content from "../Content/Content";
import {Route, Routes, Navigate} from "react-router-dom";
import Letter from "../Letter/Letter";


const Main = ({searchPreview, setSearchPreview}) => {
	return (
		<main className={s.main}>
			<Navbar/>
			<Routes>
				<Route path={'/:folder'} element={<Content searchPreview={searchPreview} setSearchPreview={setSearchPreview}/>}/>
				<Route path={'/:folder/:id'} element={<Letter/>}/>
				<Route path="/" element={<Navigate to="/inbox" />}/>
			</Routes>
		</main>
	)
}

export default Main