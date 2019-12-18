import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
//const initialState = {};

//const middleware = [thunk];

//const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeWithDevTools(
  applyMiddleware(thunk)
));
export default store;