import React from 'react'
import "./styles/RealTime.css";

const RealTime = () => {
  return (
    <div className='realtime'>
    <img src='/realtime.svg'/>
    <div className='features'>
    <h1>Real-Time Price Tracking</h1>
    <p>
    This feature displays the real-time prices of various cryptocurrencies. It fetches data from reliable cryptocurrency APIs and updates the prices dynamically. Users can see the current value of cryptocurrencies, their market capitalization, trading volume, and other relevant data. Price charts can also be included to visualize the price movements over time.
    </p>
    </div>
    </div>
  )
}

export default RealTime