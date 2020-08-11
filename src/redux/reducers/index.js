import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import projects from './projectsReducer';
import stringsNeeded from './stringsNeededReducer';
import thisProject from './thisProjectReducer';
import possibleStrings from './possibleStringsReducer';
import thisColor from './thisColorReducer';
import entireThreadList from './entireThreadListReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  projects, //contains a list of projects for this user
  thisProject, //contains the details of the project being viewed
  stringsNeeded, //contains the list of strings needed for the project being viewed
  possibleStrings, //contains the list of all possible strings
  thisColor, //contains all the instances of a given color
  entireThreadList, //shows which threads the user has or needs
});

export default rootReducer;
