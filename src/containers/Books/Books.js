import React, { useEffect, useState } from "react";
import axios from "axios";

import Book from "./../../components/book/book";

import GlobalState from "../../global";
import { User } from "./../../userState";

const Books = () => {
  const [{ selectValue }] = React.useContext(GlobalState);
  const { data } = User();
  const [books, setBooks] = useState([]);
  const [save, Setsave] = useState([]);
  const [bookReviews, setBookReviews] = useState([]);
  const { savedBooks, _id } = data ? data.data.user : "";

  useEffect(() => {
    async function getBooks() {
      const { data } = await axios.get("http://localhost:8000/api/v1/books", {
        params: {
          select: selectValue === "ALL" ? undefined : selectValue,
          // select: selectVaue,
        },
      });

      setBooks(data.data.books);
    }
    getBooks();
    Setsave(savedBooks);
  }, [selectValue]);

  /////////////////////////////////////

  async function BookReview(_id) {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/books/${_id}`
    );

    const reviews = data.data.book.reviews;

    console.log("review componetmount.............", reviews);
    setBookReviews(reviews);
  }

  /////////////////////////////////////////////////////////////////////////////
  const likePost = async (id) => {
    const { data } = await axios.put(
      "http://localhost:8000/api/v1/books/like",
      {
        bookId: id,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );

    console.log("[Books.js] result", data);

    const newData = books.map((book) => {
      if (book._id === data.result._id) {
        return data.result;
      } else {
        return book;
      }
    });

    setBooks(newData);
  };
  const dislike = async (id) => {
    const { data } = await axios.put(
      "http://localhost:8000/api/v1/books/unlike",
      {
        bookId: id,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );

    console.log("[Books.js] result", data);

    const newData = books.map((book) => {
      if (book._id === data.result._id) {
        return data.result;
      } else {
        return book;
      }
    });

    setBooks(newData);
  };

  const saveBook = async (id) => {
    const { data } = await axios.put(
      "http://localhost:8000/api/v1/books/save",
      {
        bookId: id,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );

    console.log("[Books.js] result", data);

    Setsave(data.result.savedBooks);
  };

  const unsaveBook = async (id) => {
    const { data } = await axios.put(
      "http://localhost:8000/api/v1/books/unsave",
      {
        bookId: id,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );

    console.log("[unsaved result", data);

    Setsave(data.result.savedBooks);
  };

  //open Modal

  const render = books.map((book, i) => {
    return (
      <Book
        key={book.title[0] + i}
        title={book.title[0]}
        imgAddress={book.img}
        likes={book.likes.length}
        id={book._id}
        liked={book.likes.includes(_id)}
        savedBook={save ? save.includes(book._id) : false}
        ///////////////////////////////////////////
        saved={saveBook}
        unsaved={unsaveBook}
        likePost={likePost}
        dislike={dislike}
        getBookReview={BookReview}
        bookReviews={bookReviews}
        setBookReviews={setBookReviews}
      />
    );
  });

  return <div className="books">{render}</div>;
};

export default React.memo(Books);
