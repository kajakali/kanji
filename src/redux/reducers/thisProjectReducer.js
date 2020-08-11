
//this reducer holds the details of this particular project. There is only one, hence the [0] 
//to make action.payload.data stop being an array
const thisProjectReducer = (state = [], action) => {
  if(action.type === 'SET_THIS_PROJECT'){
    return action.payload.data[0];
  }
  return state
};

export default thisProjectReducer;
