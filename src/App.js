/** @jsxImportSource @emotion/react */

import { Button, FlexBox, Select } from "./components/lib";
import Book from "./components/Book";
import React from "react";

import "./App.css";

function App() {
  const [select, setSelect] = React.useState(" ");
  console.log(select);
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
          <Button>Login</Button>
          <Button>Logout</Button>
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
            <option value=" ">All</option>
            <option value="fiction">Fiction</option>
            <option value="historical"> Historical</option>
            <option value="science"> Science</option>
          </Select>
          <Select></Select>
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
        <Book select={select} />
      </div>
    </>
  );
}

export default App;
