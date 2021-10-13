import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 5
  };

  return (
    <div className='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  logout: PropTypes.func
};

export default Blog;
