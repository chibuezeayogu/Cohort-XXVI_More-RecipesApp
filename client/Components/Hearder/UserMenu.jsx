import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import image from '../../img/logo.jpg';

/**
 * menu component athenticated users
 * @class
 * @extends Component
 */
class UserMenu extends Component {
  /**
   * @description initializes dropdown and button collapse
   * @method
   * @memberOf UserMenu
   * @returns {void}
   */
  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      hover: true,
      belowOrigin: true,
      alignment: 'right',
    });
    $('.button-collapse').sideNav();
  }

  /**
   * @description routes to /if user is logs' out
   * @method
   * @memberOf UserMenu
   * @param {Event} e
   * @returns {void}
   */
  logout(e) {
    e.preventDefault();
    localStorage.removeItem('jwtToken');
    this.props.SignOut();
  }

  render() {
    const token = localStorage.getItem('jwtToken');
    const { userData } = jwtDecode(token);
    console.log(userData);
    return (
      <div>
        <div>
          <nav>
            <div className="nav-wrapper black">
              <a href="#!" className="brand-logo"><img src={image} className="responsive-img" alt="" style={{ height: 25 }} />More Recipes</a>
              <a href="#!" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li ><Link to="/recipes"><i className="fa fa-home" /> Recipes </Link></li>
                <li><Link to="/addrecipe"><i className="fa fa-plus" aria-hidden="true" /> Add Recipe</Link></li>
                <li><Link to="/search"><i className="fa fa-search" aria-hidden="true" /> Search</Link></li>
                <li>
                  <a href="#!" className="dropdown-button" data-activates="dropdown" data-beloworigin="true">
                    {userData.user.firstName}
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </a>
                </li>
              </ul>
              <ul className="side-nav" id="mobile-demo">
                <li ><Link to="/recipes"><i className="fa fa-home" /> Recipes</Link></li>
                <div className="divider" />
                <li><Link to="/addrecipe"><i className="fa fa-plus" aria-hidden="true" /> Add Recipe</Link></li>
                <div className="divider" />
                <li><Link to="/search"><i className="fa fa-search" aria-hidden="true" /> Search</Link></li>
                <div className="divider" />
                <li><Link to="/user/profile"><i className="fa fa-user-plus" aria-hidden="true" /> Profile</Link></li>
                <div className="divider" />
                <li><Link to="/user/recipes"><i className="fa fa-user" aria-hidden="true" /> My Recipes</Link></li>
                <div className="divider" />
                <li><Link to="/user/recipes/favourites"><i className="fa fa-heart" aria-hidden="true" /> My Favourites</Link></li>
                <div className="divider" />
                <li onClick={e => this.logout(e)}><i className="fa fa-sign-out" aria-hidden="true" /> Logout</li>
              </ul>
            </div>
          </nav>
        </div>

        <ul id="dropdown" className="dropdown-content">
          <div className="divider" />
          <li>
            <Link to="/user/profile">
              <i className="fa fa-user" aria-hidden="true" /> My Profile
            </Link>
          </li>
          <div className="divider" />
          <li>
            <Link to="/user/recipes">
              <i className="fa fa-user" aria-hidden="true" /> My Recipes
            </Link>
          </li>
          <div className="divider" />
          <li>
            <Link to="/user/recipes/favourites">
              <i className="fa fa-heart" aria-hidden="true" /> My Favourites
            </Link>
          </li>
          <div className="divider" />
          <li onClick={e => this.logout(e)}>
            <i className="fa fa-sign-out" aria-hidden="true" /> Logout
          </li>
        </ul>
      </div>
    );
  }
}

UserMenu.propTypes = {
  push: PropTypes.func.isRequired,
  SignOut: PropTypes.func.isRequired
};

export default UserMenu;
