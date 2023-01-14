import { useState } from 'react';
import styles from '../../styles/CategoryController.module.css';
import Select from './Select';
import { requestCategory } from '../../Importables/CustomHooks';
import { faBoltLightning , faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoritesMobileDropDown from './FavoritesMobileDropDown';
import { useSpring, animated } from '@react-spring/web';

interface Props {
	updateComics : (val? : string, type? : requestCategory, reseting? : boolean , comicsObj? : { character : string, creator : string }) => void;
}

const characterOptions = [
	{ name : "Select A Character", id: '' },
	{ name : "Iron Man", id: 1009368 },
	{ name : "Captain America", id: 1009220 },
	{ name : "Thor", id: 1009664 },
	{ name : "Deadpool", id: 1009268 },
	{ name : "Scarlet Witch", id: 1009562 },
	{ name : "Black Widow", id: 1009189 },
	{ name : "Wasp", id : 1009707 },
	{ name : "Gamora", id: 1010763 }
];

const creatorOptions = [
	{ name : "Select A Creator", id: '' },
	{ name : "Kate Leth", id: 12787 },
	{ name : "Brian Michael Bendis", id: 24 },
	{ name : "Stan Lee", id : 30 },
	{ name : "Steve Ditko", id : 32 },
	{ name : "Jack Kirby", id : 196 }
];

let requestObj = { 'character' : '', 'creator' : '' };

const CategoryController = ({updateComics}: Props) => {
	const [ shouldShowCategrories, setShouldShowCategrories ] = useState<boolean>(false);
	const [ shouldShowFavorites, setShouldShowFavorites ] = useState<boolean>(false);

	function mobileShowFavorites () {
		setShouldShowFavorites(bool => { return !bool; });
		setShouldShowCategrories(bool => { return false; })
	}

	function mobileShowCategories () {
		setShouldShowCategrories(bool => { return !bool; });
		setShouldShowFavorites(bool => { return false; })
	}

	function selectedElement(id : string, idSelected : string) {
		const element = document.querySelector(`select#${id}`);
		if (element) {
			//@ts-ignore
			element.value = idSelected;
		}
	}

	const navLoadAnimation = useSpring({
		opacity : shouldShowFavorites ? 1.0 : 0.0,
		overflow : shouldShowFavorites ? 'visible' : 'hidden',
	});

	return (
		<div className={styles.controlsContianer}>
				<animated.div className={styles.favoritesMobileDropDown} style={navLoadAnimation}>
						<FavoritesMobileDropDown dropDownButtonText={shouldShowFavorites ?	'Hide Favorites' : 'Show Favorites'} updateButtonText={mobileShowFavorites} />
				</animated.div>
				<div className={styles.desktopControls}>
						<label className={styles.controlsLabel}>Filter by: </label>
						<Select isDesktop={true} characterOptions={characterOptions} creatorOptions={creatorOptions} requestObj={requestObj} updateComics={updateComics} selectedElement={selectedElement}/>
				</div>
				<button className={styles.mobileFilterButton} onClick={() => {
					mobileShowCategories()
				}}>
					<label className={styles.mobileControlsLabel}>Filter </label>
					<FontAwesomeIcon className={styles.favoritesMobileIcon} icon={faFilter}	style={{width : '10px', height : '16px', color : '#F8F8F2'}}/>
				</button>
				<div className={styles.mobileFilterControls} style={{
					height : shouldShowCategrories ? '100%' : 0,
					overflow : shouldShowCategrories ? 'visible' : 'hidden',
				}}>
					<Select isDesktop={false} characterOptions={characterOptions} creatorOptions={creatorOptions} requestObj={requestObj} updateComics={updateComics} selectedElement={selectedElement}/>
				</div>
				<div className={styles.favoritesMobileDropDownContianer}>
						<button className={styles.favoritesMobileInfo} onClick={() => {
							mobileShowFavorites();
						}}>
						<label className={styles.favoritesMobileTitle}>{shouldShowFavorites ?	'Hide Favorites' : 'Show Favorites'} <FontAwesomeIcon className={styles.favoritesMobileIcon} icon={faBoltLightning}	style={{width : '10px', height : '16px', color : '#F8F8F2'}}/></label>
					</button>
				</div>
		</div>
	)
}

export default CategoryController;