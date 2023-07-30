import React, { useState,useEffect } from 'react';
import './styles/WatchlistPage.css';
import { useNavigate } from 'react-router-dom';
import StarIcon from './StarIcon';

const WatchlistPage = () => {

    const [coins, setCoins] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
      }

      const getUserCoin = async () => {
        const response = await fetch('http://localhost:8000/api/usercoins',{
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        setCoins(data);
        console.log(data);
      }

      useEffect(()=>{
        const interval = setInterval(async ()=>{
            await getUserCoin();
        },2000)
        return () => clearInterval(interval);
      },[]);

      const addCommasToNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };
      
      const formatNumber = (number) => {
        var sign='$';
        // if(search==='usd')
        // {
        //   sign='$';
        // }
        // else if(search==='inr'){
        //   sign='₹';
        // }
        // else if(search==='eur'){
        //   sign='€';
        // }
        // else if(search==='jpy'){
        //   sign='¥';
        // }
        if (number >= 1e9) {
          return sign + addCommasToNumber((number / 1e9).toFixed(2)) + 'B';
        } else if (number >= 1e6) {
          return sign + addCommasToNumber((number / 1e6).toFixed(2)) + 'M';
        }else{
          return sign + addCommasToNumber(number.toFixed(2));
        }
      };
      

  return (
    <>
        <div className='watchlistpage'>
    <h1>Your Watchlist</h1>
    <div className='options'>
    <button className="button-options" onClick={handleSubmit} role="button">logout</button>
    {/* <button className="button-options" role="button">portfolio</button> */}
    </div>
    </div>
    <div className='table-container'>
    <div className='table'>
        <table>
        <thead>
        <tr>
        <th><div className='favicon-heading'></div></th>
        <th colSpan={2}><div className='name-heading'>name</div></th>
        <th><div className='price-heading'>price</div></th>
        <th><div className='market-heading'>market cap</div></th>
        <th><div className='vol-heading'>24h vol</div></th>
        <th><div className='supply-heading'>circulating supply</div></th>
        <th><div className='percentage-heading'>24h %</div></th>
        </tr>
        </thead>
        <tbody>
        {coins.map(coin => (
            <tr key={coin.id}>
            <td className='favicon'>
          {/* <StarIcon
                      cryptoData={coin}
                      onStarClick={() => handleStarClick(coin.id)}
                      style={{
                        fill: watchlist.some((item) => item.id === coin.id) ? 'goldenrod' : 'gray',
                      }}
                    /> */}
            </td>
            <td className='coin-image'><img src={coin.icon}/></td>
            <td className='coin-name'>{coin.name}</td>
            <td className='coin-prices'>{formatNumber(coin.price)}</td>
            <td className='coin-market-cap'>{formatNumber(coin.marketCap)}</td>
            <td className='coin-volume'>{formatNumber(coin.volume)}</td>
            <td className='coin-supply'>{addCommasToNumber(parseFloat(coin.availableSupply))}</td>
            <td className='coin-percentage'>{coin.priceChange1d}%</td>
            </tr>
            ))}
        </tbody>
        </table>
        </div>
    </div>
    </>
  )
}

export default WatchlistPage;