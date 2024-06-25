import React from 'react'
import './AddBookPage.css'

function AddBookPage() {
  return (
    <>
    <nav>

    </nav>
    <div id='Addbook-div'>
        <form>
            <h1>Sell your books</h1>
            <input type="text" id="bookname" name="name" required placeholder='Book Name'/>
            <input type="text" id="subject" name="Subject" required placeholder='Subject or Stream'/>
            <input type="text" id="days" name="days" required placeholder='Days of Use'/>
            <input type="text" id="description" name="description" required placeholder='Description and Condition of book'/>
            {/* I want to add a iamge file here */}
            <div id='file-upload'>
              <p>Upload Image</p>
              <p>Make sure the image size is not greater then 2MB</p>
              <input type="file" id="file" name="file" required placeholder='Upload Image'/>
            </div>
            <button type="submit">Upload</button>
        </form>
    </div>
    </>
  )
}

export default AddBookPage