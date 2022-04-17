import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div
      id="loader"
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <BeatLoader size={40} />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
