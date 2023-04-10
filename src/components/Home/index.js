import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { getAll, update } from "../../BooksAPI";

const selfName = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want to Read",
  read: "Read",
};

const Home = () => {
  const [listBooks, setListBooks] = useState({});

  useEffect(() => {
    handleGetAll();
  }, []);

  const handleGetAll = async () => {
    try {
      let data = await getAll();
      if (data) {
        let groupData = data.reduce((acc, curr) => {
          const key = curr.shelf;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(curr);
          return acc;
        }, {});
        console.log(groupData);
        setListBooks(groupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBook = async (book, self) => {
    try {
      await update(book, self);
      await handleGetAll();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(listBooks).length > 0 &&
            Object.keys(listBooks).map((key) => {
              return (
                <div className="bookshelf" key={key}>
                  <h2 className="bookshelf-title">{selfName[key]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {listBooks[key].map((book) => (
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
                                  onChange={(e) =>
                                    handleUpdateBook(book, e.target.value)
                                  }
                                >
                                  <option value="none" disabled>
                                    Move to...
                                  </option>
                                  <option
                                    value="currentlyReading"
                                    selected={
                                      key == "currentlyReading" ? true : false
                                    }
                                  >
                                    Currently Reading
                                  </option>
                                  <option
                                    value="wantToRead"
                                    selected={
                                      key == "wantToRead" ? true : false
                                    }
                                  >
                                    Want to Read
                                  </option>
                                  <option
                                    value="read"
                                    selected={key == "read" ? true : false}
                                  >
                                    Read
                                  </option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">
                              {book?.authors &&
                                book.authors.map((author) => author)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default Home;
