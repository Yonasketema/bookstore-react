import React, { useState } from "react";

import data from "./../../global";

const options = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "fiction",
    value: "fiction",
  },
  {
    label: "historical",
    value: "historical",
  },
  {
    label: "science",
    value: "science",
  },
  {
    label: "bio",
    value: "bio",
  },
];

const Select = () => {
  const [{ selectValue }, setBook] = React.useContext(data);
  const yonas = "selectValue";

  console.log("[select.js] bookOption", selectValue);

  function handleChange(e) {
    setBook((prev) => ({ ...prev, [yonas]: e.target.value }));
  }

  return (
    <select value={selectValue} onChange={(e) => handleChange(e)}>
      {options.map((option, i) => (
        <option key={option.value + i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
