import React from "react";
import Gambar from "../container/aneh.jpg";
const Props = ({ data, onClick }) => {
  return (
    //latest
    <>
      <div className="container">
        <div className="post card" style={{ display: "flex" }}>
          <div className="title">
            <img src={data.thumbnail} />
          </div>
          <div class="card-action">
            <a onClick={onClick}>{data.title}</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Props;
