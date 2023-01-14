import { GetDataObject } from '../../../Importables/CustomHooks';
import CheckingComicsStatus from './CheckingComicsStatus';
import ComicErrorResponse from './ComicErrorResponse';

interface Props {
	comicData : GetDataObject | undefined;
	response : string;
	comicCount : number | undefined;
}

const ComicDataResponse = ({ comicData, response, comicCount } : Props) => {
	return (
		<>
			{
				comicData && response !== 'Success' ?
					<ComicErrorResponse response={ response }/>
					:
					<CheckingComicsStatus comicCount={ comicCount } />
			}
		</>
	);
};

export default ComicDataResponse;