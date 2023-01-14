import React , {useState, useContext, useEffect } from 'react';
import { context } from '../../Importables/ComicContext';
import { Item } from '../../Importables/Model/DynamicDataModel';
import styles from '../../styles/Comic.module.css';
import Image from 'next/image';
import { DateObjs } from '../../Importables/Model/DynamicDataModel';
import ComicDetail from './ComicDetail';
import ComicInfoContainer from './ComicSubComponents/ComicInfoContainer';
import ComicButton from './ComicSubComponents/ComicButton';
import { useSpring, animated, config } from '@react-spring/web';

interface Prop  {
	id : string,
	title? : string
	href : string,
	thumbnail? : string,
	issueNumber? : string,
	publishDate? : DateObjs[],
	creators : Item[],
	description: string,
}

const Comic = ({id, thumbnail, title, href, issueNumber, publishDate, creators, description} : Prop) => {
	const creatorsListNames = creators ? creators.map((creator : Item) => creator.name) : [];
	const creatorsList = creatorsListNames.filter((item : string, index: number) => index < 3);
	const [isAddedToFavorites, setIsAddedToFavorites] = useState<boolean>(false)
	const { updateFavoritesList, popUpMessageVal, updateBlurView, favoritesList } = useContext(context);
	const comicDetail = <ComicDetail id={id} thumbnail={thumbnail} title={title} href={href} issueNumber={issueNumber} publishDate={publishDate} creatorsList={creatorsList} description={description}/>;
	let date : string | undefined;
	if (publishDate && publishDate.length) {
		const dates = publishDate.filter(item => item.type === 'focDate');
		if (dates.length) {
			const isoDate = new Date(dates[0].date);
			const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
			date = `${months[isoDate.getMonth()] } ${ isoDate.getUTCDay()}, ${ isoDate.getFullYear()}`;
			date = months[isoDate.getMonth()] ? date : undefined;
		}
	}

	function updateFavorites() {
		if (isAddedToFavorites) {
			removeDataFromLocalStorage();
		} else {
			SaveDataToLocalStorage({ 
				id : id, 
				thumbnail : thumbnail, 
				title : title, 
				issueNumber : issueNumber, 
			});
		}
	}

	function SaveDataToLocalStorage(data : any) {
		let storageList = [];
		storageList = JSON.parse(localStorage.getItem('session')!) || [];
		if (Array.isArray(storageList) && storageList.length < 10) {
			storageList.push(data);
			const stringiyiedStorageList = JSON.stringify(storageList);
			localStorage.setItem('session', stringiyiedStorageList);
			setIsAddedToFavorites(val => { return true; });
			updateFavoritesList(stringiyiedStorageList);
		} else if (Array.isArray(storageList)) {
			popUpMessageVal('You have already selected 10 favorite comics. In order to add more you must remove some to make space.', 5000);
		} else {
			if (data && data.title) {
				popUpMessageVal(`There seems to be an error while attempting to add ${data.title} to your favorites list.`);
			} else {
				popUpMessageVal(`There seems to be an error while attempting to add that comic to your favorites list.`);
			}
		}
	}
	
	function removeDataFromLocalStorage() {
		if (localStorage.getItem('session')) {
			let localStorageData = JSON.parse(localStorage.getItem('session')!) || [];
			if (localStorageData.length) {
				localStorageData = localStorageData.filter((item : any) => item.id !== id);
				const stringiyiedStorageList = JSON.stringify(localStorageData);
				localStorage.setItem('session', stringiyiedStorageList);
				setIsAddedToFavorites(val => { return false; });
				updateFavoritesList(stringiyiedStorageList);
			}
		}
	}
	
	function getDataFromLocalStorage() {
		if (localStorage.getItem('session')) {
			let localStorageData = JSON.parse(localStorage.getItem('session')!) || [];
			if (localStorageData.length) {
				let includesComic = false;
				for(let x = 0; x < localStorageData.length; x++) {
					if (id === localStorageData[x].id) {
						includesComic = true;
					}
				}
				setIsAddedToFavorites(includesComic);
			} else {
				setIsAddedToFavorites(false);
			}
		}
	}

	useEffect(()=>{
		getDataFromLocalStorage()
	}, [favoritesList])

	return(
		<div className={ styles.comicConatiner } id={ id } role="contentinfo">
			{ thumbnail && title ? <Image alt={ title! } src={ thumbnail! } width={ 158 } height={ 263 } className={ styles.comicThumbnail } onClick={ () => { updateBlurView(comicDetail); } }/> : <></> }
			<ComicButton isAddedToFavorites={ isAddedToFavorites } updateFavorites={ updateFavorites }/>
			<ComicInfoContainer creatorsList={ creatorsList } href={ href } issueNumber={ issueNumber } title={ title } date={ date }/>
		</div>
	)
}

export default Comic;