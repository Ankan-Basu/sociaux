import {useReducer, useEffect} from 'react';

const ACTIONS = {
    API_REQUEST: 'api-request',
    FETCH_DATA: 'fetch-data',
    ERROR: 'error'
};

const initialState = {
    data: null,
    loading: false,
    error: null,
}

const reducer = (state, {type, payload}) => {
    switch(type) {
        case ACTIONS.API_REQUEST:
            return {...state, data: null, loading: true};
            
        case ACTIONS.FETCH_DATA:
            return {...state, data: payload.data, loading: false};
                
        case ACTIONS.ERROR:
            return {...state, data: null, error: payload};

        default:
            return state                    
    }
}

const useFetch = (url: string) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: ACTIONS.API_REQUEST});

        //do fetch
        fetch(url).then((resp) => {
            resp.json().then((data)=> {
                dispatch({type: ACTIONS.FETCH_DATA, payload: data});

            }
            )
        }).catch((err) => {
            //err
            dispatch({type: ACTIONS.ERROR, payload: err})
        }) 

    }, [url]);

    return state;
}

export default useFetch;
