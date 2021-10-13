import userService from '../services/users';

export const retrieveUsers = () => {
  return async (dispatch) => {
    const data = await userService.getAll();
    dispatch({
      type: 'RETRIEVE_USERS',
      data
    });
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'RETRIEVE_USERS':
    return action.data;
  default:
    return state;
  }
};

export default userReducer;