
//this reducer holds an array of all the string objects needed for the particular project
//that the page loaded to show
const stringsNeededReducer = (state = [], action) => {
  if(action.type === 'SET_NEEDED_STRINGS'){
    return action.payload.data;
  }
  return state
};

export default stringsNeededReducer;
