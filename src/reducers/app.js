import { ADD_MESSAGE, SET_CURRENT_USERID, UPDATE_ATTR, SELECT_CONVO, 
  FETCHED_CONVO, FETCHED_HISTORY, ADD_CONVO } from '../constants';
import { fromJS } from 'immutable';
import { getUuid, sessionCheck } from '../utils/storage/';

const INITIAL_STATE = fromJS({
  messages: [],
  message: {
    sessionID: getUuid(),
    nameError: false,
    emailError: false,
  },
  currentConvo: null,
  convos: []
});

function appReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case FETCHED_CONVO:
    return state.update('convos', (convos) => convos.concat(action.payload.map((c)=>{
        return { id: c.id, name: c.username, unread: c.un_read_count, 
          sessionID: c.session_id }
      })));

  case FETCHED_HISTORY:
    return state.update('messages', () => INITIAL_STATE.get('messages').concat(
      action.payload.messages.map((m)=>{
          return {
            id: m.id, name: m.username, body: m.body, createdAt: m.created_at
          }
      })
    ));

  case ADD_CONVO:
   return state.update('convos', (convos) => convos.concat(action.payload));

  case ADD_MESSAGE:
    return state.update('messages', (messages) => messages.concat(action.payload));

  case SELECT_CONVO:
    return state.update('currentConvo', (currentConvo) => action.payload );

  case UPDATE_ATTR:
    return state.update('message', (message) => Object.assign(message, action.payload) );

  default:
    return state;
  }
}

export default appReducer;

