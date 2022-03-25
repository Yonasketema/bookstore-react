import React from "react";

const Layout = (props) => {
  return (
    <React.Fragment>
      <header></header>
      <main>{props.childern}</main>
    </React.Fragment>
  );
};

export default Layout;
