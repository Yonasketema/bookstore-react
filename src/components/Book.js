/** @jsxImportSource @emotion/react */

import React from "react";
import { DisLikeButton, LikeButton, Input, Button, CommentButton } from "./lib";
import { useQuery } from "react-query";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import {
  fetchBook,
  getComment,
  like,
  postCommentfn,
  dislike,
} from "./../utils/book-api";

import { useMutationHook } from "../utils/hook";
import "@reach/dialog/styles.css";

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
  const { mutate: likeBook } = useMutationHook(select, like);
  const { mutate: disLikeBook } = useMutationHook(select, dislike);
  const { mutate: postComment } = useMutationHook(id, postCommentfn);

  const { data } = useQuery(id, () => getComment(id));

  const comments = data?.data.data.book?.reviews?.map((bookReview, i) => {
    return (
      <div key={i}>
        <p>
          {bookReview.user.name}:<span>{bookReview.review}</span>
        </p>
      </div>
    );
  });

  function handleComment(event, bookid) {
    event.preventDefault();
    // alert(`comment ${event.target.elements.comment.value}`);
    const review = event.target.elements.comment.value;
    postComment({ review, bookid, token });
  }

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
              <CommentButton onClick={open}></CommentButton>
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
                      <p>yonas:💖💖💖💖💖💖💖</p> {comments}
                    </div>
                    <div>
                      <form onSubmit={(e) => handleComment(e, id)}>
                        <label htmlFor="comment">comment</label>
                        <Input id="comment" />
                        <Button type="submit">Post</Button>
                      </form>
                    </div>
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
