import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Preloader from './Preloder.jsx';
import jwtDecode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import Pagination from 'rc-pagination';
import { connect } from 'react-redux';
import UserRecipeCard from './UserRecipeCard.jsx';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';
import * as actionCreators from '../action/actionCreators';
import { onPageChange, onPageReload } from '../util/pageFunctions'
import 'rc-pagination/assets/index.css';

/**
 *
 * @description UserRecipesList used to display recipes
 *
 * @class
 *
 * @extends Component
 *
 */
class UserRecipesList extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = ({ isLoading: true });
  }

  /**
   * @description fetch user favourite recipe before component mounts
   *
   * @method
   *
   * @memberOf UserRecipesList
   *
   * @returns {void}
   *
   */
  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    const currentPage = this.props.location.search.substring(6);
    const { user } = jwtDecode(token);
    if (!token) {
      this.props.history.push('/');
    } else {
      const { isTrue, offset } = onPageReload(currentPage);
      if (isTrue) {
        this.props.getUserRecipes(user.id, offset);
      }
    }
  }

   /**
   * @description checks if next recipes is fetched and disables isLoading
   *
   * @method
   *
   * @memberOf UserRecipesList
   *
   * @param {Object} nextProps - nextProps object
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const token = localStorage.getItem('jwtToken');
    const { user } = jwtDecode(token);
    const { isFetched, recipes, isDeleted, pagination } = nextProps.userRecipeReducer;
    if (isFetched) {
      this.setState({ isLoading: false });
    } else {
      const { isTrue, offset } = onPageChange(recipes, isDeleted, pagination);
      if (isTrue) {
        this.setState({ isLoading: true });
        this.props.getUserRecipes(user.id, offset);
      }
    }
  }

  /**
   * @description handels page change
   *
   * @method
   *
   * @memberOf UserFavouritesList
   *
   * @param {page} page - current page
   *
   * @returns {void}
   */
  onChange(page) {
    const token = localStorage.getItem('jwtToken');
    const { user } = jwtDecode(token);
    this.props.history.push(`/user/recipes?page=${page}`);
    const offset = 6 * (page - 1);
    this.props.getUserRecipes(user.id, offset);
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf UserRecipesList
   *
   * @returns {void}
   *
   */
  render() {
    const { recipes, pagination } = this.props.userRecipeReducer;
    let userRecipes;
    if (recipes && recipes.length === 0 && !this.state.isLoading) {
      userRecipes = <h4 className="center-align">
      You have not added any recipe
      </h4>;
    } else if (recipes.length > 0) {
      userRecipes = recipes.map(recipe => (<UserRecipeCard
        {...this.props}
        key={recipe.id}
        recipe={recipe}
      />));
    }
    return (
      <div className="body grey lighten-5">
        <UserMenu />
        <div className="main">
          <div className="container">
            <div className="row">
              <h4 className="center">My Recipes</h4>
              <hr />
            </div>
            <div className="row left align-recipe" style={{ width: '100%' }}>
              {this.state.isLoading ? <Preloader /> : userRecipes}
            </div>
          </div>
        </div>
        <div className="row s12 m6 l3">
        { recipes.length > 0 ?
            <Pagination
              onChange={this.onChange}
              current={pagination.currentPage}
              pageSize={pagination.pageSize}
              total={pagination.totalCount}
            />
          : ''
          }
        </div>
        <Footer />
      </div>
    );
  }
}

UserRecipesList.propTypes = {
  getUserRecipes: PropTypes.func.isRequired,
  userRecipeReducer: PropTypes.shape({
    recipes: PropTypes.shape.isRequired,
    isFetched: PropTypes.bool.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  userRecipeReducer: state.userRecipeReducer,
  userData: state.userData,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipesList);