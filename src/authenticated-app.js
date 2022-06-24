/** @jsxImportSource @emotion/react */

import "./App.css";
import { Button, FlexBox, Select } from "./components/lib";
import Book from "./components/book";
import React from "react";
import { Link } from "react-router-dom";

function AuthenticatedApp({ user }) {
  const [select, setSelect] = React.useState("All");
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
        }}
      >
        <h1>BookStore</h1>

        <FlexBox>
          {user?.user?.name ? (
            <>
              <small>{user?.user?.name}</small> <Button>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/login">
                <Button>Register</Button>
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
        }}
      >
        <FlexBox>
          <Button>Books</Button>
          <Button>Saved</Button>
        </FlexBox>

        <FlexBox>
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

      <div
        css={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "1rem",
        }}
      >
        <Book
          select={select}
          save={user?.user?.savedBooks}
          liked={user?.user?.likedBooks}
          token={user?.token}
          userID={user?.user?._id}
        />
      </div>
    </>
  );
}

export default AuthenticatedApp;
