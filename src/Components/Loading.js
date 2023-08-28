import React from "react";
import load from "../images/loading.gif";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mx-auto">
      <img src={load} alt="loading" />
    </div>
  );
};

export default Loading;
