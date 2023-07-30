import React from 'react';
import "./styles/NewsAgg.css";

const NewsAgg = () => {
  return (
    <div className='newsagg'>
        <img src='/newsagg.svg'/>
        <div className='features'>
    <h1>News Aggregator</h1>
    <p>
    The news section of your website aggregates the latest news and articles from reputable cryptocurrency news sources. You can fetch news through APIs or RSS feeds and display headlines, summaries, and links to the full articles. Users can stay informed about the latest developments in the crypto industry, such as market trends, regulatory updates, new project announcements, and technological advancements.
    </p>
    </div>
    </div>
  )
}

export default NewsAgg