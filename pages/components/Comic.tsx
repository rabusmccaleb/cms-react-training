import React , {useState, useEffect} from 'react';
import styles from '../../styles/Comic.module.css'
import Image from 'next/image';

type Prop = {
	title? : string
	thumbnail? : string,
	issueNumber? : string,
	publishDate? : Date,
	creators : {}[],
}

const Comic = ({thumbnail, title, issueNumber, publishDate, creators} : Prop) => {
	let creatorsList = creators.items.map(creator => creator.name);
	const isoDate = new Date(publishDate.slice(0, -1));
	const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	const date = `${ months[isoDate.getMonth()] } ${ isoDate.getDay() }, ${ isoDate.getFullYear() }`;
	return(
		<div className={styles.comicConatiner}>
			<Image src={thumbnail} width={158} height={263} className={styles.comicThumbnail}/>
			<div className={styles.comicButtonContainer}>
				<button className={styles.comicButton}></button>
			</div>
            <div className={styles.infoContainer}>
                <h4 className={styles.comicTitle}>{title}</h4>
                <div className={styles.comicLabelContainers}>
                    <label className={styles.comicLabelTitle}>Issue Number : </label>
                    <label>{` ${issueNumber}`}</label>
                </div>
                <div className={styles.comicLabelContainers}>
                    <label className={styles.comicLabelTitle}>Published : </label>
                    <label>{` ${date}`}</label>
                </div>
                <div className={`${styles.comicLabelContainers} ${styles.creators}`}>
                    <label className={styles.comicLabelTitle}>Creators : </label> 
                    <label>{` ${creatorsList.join(', ')}`}</label>
                </div>
            </div>
		</div>
	)
}

export default Comic;