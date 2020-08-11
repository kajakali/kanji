import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

let amountArray = [0, .5, 1, 1.5, 2, 2.5];
class EditStringDialog extends React.Component {
  state = {
    open: false,
    amount: 'not an amount',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (input) => {
    this.setState({ open: false });
    console.log('we want to', input);
    if(isNaN(input)){ 
        console.log(`that's not a number. Don't do anything`);
    }
    else if(Number(input) === 0){
        console.log('delete this string instance', this.props.project_id, this.props.thread_available_id);
        this.props.dispatch( {type: 'DELETE_AVAILABLE_STRING_INSTANCE', payload: {
            thread_available_id: this.props.thread_available_id,
            project_id: this.props.project_id,
            color_id: this.props.color_id
        }});
    }
    else{
        console.log('PUT to update this string instance with new amount', input);
        this.props.dispatch( {type: 'EDIT_AVAILABLE_STRING_INSTANCE', payload: {
            thread_available_id: this.props.thread_available_id, 
            amount: this.state.amount,
            project_id: this.props.project_id,
            color_id:this.props.color_id
        }});
        //TODO maybe make it so this dialog can also make an instance of available string, when handed a project Id
        //and a color id...
    }
 
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          Edit this string
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`The amount of string has changed!`} 
            
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              How much string is there now?
              <TextField
                id="new-amount"
                select
                label="skeins"
                type="number"
                InputLabelProps={{
                     shrink: true,
                }}

                variant="outlined"
                value={this.state.amount}
                onChange={this.handleChange('amount')}
                >
                    <MenuItem key='not an amount' value='not an amount'></MenuItem>
                {amountArray.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                ))} 
                </TextField>
                        




            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose('go back!')} color="primary">
              Oops, never mind!
            </Button>
            <Button onClick={() => this.handleClose(`${this.state.amount}`)} variant="contained" color="primary">
              Edit!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(EditStringDialog);