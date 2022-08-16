import { AUTH, LOGOUT } from "../constants/actiontypes";

const authreducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // console.log(action.payload);
      // return state;
      localStorage.setItem('profile',JSON.stringify({...action?.data}))
      return {...state,authData:action?.data}
      case LOGOUT:
        localStorage.clear()
        return {...state,authData:null}

    default:
      return state;
  }
};
export default authreducer;
