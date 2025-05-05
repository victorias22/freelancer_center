import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = ()=>{
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1> Explore freelance services for your high-tech needs.</h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input 
              type="text" 
              placeholder='Try "Website Coding"' 
              onChange={e=>setInput(e.target.value)}/>
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
