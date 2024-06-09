import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h4>Error 404...</h4>
      <div style={{ height: "1rem" }}></div> {/* Blank line for spacing */}
      <p>No such Page Available</p>
      <button onClick={gotoHome}>Home</button>
    </div>
  );
}

/*comments to see at last
uninstall react-hook-form package

// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
// import "bootstrap/dist/js/bootstrap.bundle.js";

requesting client should also HIT accept API

always have a key fetaure when you're rendering componenets by mapping, filtering




*/
