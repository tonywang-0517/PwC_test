import {createContext, FC, useContext, useEffect, useReducer, useState, useCallback, useMemo} from 'react'
import IAppState, {
    appReducer,
    initialAppState,
} from '@context/AppContext/AppReducer'
import {
    ActionTypes,
} from '@context/AppContext/AppConstants';

import {
    storageGet,
    storageSet
} from '@lib/helper'
import moment from "moment/moment";
import React from "react";


export const AppStateContext = createContext({} as IAppState);
const AppDispatchContext = createContext({} as IAppDispatchStore);

export interface IProps {
    children?: React.ReactNode
}


export interface IAppDispatchStore {
    setScales: (payload: number) => void,
    resetScales: () => void,
    setDates: (payload: [moment.Moment, moment.Moment]) => void,
    resetDates: () => void
}

export const AppProvider: FC<IProps> = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialAppState);
    const [LSReady, setLSReady] = useState(false);


    useEffect(() => {
        const setState = (payload: IAppState) => {
            dispatch({type: ActionTypes.SET_STATE, payload})
        };
        if (storageGet()) {
            const storageState = storageGet();
            setState({
                ...storageState,
                dates: storageState.dates?.map((date: moment.Moment) => moment(date)) || initialAppState.dates
            });
        }
        setLSReady(true);
    }, [])

    useEffect(() => {
        if (LSReady) {
            storageSet('state', state);
        }
    }, [state,LSReady])

    const setScales = useCallback((payload: IAppState['scales']) => {
        dispatch({type: ActionTypes.SET_SCALES, payload})
    }, []);
    const resetScales = useCallback(() => {
        dispatch({type: ActionTypes.RESET_SCALES})
    }, []);
    const setDates = useCallback((payload: IAppState['dates']) => {
        dispatch({type: ActionTypes.SET_DATES, payload})
    }, []);
    const resetDates = useCallback(() => {
        dispatch({type: ActionTypes.RESET_DATES})
    }, []);

    //const resetState = useCallback(() => {dispatch({type: ActionTypes.RESET_STATE})},[]);

    const AppDispatchStore: IAppDispatchStore = useMemo(
        () => ({
            setScales,
            resetScales,
            setDates,
            resetDates
        }),
        [setScales,resetScales,setDates,resetDates],
    )

    return (
        <AppDispatchContext.Provider
            value={AppDispatchStore}
        >
            {
                LSReady && <AppStateContext.Provider value={state}>
                    {children}
                </AppStateContext.Provider>
            }

        </AppDispatchContext.Provider>
    )
}

export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);
