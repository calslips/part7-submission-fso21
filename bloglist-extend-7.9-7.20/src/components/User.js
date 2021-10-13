import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);

  if (!users) {
    return null;
  }

  const user = users.find((user) => user.id === id);

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs
          .map((blog, i) =>
            <li key={i}>{blog.title}</li>
          )
        }
      </ul>
    </div>
  );
};

export default User;