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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 400,
    },
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        width: 200,
      },
  });

class AddProject extends Component {


  state = {
      projectName: '',
      color: '',
      amount: '',
  }

  componentDidMount() {
    this.props.dispatch( {type: 'FETCH_PROJECT_BEING_ADDED'} );
    this.props.dispatch( {type: 'FETCH_POSSIBLE_STRINGS'} );
//TODO this needs to happen after getting the project being added 
//  this.props.dispatch( {type: 'FETCH_NEEDED_STRINGS', payload: {project_id: this.props.reduxStore.thisProject.id}});
  }

  handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    }

  submitProjectName = () => {
      console.log('the name to submit is: ', this.state.projectName, 'the id is: ', this.props.reduxStore.thisProject.id);
      this.props.dispatch( {type: 'CHANGE_PROJECT_NAME', payload: {
        project_id: this.props.reduxStore.thisProject.id,
        project_name: this.state.projectName
      }});
  }
  
  changeProjectName = () => {
    console.log('delete this project name');
    this.props.dispatch( {type: 'CHANGE_PROJECT_NAME', payload: {
      project_id: this.props.reduxStore.thisProject.id,
      project_name: ''
    }});

  }
  
  addColor = (event) => {
    console.log('add this color!', this.state.color.id, this.state.amount);
    //don't add a needed color that already exists
    let addIt = true;
    for (let i = 0; i<this.props.reduxStore.stringsNeeded.length; i++ ){
      if ((this.state.color.id === this.props.reduxStore.stringsNeeded[i].color_id)){
        console.log('we already had one of these! Edit it, do not make a new one!');
        //TODO make this into a material UI alert or some such dialog - something prettier
        alert(`you've already made an instance of this color in this project. Please delete it or edit it`)
        addIt = false;
      }
    }
    if(addIt){
      this.props.dispatch( {type: 'ADD_NEEDED_STRING', payload: {
        color_id: this.state.color.id, 
        amount: this.state.amount,
        project_id: this.props.reduxStore.thisProject.id
      }} );
      this.setState({
        amount: '',
      })
    }
 
  }

  render() {
    const {classes} = this.props;
    if (this.state.color === ''){
      this.setState({color: this.props.reduxStore.possibleStrings[0]});
    }  
    return (
      <div>
        <h1>Add Project Page!!!</h1>
      <div>
      <Table className={classes.table} size='small' aria-label='a table of strings being added to this project'>
        <TableHead>
          <TableRow>
          {/*This is conditional rendering. If the project already had a name, it will show hereh
          If it did not, it will show the field to fill in the name */}
          {this.props.reduxStore.thisProject.project_name ? 
          <>
            <TableCell>
              {this.props.reduxStore.thisProject.id}
            </TableCell>
            <TableCell >
              {this.props.reduxStore.thisProject.project_name}
            </TableCell>
            <TableCell >
            </TableCell>
            <TableCell >
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={this.changeProjectName}>Change my Project Name
              </Button>
            </TableCell> 
          </>
          : 
          <>
            <TableCell>
              <TextField
                id="projectName"
                label="Project Name"
                className={classes.textField}
                value={this.state.projectName}
                onChange={this.handleChange('projectName')}
                margin="normal"
              />
            </TableCell>
            <TableCell >
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={this.submitProjectName}>Name my Project
              </Button>
            </TableCell>
            <TableCell >

            </TableCell>
            <TableCell >

            </TableCell>
          </>}

          </TableRow>
          <TableRow>
            <TableCell>Color Number</TableCell>
            <TableCell>Amount Required</TableCell>
            <TableCell>Color Name</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Button</TableCell>
          </TableRow>
        </TableHead>
      <TableBody>

              {/*This is where the list of strings needed for this project are mapped
              into the table from the reducer */}
        {this.props.reduxStore.stringsNeeded && this.props.reduxStore.stringsNeeded.map(item => (
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
              <div style={{backgroundColor: `#${item.color_value}`, height:'30px', width: '40px' }}></div>
            </TableCell>
            <TableCell>                      
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => this.props.dispatch( {type: 'DELETE_NEEDED_STRING', 
                  payload: {thread_needed_id: item.id}} )}
                >Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {/*This is where the user can select which colors to use, which are retrieved
        from the database. I wish that it didn't make you click on the color number to use it */}
          <TableRow>
            <TableCell>
              <Autocomplete
                id="color selection"
                options={this.props.reduxStore.possibleStrings}
                defaultOption={this.props.reduxStore.possibleStrings[0]}
                value={this.state.color}
                getOptionLabel={(option) => option.number }
                style={{ width: 120 }}
                onChange={(event, value) => this.setState({
                  color: value
                })}
                renderInput={(params) => <TextField {...params} label="Color" variant="outlined" />}
              />
            </TableCell>
            <TableCell>
              <Select
                value={this.state.amount}
                onChange={(event, value) => this.setState({
                  amount: event.target.value})}
                name="amount"
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value={0.500}>0.5</MenuItem>
                <MenuItem value={1.000}>1</MenuItem>
                <MenuItem value={1.500}>1.5</MenuItem>
                <MenuItem value={2.000}>2</MenuItem>
                <MenuItem value={2.500}>2.5</MenuItem>
                <MenuItem value={3.000}>3</MenuItem>
                <MenuItem value={3.500}>3.5</MenuItem>
                <MenuItem value={4.000}>4</MenuItem>
              </Select>
              <FormHelperText>Amount</FormHelperText>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color='secondary'
                onClick={this.addColor}
              >
                Add Color
              </Button>
            </TableCell>
          </TableRow>
          <TableRow key='add'>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Button 
                variant="contained" 
                color='secondary'
                onClick={() =>    
                  {this.props.dispatch( 
                    {type: 'SAVE_PROJECT',
                    payload: {project_id: this.props.reduxStore.thisProject.id}});
                    this.props.history.push('/projectslist');}}>
                Save This Project!
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <Button variant="contained" color="primary" onClick={() => 
      this.props.history.push('/projectslist')}>
        Back to Projects List
    </Button>
    </div>
    );
  }
}

AddProject.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

const mapStateToProps = (reduxStore) => ({
  reduxStore
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(AddProject)));
