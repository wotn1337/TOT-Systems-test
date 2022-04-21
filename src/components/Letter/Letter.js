import React, {useEffect} from 'react'
import s from './Letter.module.css'
import {useParams} from "react-router-dom";
import {getDateString} from "../../common/helpers";
import {connect} from "react-redux";
import {addTag, readLetter} from "../../redux/lettersReducer";
import Tippy from "@tippyjs/react";


const Letter = ({letters, readLetter, addTag}) => {
	const {id} = useParams()
	const {preview, author, content, date, tags} = letters[id]

	useEffect(() => {
		readLetter(id)
	}, [])

	return (
		<div>
			<section className={s.letter}>
				<div className={s.letter__header__wrapper}>
					<h2 className={s.preview}>{preview}</h2>
					<Tippy
						content={<TagsList addTag={addTag} id={id} letterTags={tags}/>}
						trigger='click'
					    interactive={true}
						placement='bottom'
					>
						<button className='btn'>Добавить метку</button>
					</Tippy>
					<Tags tags={tags} id={id}/>
				</div>
				<div className={s.author__wrapper}>
					<h3 className={s.author}>{author}</h3>
					<time>{getDateString(date)}</time>
				</div>
				<div className={s.content}>{content}</div>
			</section>
		</div>
	)
}

const TagsList = ({addTag, id, letterTags}) => {
	const tags = ['Работа', 'Учеба', 'Срочно', 'Выполнено'].filter(tag => !letterTags.includes(tag))
	return (
		<div className='dropDown'>
			<ul className='dropDown__list'>
				{tags.map(tag => {
					return <li
						className='dropDown__item'
						key={tag}
						onClick={() => addTag(tag, id)}
					>{tag}</li>
				})}
			</ul>
		</div>
	)
}

const Tags = ({tags}) => {
	return (
		<div className={s.tags}>
			{tags.map(tag => (
				<div className={s.tag} key={tag}>{tag}</div>
			))}
		</div>
	)
}

const mapStateToProps = state => ({
	letters: state.lettersState.letters,
})

export default connect(mapStateToProps, {readLetter, addTag})(Letter)