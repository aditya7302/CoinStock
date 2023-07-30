import React from 'react';
import { useState,useEffect } from 'react';
import './styles/Cryptocurrency.css';
import StarIcon from './StarIcon';
import { useNavigate } from 'react-router-dom';

const Cryptocurrency = () => {

  const navigate = useNavigate();

  const [search,setSearch] = useState({
    coin: '',
    currency: 'usd'
  });

  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [shouldSendToServer, setShouldSendToServer] = useState(false);

  const toggleWatchlist = (id) => {
    if (watchlist.some((item) => item.id === id)) {
      // If the cryptocurrency is already in the watchlist, remove it
      setWatchlist((prevWatchlist) => prevWatchlist.filter((item) => item.id !== id));
    } else {
      // If the cryptocurrency is not in the watchlist, add it
      const cryptoToAdd = coins.find((crypto) => crypto.id === id);
      if (cryptoToAdd) {
        setWatchlist((prevWatchlist) => [...prevWatchlist, cryptoToAdd]);
      }
    }
    setShouldSendToServer(true);
  };

  const sendCoinToServer = async () =>{
    const response = await fetch('http://localhost:8000/api/watchlist',{
      credentials: 'include',
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(watchlist)
    });
    const data = await response.json();
    if(data===404){
      navigate('/login');
      alert('you are not logged in');
    }
  }

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  const formatNumber = (number,search) => {
    var sign;
    if(search==='usd')
    {
      sign='$';
    }
    else if(search==='inr'){
      sign='₹';
    }
    else if(search==='eur'){
      sign='€';
    }
    else if(search==='jpy'){
      sign='¥';
    }
    if (number >= 1e9) {
      return sign + addCommasToNumber((number / 1e9).toFixed(2)) + 'B';
    } else if (number >= 1e6) {
      return sign + addCommasToNumber((number / 1e6).toFixed(2)) + 'M';
    }else{
      return sign + addCommasToNumber(number.toFixed(2));
    }
  };
  
  const sendDataToServer = async () =>{
    const response = await fetch('http://localhost:8000/api/coins',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(search)
    });
    const data = await response.json();
    setCoins(data);
  }

  // useEffect(()=>{
  //   sendCoinToServer();
  // },[watchlist]);

  useEffect(() => {
    if (shouldSendToServer) {
      // Call the function to send the watchlist data to the server whenever the watchlist changes
      sendCoinToServer();
      setShouldSendToServer(false); // Reset the flag after sending data to the server
    }
  }, [watchlist, shouldSendToServer]);


  useEffect(()=>{
    if(search.coin===''){
      const interval = setInterval(()=>{
        fetchData();
      },2000);
      return () => clearInterval(interval);
    }
    else{
      const interval = setInterval(()=>{
        sendDataToServer();
      },2000);
      return () => clearInterval(interval);
    }
  },[search,coins]);


  const fetchData = async () =>{
      const currency = search.currency.toUpperCase();
     const response = await fetch(`http://localhost:8000/api/coins?currency=${currency}`);
     const data = await response.json();
     setCoins(data);
    }

  const handleChange = (event)=> {
    setSearch({
      ...search,
      [event.target.name] : event.target.value
    })
  }

  const handleStarClick = (id) => {
    toggleWatchlist(id);
  };

const handleSubmit = async () => {
  const response = await fetch('http://localhost:8000/api/watchlist',{
    method: 'GET',
    credentials: 'include'
  });
  const data = await response.json();
  if(data===404)
  navigate('/login');
  else 
  navigate('/watchlist');
}


  const handleClick = (event)=> {
    event.preventDefault();
    sendDataToServer();
  }

  const handleKeyPress = (event) => {
    if(event.key==='Enter'){
      event.preventDefault();
      sendDataToServer();
    }
  }

  return (
    <>
    <div className='cryptocurrency'>
    <h1>Crypto prices</h1>
    <div className='options'>
    <form onSubmit={handleClick}>
    <input type='text' name='coin' placeholder='search' value={search.coin} onChange={handleChange} onKeyDown={handleKeyPress}></input>
    <select className='dropdown' name='currency' value={search.currency} onChange={handleChange} onClick={handleClick}>
      <option value='usd'>USD</option>
      <option value='inr'>INR</option>
      <option value='eur'>EUR</option>
      <option value='jpy'>JPY</option>
    </select>
    </form>
    <button className="button-options" onClick={handleSubmit} role="button">watchlist</button>
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
            {/* <img className='toggle' src='/star.svg' onClick={()=>handleStarClick(coin.id)} style={{
            fill: watchlist.some((item) => item.id === coin.id) ? 'goldenrod' : 'gray',
          }}/> */}
          <StarIcon
                      cryptoData={coin}
                      onStarClick={() => handleStarClick(coin.id)}
                      style={{
                        fill: watchlist.some((item) => item.id === coin.id) ? 'goldenrod' : 'gray',
                      }}
                    />
            </td>
            <td className='coin-image'><img src={coin.icon}/></td>
            <td className='coin-name'>{coin.name}</td>
            <td className='coin-prices'>{formatNumber(coin.price,search.currency)}</td>
            <td className='coin-market-cap'>{formatNumber(coin.marketCap,search.currency)}</td>
            <td className='coin-volume'>{formatNumber(coin.volume,search.currency)}</td>
            <td className='coin-supply'>{addCommasToNumber(parseFloat(coin.availableSupply))}</td>
            <td className='coin-percentage'>{coin.priceChange1d}%</td>
            </tr>
            ))}
        </tbody>
        </table>
        </div>
    </div>
    </>
  );
};

export default Cryptocurrency;
