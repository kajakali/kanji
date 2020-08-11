import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LogOutButton from '../LogOutButton/LogOutButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      justifyContent: 'center',
      display: 'block',
      margin: 'auto',
    },
    image: {
      margin: theme.spacing(1),
      border: theme.spacing(1)
    },
    name: {
      margin: theme.spacing(1),
      border: theme.spacing(1),
      justifyContent: 'center',
      width: '200',
      height: '200',
    }
  });

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch( {type: 'FETCH_PROJECTS'} );
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Typography>
          <Box m={1} ml={3}>
          <h1 id="welcome">
        Welcome, { this.props.reduxStore.user.username }!
      </h1>
          </Box>
{/*           <Box m={1}>
          <p>Your ID is: { this.props.reduxStore.user.id }</p>
          </Box> */}
        </Typography>


{/*       <div classes={{root: classes.root}}>
        <img className={`${classes.image} ${classes.root}`} 
          src='http://www.artecyshop.com/images/medium/dolphinsatdawn_MED.jpg' 
          alt='dolphins at dawn'
        />
      </div> */}
      {this.props.reduxStore.projects.map((item) => (item.project_image?    
        <img className={`${classes.image}`} 
          key={item.id} 
          width='200' 
          src={item.project_image} 
          alt={item.project_name}
        />
        :
      <span/>
      ))}
      <Button
        classes={{root: classes.root}}
        onClick={() => this.props.history.push('/projectslist')}
        color='primary'
        variant='contained'
        >
        Projects
      </Button>
      <Button
        classes={{root: classes.root}}
        onClick={() => this.props.history.push('/threadlist')}
        color='primary'
        variant='contained'
      >
        Threads
      </Button>
  
      <LogOutButton className={`${classes.button} ${classes.root}`} />
    </div>
    );
  }
}


  


const mapStateToProps = (reduxStore) => ({
  reduxStore
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(UserPage)));

