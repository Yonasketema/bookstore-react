import axios from "axios";

function fetchBook(select) {
  return window
    .fetch(`http://localhost:8000/api/v1/books?select=${select}`, {})
    .then((response) => response.json());
}

const like = ({ id, token }) => {
  return axios.put(
    "http://localhost:8000/api/v1/books/like",
    {
      bookId: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const dislike = ({ id, token }) => {
  return axios.put(
    "http://localhost:8000/api/v1/books/unlike",
    {
      bookId: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

function getComment(id) {
  return axios.get(`http://localhost:8000/api/v1/books/${id}`);
}

const postCommentfn = ({ review, bookid, token }) => {
  return axios.post(
    "http://localhost:8000/api/v1/reviews",
    {
      review,
      book: bookid,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
const saveBook = async ({ id, token }) => {
  return axios.put(
    "http://localhost:8000/api/v1/books/save",
    {
      bookId: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
const unsaveBook = async ({ id, token }) => {
  return await axios.put(
    "http://localhost:8000/api/v1/books/unsave",
    {
      bookId: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export {
  fetchBook,
  like,
  dislike,
  getComment,
  postCommentfn,
  saveBook,
  unsaveBook,
};
