import React from "react";

function Header({ setShowForm, showForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="learning" />
        <h1>Front Must-Haves</h1>
      </div>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="btn btn-lg btn-toggle"
      >
        {showForm ? "close" : "Share knolwledge"}
      </button>
    </header>
  );
}

export default Header;
