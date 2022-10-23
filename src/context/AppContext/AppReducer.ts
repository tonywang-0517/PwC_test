import {ActionTypes} from '@context/AppContext/AppConstants';
import moment from "moment/moment";
const dateFormat = 'YYYY-MM';

export default interface IAppState {
    scales:number,
    dates:[moment.Moment,moment.Moment]
}

export const initialAppState :IAppState = {
    dates:[moment('2015-01', dateFormat), moment('2021-01', dateFormat)],
    scales:100
}


type Action = {
    type: ActionTypes,
    payload? : IAppState| IAppState['dates'] | IAppState['scales']
}


export const appReducer = (state:IAppState, {type, payload}:Action) => {
    switch (type) {
        case ActionTypes.SET_DATES:
            return {...state, dates: payload as IAppState['dates'],};

        case ActionTypes.RESET_DATES:
            return {...state, dates: initialAppState.dates};

        case ActionTypes.SET_SCALES:
            return {...state, scales: payload as IAppState['scales']};

        case ActionTypes.RESET_SCALES:
            return {...state, scales: initialAppState.scales};

        case ActionTypes.SET_STATE:
            return {...state, ...payload as IAppState};

        case ActionTypes.RESET_STATE:
            return {...state, ...initialAppState};

        default:
            return {...state};
    }
};
