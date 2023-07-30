import React from 'react';
import "./styles/Header.css";


const Header = () => {
  return (
    <div className='header'>
    <div className='heading'>
    <div className='title'>
    <h1>
    CoinStock, the Best Free Crypto Portfolio Tracker.
    </h1>
    <div className='description'>Stay on top of your crypto portfolio with CoinStock's free crypto portfolio tracker! Track your assets from multiple exchanges.See profit & loss and more - for free.</div>
    <a href='/cryptocurrency' className='button cover' >Start Tracking Free</a>
    </div>
    </div>
    {/* <img src='/cover-image.svg' alt='cover-image'/> */}
    <svg version="1.2" xmlns="http://www.w3.org/2000/svg" className='image' viewBox="0 0 1500 1000" width="100%" height="auto" style={{ maxWidth: '1000px' }}>
        <image href="/cover-image.svg"  width="100%" height="100%" />
      </svg>
    </div>
  )
}

export default Header