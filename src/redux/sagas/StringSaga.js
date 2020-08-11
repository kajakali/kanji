import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//get the strings needed based on the project id
//send them to the reducer
function* fetchNeededStrings(action) {
  try {
    const response = yield axios.get(`/api/strings`, {params: action.payload});
    yield console.log('fetch needed strings response:', response);
    yield put({type: 'SET_NEEDED_STRINGS', payload: response});
  } 
  catch (error) {
    console.log('Error with getting strings:', error);

  }
}

// add a string needed based on the project id and the color and amount
// get the whole list of needed strings for this project again based on the project id
// put them on the reducer (so that it's updated and the added one will show up)
function* addNeededString(action) {
  try {
    const response = yield axios.post('/api/strings/needed', {data: action.payload});
    yield put({ type: 'FETCH_NEEDED_STRINGS', payload: {project_id: response.data[0]}});
  } catch (error) {
    console.log('Error with adding a needed string:', error);
  }
}
//delete a string needed from the database based on the id of the string needed line in the table
// get the whole list of needed strings for this project again based on the project id
// put them on the reducer (so that it's updated and the deleted one will disappear)
function* deleteNeededString(action) {
  try {
    const response = yield axios.delete(`/api/strings/needed/${action.payload.thread_needed_id}`);
    yield put({ type: 'FETCH_NEEDED_STRINGS', payload: {project_id: response.data[0]}});
  } catch (error) {
    console.log('Error with deleting a needed string:', error);
  }
}
//this finds all pieces of string in the database of this color 
function* fetchThisColorString(action) {
  try {
    const response = yield axios.get(`api/strings/color/${action.payload.string_color_id}`);
    yield put({ type: 'SET_THIS_COLOR_STRINGS', payload: response});
  }
  catch (error) {
    console.log('error in fetching all string of this color', error);
  }
}

function* addAStringToProject(action) {
  try {
    yield axios.post('api/strings/available', action.payload);
    yield put({ type: 'FETCH_ALL_STRING_THIS_COLOR', payload: {string_color_id: action.payload.color_id}});

  }
  catch (error) {
    console.log('error in adding a skein of string to this project');

  }
}

function* deleteAvailableStringInstance(action) {
  try {
    yield axios.delete(`api/strings/available/${action.payload.thread_available_id}`);
    yield put({ type: 'FETCH_ALL_STRING_THIS_COLOR', payload: {string_color_id: action.payload.color_id}});
  }
  catch (error) {
    console.log('error in deleting this piece of string', error);
  }
}

function* editAvailableStringInstance(action) {
  try {
    yield axios.put('api/strings/available', {data: action.payload});
    yield put({ type: 'FETCH_ALL_STRING_THIS_COLOR', payload: {string_color_id: action.payload.color_id}});
  }
  catch (error) {
    console.log('error in editing this piece of string', error);
  }
}

function* fetchAllThreads() {
  try {
    const response = yield axios.get('api/strings/all');
    yield put({ type: 'SET_ENTIRE_THREAD_LIST', payload: response});
    
  }
  catch (error) {
    console.log('error in fetching all the strings saga', error);
  }
}

function* StringSaga() {
  yield takeLatest('ADD_NEEDED_STRING', addNeededString);
  yield takeLatest('FETCH_NEEDED_STRINGS', fetchNeededStrings);
  yield takeLatest('DELETE_NEEDED_STRING', deleteNeededString);
  yield takeLatest('FETCH_ALL_STRING_THIS_COLOR', fetchThisColorString);
  yield takeLatest('ADD_AVAILABLE_STRING_TO_PROJECT', addAStringToProject);
  yield takeLatest('DELETE_AVAILABLE_STRING_INSTANCE', deleteAvailableStringInstance);
  yield takeLatest('EDIT_AVAILABLE_STRING_INSTANCE', editAvailableStringInstance);
  yield takeLatest('FETCH_ALL_THREADS', fetchAllThreads);
}

export default StringSaga;
