import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setNotice } from '../reducers/noticeReducer';
import { deleteBlog } from '../reducers/blogReducer';
import { Button } from '@mui/material';

const BlogDeletion = ({ blog, forceLogout }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const removeBlog = async () => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
        await dispatch(deleteBlog(blog.id));
        history.push('/');
        dispatch(setNotice(`Removed blog '${blog.title}' by ${blog.author}`, 5, 'success'));
      }
    } catch (exception) {
      if (JSON.stringify(exception).includes('401')) {
        forceLogout();
        dispatch(setNotice('Session timed out: Log back in to complete operation', 5, 'error'));
      }
    }
  };

  return (
    <Button variant='outlined' size='small' onClick={removeBlog}>
      remove
    </Button>
  );
};

BlogDeletion.propTypes = {
  blog: PropTypes.object.isRequired,
  forceLogout: PropTypes.func
};

export default BlogDeletion;
