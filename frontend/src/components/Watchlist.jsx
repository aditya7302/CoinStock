import React from 'react';
import "./styles/Watchlist.css";

const Watchlist = () => {
  return (
    <div className='watchlist'>
    <div className='features'>
    <h1>Watchlist</h1>
    <p>
    The watchlist feature allows users to create a personalized list of cryptocurrencies they are interested in. Users can add or remove cryptocurrencies from their watchlist and get an overview of their selected assets on a single page. This feature helps users keep track of their favorite cryptocurrencies and quickly access their price and market data without searching for each one individually.
    </p>
    </div>    
    <img src='/watchlist.svg'/>
    </div>
  )
}

export default Watchlist