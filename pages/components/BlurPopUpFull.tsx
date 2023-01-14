import { useContext } from "react";
import { context } from "../../Importables/ComicContext";
import styles from '../../styles/BlurPopUpFull.module.css';

const BlurPopUpFull = () => {
	const { blurViewChild, hideBlurView } = useContext(context);
	return (
		<div>
			{ blurViewChild ? 
				<div className={styles.blurBackground}>
					<button className={styles.blurExitButton} onClick={() => { hideBlurView(); }}>
						<label>X</label>
					</button>
					{ blurViewChild }
				</div>
				:
				<></>
			}
		</div>
	);
}

export default BlurPopUpFull;