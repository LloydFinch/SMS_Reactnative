/**
 * Created by root on 16-9-28.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export  default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer);
    return store;
}

