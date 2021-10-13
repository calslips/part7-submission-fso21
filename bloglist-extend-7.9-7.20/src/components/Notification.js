import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

const Notification = ({ notice, severity }) => {
  if (notice === null) {
    return null;
  }

  return (
    <>
      {notice &&
        <Alert severity={severity}>{notice}</Alert>
      }
    </>
  );
};

Notification.propTypes = {
  notice: PropTypes.string,
  severity: PropTypes.string
};

const mapStateToProps = (state) => {
  const [notice, severity] = state.notification;
  return {
    notice,
    severity
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
