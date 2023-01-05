import { useState, useContext, useEffect } from 'react';
import styles from '../../styles/FavoritesMobileDropDown.module.css';
import FavoritesComics from './FavoritesComics';
import { context } from '../../Importables/ComicContext';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dynamicDataModel } from '../../Importables/Model/DynamicDataModel';

interface Props {
	dropDownButtonText : string;
	updateButtonText : () => void;
}

const FavoritesMobileDropDown = ({ dropDownButtonText, updateButtonText } : Props) => {
	const [ favoriteData, setfavoriteData ] = useState<any[] | any>([])
	const { favoritesList } = useContext(context);

	useEffect(()=>{
		const parsedFavoritesList = JSON.parse(localStorage.getItem('session')!);
		if (Array.isArray(parsedFavoritesList)) {
			let savedContentList = filteredDuplicatesList(parsedFavoritesList);
			setfavoriteData((value : any) => {return savedContentList;})
		}
	}, [ favoritesList ])

	function filteredDuplicatesList(list : dynamicDataModel[]): any[] {
		let object = {};
		let array : any[]= [];
		list.forEach(item => {
			//@ts-ignore
			object[`${item.id}`] = item;
		})

		let keyList = Object.keys(object);
		keyList.forEach(key => {
			//@ts-ignore
			array.push(object[`${key}`]);
		})
		return array;
	}

	return (
		<div className={ styles.favoritesMobileContainer }>
			<label className={ styles.favoritesMobileTitle }>Favorites</label>
			{ favoriteData.length > 0 ?
				favoriteData.map((item : dynamicDataModel) => {
					return (
						<li role='listitem' key={ `${item.id}` }>
							<FavoritesComics
								id={ `${item.id}` }
								thumbnail={ `${item.thumbnail}` }
								title={ item.title }
								issueNumber={ `${item.issueNumber}` }
							/>
						</li>
					)
				})
				:
				<label className={ styles.NoFavoritesPrompt }>No Favorite Selected...</label>
			}
			<button className={ styles.closeDropDownButton } onClick={ () => { updateButtonText() } }>
				<label className={ styles.favoritesButtonTitle }>{ dropDownButtonText }</label>
				<FontAwesomeIcon className={ styles.favoritesMobileIcon } icon={ faBoltLightning }  style={ { width : '10px', height : '16px', color : '#F8F8F2' } } />
			</button>
		</div>
	)
}

export default FavoritesMobileDropDown;
