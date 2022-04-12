import React, { useEffect, useState } from "react";
import axios from "axios";

import Book from "./../../components/book/book";
// import Classes from "./Books.module.css";

import { User } from "./../../userState";

const SavedBook = () => {
  const { data } = User();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/users/savedbooks",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );

      setBooks(data.data.user.savedBooks);
    }
    getBooks();
  }, []);
  const { savedBooks, _id } = data ? data.data.user : [];

  if (!savedBooks || savedBooks.length <= 0) {
    return <div className="nosaved">...</div>;
  }

  const render = books.map((book, i) => {
    return (
      <Book
        key={book.title[0] + i}
        title={book.title[0]}
        imgAddress={book.img}
        likes={book.likes.length}
        id={book._id}
        liked={book.likes.includes(_id)}
        savedBook={savedBooks.includes(book._id)}
      />
    );
  });

  return <div className="books">{render}</div>;
};

export default React.memo(SavedBook);
