import React from 'react';
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RealTime from './components/RealTime';
import Portfolio from "./components/Portfolio";
import NewsAgg from './components/NewsAgg';
import Watchlist from './components/Watchlist';
import News from './components/News';
import Login from './components/Login';
import Cryptocurrency from './components/Cryptocurrency';
import {Route , Routes , } from 'react-router-dom';
import WatchlistPage from './components/WatchlistPage';

const App = () => {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Header/><RealTime/><Watchlist/><NewsAgg/></>} />
          <Route path='/cryptocurrency' element={<><Cryptocurrency/></>}/>
          <Route path='/news' element={<><News/></>}/>
          <Route path='/login' element={<><Login/></>}/>
          <Route path='/watchlist' element={<><WatchlistPage/></>}/>
        </Routes>
        <Footer />
    </div>
  )
}

export default App