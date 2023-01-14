
import { useContext } from "react";
import Image from 'next/image';
import styles from '../../styles/FavoritesComics.module.css';
import { context } from '../../Importables/ComicContext';
import { dynamicDataModel } from "../../Importables/Model/DynamicDataModel";

interface Prop {
	id : string,
	title? : string
	href? : string,
	thumbnail? : string,
	issueNumber? : string,
}

const FavoritesComics = ({ id, thumbnail, title, issueNumber } : Prop) => {
	const { updateFavoritesList } = useContext(context);
	function removeDataFromLocalStorage() {
		if (localStorage.getItem('session')) {
			let localStorageData = JSON.parse(localStorage.getItem('session')!) || [];
			if (localStorageData.length) {
				localStorageData = localStorageData.filter((item : dynamicDataModel) => `${item.id}` !== id);
				const stringiyiedStorageList = JSON.stringify(localStorageData);
				localStorage.setItem('session', stringiyiedStorageList);
				updateFavoritesList(stringiyiedStorageList);
			}
		}
	}

	return(
		<div className={ styles.HStack }>
			<div className={ styles.removeButtonContainer }>
				<button className={ styles.removeButton } onClick={ () => { removeDataFromLocalStorage(); } } aria-label={ `Remove button for removing comic with title of ${title}.` } >x</button>
			</div>
			{ thumbnail && title ? <Image alt={ title! } src={ thumbnail! } width={ 158 } height={ 263 } className={ styles.thumbnail }/> : <></> }
			<div className={ styles.VStack }>
				<label className={ styles.title }>{ title }</label>
				<label className={ styles.issueNumber }>Issue: { issueNumber }</label>
			</div>
		</div>
	)
}

export default FavoritesComics;