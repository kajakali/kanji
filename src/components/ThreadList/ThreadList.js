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
  });

class ThreadList extends Component {

  componentDidMount() {
    this.props.dispatch( {type: 'FETCH_ALL_THREADS'} );
    // TODO on load of page, find out the id of the General Storage project? so that it can be used when
    // adding new threads on this page?
  }

  render() {
    const {classes} = this.props;
    const homeButton = (            
    <Button
      color='primary'
      variant='contained'
      onClick={() => this.props.history.push('/home')}
    >
      Home
    </Button>)
    return (
      <div>
        <Typography>


          <Box m={1} ml={3}>
              <h1>Threads List!</h1>
              </Box>
              <Box m={1}>
                {homeButton}
              </Box>



        <Table className={classes.table} size='small' aria-label='a table of all the threads'>
          <TableHead>
            <TableRow>
              <TableCell>Color Number</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Color Name</TableCell>
              <TableCell>Amount Required</TableCell>
              <TableCell>Amount Available</TableCell>
              <TableCell>Amount Needed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxStore.entireThreadList 
            && this.props.reduxStore.entireThreadList.map(
                item => (
                    <TableRow key={item.id}>
                        <TableCell>
                            {item.number}
                        </TableCell>
                        <TableCell>
                            <div style={{
                            backgroundColor: `#${item.color_value}`,
                            height:'10px', 
                            width: '20px' }}>
                            </div>
                        </TableCell>
                        <TableCell>
                            {item.color_name}
                        </TableCell>
                        <TableCell>
                            {item.needed !=0.000 && item.needed}
                        </TableCell>
                        <TableCell>
                            {item.available}
                        </TableCell>
                        <TableCell style={{color: 'red'}}>
                            {(item.needed - item.available) > 0 && item.needed - item.available}
                            </TableCell>
                            <TableCell>
                              {/*this could probably be the confirmation dialog, 
                              handed the gemeral storage id and the color id...*/}
           {/*                    <Button>Add or edit a skein</Button> */}
                        </TableCell>
                    </TableRow>
                )
            )}


          </TableBody>
        </Table>
        <Box m={1}>
          {homeButton}
        </Box>
        </Typography>
      </div>
    );
  }
}

  


const mapStateToProps = (reduxStore) => ({
  reduxStore
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(ThreadList)));
