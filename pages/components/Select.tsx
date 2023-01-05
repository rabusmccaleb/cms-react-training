import { requestCategory } from '../../Importables/CustomHooks';
import styles from '../../styles/CategoryController.module.css';

interface Props {
	isDesktop : boolean;
	updateComics : (val? : string, type? : requestCategory, reseting? : boolean , comicsObj? : { character : string, creator : string }) => void;
	requestObj : { 'character' : string , 'creator' : string };
	characterOptions: ({ name: string; id: string; } | { name: string; id: number; })[];
	creatorOptions : ({ name: string; id: string; } | { name: string; id: number; })[];
	selectedElement : (id : string, idSelected : string) => void;
}

const Select = ({ isDesktop, updateComics, requestObj, characterOptions, creatorOptions, selectedElement } : Props) => {
	const elementIds : { character : string, creator : string } = {
		character : `characterDropdown_${isDesktop ? 'desktop' : 'mobile'}`, 
		creator : `creatorDropdown_${isDesktop ? 'desktop' : 'mobile'}`
	};

	return (
		<>
			<select id={ elementIds.character } className={ isDesktop ? styles.desktopSelect : '' } onChange={ e =>{ 
				const val = e.target.value;
				requestObj.character = val;
				// @ts-ignore
				let creatorVal : any = document.getElementById(elementIds.creator) ? document.getElementById(elementIds.creator)?.value : '';
				let category = val !== '' && val !== undefined ? requestCategory.characters : requestCategory.creators;
				updateComics(val !== '' ? val : creatorVal, category, undefined, requestObj);
				selectedElement(`characterDropdown_${!isDesktop ? 'desktop' : 'mobile'}`, `${e.target.value}`);
			} }>
				{ characterOptions && characterOptions.map(character => {
						return(
							<option key={ character!.id } value={ character!.id } aria-label={ `Character Filter Dropdown Option ${character!.name}` }>{ character!.name }</option>
						);
					})
				}
			</select>
			<select id={ elementIds.creator } className={ isDesktop ? styles.desktopSelect : '' } onChange={ e =>{
				const val = e.target.value;
				requestObj.creator = val;
				// @ts-ignore
				let characterVal : any = document.getElementById(elementIds.character) ? document.getElementById(elementIds.character)?.value : '';
				let category = val !== '' && val !== undefined ? requestCategory.creators : requestCategory.characters;
				updateComics(val !== '' ? val : characterVal, category, undefined, requestObj);
				selectedElement(`creatorDropdown_${!isDesktop ? 'desktop' : 'mobile'}` , `${val}`);
			} }>
				{ creatorOptions && creatorOptions.map(creator => {
						return(
							<option key={ creator!.id } value={ creator!.id } aria-label={ `Creator Filter Dropdown Option ${creator!.name}` }>{ creator!.name }</option>
						);
					})
				}
			</select>
		</>
	)
};

export default Select;