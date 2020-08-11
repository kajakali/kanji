import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

class ProjectsList extends Component {

    componentDidMount() {
        this.props.dispatch( {type: 'FETCH_PROJECTS'} );
    }

    addProjectButton = () => {
        console.log('add a new project!');
        this.props.history.push(`/addproject`)
    }



    render() {
        const {classes} = this.props;
        return (
            <div>
              <Typography>
              <Box m={1} ml={3}>
              <h1>Projects List</h1>
              </Box>
              </Typography>




    
      <Table className={classes.table} size="small" aria-label='a table of the users projects'>
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

                
                { this.props.reduxStore.projects &&
                   
                this.props.reduxStore.projects.map(item => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.project_name}
                    </TableCell>
                    <TableCell align="right">{/*{item.start_date}*/}</TableCell>
                    <TableCell align="right">{item.end_date}</TableCell>
                    <TableCell align="right"><Button variant="contained" onClick={() => this.props.history.push(`/project/${item.id}`)}>View</Button></TableCell>
      
                  </TableRow>
                )) 
                }
                <TableRow key='add'>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell><Button color="secondary" variant="contained" onClick={this.addProjectButton}>Add New Project</Button></TableCell>
                </TableRow>
              </TableBody>
      </Table>
      <Box m={1}>
      <Button
        color='primary'
        variant='contained'
        onClick={() => this.props.history.push('/home')}
      >
        Home
      </Button>
      </Box>

            </div>
        );
    }
}

ProjectsList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (reduxStore) => ({
  reduxStore
});

export default withStyles(styles)(connect(mapStateToProps)(ProjectsList));
