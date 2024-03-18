import {configureStore, Middleware} from '@reduxjs/toolkit';
import cakeReducer from '../features/cake/cakeSlice';
import icecreamReducer from '../features/icecream/icecreamSlice';
import userReducer from '../features/user/userSlice';

// @ts-ignore
import reduxLogger from 'redux-logger';

// Custom middleware created using the Middleware type from Redux Toolkit
const customLoggerMiddleware: Middleware = (store) => (next) => (action) => {
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    return result
}

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(reduxLogger).concat(customLoggerMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

