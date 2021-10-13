import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { retrieveUsers } from '../reducers/usersReducer';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';

const Users = ({ users }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUsers());
  }, []);

  if (users === null) {
    return null;
  }

  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 250 }} aria-label='user table'>
          <TableHead>
            <TableRow>
              <TableCell><b>Users</b></TableCell>
              <TableCell><b>blogs created</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .map((user) =>
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  const users = state.users;
  return { users };
};

const ConnectedUsers = connect(mapStateToProps)(Users);
export default ConnectedUsers;