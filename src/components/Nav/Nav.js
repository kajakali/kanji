import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { withStyles } from '@material-ui/core/styles';
//import './Nav.css';

const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  button: {
    padding: theme.spacing(2, 1),
    align: 'center',
  },
  nav: {
    overflow: 'hidden',
  },
  navTitle: {
    fontSize: 26,
    display: 'inline-block',
    color: '#000000',
    fontStyle: 'bold',
    padding: theme.spacing(1),
  
  },
  navRight: {
    float: 'right',
  },
  navLink: {

      float: 'left',
      color: '#000000',
      align: 'center',
      padding: theme.spacing(2, 1),
      //border: 'none',
      //cursor: 'pointer',
      outline: 0,
      
      fontSize: 15,
      '&:hover': {
        background: "#f2f2f2",
      },

    
    
  },

  input: {
    display: 'none',
  },

});

function Nav(props) {
  const { classes } = props;
  return(
    <div className={`${classes.nav} ${classes.root}`}>
    <Link to="/home">
      <h2 className={classes.navTitle}>Cross Stitch Buddy</h2>
    </Link>
    <div className={classes.navRight}>
      <Link className={classes.navLink} to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className={classes.navLink} to="/info">
            Info Page
          </Link>
          <Link className={classes.navLink} to="/projectslist">
            Projects List
          </Link>

          <Link className={classes.navLink} to="/addproject">
            Add Project
          </Link>
          <LogOutButton className={classes.button}/>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
{/*       <Link className={classes.navLink} to="/about">
        About
      </Link> */}
    </div>
  </div>
  )
  
};

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles(styles)(connect(mapStateToProps)(Nav));
