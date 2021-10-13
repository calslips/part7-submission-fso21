import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
} from '@mui/material';

const Navigation = ({ logout }) => {
  const user = useSelector((state) => state.user);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button variant='contained' disableElevation component={Link} to='/'>
          blogs
        </Button>
        <Button variant='contained' disableElevation component={Link} to='/users'>
          users
        </Button>
        <Box component='span' textAlign='center'>
          <em>&nbsp;{user.name} logged in&nbsp;</em>
          <Button variant='contained' disableElevation onClick={logout}>
            logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;