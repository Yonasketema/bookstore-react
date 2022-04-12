import React from "react";

import "./layout.css";

import Header from "./../header/header";
import Fliter from "./../filter/filter";
import Footer from "./../footer/footer";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header></Header>
      <Fliter></Fliter>
      <main>{props.children}</main>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default React.memo(Layout);
