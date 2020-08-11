import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditStringDialog from '../EditStringDialog/EditStringDialog';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 400,
    },
    addSkein: {
        backgroundColor: 'primary',
        whiteSpace: 'nowrap',
      },
  });

class ViewColor extends Component {
    state = ({
        thread_available_amount: '',
        thread_available_id: ''
    })
  componentDidMount() {
    this.props.dispatch( {type: 'FETCH_ALL_STRING_THIS_COLOR', payload: {string_color_id: this.props.match.params.color_id}} );
    }

  render() {
    const {classes} = this.props;
    return (
      <div>
          <Typography>
              <Box m={1} ml={3}>
              <h1>View Color</h1>
              </Box>
 

{/*         {JSON.stringify(this.props.match.params)}
        {JSON.stringify(this.props.reduxStore.thisColor)}
        {JSON.stringify(this.state)}
        TODO i might want to take the color div out of the table and put it up here since they're all the same
 */}

 
<Table>
    <TableHead>
        <TableRow>
            <TableCell>
                Location
            </TableCell>
            <TableCell>
                Amount
            </TableCell>
            <TableCell>
                Color
            </TableCell>
            <TableCell>
                Color Name
            </TableCell>
            <TableCell>
                Color Value
            </TableCell>
            <TableCell>
                Edit Amount
            </TableCell>
            <TableCell>
                Submit
            </TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        <TableRow>
            <Box ml={3}>
            <Button
            className={classes.addSkein}
            color='secondary'
            variant='contained'
            onClick={() => this.props.dispatch( {type: 'ADD_AVAILABLE_STRING_TO_PROJECT', payload: this.props.match.params} )}>
                Add a skein of this color string to this project
            </Button>
            </Box>

        </TableRow>
        {this.props.reduxStore.thisColor.map( item => (
            <TableRow key={item.thread_available_id}>
                <TableCell>
                    {item.project_name}
                </TableCell>
                <TableCell>
                {item.amount_available}
                </TableCell>
                <TableCell>
                    {item.color_number}
                </TableCell>
                <TableCell>
                    {item.color_name}
                </TableCell>
                <TableCell>
                    <div style={{
                    backgroundColor: `#${item.color_value}`,
                    height:'50px', 
                    width: '50px' }}>
                    </div>
                </TableCell>
                {/*only allow editing of threads that are located here */}
                <TableCell>
 {/*                    {(item.project_id === item.thread_available_location) &&
                        <TextField 
                        label="amount available" 
                        type="number"
                        value={this.state.amount} 
                        onChange={(event, value) => (this.setState({
                            thread_available_id: item.thread_available_id,
                            amount: event.target.value}))}
                    />} */}
                </TableCell>
                <TableCell>
                    {(Number(this.props.match.params.project_id) === Number(item.thread_available_location)) ?
                    <EditStringDialog    
                    color_id={this.props.match.params.color_id}                 
                    project_id={item.project_id}
                    thread_available_id={item.thread_available_id}/>
                    :
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={() => this.props.history.push(`/project/${item.thread_available_location}`)}
                    >View Project
                    </Button>
                    }
                    {/* TODO maybe instead here we could have a button to transfer a piece of string to this project */}
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
        <Box ml={3}>
        <Button 
          variant="contained" 
          color='primary'
          onClick={() => this.props.history.push(`/project/${this.props.match.params.project_id}`)}>
            Back to Project
        </Button>
        </Box>

        </Typography>
      </div>
    );
  }
}



const mapStateToProps = (reduxStore) => ({
  reduxStore
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(ViewColor)));
