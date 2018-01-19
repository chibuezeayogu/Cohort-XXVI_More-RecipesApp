import ValidatePassword from 'validate-password';
import lodash from 'lodash';

const options = {
  enforce: {
    lowercase: true,
    uppercase: true,
    specialCharacters: true,
    numbers: true,
  },
};

const validator = new ValidatePassword(options);

/**
   * @description validateSignUp function
   * @param {Object} value - object
   * @returns {Object} return - return object
   */
export const validateSignUp = (value) => {
  const {
    firstName, lastName, email, password, image
  } = value;
  const errors = {};
  const filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (firstName.trim().length === 0) {
    errors.firstNameError = 'first name is required';
  } else if (firstName.length < 3) {
    errors.firstNameError = 'first name must be at least 3 characters long';
  }

  if (lastName.trim().length === 0) {
    errors.lastNameError = 'last name is required';
  } else if (lastName.length < 3) {
    errors.lastNameError = 'last name must be at least 3 characters long';
  }

  if (email.trim().length === 0) {
    errors.emailError = 'email is required';
  } else if (!filter.test(email)) {
    errors.emailError = 'email is not valide';
  }

  if (password.trim().length === 0) {
    errors.passwordError = 'password is required';
  } else if (password.length < 8) {
    errors.passwordError = 'password name must be at least 8 characters long';
  }

  const { isValid } = validator.checkPassword(password);
  if (!isValid) {
    errors.passwordError =
      'password must contain `uppercase, lowercase, number, spacial character`';
  }

  switch (image.type) {
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
    case 'image/bmp':
      break;
    default:
      errors.imageError = 'select a valid file type';
  }

  return { isError: !lodash.isEmpty(errors), errors };
};

/**
   * @description validateSignIn function
   * @param {Object} value - object
   * @returns {Object} return - return object
   */
export const validateSignIn = (value) => {
  const { email, password } = value;
  const errors = {};

  if (email.length === 0) {
    errors.emailError = 'email is required';
  }

  if (password.length === 0) {
    errors.passwordError = 'password is required';
  }

  return { isError: !lodash.isEmpty(errors), errors };
};

/**
   * @description validateAddRecipe function
   * @param {Object} value - object
   * @returns {Object} result - result object
   */
export const validateAddRecipe = (value) => {
  const {
    title, description, ingredients, procedures,
  } = value;
  const errors = {};

  if (title.trim().length === 0) {
    errors.titleError = 'title is required';
  } else if (title.length < 5) {
    errors.titleError = 'title must be at least 5 characters long';
  }

  if (description.trim().length === 0) {
    errors.descriptionError = 'description is required';
  } else if (description.length < 5) {
    errors.descriptionError = 'description must be at least 5 characters long';
  }

  if (ingredients.trim().length === 0) {
    errors.ingredientsError = 'ingredients is required';
  } else if (ingredients.length < 5) {
    errors.ingredientsError = 'ingredients must be at least 5 characters long';
  }

  if (procedures.trim().length === 0) {
    errors.proceduresError = 'procedures is required';
  } else if (procedures.length < 5) {
    errors.proceduresError = 'procedures must be at least 5 characters long';
  }

  return { isError: !lodash.isEmpty(errors), errors };
};