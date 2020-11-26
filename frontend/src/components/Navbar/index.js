import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authAction";
import "./style.css";

function Navbar(props) {
  function toggleNav() {
    animateSlider();
    const burgerButton = document.getElementById("burger");
    burgerButton.classList.toggle("is-active");
  }

  function animateSlider() {
    const slider = document.getElementsByClassName("slider")[0];
    document.getElementById("root").style.overflow = "hidden";
    slider.classList.toggle("active");

    const list = document.getElementsByClassName("list")[0];
    list.childNodes.forEach((e, index) => {
      if (e.style.animation) e.style.animation = "";
      else
        e.style.animation = `listItemFade 0.5s ease forwards ${
          index / 5 + 0.3
        }s`;
    });
  }

  return (
    
    <nav className="nav-wrapper">
      <div id="burger" className="ico-btn" style={{width:'100%' , justifyContent:'space-between'}} onClick={toggleNav}>
        <span class="ico-btn__burger"></span>
           <span style={{}}> Back Stage Cinema </span>
        <div>
        <span style={{ }}>
          { props.loggedIn ? < div style={{}}> {props.name} </div> : <div></div>}
          <a href="https://meet.google.com/linkredirect?authuser=0&dest=https%3A%2F%2Fsecret-spire-75396.herokuapp.com%2F" target="_blank">
            <div style={{zIndex:9999 , color:'white'}} > 
                 Contact Us 
            </div>
          </a>
        </span>
        </div>
      </div>
      
      {/* <Link className="nav-brand" to="/">iCinema</Link> */}

      <div id="slider" className="slider">
        <ul className="list">
          <Link onClick={toggleNav} to="/movies">
            Home
          </Link>
          {!props.loggedIn ? (
            <>
              <Link onClick={toggleNav} to="/login">
                Login
              </Link>

              <Link onClick={toggleNav} to="/resigter">
                Register
              </Link>
            </>
          ) : (
            <Link
              onClick={() => {
                toggleNav();
                props.signOut();
              }}
              to="/#"
            >
              Log out 
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  console.log(state.auth.userData.email)
  return {
    loggedIn: state.auth.loggedIn,
    name:state.auth.userData.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
