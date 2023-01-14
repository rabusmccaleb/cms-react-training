import { useState, useContext, useEffect } from 'react';
import styles from '../../styles/Favorites.module.css'
import FavoritesComics from './FavoritesComics';
import { context } from '../../Importables/ComicContext';
import { dynamicDataModel } from '../../Importables/Model/DynamicDataModel';

const Favorites = () => {
	const [ favoriteData, setfavoriteData ] = useState<any[] | any>([])
	const { favoritesList } = useContext(context);

	useEffect(()=>{
		if (localStorage && localStorage.getItem('session')) {
			const parsedFavoritesList = JSON.parse(localStorage.getItem('session')!);
			if (Array.isArray(parsedFavoritesList)) {
				setfavoriteData((value : any) => { return parsedFavoritesList; })
			}
		}
	}, [ favoritesList ])

	return (
		<aside>
			<ul className={ styles.favoritesContainer } role='list'>
				<label className={ styles.favoritesTitle } role='columnheader'>Favorites</label>
				{
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
				}
				{ favoriteData.length === 0 && <label className={ styles.NoFavoritesPrompt }>No Favorite Selected...</label> }
			</ul>
		</aside>
	)
}

export default Favorites;

