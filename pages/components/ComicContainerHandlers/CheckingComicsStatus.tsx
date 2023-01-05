import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../../styles/ComicContainer.module.css';

interface Props {
	comicCount : number | undefined;
};

const CheckingComicsStatus = ({ comicCount }:Props) => {
	return (
		<> 
			{ comicCount === 0 ?
				<div>
					<span className={ styles.loadingLabel }>
						<label aria-label="Comic books are loading in.">There are no comics sorry</label>
						<FontAwesomeIcon icon={ faFaceFrown }  style={ { width : '20px', height : '20px', marginLeft: '4px' } } />
					</span>
				</div>
				:
				<div>
					<label className={ styles.loadingLabel } aria-label="Comic books are loading in.">Loading...</label>
				</div>
			}
		</>
	)
};

export default CheckingComicsStatus;