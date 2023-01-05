import { useContext } from 'react';
import { context } from '../../Importables/ComicContext';
import styles from '../../styles/Popups.module.css';

const Popup = () => {
	const { popUpMessage } = useContext(context); 
	return (
		<>
			{ 
				popUpMessage ?
				<div className={ styles.popUpContainer }>
					<div className={ styles.popUpContent }>
						<label>{ popUpMessage }</label>
					</div>
				</div>
				:
				<></>
			}
		</>
	)
};

export default Popup