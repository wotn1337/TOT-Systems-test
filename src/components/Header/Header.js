import React from 'react'
import s from './Header.module.css'


const Header = ({searchPreview, setSearchPreview}) => {

	return (
		<header className={s.header}>
			<h1 className={s.title}>Mail</h1>
			<div className={s.search}>
				<input
					type="text"
					className={`input ${s.search__input}`}
					placeholder='Тема письма'
					value={searchPreview}
					onChange={e => setSearchPreview(e.target.value)}
				/>
			</div>
		</header>
	)
}

export default Header