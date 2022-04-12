import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { User } from "./../../userState";
import Classes from "./comment.module.css";

const Comment = ({
  img,
  bookReviews,
  setBookReviews,
  bookid,
  open,
  onClose,
}) => {
  const { data } = User();
  const { name } = data ? data.data.user : "";
  const formik = useFormik({
    initialValues: {
      review: "",
    },

    onSubmit: async (values) => {
      postComment(values);
    },
  });

  if (!open) return null;

  async function postComment({ review }) {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/reviews",
      {
        review,
        book: bookid,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );

    setBookReviews((prev) => [
      ...prev,
      {
        review: data.data.review.review,
        user: {
          name: name,
        },
      },
    ]);
  }

  if (!bookReviews) {
    return null;
  }

  const comments = bookReviews.map((bookReview, i) => {
    return (
      <div key={i}>
        <p className={Classes.name}>
          {bookReview.user.name}:
          <span className={Classes.review}>{bookReview.review}</span>
        </p>
      </div>
    );
  });

  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "3rem",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
    width: "70%",
    height: "52rem",
  };
  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000,
  };

  return (
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <div className={Classes.img}>
          <img src={img} alt="" />
        </div>
        <div className={Classes.Comment}>
          <div className={Classes.modalContent}>{comments}</div>
          <form className={Classes.submitform} onSubmit={formik.handleSubmit}>
            <input
              id="review"
              name="review"
              onChange={formik.handleChange}
              value={formik.values.review}
              type="text"
              className={Classes.submitinput}
              style={{ width: "100%", borderRadius: "0" }}
            ></input>
            <button type="submit" className={Classes.submitButton}>
              Post
            </button>
          </form>
        </div>
        <button className={Classes.CloseModalButton} onClick={onClose}>
          X
        </button>
      </div>
    </>
  );
};

export default Comment;
