import React from "react";
import { NavLink } from "react-router-dom";

import Select from "../../containers/select/select";

import "./filter.css";

const Fliter = () => {
  return (
    <section className="filter-container">
      <div className="filter">
        <div className="filter-btn">
          <NavLink to="/" activeClassName="active">
            <button className="btn-nav">
              <i className="fa-solid fa-book"></i>Books
            </button>
          </NavLink>
          <NavLink to="/saved" activeClassName="active">
            <button className="btn-nav">
              <i className="fa-solid fa-bookmark"></i>Saved
            </button>
          </NavLink>
        </div>
        <div className="select">
          <Select />
          <select name="#" id="#">
            <option value="Popular">Popular</option>
            <option value="Newest">Newest</option>
            <option value="oldest">oldest</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Fliter;
