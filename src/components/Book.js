/** @jsxImportSource @emotion/react */

import React from "react";
import { DisLikeButton, LikeButton, Input, Button } from "./lib";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

function fetchBook(select) {
  return window
    .fetch(`http://localhost:8000/api/v1/books?select=${select}`, {})
    .then((response) => response.json());
}

const likePost = ({ id, token }) => {
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

export const useLikeBook = (query) => {
  const queryClient = useQueryClient();
  return useMutation(likePost, {
    onSuccess: (newData) => {
      // queryClient.setQueriesData(query, (oldData) => {
      //   // const likebox = oldData.data.books.map((book) => {
      //   //   if (book._id === newData.data.result._id) {
      //   //     return newData.data.result;
      //   //   } else {
      //   //     return book;
      //   //   }
      //   // });

      //   return {
      //     ...oldData,
      //     data: [...oldData.data.books, newData],
      //   };
      // });
      queryClient.invalidateQueries(query);
    },
  });
};
export const useDisLikeBook = (select) => {
  const queryClient = useQueryClient();
  return useMutation(dislike, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(select);
    },
  });
};

////////////////////////////////////////////////////////////////////////////////////
function BookDisplay({ select, save, token, userID, liked }) {
  const { isLoading, isError, data } = useQuery(select, () =>
    fetchBook(select === "All" ? "" : select)
  );

  if (isLoading) {
    return <p>Loading.......</p>;
  }
  if (isError) {
    return <p>Error.......</p>;
  }

  const books = data?.data.books.map((book) => (
    <Book
      key={book.id}
      id={book.id}
      img={book.img}
      title={book.title}
      liked={book.likes}
      //
      select={select}
      save={save}
      token={token}
      userID={userID}
    />
  ));

  return <>{books}</>;
}

const Book = ({ img, title, id, save, token, liked, userID, select }) => {
  const { mutate: likeBook } = useLikeBook(select);
  const { mutate: disLikeBook } = useDisLikeBook(select);

  const [openModal, setOpenModal] = React.useState(false);

  const open = () => setOpenModal(true);
  const close = () => setOpenModal(false);

  return (
    <section
      css={{
        width: "15rem",
        padding: "1rem",
        border: "1px solid #999",
      }}
    >
      <img
        css={{
          width: "100%",
        }}
        src={img}
        alt=""
      />
      <div>
        <p>{title}</p>

        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            {liked?.length}
            {liked?.includes(userID) ? (
              <DisLikeButton
                onClick={() => {
                  disLikeBook({ id, token });
                }}
              />
            ) : (
              <LikeButton
                onClick={() => {
                  likeBook({ id, token });
                }}
              />
            )}
            <div>
              <button onClick={open}>
                <i className="fa-solid fa-comment fa-2x">c</i>
              </button>
              <Dialog aria-label="review" isOpen={openModal} onDismiss={close}>
                <div>
                  <button
                    onClick={close}
                    css={{
                      position: "relative",
                      left: "90%",
                    }}
                  >
                    Close
                    <span aria-hidden>×</span>
                  </button>

                  <div>
                    <div>
                      <p>yonas:💖💖💖💖💖💖💖</p>{" "}
                    </div>
                    <div>
                      <label htmlFor="comment">comment</label>
                      <Input id="comment" />
                    </div>
                    <Button>Post</Button>
                  </div>
                </div>
                <h3>Review</h3>
              </Dialog>
            </div>
          </div>

          <div>
            <button>
              <i className="fa-solid fa-bookmark fa-2x">S</i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDisplay;
