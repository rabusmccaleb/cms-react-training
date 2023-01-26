import styles from '../styles/index.module.css';
import Header from './components/Header';
import HeaderPanel from './components/HeaderPanel';
import TextBox from './components/TextBox';
import CategoryController from './components/CategoryController';
import ComicContainer from './components/ComicContainer';
import IndexView from './components/IndexView';
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import { useEffect, useState, useContext } from 'react';
import { useFetchData, GetDataObject, requestCategory, secondaryCategory, returnURL } from '../Importables/CustomHooks';
import { context } from '../Importables/ComicContext';

export default function Home() {
	const { contentIndex, resetIndex } = useContext(context);
	const [ comicUrl, setComicUrl ] = useState(returnURL(requestCategory.comics, 100));
	const comicData : GetDataObject | undefined = useFetchData(comicUrl, comicUrl, setNewComics);
	const [ comics, setComics ]  = useState<any[] | undefined>(comicData?.response.data?.filter((item, index) => index < 15));

	function updateComics(val? : string, type? : requestCategory, reseting? : boolean, comicsObj? : { character : string, creator : string }) {
		if (!reseting && val && type) {
			const characterObj : secondaryCategory = {
				category : requestCategory.comics,
				conetentID : val!
			}

			if (comicsObj && (comicsObj.character.trim() === '' || comicsObj.creator.trim() === '')) {
				let newUrl = returnURL(type!, 100 , '', characterObj);
				setComicUrl(oldURL =>{
					setComics((list : any) => { return []; });
					resetIndex();
					return newUrl;
				});
			} else {
				if (comicsObj) {
					let newUrl = returnURL(requestCategory.comics!, undefined, '', characterObj, comicsObj.character, comicsObj.creator);
					setComicUrl(oldURL =>{
						setComics((list : any) => { return []; });
						resetIndex();
						return newUrl;
					});
				}
			}
		} else {
			if (!reseting && comicsObj && (comicsObj.character.trim() !== '' || comicsObj.creator.trim() !== '')) {
				let newUrl = returnURL(requestCategory.comics!, 100, '', undefined, comicsObj.character, comicsObj.creator);
				setComicUrl(oldURL =>{
					setComics((list : any) => { return []; });
					resetIndex();
					return newUrl;
				});
			} else {
				let newUrl = returnURL(requestCategory.comics, undefined, undefined, undefined, undefined);
				setComicUrl(oldURL =>{
					setComics((list : any) => { return []; });
					resetIndex();
					return newUrl;
				});
			}
		}
	}

	function setNewComics() {
		if (comicData && comicData.response && comicData.response.data && comicData.response.data.length) {
			const maxNumber : number = 15;
			let comicList : any[] = [];
			if (contentIndex <= 1) {
				for (let x = 0 ; x < (0 + maxNumber); x++) {
					if (x < comicData.response.data.length && comicData.response.data[x]) {
						comicList.push(comicData.response.data[x]);
					}
				}
				setComics(comicList);
			}
			if (contentIndex > 1) {
				if ( (contentIndex * 15) < comicData.response.data.length ) {
					for (let x = (contentIndex * 15) ; x < ((contentIndex * 15) + maxNumber); x++) {
						if (x < comicData.response.data.length && comicData.response.data[x]) {
							comicList.push(comicData.response.data[x]);
						}
					}
				} else if ((contentIndex * 15) > comicData.response.data.length) {
					const startingPosition = ((contentIndex - 1) * 15);
					for (let x = startingPosition; x < comicData.response.data.length; x++) {
						if (comicData.response.data[x]) {
							comicList.push(comicData.response.data[x]);
						}
					}
				}
				setComics(comicList);
			}
		}
	}

	function getIndexHighBound(): number {
		let indexVal;
		if (contentIndex > 1 && comicData && comicData.response && comicData.response.data) {
			indexVal = ((contentIndex * 15) + 15) < comicData.response.data.length ? (contentIndex * 15) + 15 : comicData!.response.data.length;
			return indexVal;
		} else {
			indexVal = (comicData && comicData?.response && comicData?.response.data && comicData!.response.data.length < 15) ? comicData!.response.data.length : 15;
			return indexVal;
		}
	}

	function getIndexLowBound(): number {
		if (contentIndex !== 1) {
			const indexByMax = contentIndex * 15;
			if (comicData && comicData.response && comicData.response.data && indexByMax < comicData.response.data.length) {
				return indexByMax;
			} else {
				return (((contentIndex - 1) * 15) + 1);
			}
		} else { 
			return 1 ;
		}
	}

	useEffect(() => {
		setNewComics();
	}, [contentIndex, comicData])

	return (
		<>
			<Header/>
			<div className={styles.mainContent}>
				<HeaderPanel/>
				<TextBox
					title={ 'Coming Out Daily' }
					description={ 'Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.' }
					aestheticQuote={ 'New Comics!' }
				/>
				<main className={ styles.contentContainer }>
					<section className={ styles.gridContentContainer }>
						<CategoryController updateComics={ updateComics }/>
						<ComicContainer comicData={ comicData } comicUrl={ comicUrl } comics={ comics }/>
						<IndexView lowBoundIndex={ getIndexLowBound() } highBoundIndex={ getIndexHighBound() }
							maxContentCount={ (comicData && comicData?.response && comicData?.response.data) ? comicData!.response.data.length : undefined }
						/>
					</section>
					<Favorites/>
				</main>
				<Footer/>
			</div>
		</>
	)
}
