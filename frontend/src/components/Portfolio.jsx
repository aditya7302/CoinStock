import React from 'react';
import "./styles/Portfolio.css";

const Portfolio = () => {
  return (
    <div className='portfolio'>
    <div className='features'>
    <h1>Portfolio Management</h1>
    <p>
    This feature allows users to create and manage their cryptocurrency portfolios. Users can add their holdings by specifying the quantity and purchase price of each cryptocurrency. The portfolio section calculates the current value of their holdings and shows the overall portfolio performance, including profits or losses. Users can track their investments, monitor the percentage change in value, and review the historical performance of their portfolios.
    </p>
    </div>    
    <img src='/portfolio.svg'/>
    </div>
    
  )
}

export default Portfolio