import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { search, update } from "../../BooksAPI";
const Search = () => {
  const [dataBook, setDataBook] = useState([]);

  const handleSearch = async (e) => {
    try {
      const value = e.target.value;
      let data = await search(value);
      console.log(data);
      if (data.length > 0) {
        setDataBook(data);
      } else {
        setDataBook([]);
      }
    } catch (error) {
      setDataBook([]);
    }
  };

  const handleUpdateBook = async (book, self) => {
    try {
      await update(book, self);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {dataBook.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select
                      onChange={(e) => handleUpdateBook(book, e.target.value)}
                    >
                      <option value="none" disabled selected={true}>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {book?.authors && book.authors.map((author) => author)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
