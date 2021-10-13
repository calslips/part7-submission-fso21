import loginService from '../services/login';

export const login = (credentials) => {
  return async (dispatch) => {
    const data = await loginService.login(credentials);
    dispatch({
      type: 'LOGIN',
      data
    });
  };
};

export const maintainLogin = (userInfo) => {
  return async (dispatch) => {
    dispatch({
      type: 'MAINTAIN_LOGIN',
      data: userInfo
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      data: null
    });
  };
};

const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data;
  case 'MAINTAIN_LOGIN':
    return action.data;
  case 'LOGOUT':
    return action.data;
  default:
    return state;
  }
};

export default loginReducer;