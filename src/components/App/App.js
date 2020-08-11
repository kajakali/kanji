import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import ProjectsList from '../ProjectsList/ProjectsList';
import IndividualProject from '../IndividualProject/IndividualProject';
import AddProject from '../AddProject/AddProject';
import ViewColor from '../ViewColor/ViewColor';
import ThreadList from '../ThreadList/ThreadList';

import './App.css';

const styles = {
  root: {
    background: 'mainGradient',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  userButton: {
    bgcolor: 'primary.main',
    color: 'primary',
    minHeight: 50,
    minWidth: 50,
    outline: 0,
    '&:hover': {
      bgcolor: 'primary.200',
    },
  }


};

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    const {classes} = this.props;
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/view/:color_id/:project_id"
              component={ViewColor}
            />
            <ProtectedRoute
              exact
              path="/projectslist"
              component={ProjectsList}
            />
            <ProtectedRoute
              exact
              path="/threadlist"
              component={ThreadList}
            />
            <ProtectedRoute
              exact
              path="/addproject"
              component={AddProject}
            />

            <ProtectedRoute
              exact
              path="/project/:id"
              component={IndividualProject}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default withStyles(styles)(connect()(App));
