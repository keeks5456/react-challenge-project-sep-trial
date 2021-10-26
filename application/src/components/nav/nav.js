import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { logoutUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

const Nav = ({userEmail}) => {
  const dispatch = useDispatch();
  console.log(userEmail)
  return (
    <>
    <div className="nav-strip">
    <h4>{userEmail}</h4>
      <Link to={"/order"} className="nav-link">
        <div className="nav-link-style">
          <label className="nav-label">Order Form</label>
        </div>
      </Link>
      <Link to={"/view-orders"} className="nav-link" id="middle-link">
        <div className="nav-link-style">
          <label className="nav-label">View Orders</label>
        </div>
      </Link>
      <Link to={'/'} onClick={() => dispatch(logoutUser())}className="nav-link">
        <div className="nav-link-style">
          <label className="nav-label">Log Out</label>
        </div>
      </Link>
    </div>
    </>
  );
};

const mapStateToProps = (state) =>{
return {
  userEmail: state.auth.email
}
}

export default connect(mapStateToProps, null)(Nav);
