import React from "react"
import Image from "next/image";
import styles from '../../styles/Footer.module.css'
import Popup from './Popup';
import BlurPopUpFull from "./BlurPopUpFull";

const Footer = () => {
	return (
		<>
			<footer>
				<div className={ styles.footerContainer }>
					<div className={ styles.footerContent }>
						<div className={ styles.footerIcon }>
							<Image src="/favicon.ico" alt='Icon' width='107' height='107'/>
						</div>
						<a className={ styles.footerLinks }>
							<label>Privacy Policy | Terms of Service</label>
						</a>
						<a className={ styles.footerLinks }>
							<label>Copyright 2022. Comic Closet, LLC. All rights reserved.</label>
						</a>
					</div>
				</div>
			</footer>
			<BlurPopUpFull/>
			<Popup/>
		</>
	)
}

export default Footer;