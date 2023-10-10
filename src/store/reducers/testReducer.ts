import { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from '../actions/actionTypes';

type State = {
    data: []; 
    loading: boolean;
    error: null | string;
};

const initialState: State = {
    data: [],
    loading: false,
    error: null
};

type Action = {
    type: string;
    payload?: any;  
};

const testReducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case FETCH_START:
            return { ...state, loading: true };
        case FETCH_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_FAILURE:
            return { ...state, loading: false, error: action.payload.message };
        default:
            return state;
    }
};

export default testReducer;
