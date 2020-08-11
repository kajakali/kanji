import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


 class LoginPage extends Component {
   state = {
     username: '',
     password: '',
   };

   login = (event) => {
     event.preventDefault();

     if (this.state.username && this.state.password) {
       this.props.dispatch({
         type: 'LOGIN',
         payload: {
           username: this.state.username,
           password: this.state.password,
         },
       });
     } else {
       this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
     }
   } // end login

   handleInputChangeFor = propertyName => (event) => {
     this.setState({
       [propertyName]: event.target.value,
     });
   }

   render() {
     return (
       <div>
         {this.props.errors.loginMessage && (
           <h2
             className="alert"
             role="alert"
           >
             {this.props.errors.loginMessage}
           </h2>
         )}
         <form onSubmit={this.login}>
           <h1>Login</h1>
           <div>
               <TextField
                 label="Username"
                 type="text"
                 name="username"
                 value={this.state.username}
                 onChange={this.handleInputChangeFor('username')}
               />
           </div>
           <div>
               <TextField
                 label="Password"
                 type="password"
                 name="password"
                 value={this.state.password}
                 onChange={this.handleInputChangeFor('password')}
               />
           </div>
           <div>
             <input
               className="log-in"
               type="submit"
               name="submit"
               value="Log In"
             />
           </div>
         </form>
         <center>
           <Button
             type="button"
             className="link-button"
             onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
           >
             Register
           </Button>
         </center>
       </div>
     );
   }
 }

 // Instead of taking everything from state, we just want the error messages.
 // if you wanted you could write this code like this:
 // const mapStateToProps = ({errors}) => ({ errors });
 const mapStateToProps = state => ({
   errors: state.errors,
 });

 export default connect(mapStateToProps)(LoginPage);