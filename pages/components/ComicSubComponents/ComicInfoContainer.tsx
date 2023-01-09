import styles from '../../../styles/Comic.module.css';
import { useSpring } from '@react-spring/web'

interface Props {
    href : string;
    title? : string;
    issueNumber? : string;
    date? : string;
    creatorsList : string[];
}

const ComicInfoContainer = ({ href, title, issueNumber, date, creatorsList } : Props) => {
    return (
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
    );
}

export default ComicInfoContainer;