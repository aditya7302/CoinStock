import React from 'react';
import "./styles/Footer.css";

const Footer = () => {
  return (
	<>
	<div className='footer'>
		<div className='company'>
		<h1><span className='first'>Coin</span><span className='second'>Stock</span></h1>
		<p>CoinGecko provides a fundamental analysis of the crypto market. In addition it also tracks price, volume and market capitalisation.</p>
		</div>
		<div className='footer-links'>
		<h1>Links</h1>
		<div><a href='/'>Home</a></div>
		<div><a href='/news'>News</a></div>
		<div><a href='/cryptocurrency'>Cryptocurrency</a></div>
		<div><a href='/login'>SignUp/Login</a></div>
		</div>
		<div className='social-media'>
		<h1>Contact Us</h1>
		<p>76954 Howell Oval,United States Of America</p>
		<p>+1-793-905-2365</p>
		</div>
	</div>
	<div className='copyright'>
		&copy;CointStock 2023
	</div>
	</>
  )
}

export default Footer