import styles from '../../styles/TextBox.module.css';

interface Props {
	title : string
	description : string
	aestheticQuote? : string
}

const TextBox = ({ title, description, aestheticQuote } : Props) => {
	return (
		<div className={ styles.textBoxContainer }>
			<div className={ styles.textBoxContentContainer }>
				{ 
					aestheticQuote && 
						<div className={ styles.aestheticQuoteContainer }>
							<div className={ styles.aestheticContentQuoteContainer }>
								<h6 className={ styles.aestheticQuoteLabel }>{ aestheticQuote }</h6>
							</div>
						</div>
				}
				<div className={ styles.titleContainer }>
					<label className={ styles.titleLabel }>{ title }</label>
				</div>
				<div className={ styles.descriptionContainer }>
					<label className={ styles.descriptionLabel }>{ description }</label>
				</div>
			</div>
		</div>
	);
}

export default TextBox;