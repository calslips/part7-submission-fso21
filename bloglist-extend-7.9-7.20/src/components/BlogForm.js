import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setNotice } from '../reducers/noticeReducer';
import { createBlog } from '../reducers/blogReducer';
import {
  Button,
  TextField
} from '@mui/material';

const BlogForm = ({ forceLogout }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [createBlogFormVisible, setCreateBlogFormVisible] = useState(false);

  const hideWhenVisible = { display: createBlogFormVisible ? 'none' : '' };
  const showWhenVisible = { display: createBlogFormVisible ? '' : 'none' };

  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        title,
        author,
        url
      };

      await dispatch(createBlog(blogObject));
      dispatch(setNotice(`A new blog '${blogObject.title}' by ${blogObject.author} added`, 5, 'success'));
      setTitle('');
      setAuthor('');
      setUrl('');
      setCreateBlogFormVisible(false);
    } catch (exception) {
      if (JSON.stringify(exception).includes('401')) {
        forceLogout();
        dispatch(setNotice('Session timed out: Log back in to complete operation', 5, 'error'));
      } else if (JSON.stringify(exception).includes('400')) {
        dispatch(setNotice('Title and url are required to add new blog', 5, 'error'));
      }
    }
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='contained' size='small' onClick={() => setCreateBlogFormVisible(true)}>
          create new blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            <TextField
              size='small'
              id='title'
              label='title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <TextField
              size='small'
              id='author'
              label='author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <TextField
              size='small'
              id='url'
              label='url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <Button variant='contained' size='small' type='submit'>
            create
          </Button>
        </form>
        <Button variant='outlined' size='small' onClick={() => setCreateBlogFormVisible(false)}>
          cancel
        </Button>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  forceLogout: PropTypes.func
};

export default BlogForm;
