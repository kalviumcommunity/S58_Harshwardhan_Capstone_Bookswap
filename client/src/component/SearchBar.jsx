import React from 'react'
import './SearchBar.css'
import SearchIcon from '../assets/search.png'

function SearchBar() {
  return (
    <div id='main-div'>
        <div className="search-bar-container">
            <input type="text" placeholder="Search for books" />
            <img src={SearchIcon} alt="Search Icon"/>
        </div>
        <div className='category'>
            {/* i have to add something */}
            <button className='category-button'>Engineering</button>
            <button className='category-button'>Hotel Management</button>
            <button className='category-button'>MBBS</button>
            <button className='category-button'>LLB</button>
            <button className='category-button'>Pharmaceutical</button>
            <button className='category-button'>Journalism</button>
            <button className='category-button'>commerce</button>
          
        </div>
    </div>
    
  )
}

export default SearchBar