import rootReducer from './reducers';
import {createStore,applyMiddleware,compose} from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
//compose(applyMiddleware(sagaMiddleware),
//const sagaMiddleware = createSagaMiddleware();
export default createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// sagaMiddleware.run(rootSaga);