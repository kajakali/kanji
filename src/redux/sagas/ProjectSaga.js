import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//get the list of projects for this specific user from the database
//put them in the projects reducer
function* fetchProjects(action) {
  try {
    const response = yield axios.get('/api/projects');
    
    yield put({type: 'SET_PROJECTS', payload: response});
  } 
  catch (error) {
    console.log('Error with getting projects:', error);

  }
}

//TODO: does this even do something? I don't think it does...
function* addProject(action) {
  try {
   
    yield axios.post('/api/projects', action.payload);

    yield put({ type: 'FETCH_PROJECTS' });

  } 
  catch (error) {
    console.log('Error with adding a project:', error);
  }
}
//get the details of the project being added
//put them in the reducer
//use the project id to get the needed strings for this project
//put them in the reducer, too
function* fetchProjectBeingAdded() {
  try {
    const response = yield axios.get('api/projects/add'); //get project details for this user and project is being created
    yield console.log('response to projects being added', response.data);
    if(response.data.length === 0){ //if there weren't any, make a new project that's being created
      console.log('need to make a new project');
      //make a new project in the projects with this user
      let project_idData = yield axios.post('api/projects/add');
      yield console.log('project id data data', project_idData.data);
      yield put({type: 'SET_THIS_PROJECT', payload: project_idData.data});
      yield put({ type: 'FETCH_NEEDED_STRINGS', payload: {project_id: project_idData.data[0].id}});
    }
    else{
      yield put({type: 'SET_THIS_PROJECT', payload: response});
      yield put({ type: 'FETCH_NEEDED_STRINGS', payload: {project_id: response.data[0].id}});
    }
    
  }
  catch (error) {
    console.log('Error in fetching project being added', error);
  }
}
//get the details of the project being viewed
//put them in the reducer
//use the project id to get the needed strings for this project
//put them in the reducer, too
function* fetchCurrentProject(action) {
  try {
   yield console.log('in fetch current project saga, payload:', action.payload );
   console.log('the id of the project you are supposed to get', action.payload);
    const response = yield axios.get(`api/projects/${action.payload.project_id}`);
    yield console.log('response to fetch current project', response);
    yield put({type: 'SET_THIS_PROJECT', payload: response});
    yield put({ type: 'FETCH_NEEDED_STRINGS', payload: {project_id: response.data[0].id}});
  }
  catch (error) {
    console.log('Error in fetching project being added', error);
  }
}
//tell the database that the current project is no longer being edited and is ready to be used
function* saveProject(action) {
  try {
    yield console.log('save project payload:', action.payload);
    yield axios.put('api/projects/save', {data: action.payload});
    yield put({ type: 'FETCH_PROJECTS'});
  }
  catch (error) {
    console.log('Error in saving project', error);
  }
}
function* changeProjectName(action) {
  try {
    yield console.log('change project name payload:', action.payload);
    const response = yield axios.put('api/projects/change', {data: action.payload});
    yield put({ type: 'FETCH_CURRENT_PROJECT', payload: response.data}); //this should be project_id: #
  }
  catch (error) {
    console.log('Error in changing project name', error);
  }
}
function* changeProjectImage(action) {
  try {
    yield console.log('change project name payload:', action.payload);
    const response = yield axios.put('api/projects/image', {data: action.payload});
    yield put({ type: 'FETCH_CURRENT_PROJECT', payload: response.data}); //this should be project_id: #
  }
  catch (error) {
    console.log('Error in changing project name', error);
  }
}

function* ProjectSaga() {
  yield takeLatest('FETCH_PROJECTS', fetchProjects);
  yield takeLatest('ADD_PROJECT', addProject);
  yield takeLatest('FETCH_PROJECT_BEING_ADDED', fetchProjectBeingAdded);
  yield takeLatest('SAVE_PROJECT', saveProject);
  yield takeLatest('FETCH_CURRENT_PROJECT', fetchCurrentProject);
  yield takeLatest('CHANGE_PROJECT_NAME', changeProjectName);
  yield takeLatest('CHANGE_PROJECT_IMAGE', changeProjectImage);
}

export default ProjectSaga;
