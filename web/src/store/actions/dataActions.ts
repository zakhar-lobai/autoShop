
import { RootState } from '../index';
import { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from './actionTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const fetchData = (): AppThunk => async dispatch => {
        dispatch({ type: FETCH_START });
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const data = await response.json();
            dispatch({ type: FETCH_SUCCESS, payload: data });
        } catch (error: any) {
            dispatch({ type: FETCH_FAILURE, payload: new Error(error.message) });
        }
    };