import React, {useState} from 'react'
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {createNewFolder, deleteFolder, updateFolder} from "../../redux/foldersReducer";
import {useNavigate} from "react-router";


const Navbar = ({folders, createNewFolder, deleteFolder, updateFolder}) => {
	return (
		<nav className={s.navbar}>
			<ul className={s.navbar__list}>
				{Object.keys(folders).map(folder => (
					<NavbarItem
						link={folder}
						folder={folders[folder]}
						key={folder}
						deleteFolder={deleteFolder}
						updateFolder={updateFolder}
					/>
				))}
			</ul>
			<CreatingNewFolder createNewFolder={createNewFolder}/>
		</nav>
	)
}

const NavbarItem = ({link, folder, updateFolder, ...props}) => {
	const navigate = useNavigate()
	const [deleteButton, setDeleteButton] = useState(false)
	const [editingFolderName, setEditingFolderName] = useState(false)
	const [newFolderName, setNewFolderName] = useState(folder.name)

	const editFolder = () => {
		updateFolder(link, newFolderName)
		setEditingFolderName(false)
	}

	const deleteFolder = () => {
		navigate('/inbox', {replace: true})
		props.deleteFolder(link)
	}

	return (
		<li
			className={s.list__item}
			onMouseEnter={() => setDeleteButton(true)}
			onMouseLeave={() => setDeleteButton(false)}
		>
			<NavLink
				to={`/${link}`}
				className={navData => navData.isActive ? `${s.item__link} ${s.active}` : s.item__link}
			>
				{editingFolderName
					? <input
						className={`input ${s.newName}`}
						type="text"
						value={newFolderName}
						onChange={e => setNewFolderName(e.target.value)}
						onBlur={editFolder}
						autoFocus={true}
						placeholder='Новое имя'
					/>
					: <span onDoubleClick={folder.custom && (() => setEditingFolderName(true))}>{folder.name}</span>
				}
			</NavLink>
			{deleteButton && folder.custom && <button className={s.deleteButton} onClick={deleteFolder}>X</button>}
		</li>
	)
}

const CreatingNewFolder = ({createNewFolder}) => {
	const [creatingNewFolder, setCreatingNewFolder] = useState(false)
	return (
		<>
			{
				creatingNewFolder
					? <CreatingForm createFolder={createNewFolder} toggleIsCreating={setCreatingNewFolder}/>
					: <button className={`btn ${s.createFolder}`} onClick={() => setCreatingNewFolder(true)}>Создать папку</button>
			}
		</>

	)
}

const CreatingForm = ({createFolder, toggleIsCreating}) => {
	const [folderName, setFolderName] = useState('')
	const [error, setError] = useState(false)
	const create = () => {
		if (folderName.length) {
			createFolder(folderName)
			toggleIsCreating(false)
		} else {
			setError(true)
		}
	}

	return (
		<div>
			<input
				className={`input ${s.folderName}`}
				type="text"
				placeholder='Имя папки'
				value={folderName}
				onChange={e => setFolderName(e.target.value)}
			/>
			{error && <span className={s.error}>Введите имя папки</span>}
			<button className={`btn ${s.createFolder}`} onClick={create}>Создать</button>
		</div>
	)
}

const mapStateToProps = state => ({
	folders: state.foldersState.folders,
})

export default connect(mapStateToProps, {
	createNewFolder,
	deleteFolder,
	updateFolder
})(Navbar)