import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);


  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
      <div className="logo">
                <Link to='/' className='link'>
                <span className='text1'>Freelance</span>
                <span className='text2'>Center</span>
                </Link>
            </div>
        <div className="links">
          <span>FreelanceCenter Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src={currentUser.img || "/img/noavatar.jpg"} 
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                {currentUser.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      Gigs
                    </Link>
                    <Link className="link" to="/add">
                      Add New Gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?cat=programming">
             Programming
            </Link>
            <Link className="link menuLink" to="/gigs?cat=cyber">
            Cyber
            </Link>
            <Link className="link menuLink" to="/gigs?cat=hardware">
            Hardware
            </Link>
            <Link className="link menuLink" to="/gigs?cat=ai">
              AI Services
            </Link>
            <Link className="link menuLink" to="/gigs?cat=digital">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/gigs?cat=embedded">
             Embedded
            </Link>
            <Link className="link menuLink" to="/gigs?cat=automata">
              Automata Theory
            </Link>
            <Link className="link menuLink" to="/gigs?cat=datascience">
              Data Science
            </Link>
            <Link className="link menuLink" to="/gigs?cat=webdesign">
              Web Design
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
