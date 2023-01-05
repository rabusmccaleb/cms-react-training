import styles from '../../../styles/ComicContainer.module.css';

interface Props {
	response : string;
}

const ComicErrorResponse = ({ response }: Props) => {
	return (
		<div>
			<label className={ styles.errorLabel } aria-label={ response }>{ response }</label>
		</div>
	)
};

export default ComicErrorResponse;