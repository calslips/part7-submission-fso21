import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlogLikes } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Likes = ({ blog }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const dispatch = useDispatch();

  const handleLike = (likeStatus) => {
    if (likeStatus) {
      const updateLikes = {
        likes: blog.likes + 1
      };
      dispatch(updateBlogLikes(blog.id, blog.user, updateLikes));
      setAlreadyLiked(likeStatus);
    } else {
      const updateLikes = {
        likes: blog.likes - 1
      };
      dispatch(updateBlogLikes(blog.id, blog.user, updateLikes));
      setAlreadyLiked(likeStatus);
    }
  };

  return (
    <>
      {alreadyLiked
        ? <p className='likes'>
          {blog.likes} likes&nbsp;
          <Button size='small' variant='outlined' onClick={() => {handleLike(false);}}>
            unlike
          </Button>
        </p>
        : <p className='likes'>
          {blog.likes} likes&nbsp;
          <Button size='small' variant='contained' onClick={() => {handleLike(true);}}>
            like
          </Button>
        </p>
      }
    </>
  );
};

Likes.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Likes;
