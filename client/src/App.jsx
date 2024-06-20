import { useState } from 'react'
import mainLogo from './assets/mainlogo.png'
import searchIcon from './assets/search.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <img src={mainLogo} alt="Main Logo" />
          </div>
          <div className="menu">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Books</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
            <button>Login</button>
            <button>SignUp</button>
          </div>
        </nav>
        <main>
        <div className="search">
          <h1>Book Swap</h1>
          <p>Swap your books with others and read more books</p>
          <div className="search-box">
            <input type="text" />
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
          <div className='subjects'>
            <a href="">Engineering</a>
            <a href="">Hotel Management</a>
            <a href="">MBBS</a>
            <a href="">LLB</a>
            <a href="">Pharmaceutical</a>
            <a href="">Journalism</a>
            <a href="">commerce</a>
          </div>
        </main>
      </header>
    </>
  )
}

export default App
