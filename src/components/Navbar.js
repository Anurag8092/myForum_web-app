import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  

  let location = useLocation();

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(false);
  }
  
  // useEffect(() => {
  //   // console.log(location.pathname)
  // }, [location]);

  return (
    <>
<nav class="navbar navbar-expand-lg navbar-dark">
  <div class="container-fluid">
  <Link className="navbar-brand" to="/">myForum</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
      <li class="nav-item">
      <Link className={`nav-item nav-link ${location.pathname === "/" && "active"}`} to="/">Home <span className="sr-only"></span></Link>
      </li>
    
      {!localStorage.getItem("token") ? 
      <>
      <li class="nav-item">
      <Link  className={`nav-item nav-link ${location.pathname === "/login" && "active"}`} to="/login">Log In</Link>
      </li>
      <li class="nav-item">
        <Link className={`nav-item nav-link ${location.pathname === "/signup" && "active"}`} to="/signup">Sign Up</Link>
        </li>
      </>
      :
      <>
      <li class="nav-item">
      <Link className={`nav-item nav-link ${location.pathname === "/myspace" && "active"}`} to="/myspace">My Space</Link>
      </li>
      
      <li class="nav-item">
      <Link className={`nav-item nav-link ${location.pathname === "/user" && "active"}`} to="/user">My Profile</Link>
      </li>
      
      <li class="nav-item">
      <Link to="#" className={"nav-item nav-link"} onClick={handleLogout}>Log Out </Link>
      </li>
      
      
      </>
  }
      </ul>
    </div>
  </div>
</nav>
    </>
  );
};

export default Navbar;
