export const isTagsIncludesSearchValue = (arr, searchValue) => {
  return arr.reduce((acc, tag) => {
    if (tag.toLowerCase().includes(searchValue.toLowerCase())) {
      acc = true;
    }
    return acc;
  }, false);
};

export const isTitleIncludesSearchValue = (title, searchValue) => {
  if (title.toLowerCase().includes(searchValue.toLowerCase())) {
    return true;
  } else {
    return false;
  }
};

export const filterData = (codes, cb1, cb2, currentValue) => {
  return codes.reduce((acc, code) => {
    if (cb1(code.tags, currentValue) || cb2(code.title, currentValue)) {
      acc.push(code);
    }
    return acc;
  }, []);
};

export const  validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
export const validatePassword = (password) => {
  if (
    password.length >= 6 &&
    password.match(/^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
  ) {
    return true;
  } else return false;
};
export const validateDisable = (email,password,emailError,passwordError) => {
  if (
    email &&
    password &&
    !emailError.trim() &&
    !passwordError.trim()
  ) {
    return true;
  } else return false;
};