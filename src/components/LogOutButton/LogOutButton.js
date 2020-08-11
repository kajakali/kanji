import React from 'react';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';

const LogOutButton = props => (

  <Button className={props.className} onClick={() => props.dispatch({ type: 'LOGOUT' })}>
    <ExitToAppIcon fontSize='small'/>
    Log Out
  </Button>

);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
