import React from 'react';
import { useAppSelector, useAppDispatch} from "../../app/hook";
import { ordered, restocked } from "./cakeSlice";

export const CakeView = () =>
{
    const numberOfCakes = useAppSelector((state) => state.cake.numOfCakes);
    const dispatch = useAppDispatch();
    return (
        <div>
            <h2>Number of cakes - {numberOfCakes}</h2>
            <button onClick={() => dispatch(ordered())}>Order Cake</button>
            <button onClick={() => dispatch(restocked(5))}>Restock cakes</button>
        </div>
    );
}
