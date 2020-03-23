import React from "react";

const Loading = ({ loading, onClick }) => {
  if (loading === false) {
    return <button class="btn disabled">mengecek data...</button>;
  }
  return (
    <button
      class="btn waves-effect blue waves-light"
      type="submit"
      onClick={onClick}
    >
      Submit
    </button>
  );
};

export default Loading;
