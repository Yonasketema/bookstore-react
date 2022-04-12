import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Display from "./components/display/display";
import GlobalState from "./global";
import { User } from "./userState";

import "./App.css";

function App() {
  const initialState = {
    selectValue: "",
    userName: "",
  };

  const [state, setState] = React.useState(initialState);

  const { isLoading, isError, data, error } = User();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log("[App.js]", data);

  return (
    <GlobalState.Provider value={[state, setState]}>
      <Layout>
        <h2 style={{ textAlign: "center" }}>
          {data ? (
            <Display name={data.data.user.name} />
          ) : (
            <Display name="please login." />
          )}
        </h2>
        <div className="main">
          <Outlet />
        </div>
      </Layout>
    </GlobalState.Provider>
  );
}

export default React.memo(App);
