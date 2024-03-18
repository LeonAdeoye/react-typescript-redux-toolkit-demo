import { configureStore } from '@reduxjs/toolkit';
//import { Middleware } from '@reduxjs/toolkit';
import cakeReducer from '../features/cake/cakeSlice';
import icecreamReducer from '../features/icecream/icecreamSlice';
import userReducer from '../features/user/userSlice';

// @ts-ignore
import reduxLogger from 'redux-logger';
const worker = new Worker(new URL('./action-reader.js', import.meta.url));

type actionToDispatchType = {
    type: string,
    payload?: number
}

// Custom middleware created using the Middleware type from Redux Toolkit
// const customLoggerMiddleware: Middleware = (store) => (next) => (action) =>
// {
//     console.log('dispatching', action);
//     const result = next(action);
//     console.log('next state', store.getState());
//     return result
// }

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(reduxLogger)//.concat(customLoggerMiddleware)
});

worker.addEventListener('message', (event) =>
{
    console.log('Store received dispatch action message:', event.data);
    const {data} = event;
    if(data.action)
    {
        let actionToDispatch: actionToDispatchType =
        {
            type: data.action.type
        }
        if(data.action.payload)
            actionToDispatch['payload'] = data.action.payload;

        store.dispatch(actionToDispatch);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
