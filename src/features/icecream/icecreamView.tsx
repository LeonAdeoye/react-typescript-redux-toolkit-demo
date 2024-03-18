import React, {useState} from 'react';
import { useAppSelector, useAppDispatch} from "../../app/hook";
import { ordered, restocked } from "./icecreamSlice";

export const IcecreamView = () =>
{
    const numberOfIcecreams = useAppSelector((state) => state.icecream.numOfIcecreams);
    const dispatch = useAppDispatch();
    const [restockValue, setRestockValue ] = useState(1)
    return (
        <div>
            <h2>Number of ice creams - {numberOfIcecreams}</h2>
            <button onClick={() => dispatch(ordered())}>Order ice cream</button>
            <input type="number" value={restockValue} onChange={(e) => setRestockValue(parseInt(e.target.value))} />
            <button onClick={() => dispatch(restocked(restockValue))}>Restock ice creams</button>
        </div>
    );
}
