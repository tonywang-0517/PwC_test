import IAppState from "@context/AppContext/AppReducer";
import {endpoint} from "@config";


export interface IecondbRes {
    "ticker": string,
    "description": string,
    "geography": string,
    "frequency": string,
    "dataset": string,
    "additional_metadata": Object,
    "data": {
        "values": Array<number>,
        "dates":Array<string>,
        "status": Array<number>
    }
}
export const fetchCPIUS = async (dates: IAppState['dates']):Promise<IecondbRes> => {
    return (await fetch(`${endpoint}/api/series/CPIUS/?${processURLParams(dates)}`)).json();
};

export const fetchCONFUS = async (dates: IAppState['dates']):Promise<IecondbRes> => {
    return (await fetch(`${endpoint}/api/series/CONFUS/?${processURLParams(dates)}`)).json();
};

export const fetchRETAUS = async (dates: IAppState['dates']):Promise<IecondbRes> => {
    return (await fetch(`${endpoint}/api/series/RETAUS/?${processURLParams(dates)}`)).json();
};

export const fetchSENTUS = async (dates: IAppState['dates']):Promise<IecondbRes> => {
    return (await fetch(`${endpoint}/api/series/SENTUS/?${processURLParams(dates)}`)).json();
};

export const fetchPOPUS = async (dates: IAppState['dates']):Promise<IecondbRes> => {
    return (await fetch(`${endpoint}/api/series/POPUS/?${processURLParams(dates)}`)).json();
};


const processURLParams = (dates: IAppState['dates'])=>new URLSearchParams({
    from: dates[0].format("YYYY-MM-DD"),
    to: dates[1].format("YYYY-MM-DD"),
    format: 'json'
})
