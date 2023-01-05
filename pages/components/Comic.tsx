import React , {useState, useContext, useEffect } from 'react';
import { context } from '../../Importables/ComicContext';
import { Item } from '../../Importables/Model/DynamicDataModel';
import styles from '../../styles/Comic.module.css';
import Image from 'next/image';
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateObjs } from '../../Importables/Model/DynamicDataModel';
import ComicDetail from './ComicDetail';

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
			date = `${months[isoDate.getMonth()] } ${ isoDate.getDay() }, ${ isoDate.getFullYear()}`;
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
			<div className={ styles.comicButtonContainer }>
				<button className={ `${styles.comicButton} buttonHover` } style={{
						backgroundColor: isAddedToFavorites ? '#C24868' : 'black',
						boxShadow: isAddedToFavorites ? '0 0 0 2px #f8f8f2' : 'unset',
						display : 'grid',
						placeItems : 'center',
					}} onClick={() => {
						updateFavorites()
					}}>
					<FontAwesomeIcon icon={ faBoltLightning }  style={ { width : '10px', height : '16px', color : '#F8F8F2' } } />
				</button>
			</div>
			<div className={ styles.infoContainer }>
				<h4 className={ styles.comicTitle } data-testid='comicTitle' role=''>
					<a href={ href }>{ title }</a>
				</h4>
				{ (issueNumber && issueNumber.trim() !== '') &&
					<div className={ `${styles.comicLabelContainers} ${styles.comicLabelContainersIssue}` }>
						<label className={ styles.comicLabelTitle }>Issue Number : </label>
						<label>{ `${issueNumber}` }</label>
					</div>
				}
				{ date &&
					<div className={ styles.comicLabelContainers }>
						<label className={ styles.comicLabelTitle }>Published : </label>
						<label>{ `${date}` }</label>
					</div>
				}
				{ (creatorsList && creatorsList.length > 0) &&
					<div className={ `${styles.comicLabelContainers} ${styles.creators}` }>
						<label className={ styles.comicLabelTitle }>Creators : </label> 
						<label>{ `${creatorsList.join(', ')}` }</label>
					</div>
				}
			</div>
		</div>
	)
}

export default Comic;