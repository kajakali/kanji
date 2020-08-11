
//this reducer holds all the possible string objects from the database so that the user can select 
//any of them to use on their project
const entireThreadListReducer = (state = [], action) => {
  if(action.type === 'SET_ENTIRE_THREAD_LIST'){
    return action.payload.data;
  }
  return state
};

export default entireThreadListReducer;
