import styles from '../../styles/Nav.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning, faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from 'react';
import { context } from '../../Importables/ComicContext';
import { useSpring, animated, config } from '@react-spring/web';

const Nav = () => {
	const [ openMenu, setOpenMenu ] = useState<boolean>(false);
	const [ favoriteData, setfavoriteData ] = useState<any[] | any>([]);
	const { favoritesList } = useContext(context);
	
	useEffect(()=>{
		if (localStorage && localStorage.getItem('session')) {
			const parsedFavoritesList = JSON.parse(localStorage.getItem('session')!);
			if (Array.isArray(parsedFavoritesList)) {
				setfavoriteData((value : any) => { return parsedFavoritesList; })
			}
		}
	}, [ favoritesList ]);

	function menuOpen() {
		setOpenMenu(bool => { return !bool; })
	}

	const menuOpenClosedStyles = { 
		open : { height: `${179 + 200}px` },
		closed : { height: 0 },
	}

	const [ animateHeaderSlide, setAnimateHeaderSlide ] = useState<boolean>(false)
	const navLoadAnimation = useSpring({
		opacity : animateHeaderSlide ? 1.0 : 0.0,
		height : animateHeaderSlide ? 179 : 0.0,
		config : config.wobbly,
	});
	console.log("config : ", config);
	useEffect(() => {
		setAnimateHeaderSlide(true);
	}, []);

	return (
		<nav>
			<div className={ styles.mobileMenuContainer } style={ openMenu ? menuOpenClosedStyles.open : menuOpenClosedStyles.closed }>
				<ul className={ styles.mobilNavULcontainer } role="list">
					<div className={ styles.mobileListItem } aria-label='Home Navigation Item' role="listitem">
						<a href='#'>Home</a>
					</div>
					<div className={ styles.mobileListItem } aria-label='Shop Navigation Item' role="listitem">
						<a href='#'>Shop</a>
					</div>
				</ul>
			</div>
			<animated.div className={ styles.navContainer } style={navLoadAnimation}>
				<div className={ styles.iconContainer }>
					<Image src="/favicon.ico" alt='Icon' width='107' height='107' className={ styles.icon }/>
				</div>
				<div className={ styles.navLinksContainer }>
					<ul className={ styles.navULcontainer }>
						<li className={ styles.listItem }>
							<a href='#'>Home</a>
						</li>
						<li className={ styles.listItem }>
							<a href='#'>Shop</a>
						</li>
						<li className={ `${styles.listItem}` }>
							<FontAwesomeIcon icon={ faBoltLightning }  style={ { width : '10px', height : '18px', color : '#F8F8F2', marginRight: '4px' } } />
							<a href='#' className={ styles.favorites }>My Favorites <span className={ styles.favoritesCount }>{ `(${favoriteData.length})` }</span></a>
						</li>
						<div className={ styles.menuContainer }>
							<FontAwesomeIcon icon={ faBoltLightning }  style={ { width : '10px', height : '16px', color : '#F8F8F2', marginRight : '8px' } } />
							<a href='#'>{ `(${favoriteData.length})` }</a>
							<li className={ `${styles.favoitesListItem}` } onClick={ ()=> { menuOpen() } }>
								<FontAwesomeIcon icon={ faBars }  style={ { width : '18px', height : '21px', color : '#F8F8F2' } } />
							</li>
						</div>
					</ul>
				</div>
			</animated.div>
		</nav>
	)
}

export default Nav;