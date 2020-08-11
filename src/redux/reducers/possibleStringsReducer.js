
//this reducer holds all the possible string objects from the database so that the user can select 
//any of them to use on their project
const possibleStringsReducer = (state = [], action) => {
  if(action.type === 'SET_POSSIBLE_STRINGS'){
    return action.payload.data;
  }
  return state
};

export default possibleStringsReducer;
