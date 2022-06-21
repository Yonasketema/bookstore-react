/** @jsxImportSource @emotion/react */

import React from "react";

import { useQuery } from "react-query";

function fetchBook(select) {
  return window
    .fetch(`http://localhost:8000/api/v1/books?select=${select}`, {})
    .then((response) => response.json());
}

function BookDisplay({ select }) {
  const { isLoading, isError, data, error, refetch } = useQuery(select, () =>
    fetchBook(select)
  );

  if (isLoading) {
    return <p>Loading.......</p>;
  }
  if (isError) {
    return <p>Error.......</p>;
  }
  console.log(data.data);

  const books = data?.data.books.map((book) => (
    <Book key={book.id} img={book.img} title={book.title} />
  ));

  return <>{books}</>;
}

const Book = ({ img, title }) => {
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
            <button>
              <i className=" heart fa-solid fa-heart fa-2x "></i>
            </button>

            <div>
              <button>
                <i className="fa-solid fa-comment fa-2x"></i>
              </button>
            </div>
          </div>

          <div>
            <button>
              <i className="fa-solid fa-bookmark fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDisplay;
