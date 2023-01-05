import styles from '../../styles/ComicDetail.module.css';
import Image from "next/image";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Prop = {
	id : string,
	title? : string
	href : string,
	thumbnail? : string,
	issueNumber? : string,
	publishDate? : any[],
	creatorsList : string[],
	description : string,
}

const ComicDetail = ({id, thumbnail, title, href, issueNumber, publishDate, creatorsList, description} : Prop) => {
	const linkText = "Find Out More Here";

	let date : string | undefined;
	if (publishDate && publishDate.length) {
		const dates = publishDate.filter(item => item.type === 'focDate');
		if (dates.length) {
			const isoDate = new Date(dates[0].date);
			const months = [ "January","February","March","April","May","June","July","August","September","October","November","December" ];
			date = `${months[isoDate.getMonth()] } ${ isoDate.getDay() }, ${ isoDate.getFullYear()}`;
		}
	}

	return (
		<div className={ styles.comicDetailContainer } data-id={ id }>
			<div className={ styles.comicDetailContent }>
				{ thumbnail && title ? <Image alt={ title! } src={ thumbnail! } width={ 208 } height={ 346 } className={ styles.comicThumbnail }/> : <></> }
				<div className={ styles.comicInfoContent }>
					<h2>{ title }</h2>
					<label className={ styles.detailLabels }>Issue Number : { issueNumber }</label>
					{ date && <label className={ styles.detailLabels }>Published : { date }</label>}
					{ creatorsList &&
						<div className={ styles.detailLabels }>
							<label className={ '' }>Creators : </label> 
							<label>{ `${creatorsList.join(', ')}` }</label>
						</div>
					}
					{ description && <p className={ styles.detailLabels }>{ description }</p> }
					{ href && 
						<a href={ href } className={ styles.moreInfoLink }>
							<span>
								<label>{ linkText }</label>
								<FontAwesomeIcon className={ styles.favoritesMobileIcon } icon={ faArrowRight }  style={ { width : '10px', height : '16px', color : '#F8F8F2', marginLeft : '4px' } }/>
							</span>
						</a>
					}
				</div>
			</div>
		</div>
	)
}

export default ComicDetail;