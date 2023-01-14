import { useContext } from 'react';
import { context, indexUpdateType } from '../../Importables/ComicContext';
import styles from '../../styles/IndexView.module.css';

interface Prop {
	lowBoundIndex : number;
	highBoundIndex : number;
	maxContentCount? : number;
}

const IndexView = ({ lowBoundIndex, highBoundIndex, maxContentCount } : Prop) => {
	const { contentIndex, updateIndex } = useContext(context);
	return (
		<div className={ styles.indexViewContainer } aria-label={ `Page Index Container : Page ${lowBoundIndex} - ${highBoundIndex} of ${maxContentCount}` }>
			<button aria-label="Previous Comic Set Pager Button" className={ styles.buttonContainer } onClick={ () => {
				if (contentIndex > 1) {
					updateIndex(indexUpdateType.decrease)
				}
			} }>
				<div className={ styles.previous }>
						<div className={ styles.arrowTop }></div>
						<div className={ styles.arrowBottom }></div>
				</div>
			</button>
			<div className={ styles.countControls }>
				<div className={ styles.lowBoundIndex }>{ lowBoundIndex }</div>
				<label>-</label>
				<div className={ styles.highBoundIndex }>{ highBoundIndex }</div>
				<label>of</label>
				<div className={ styles.maxContentCount }>{ maxContentCount }</div>
			</div>
			<button aria-label="Next Comic Set Pager Button" className={ styles.buttonContainer } onClick={ () => {
				if (maxContentCount && highBoundIndex < maxContentCount) {
					updateIndex(indexUpdateType.increase)
				}
			} }>
				<div className={ styles.next }>
						<div className={ styles.arrowTop }></div>
						<div className={ styles.arrowBottom }></div>
				</div>
			</button>
		</div>
	);
}

export default IndexView;