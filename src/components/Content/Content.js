import React, {useEffect, useState} from 'react'
import s from './Content.module.css'
import {connect} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {getDateString} from "../../common/helpers";
import Tippy from "@tippyjs/react";
import {deleteLetterFromFolders, moveLetters} from "../../redux/foldersReducer";
import {deleteLetter, readLetter} from "../../redux/lettersReducer";


const Content = ({letters, folders, searchPreview, setSearchPreview, readLetter, deleteLetter, deleteLetterFromFolders, ...props}) => {
	const {folder} = useParams()
	const [lettersIdsState, setLettersIdsState] = useState(folders[folder].lettersIds)
	const [chosenLettersIds, setChosenLettersIds] = useState([])

	const chooseLetter = (id) => {
		setChosenLettersIds([...chosenLettersIds, id])
	}

	const dechooseLetter = (id) => {
		setChosenLettersIds(chosenLettersIds.filter(cId => cId !== id))
	}

	const moveLetters = (lettersIds, from, to) => {
		props.moveLetters(lettersIds, from, to)
		setLettersIdsState(lettersIdsState.filter(id => !lettersIds.includes(id)))
		setChosenLettersIds([])
	}

	const readChosenLetters = () => {
		chosenLettersIds.forEach(id => readLetter(id))
		setChosenLettersIds([])
	}

	const deleteChosenLetters = () => {
		chosenLettersIds.forEach(id => {
			deleteLetterFromFolders(id)
			deleteLetter(id)
		})
		setLettersIdsState(lettersIdsState.filter(id => !chosenLettersIds.includes(id)))
		setChosenLettersIds([])
	}

	useEffect(() => {
		const ids = folders[folder].lettersIds
		setLettersIdsState(
			ids.filter(id => letters[id].preview.toLowerCase().includes(searchPreview.toLowerCase()))
		)
	}, [searchPreview])

	useEffect(() => {
		setLettersIdsState(folders[folder].lettersIds)
		setSearchPreview('')
	}, [folder])

	return (
		<section className={s.table}>
			<div className={s.table__row}>
				<div className={s.head__cell}/>
				<span className={s.head__cell}>Автор</span>
				<span className={s.head__cell}>Тема</span>
				<div className={s.head__cell}/>
				<div className={s.head__cell}/>
				<span className={s.head__cell}>Дата</span>
			</div>
			{lettersIdsState.length
				? lettersIdsState.map(id => (
					<LetterRow
						letter={letters[id]}
						folder={folder}
						key={id}
						isChosen={chosenLettersIds.includes(id)}
						chooseLetter={() => chooseLetter(id)}
						dechooseLetter={() => dechooseLetter(id)}
					/>
				))
				: <div className={s.table__empty}>
					{searchPreview.length
						? 'С похожей темой писем не нашлось'
						: 'В этой папке пока что нет писем'
					}
				</div>
			}
			{
				!!chosenLettersIds.length &&
				<div className={s.buttons}>
					<button className='btn' onClick={readChosenLetters}>Прочитать выбранные</button>
					<button className='btn' onClick={deleteChosenLetters}>Удалить выбранные</button>
					<Tippy
						content={
							<FoldersList
								folders={folders}
								currentFolder={folder}
								moveLetters={moveLetters}
								chosenIds={chosenLettersIds}
							/>
						}
						placement='top'
						interactive={true}
						trigger='click'
					>
						<button className='btn'>Перенести</button>
					</Tippy>
				</div>
			}
		</section>
	)
}

const LetterRow = ({letter, folder, isChosen, chooseLetter, dechooseLetter}) => {
	const handleChange = (e) => {
		e.stopPropagation()
		if (isChosen) {
			dechooseLetter()
		} else {
			chooseLetter()
		}
	}

	return (
		<NavLink to={`/${folder}/${letter.id}`} className={`${s.table__row} ${s.letter}`}>
			<div className={`${s.table__cell}`}>
				<input
					className={s.check}
					type="checkbox"
					value={isChosen}
					onClick={e => handleChange(e)}
				/>
			</div>
			<span className={`${s.table__cell} ${s.letter__author}`}>{letter.author}</span>
			<span className={`${s.table__cell} ${s.letter__preview}`}>{letter.preview}</span>
			<Tags tags={letter.tags}/>
			<div className={letter.read ? s.isRead : s.isNotRead}/>
			<span className={`${s.table__cell} ${s.letter__date}`}>{getDateString(letter.date)}</span>
		</NavLink>
	)
}

const Tags = ({tags}) => {
	return (
		<div className={s.tags}>
			{tags.map(tag => (
				<span className={s.tagFirstLetter} key={tag}>{tag[0]}</span>
			))}
		</div>
	)
}

const FoldersList = ({folders, currentFolder, moveLetters, chosenIds}) => {
	return (
		<div className='dropDown'>
			<ul className='dropDown__list'>
				{Object.keys(folders).map(folder => {
					if (folder !== currentFolder && folder !== 'all') {
						return <li
							className='dropDown__item'
							key={folder}
							onClick={() => moveLetters(chosenIds, currentFolder, folder)}
						>
							{folders[folder].name}
						</li>
					}
					return <></>
				})}
			</ul>
		</div>
	)
}

const mapStateToProps = state => ({
	letters: state.lettersState.letters,
	folders: state.foldersState.folders
})

export default connect(mapStateToProps, {
	moveLetters,
	readLetter,
	deleteLetter,
	deleteLetterFromFolders
})(Content)