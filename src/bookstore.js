/** @jsxImportSource @emotion/react */

import { Button, FlexBox, Select } from "./components/lib";
import Book from "./components/book";
import React from "react";
import { Link } from "react-router-dom";
import * as mq from "./style/media-queries";

import { useUser } from "./context/user-context";

function BookStore({ logout }) {
  const [select, setSelect] = React.useState("All");
  const [user] = useUser();

  return (
    <>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          borderBottom: "1px solid #999",
          height: "3rem",
          [mq.mini]: {
            flexDirection: "column",
          },
        }}
      >
        <h1>BookStore</h1>

        <FlexBox>
          {user?.user?.name ? (
            <>
              <small>{user?.user?.name}</small>{" "}
              <Button onClick={logout}> Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </>
          )}
        </FlexBox>
      </div>

      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          [mq.mini]: {
            flexDirection: "column",
            margin: "1rem",
          },
        }}
      >
        <FlexBox
          css={{
            [mq.mini]: {
              flexDirection: "column",
              margin: "1rem",
            },
          }}
        >
          <Button>Books</Button>
          <Button>Saved</Button>
        </FlexBox>

        <FlexBox
          css={{
            [mq.mini]: {
              flexDirection: "column",
              margin: "1rem",
            },
          }}
        >
          <Select onChange={(e) => setSelect(e.target.value)}>
            <option value="All">All</option>
            <option value="fiction">Fiction</option>
            <option value="historical"> Historical</option>
            <option value="science"> Science</option>
          </Select>
          <Select>
            <option value="Popular">Popular</option>
            <option value="Newest">Newest</option>
            <option value="oldest">oldest</option>
          </Select>
        </FlexBox>
      </div>

      <div>
        <Book select={select} />
      </div>
    </>
  );
}

export default BookStore;
