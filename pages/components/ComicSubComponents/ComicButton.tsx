import styles from '../../../styles/Comic.module.css';
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    isAddedToFavorites : boolean;
    updateFavorites : () => void;
}

const ComicButton = ({ updateFavorites, isAddedToFavorites } : Props) => {
    return (
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
    );
}

export default ComicButton;