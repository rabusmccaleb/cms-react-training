import { useEffect, useState } from 'react';
import styles from '../../styles/HeaderSlide.module.css'
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';

const HeaderSlide = () => {
	const [ animateHeaderSlide, setAnimateHeaderSlide ] = useState<boolean>(false)
	const fade = useSpring({
		opacity : animateHeaderSlide ? 1.0 : 0.0,
	})
	useEffect(() => {
		setAnimateHeaderSlide(true);
	}, []);
	return (
		<animated.div className={ styles.headerSliderContainer }  style={ { backgroundImage : 'URL(/hero-photo@2x.png)', ...fade} }>
			<div className={ styles.titleContainer }>
				<label>Comic Closet</label>
			</div>
			<div className={ styles.textureImageContainter }>
				<Image className={ styles.textureImage } src='/halftone@2x.png' alt='Textured Image' width='2880' height='325'/>
			</div>
		</animated.div>
	)
}

export default HeaderSlide;