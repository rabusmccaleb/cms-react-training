import styles from '../../styles/ComicContainer.module.css';
import Comic from './Comic';
import ComicDataResponse from './ComicContainerHandlers/ComicDataResponse';
import { GetDataObject } from '../../Importables/CustomHooks';
import { dynamicDataModel } from '../../Importables/Model/DynamicDataModel';

interface Props {
	comicData : GetDataObject | undefined;
	comicUrl : string;
	comics : any[] | undefined;
}

const ComicContainer = ({ comicData, comicUrl, comics } : Props) => {
	return (
		<div className={ styles.comicGridContainer }>
			{
				(comicData && comicUrl && comicData.response.isError === false && comicData.response.data && comics && comics.length > 0) ? 
				comics.map((item : any) => {
					const comicItem : (dynamicDataModel | undefined) = item as ( dynamicDataModel | undefined )
					if (comicItem) {
						return (
								<Comic
									key={ comicItem.id }
									id={ `${comicItem.id}` }
									href={ (comicItem.urls && comicItem.urls.length) ? comicItem.urls[0].url : "" }
									thumbnail={ `${comicItem.thumbnail.path}/portrait_incredible.${comicItem.thumbnail.extension}` }
									title={ comicItem.title }
									issueNumber={ `${comicItem.issueNumber}` }
									publishDate={ comicItem.dates }
									creators={ comicItem.creators.items }
									description={ comicItem.description }
								/>
						)
					} else {
						return (<></>)
					}
				})
				:
				<ComicDataResponse 
					comicCount={ comicData?.response.data?.length } 
					comicData={ comicData } 
					response={ comicData ? comicData.response.message : 'Loading...' }
				/>
			}
		</div>
	);
};

export default ComicContainer;