import React, { Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../actions/userActions";
import PropTypes from "prop-types";
import logo from "../../SB.png";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";

const FullHeader = ({ user }) => {
  let history = useHistory();
  const dispatch = useDispatch({});

  const [toggleNavBar, setToggleNavBar] = useState({
    isOpen: false
  });

  console.log(toggleNavBar);
  console.log(user.user ? user.user.username : "www");
  return (
    <MDBNavbar color="elegant-color" expand="md">
      <MDBNavbarBrand href="#">
        <img src={logo} style={{ width: "3rem", width: "3rem" }}></img>
      </MDBNavbarBrand>
      <MDBNavbarToggler
        onClick={() =>
          setToggleNavBar({
            isOpen: !toggleNavBar.isOpen
          })
        }
      />
      <MDBCollapse id="navbarCollapse3" isOpen={toggleNavBar.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="#!">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#!">Create a Room</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle className="dopdown-toggle" nav>
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"
                  className="rounded-circle z-depth-0"
                  style={{ height: "35px", padding: 0 }}
                  alt=""
                />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
                <MDBDropdownItem href="#!">My account</MDBDropdownItem>
                <MDBDropdownItem href="#!">Log out</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {}
)(FullHeader);
