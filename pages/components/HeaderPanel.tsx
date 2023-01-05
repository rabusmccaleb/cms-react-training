import HeaderSlide from "./HeaderSlide";
import Nav from "./Nav";

const HeaderPanel = () => {
	return (
		<div style={ { position: 'relative', height: 'fit-content', width : '100vw' } }>
			<Nav/>
			<HeaderSlide/>
		</div>
	);
};

export default HeaderPanel;