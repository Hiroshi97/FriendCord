import { combineReducers } from 'redux';
import AuthReducer from './auth.reducer';
import ChatsReducer from './chat.reducer';

const allReducers = combineReducers({
    authState: AuthReducer,
    chatsState: ChatsReducer,
})

export default allReducers;
