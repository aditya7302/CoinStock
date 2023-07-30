import React from 'react';
import {Link} from 'react-router-dom';
import "./styles/Navbar.css";
import { useState } from 'react';

const Navbar = () => {


  return (
    <div className='navbar'>
      <ul className='list'
      >
        <li className='list-items'><div className='logo'><img src='/cryptocurrency.png' alt='logo' /><span className='first'>Coin</span><span className='second'>Stock</span></div></li>
        <li className='list-items menu'><Link to='/' className='button'>Home</Link></li>
        <li className='list-items menu'><Link to='/news' className='button'>News</Link></li>
        <li className='list-items menu'><Link to='/cryptocurrency' className='button'>Cryptocurrency</Link></li>
        <li className='list-items menu'><Link to='/login' className='button'>SignUp/Login</Link></li>
      </ul>
    </div>
  )
}

export default Navbar;