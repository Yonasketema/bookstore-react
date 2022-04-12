import React, { useState } from "react";
import Comment from "./../../containers/comment/comment";
import Classes from "./book.module.css";

const Book = ({
  imgAddress,
  title,
  likes,
  id,
  likePost,
  liked,
  dislike,
  saved,
  unsaved,
  savedBook,
  getBookReview,
  bookReviews,
  setBookReviews,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={Classes.book_container}>
      <img src={imgAddress} alt="" />
      <div className={Classes.img_tag}>
        <p>{title}</p>

        <div className={Classes.review_section}>
          <div className={Classes.like_comment}>
            {liked ? (
              <button className={Classes.btn_saved}>
                <i
                  className=" heart fa-solid fa-heart fa-2x "
                  onClick={() => dislike(id)}
                  style={{ color: "red" }}
                ></i>

                {likes}
              </button>
            ) : (
              <button className={Classes.btn_saved}>
                <i
                  className=" heart fa-solid fa-heart fa-2x "
                  onClick={() => likePost(id)}
                  style={{ color: "#ccc" }}
                ></i>

                {likes}
              </button>
            )}

            <div>
              <button
                className={Classes.btn_saved}
                onClick={(e) => {
                  setIsOpen(true);
                  getBookReview(id);
                }}
              >
                <i className="fa-solid fa-comment fa-2x"></i>
              </button>
              <Comment
                img={imgAddress}
                bookReviews={bookReviews}
                setBookReviews={setBookReviews}
                bookid={id}
                open={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </div>

          <div className={Classes.save_container}>
            {savedBook ? (
              <button className={Classes.btn_saved}>
                <i
                  className="fa-solid fa-bookmark fa-2x"
                  onClick={() => unsaved(id)}
                  style={{ color: "#292929" }}
                ></i>
              </button>
            ) : (
              <button className={Classes.btn_saved}>
                <i
                  className="fa-solid fa-bookmark fa-2x"
                  onClick={() => saved(id)}
                  style={{ color: "#ccc" }}
                ></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
