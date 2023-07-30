import React, { useState } from 'react';
import './styles/News.css';

const News = () => {

  const [news, setNews] = useState([]);

  // let inputDate = '2022-02-14';
  // let publishDate = new Date(inputDate);
  // const formattedDate = publishDate.toLocaleDateString("en-US", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric"
  // });




  const fetchNews = async () =>{
    const response = await fetch('http://localhost:8000/api/news');
    const data = await response.json();
    setNews(data);
  }

  fetchNews();
  
  return (
    <>
    <div className='news'>
      <h1>Crypto news</h1>
    </div>
    <div className='news-container'>
    {
    news.map(newsObject => (
    <div className='news-feed'>
    {/* <a target="_blank" href={newsObject.link} className="image-preview">	
    <img src={newsObject.imgURL} className="newsimage" />
    </a> */}
    <div className='news-link'>
    <div className="titlesearch">
    <a target="_blank" href={newsObject.link} className='newstitle'>{newsObject.title}
    </a>
    {/* </div>
    <div className="textsearch">{newsObject.description} */}
    </div>
    <div className="bottom">
		<span className="bottomsearchtext">{newsObject.source} 
    {/* | {newsObject.publishedAt}  */}
    </span>
    </div>
	</div>
    </div>
      ))}
    </div>
    </>
  )
}

export default News