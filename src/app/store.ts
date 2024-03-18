import {configureStore} from '@reduxjs/toolkit';
import cakeReducer from '../features/cake/cakeSlice';
import icecreamReducer from '../features/icecream/icecreamSlice';
import userReducer from '../features/user/userSlice';

// @ts-ignore
//import reduxLogger from 'redux-logger';
//import { Middleware } from '@reduxjs/toolkit';

const worker = new Worker(new URL('./action-reader.js', import.meta.url));

type actionToDispatchType =
{
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
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    //     .concat(reduxLogger).concat(customLoggerMiddleware)
});

type AnyObject = Record<string, any>;

function findChangedProperties<T extends AnyObject, U extends AnyObject>(a: T, b: U): Partial<U>
{
    const changedProperties: Map<string, any> = new Map();

    // Helper function to recursively compare properties
    const compareProperties = (objA: AnyObject, objB: AnyObject, path: string = ''): void => {
        for (const key in objA) {
            if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
                compareProperties(objA[key], objB[key], `${path}${key}.`);
            } else if (objA.hasOwnProperty(key) && objB.hasOwnProperty(key) && objA[key] !== objB[key]) {
                changedProperties.set(`${path}${key}`, objB[key]);
            }
        }
    };

    // Start comparison
    compareProperties(a, b);

    // Convert Map to object
    const result: Partial<U> = {};
    changedProperties.forEach((value, key) => {
        const propName = key.split('.').pop(); // Get the last part of the key
        if (propName) {
            // @ts-ignore
            result[propName] = value;
        }
    });

    return result;
}

// echo '[{"type": "cake/ordered"},{"type": "cake/restocked", "payload": 10}]' | ./spark publish -topic action-dispatch-reader -server localhost:9007 -type json -proto amps

worker.addEventListener('message', (event) =>
{
    const { data } = event;

    if (Array.isArray(data.actions)) {
        data.actions.forEach((action: actionToDispatchType) =>
        {
            if (action.type)
            {
                const actionToDispatch: actionToDispatchType =
                {
                    type: action.type,
                };

                if (action.payload)
                    actionToDispatch.payload = action.payload;

                let previousState: any = getAllActionStates();
                store.dispatch(actionToDispatch);
                let newState: any = getAllActionStates();
                let delta = findChangedProperties(previousState, newState);

                console.log(JSON.stringify({ action: actionToDispatch, delta: delta, previousState: previousState, newState: newState}));
            }
            else
                console.log("Action dispatch message received from worker does not contain a type property.");
        });
    }
    else
        console.log("Action dispatch message received from worker does not contain an array of actions.");
});



const getAllActionStates = () =>
{
    const actionStates: any[] = [];

    Object.values(store.getState()).forEach((slice) => actionStates.push(slice));

    return actionStates;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
