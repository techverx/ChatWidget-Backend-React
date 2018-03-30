import { ADD_MESSAGE, SET_CURRENT_USERID, UPDATE_ATTR, SEND_MESSAGE, SIGN_IN, 
    FETCH_HISTORY, FETCHED_HISTORY, FETCH_CONVO, FETCHED_CONVO, ADD_CONVO,
    SELECT_CONVO } from '../constants';
import { postMessage, fetchMessages, fetchConvos, logout } from '../utils/api';
import { signInUser } from '../utils/token-auth';

export function logoutUser() {
  logout();
}

export function setCurrentUserID(userID) {
  return {
    type: SET_CURRENT_USERID,
    payload: userID,
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
}

export function addConvo(convo) {
  return {
    type: ADD_CONVO,
    payload: convo,
  };
}

export function updateAttr(key, value) {
  return {
    type: UPDATE_ATTR,
    payload: {key: key, value: value},
  };
}

export function newMessage(data) {
  postMessage(data)
  return {
    type: SEND_MESSAGE,
    payload: {message: data},
  };
}

export function getHistory(sessionId){
  return ((dispatch)=>{
    dispatch({
      type: FETCH_HISTORY,
      payload: sessionId,
    })
    return fetchMessages(sessionId).then((json) => {
        return dispatch({ type: FETCHED_HISTORY, payload: json })
      }
    )
  })
}

export function getConvos(){
  return ((dispatch)=>{
    dispatch({
      type: FETCH_CONVO,
      payload: {},
    })
    return fetchConvos().then((json) => {
        return dispatch({ type: FETCHED_CONVO, payload: json.convos })
      }
    )
  })
}


// export function getConvos() {
//   fetchConvos()
//   return {
//     type: GET_CONVO_SENT,
//   };
// }

export function selectConvo(sessionID) {
  return {
    type: SELECT_CONVO,
    payload: sessionID,
  };
}

