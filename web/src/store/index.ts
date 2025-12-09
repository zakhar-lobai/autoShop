import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import testReducer from './reducers/testReducer';

const rootReducer = combineReducers({
  yourStateSlice: testReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
