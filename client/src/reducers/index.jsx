import { combineReducers } from 'redux';
import AuthReducer from './auth.reducer';
import ChatsReducer from './chat.reducer';
import FriendsReducer from './friends.reducer';

const allReducers = combineReducers({
    authState: AuthReducer,
    chatsState: ChatsReducer,
    friendsState: FriendsReducer
})

export default allReducers;
