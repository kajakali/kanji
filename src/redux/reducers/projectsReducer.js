
// this reducer holds an array of the projects associated with this user
const projectsReducer = (state = [], action) => {
  if(action.type === 'SET_PROJECTS'){
    return action.payload.data;
  }
  return state
};

export default projectsReducer;
