let timeoutID;

export const setNotice = (noticeContent, duration, severity) => {
  clearTimeout(timeoutID);
  return (dispatch) => {
    dispatch({
      type: 'POST_NOTICE',
      notification: noticeContent,
      severity
    });
    timeoutID = setTimeout(() => {
      dispatch(clearNotice());
    }, duration * 1000);
  };
};

const clearNotice = () => {
  return {
    type: 'CLEAR_NOTICE',
    notification: []
  };
};

const noticeReducer = (state = [], action) => {
  switch (action.type) {
  case 'POST_NOTICE':
    return [action.notification, action.severity];
  case 'CLEAR_NOTICE':
    return [];
  default:
    return state;
  }
};

export default noticeReducer;