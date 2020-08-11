import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const styles = theme => ({
    root: {
      width: '100%',
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 400,
    },
    textfield: {
      width: 400,
    },
  });

class ProjectsList extends Component {

  state = ({
    projectImage: '',
  })
  componentDidMount() {
    this.props.dispatch( {type: 'FETCH_CURRENT_PROJECT', payload: {project_id: this.props.match.params.id}} );
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  submitProjectImage = () => {
    console.log('the image to submit is: ', this.state.projectImage);
    this.props.dispatch( {type: 'CHANGE_PROJECT_IMAGE', payload: {
      project_id: this.props.reduxStore.thisProject.id,
      project_image: this.state.projectImage
    }});
}


  render() {
    let backToProjectList = (          
    <Button 
      variant="contained" 
      color='primary'
      onClick={() => this.props.history.push('/projectslist')}>
        Back to Projects List
    </Button>);
    const {classes} = this.props;
    return (
      <div>
          <Typography component='div'>
            <Box m={1} ml={3}>
            <h1>{this.props.reduxStore.thisProject.project_name}</h1>
            </Box>
            <Box m={3} ml={5}>
            {this.props.reduxStore.thisProject.project_image?
            <img 
              src={this.props.reduxStore.thisProject.project_image} 
              alt={this.props.reduxStore.thisProject.project_name}
            />  
          :
            <>
            <TextField
                id="projectImage"
                label="Project Image"
                className={classes.textField}
                value={this.state.projectImage}
                onChange={this.handleChange('projectImage')}
                margin="normal"
              />
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={this.submitProjectImage}>Submit URL
              </Button>
            </>
          }
            </Box>
 {/*            <Box m={1}>
              <h4>Start Date: {this.props.reduxStore.thisProject.start_date}</h4>
            </Box> */}
            <Box m={1}>
              {backToProjectList}
            </Box>
          </Typography>






        
        <Table className={classes.table} size='small' aria-label='a table of threads associated with this project'>
          <TableHead>
            <TableRow>
              <TableCell>Color Number</TableCell>
              <TableCell>Amount Required</TableCell>
              <TableCell>Color Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Total Available</TableCell>
              <TableCell>Thread Still Needed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            

        {/* Here are all the colors needed for this project mapped from the list in the reducer */}   
          {this.props.reduxStore.stringsNeeded.length > 0 && this.props.reduxStore.stringsNeeded.map(item => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.number}
              </TableCell>
              <TableCell>
                {item.amount_needed}
              </TableCell>
              <TableCell>
                {item.color_name}
              </TableCell>
              <TableCell>
                <div style={{
                  backgroundColor: `#${item.color_value}`,
                  height:'40px', 
                  width: '40px' }}>
                </div>
              </TableCell>
              <TableCell>
                {item.total_available}
              </TableCell>
              <TableCell style={{color: 'red'}}>
                {(item.amount_needed - item.total_available) > 0 && item.amount_needed - item.total_available}
              </TableCell>
              <TableCell>
                {/*The id below lets us get the information about pieces of string of this color */}
                <Button 
                  variant="contained" 
                  //TODO delete this projectId={this.props.reduxStore.thisProject.project_id}
                  onClick={() => this.props.history.push(`/view/${item.color_id}/${this.props.reduxStore.thisProject.id}`)}>
                    View Strings
                </Button>
              </TableCell>
            </TableRow>
          ))}
  
            <TableRow key='add'>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    onClick={() => console.log('I want to mark this project complete!')}>
                      Mark Project Complete
                  </Button>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box m={1}>
              {backToProjectList}
            </Box>
      </div>
    );
  }
}

ProjectsList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  


const mapStateToProps = (reduxStore) => ({
  reduxStore
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(ProjectsList)));
