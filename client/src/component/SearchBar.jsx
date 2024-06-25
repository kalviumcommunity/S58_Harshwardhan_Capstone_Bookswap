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
        </div>
    </div>
    
  )
}

export default SearchBar