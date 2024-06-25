import { useState } from 'react'
import './App.css'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import AddBookPage from './pages/AddBookPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainPage/>
    // <LoginPage/>
    // <SignUp/>
    // <AddBookPage/>
    // <>
    //   <header>
    //     <nav>
    //       <div className="logo">
    //         <img src={mainLogo} alt="Main Logo" />
    //       </div>
    //       <div className="menu">
    //         <ul>
    //           <li>
    //             <a href="#">Home</a>
    //           </li>
    //           <li>
    //             <a href="#">Books</a>
    //           </li>
    //           <li>
    //             <a href="#">About</a>
    //           </li>
    //           <li>
    //             <a href="#">Contact</a>
    //           </li>
    //         </ul>
    //         <button>Login</button>
    //         <button>SignUp</button>
    //       </div>
    //     </nav>
    //     <main>
    //     <div className="search">
    //       <h1>Book Swap</h1>
    //       <p>Swap your books with others and read more books</p>
    //       <div className="search-box">
    //         <input type="text" />
    //         <img src={searchIcon} alt="Search" />
    //       </div>
    //     </div>
    //       <div className='subjects'>
    //         <a href="">Engineering</a>
    //         <a href="">Hotel Management</a>
    //         <a href="">MBBS</a>
    //         <a href="">LLB</a>
    //         <a href="">Pharmaceutical</a>
    //         <a href="">Journalism</a>
    //         <a href="">commerce</a>
    //       </div>
    //     </main>
    //   </header>
    // </>
  )
}

export default App
