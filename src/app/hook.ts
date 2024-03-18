// It is better to create typed versions of the useDispatch and useSelector hooks to avoid
// having to type them every time you use them.
// For useSelector, it saves you from having to type the RootState every time you use it.
// For useDispatch, the default Dispatch type does not know about thunks. In order to correctly dispatch
// thunks, you need to use the AppDispatch type from the store file that includes the thunk middleware.
// Since these are custom hook variables, they should be placed in a separate file, such as src\app\hook.ts.
// This allows you to import them into any component that needs them.

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './store';

// This also works:
// export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

