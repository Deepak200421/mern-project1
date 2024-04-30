// navActions.js

// Action type constants
export const SET_NAV = 'SET_NAV';

// Action creator function
export const setNav = (navType) => {
  return {
    type: SET_NAV,
    payload: navType
  };
};
