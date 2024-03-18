import { ordered as cakeOrdered } from "../cake/cakeSlice";
import { createSlice, PayloadAction }  from '@reduxjs/toolkit'

type initialStateType =
{
    numOfIcecreams: number
}

const initialState: initialStateType =
{
    numOfIcecreams: 20
}

const icecreamSlice = createSlice({
    name: 'icecream',
    initialState: initialState,
    reducers: {
        ordered: (state) =>
        {
            state.numOfIcecreams--;
        },
        restocked: (state: initialStateType, action: PayloadAction<number>) => {
            state.numOfIcecreams += action.payload;
        }
    },
    // Add an extra reducer to the slice to handle the cake ordered action
    extraReducers: (builder) => {
        builder.addCase(cakeOrdered, (state) => {
            state.numOfIcecreams--;
        });
    }
});

export default icecreamSlice.reducer;
export const{ ordered, restocked } = icecreamSlice.actions;
