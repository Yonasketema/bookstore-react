import axios from "axios";

function fetchBook(select) {
  return window
    .fetch(`${process.env.REACT_APP_AUTH_URL}/api/v1/books?select=${select}`, {})
    .then((response) => response.json());
}

const like = ({ id, token }) => {
  return axios.put(
    `${process.env.REACT_APP_AUTH_URL}/api/v1/books/like`,
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
    `${process.env.REACT_APP_AUTH_URL}/api/v1/books/unlike1`,
    {
      bookId: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

function getComment(id) {
  return axios.get(`${process.env.REACT_APP_AUTH_URL}/api/v1/books/${id}`);
}

const postCommentfn = ({ review, bookid, token }) => {
  return axios.post(
    `${process.env.REACT_APP_AUTH_URL}/api/v1/reviews`,
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
    `${process.env.REACT_APP_AUTH_URL}/api/v1/books/save`,
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
    `${process.env.REACT_APP_AUTH_URL}/api/v1/books/unsave`,
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
