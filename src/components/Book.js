/** @jsxImportSource @emotion/react */

import "@reach/dialog/styles.css";
import React from "react";
import { DisLikeButton, LikeButton, Input, Button } from "./lib";
import { UnSavedButton } from "./lib";
import { CommentButton } from "./lib";
import { SaveButton } from "./lib";
import { useQuery } from "react-query";
import { Dialog } from "@reach/dialog";
import * as fn from "./../utils/book-api";
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../utils/hook";
import { useUser } from "./../context/user-context";
import * as mq from "./../style/media-queries";

function BookDisplay({ select }) {
  const { isLoading, isError, data } = useQuery(select, () =>
    fn.fetchBook(select === "All" ? "" : select)
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
      query={select}
    />
  ));

  return (
    <div
      css={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: "repeat(4,25%)",
        gap: "1rem",
        justifyContent: "space-between",
        [mq.small]: {
          width: "50%",
          gridTemplateColumns: "repeat(3,70%)",
        },
        [mq.tab]: {
          width: "50%",
          gridTemplateColumns: "repeat(2,100%)",
        },
        [mq.mini]: {
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {books}
    </div>
  );
}

const Book = ({ id, img, title, liked, query }) => {
  const [user] = useUser();

  const save = user?.user?.savedBooks;
  const token = user?.token;
  const userID = user?.user?._id;

  const { mutate: likeBook } = useMutationHook(query, fn.like);
  const { mutate: disLikeBook } = useMutationHook(query, fn.dislike);
  const { mutate: postComment } = useMutationHook(id, fn.postCommentfn);
  const { mutate: saveBook } = useMutationHook(id, fn.saveBook);
  const { mutate: unsaveBook } = useMutationHook("user", fn.unsaveBook);

  const navigate = useNavigate();

  const { data } = useQuery(id, () => fn.getComment(id));

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
        marginTop: "3rem",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px",
        borderRadius: "1rem",
        fontSize: "1rem",
        color: "#333",
      }}
    >
      <img
        css={{
          width: "100%",
          height: "12rem",
        }}
        src={img}
        alt=""
      />
      <div>
        <p>{title[0]}</p>

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
                  user ? disLikeBook({ id, token }) : navigate("/login");
                }}
              />
            ) : (
              <LikeButton
                onClick={() => {
                  user ? likeBook({ id, token }) : navigate("/login");
                }}
              />
            )}
            <div>
              <CommentButton onClick={open} />
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
                    <div>comments {comments}</div>
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
            {save ? (
              <UnSavedButton onClick={saveBook({ id, token })} />
            ) : (
              <SaveButton unsaveBook={unsaveBook({ id, token })} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDisplay;
